import React, { useState } from 'react'
import QRCode from 'react-qr-code';
import "./style.css"
import toast from 'react-hot-toast';
import { moveToTrashAndRestoreQrCodeAPI, saveQrCodeAPI } from '../../apis/common';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData, setCreatingOrder } from '../../redux/navbar';

function Qrcode({ data, setData, profileHex, setShowTableStatus }) {

    const dispatch = useDispatch();
    const authData = useSelector(getAuthData);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(data.tableName);
    const [isSaving, setIsSaving] = useState(false);

    const [showDelModal, setShowDelModal] = useState(false);

    const onSave = async () => {
        if (isSaving) {
            toast.error("Please wait.");
            return;
        }
        setIsSaving(true);
        const loader = toast.loading("Adding...", { duration: 20000 });
        await saveQrCodeAPI({ "id": data.id, "name": name }).then(res => {
            if (res.data.status === "success") {
                setData(prev => prev.map(table => ((table.id == data.id) ? ({ ...data, "tableName": name }) : table)));
                toast.success("Changed successfully")
                setEditing(false);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
        toast.dismiss(loader);
        setIsSaving(false);
    }

    const onMoveToTrashAndRestore = async () => {
        if (isSaving) {
            toast.error("Please wait.");
            return;
        }
        setIsSaving(true);
        const loader = toast.loading((data.is_diabled ? "Restoring..." : "Deleting..."), { duration: 20000 });
        await moveToTrashAndRestoreQrCodeAPI({ "id": data.id }).then(res => {
            if (res.data.status === "success") {
                setData(prev => prev.map(table => table.id == data.id ? ({ ...table, is_diabled: !data.is_diabled }) : table).sort((a, b) => a.id - b.id).sort((a, b) => a.is_diabled - b.is_diabled));
                setShowDelModal(false)
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
        toast.dismiss(loader);
        setIsSaving(false);
    }

    const printQr = (id) => {
        const divContents = document.getElementById(`qrToPrint${id}`).outerHTML;
        // let a = window.open('', 'Qr Code', 'width=750,height=750,top=50,left=50,toolbars=no,scrollbars=no,status=no,resizable=yes');
        // a.document.write('<html>');
        // a.document.write('<body>');
        // a.document.write(divContents);
        // a.document.writeF('</body></html>');
        // a.document.close();
        // a.focus();
        // a.print();
        // a.close();
        try {
            var oIframe = document.getElementById(`iframeToPrint${id}`);
            var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
            if (oDoc.document) oDoc = oDoc.document;
            oDoc.write('<head><title>title</title>');
            oDoc.write('</head><body onload="this.focus(); this.print();">');
            oDoc.write(divContents + '</body>');
            oDoc.close();
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <Modal show={showDelModal} onHide={() => setShowDelModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Confirm Delete
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete?</Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger' onClick={onMoveToTrashAndRestore} >YES</button>
                    <button className='btn btn-secondary' onClick={() => setShowDelModal(false)} >NO</button>
                </Modal.Footer>
            </Modal>
            <iframe style={{ position: "absolute", zIndex: -111 }} id={`iframeToPrint${data.id}`}></iframe>
            <div className="qrcodes d-flex flex-column align-items-center justify-content-center m-2">
                <div className='d-flex align-items-center justify-content-center'>
                    {data.is_diabled ? <>
                        <div className='me-4 p-2'></div>
                    </> : <>
                        <div className='me-3'>
                            <OverlayTrigger overlay={<Tooltip>Create an order for the table</Tooltip>}>
                                <img width={30} className='my-1 cursor-pointer' onClick={() => dispatch(setCreatingOrder({ tableName: data.tableName, qr_id: data.id }))} src='/assets/svgs/createOrder.svg' alt='create order' />
                            </OverlayTrigger>
                            <br />
                            {!!authData?.permissions?.access_orders &&<>
                                <OverlayTrigger overlay={<Tooltip>Check Table Orders</Tooltip>}>
                                    <img width={30} className='my-1 cursor-pointer' onClick={() => setShowTableStatus(data)} src='/assets/svgs/bluelist.svg' alt='delete' />
                                </OverlayTrigger>
                                <br />
                            </>}

                        </div>

                    </>}
                    <QRCode
                        size={150}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`https://dash.dbresto.com/menu/${profileHex}/${data.id}`}
                        viewBox={`0 0 256 256`}
                        id={`qrToPrint${data.id}`}
                    />
                    <div className='ms-3'>
                        {data.is_diabled ? <>
                            <OverlayTrigger overlay={<Tooltip>Restore QR</Tooltip>}>
                                <img width={25} className='my-1 cursor-pointer' style={{ borderRadius: '50%', border: '1px green solid', padding: '2px' }} onClick={onMoveToTrashAndRestore} src='/assets/svgs/refresh.svg' alt='print' />
                            </OverlayTrigger>
                        </> : <>
                            <OverlayTrigger overlay={<Tooltip>Edit table name</Tooltip>}>
                                <img width={30} className='my-1 cursor-pointer' onClick={() => setEditing(true)} src='/assets/svgs/penInBlue.svg' alt='edit' />
                            </OverlayTrigger>
                            <br />
                            <OverlayTrigger overlay={<Tooltip>Print QR</Tooltip>}>
                                <img width={30} className='my-1 cursor-pointer' onClick={() => printQr(data.id)} src='/assets/svgs/printInGreen.svg' alt='print' />
                            </OverlayTrigger>
                            <br />
                            <OverlayTrigger overlay={<Tooltip>Delete QR</Tooltip>}>
                                <img width={30} className='my-1 cursor-pointer' onClick={() => setShowDelModal(true)} src='/assets/svgs/deleteinRed.svg' alt='delete' />
                            </OverlayTrigger>
                            <br />
                        </>}
                    </div>
                </div>
                {
                    editing ?
                        <div className='d-flex'>
                            <input value={name} onChange={e => setName(e.target.value)} className="form-control form-control-sm shadow-none m-2 w-75 text-center" />
                            <img width={25} className='me-1 cursor-pointer' onClick={onSave} src='/assets/svgs/checkGreen.svg' alt='check' /> <br />
                            <img width={25} className='mx-0 cursor-pointer' onClick={() => { setEditing(false); setName(data.tableName) }} src='/assets/svgs/crossRed.svg' alt='cross' /> <br />
                        </div>
                        :
                        <h5 className="table_no_text">{data.tableName} {data.is_diabled && <span className='text-danger'>(In Trash)</span>}</h5>
                }
            </div>
        </>
    )
}

export default Qrcode;
