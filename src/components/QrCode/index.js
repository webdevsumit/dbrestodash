import React, { useState } from 'react'
import QRCode from 'react-qr-code';
import "./style.css"
import toast from 'react-hot-toast';
import { deleteQrCodeAPI, saveQrCodeAPI } from '../../apis/common';
import { Modal } from 'react-bootstrap';

function Qrcode({ data, setData, profileHex }) {

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
        const loader = toast.loading("Adding...");
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

    const onDelete = async () => {
        if (isSaving) {
            toast.error("Please wait.");
            return;
        }
        setIsSaving(true);
        const loader = toast.loading("Deleting...");
        await deleteQrCodeAPI({ "id": data.id }).then(res => {
            if (res.data.status === "success") {
                setData(prev => prev.filter(table => table.id != data.id));
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
                    <button className='btn btn-danger' onClick={onDelete} >YES</button>
                    <button className='btn btn-secondary' onClick={() => setShowDelModal(false)} >NO</button>
                </Modal.Footer>
            </Modal>
            <iframe style={{position: "absolute", zIndex: -111}} id={`iframeToPrint${data.id}`}></iframe>
            <div className="qrcodes d-flex flex-column align-items-center justify-content-center m-2">
                <div className='d-flex align-items-center justify-content-center'>
                    <div className='me-4 p-2'></div>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`https://dash.dbresto.com/menu/${profileHex}/${data.id}`}
                        viewBox={`0 0 256 256`}
                        id={`qrToPrint${data.id}`}
                    />
                    <div className='ms-3'>
                        <img width={30} className='my-1 cursor-pointer' onClick={() => setShowDelModal(true)} src='/assets/svgs/deleteinRed.svg' alt='delete' /> <br />
                        <img width={30} className='my-1 cursor-pointer' onClick={() => printQr(data.id)} src='/assets/svgs/printInGreen.svg' alt='print' /> <br />
                        <img width={30} className='my-1 cursor-pointer' onClick={() => setEditing(true)} src='/assets/svgs/penInBlue.svg' alt='edit' /> <br />
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
                        <h5 className="table_no_text">{data.tableName}</h5>
                }
            </div>
        </>
    )
}

export default Qrcode;
