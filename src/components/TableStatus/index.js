import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import toast from 'react-hot-toast';
import { fetchOrdersOnTableAPI } from '../../apis/common';
import OrderCard from '../OrderCard';
import "./style.css";
import { isMobile } from 'react-device-detect';

function TableStatus({ table, setShowTableStatus }) {

    const [show, setShow] = useState(!!table);
    const onClose = () => {
        setShow(false);
        setTimeout(() => {
            setShowTableStatus(null);
        }, 400);
    }

    const [data, setData] = useState(null);

    const fetchOrdersOnTable = async () => {
        await fetchOrdersOnTableAPI({ id: table.id }).then(res => {
            if (res.data.status === "success") {
                setData(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
    }

    useEffect(() => {
        if (!!table) {
            fetchOrdersOnTable();
        }
    }, [])

    return (
        <Modal
            show={show}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {table.tableName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={isMobile ? 'p-0' : ""}>
                <div className='mobileOrderModal' style={{ minHeight: '50vh', maxHeight: '50vh', "overflowY": 'scroll' }}>
                    {data === null ? <p>Loading...</p> : <>
                        {data.length === 0 ?
                            <p>Table is empty.</p>
                            :
                            <Card className={isMobile ? 'shadow-sm p-2 mx-1 border-none border-15 order-header' : 'shadow-sm p-2 ms-4 border-none border-15 order-header'} style={{ width: isMobile ? "max-content" : "auto" }}>
                                <div className='d-flex justify-content-between'>
                                    <h6 className='my-0 mx-1 order-id-width'>Order Id</h6>
                                    <h6 className='my-0 mx-1 order-id-width'>Order Date</h6>
                                    <h6 className='my-0 mx-1 order-id-width'>Order Time</h6>
                                    <h6 className='my-0 mx-1 table-no-width'>Table No.</h6>
                                    <h6 className='my-0 mx-1 customer-name-width'>Customer Name</h6>
                                    <h6 className='my-0 mx-1 actions-width text-end'>Status & Actions</h6>
                                </div>
                            </Card>}
                        {data.map((order) => <OrderCard key={order.id} order={order} setData={setData} />)}
                    </>}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-secondary' onClick={onClose} >Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default TableStatus
