import React, { useEffect, useState } from 'react'
import { Offcanvas } from 'react-bootstrap';
import { addMoreQuantityAPI, getRawMaterialDetailsAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import moment from 'moment';

function ShowQuantityDetailedBox({ onclose, quantityDetails, onUpdateQuantity }) {

    const [showBox, setShowBox] = useState(true);
    const [data, setData] = useState(null);
    const [addingNewRecord, setAddingNewRecord] = useState(null);

    const onCloseCanvas = () => {
        setShowBox(false);
        setTimeout(() => {
            onclose();
        }, 400);
    }

    const fetchData = async () => {
        await getRawMaterialDetailsAPI({ "id": quantityDetails.id }).then(res => {
            if (res.data.status === "success") {
                setData(res.data.data);
            } else toast.error(res.data.message)
        }).catch(err => toast.error(err.message))
    }


    const onAddQuantity = async () => {
        if(!addingNewRecord) return;
        if(!addingNewRecord.quantity){
            toast.error("Please add quantity.");
            return;
        }
        await addMoreQuantityAPI({ "id": quantityDetails.id, "status": addingNewRecord.status, "quantity": addingNewRecord.quantity, "unit": quantityDetails.unit }).then(res => {
            if (res.data.status === "success") {
                toast.success("Added successfully.")
                onUpdateQuantity(quantityDetails.id, res.data.data);
                onCloseCanvas();
            } else toast.error(res.data.message)
        }).catch(err => toast.error(err.message))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Offcanvas show={showBox} placement="end" onHide={onCloseCanvas} >
            <Offcanvas.Header closeButton className=''>
                <Offcanvas.Title>{quantityDetails.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <table class="table table-bordered">
                    <thead>
                        <tr className=''>
                            <th scope="col">Date</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data === null && <tr>
                            <td>Loading...</td>
                            <td>Loading...</td>
                            <td>Loading...</td>
                        </tr>}
                        {data?.map((material, ind) =>
                            <tr key={ind} className={material.status === 1 ? "bg-success" : "bg-danger"} style={{ fontWeight: "bold", color: "white" }}>
                                <td>{moment(material.datetime).format("DD/MM/YYYY")}</td>
                                <td className='text-end px-4'>{material.quantity}</td>
                                <td>{material.unit}</td>
                            </tr>
                        )}
                        {!!addingNewRecord &&
                            <tr className='form-group my-1'>
                                <td style={{ minWidth: "140px" }}>
                                    <select value={addingNewRecord.status} onChange={(e) => setAddingNewRecord(prev => ({ ...prev, "status": e.target.value }))} className='w-100 form-control shadow-none'>
                                        <option value={1}>ADD</option>
                                        <option value={0}>REMOVE</option>
                                    </select>
                                </td>
                                <td style={{ minWidth: "100px" }}>
                                    <input value={addingNewRecord.quantity} onChange={(e) => setAddingNewRecord(prev => ({ ...prev, "quantity": e.target.value }))} className='w-100 form-control shadow-none text-end' type='number' />
                                </td>
                                <td style={{ minWidth: "100px" }}>
                                    <select value={quantityDetails.unit} className='w-100 form-control shadow-none'>
                                        <option value={quantityDetails.unit}>{quantityDetails.unit}</option>
                                    </select>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                {!addingNewRecord ?
                    <span className='btn btn-primary btn-sm cursor-pointer' onClick={() => setAddingNewRecord({ "quantitye": "", "status": 1 })} >Add</span>
                    :
                    <span className='btn btn-primary btn-sm cursor-pointer' onClick={onAddQuantity} >Save</span>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShowQuantityDetailedBox
