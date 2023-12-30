import moment from 'moment'
import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import SureModal from '../SureModal';
import toast from 'react-hot-toast';
import "./style.css"
import { baseUrl, cancelOrderAPI, completeOrderAPI, undoOrderAPI } from '../../apis/common';

function OrderCard({ order, setData }) {

    const [cancelId, setCancelId] = useState(null);
    const [undoId, setUndoId] = useState(null);

    const [showBill, setShowBill] = useState(false);
    const [showBill2, setShowBill2] = useState(false);

    const onCancelOrder = async () => {
        const loader = toast.loading("Saving...", { duration: 20000 });
        await cancelOrderAPI({ id: cancelId }).then(res => {
            if (res.data.status === "success") {
                setData(prev => prev.map(order => {
                    if (order.id === cancelId) return ({ ...order, "order_status": 3 });
                    return order;
                }));
                setCancelId(null);
            }
        }).catch(err => toast.error(err.error));
        toast.dismiss(loader);
    }

    const onUndoOrder = async () => {
        const loader = toast.loading("Saving...", { duration: 20000 });
        await undoOrderAPI({ id: undoId }).then(res => {
            if (res.data.status === "success") {
                setData(prev => prev.map(order => {
                    if (order.id === undoId) return ({ ...order, "order_status": 1 });
                    return order;
                }))
                setUndoId(null);
            }
        }).catch(err => toast.error(err.error));
        toast.dismiss(loader);
    }

    const onCompleteOrder = async (id) => {
        const loader = toast.loading("Saving...", { duration: 20000 });
        await completeOrderAPI({ id }).then(res => {
            if (res.data.status === "success") {
                setData(prev => prev.map(order => {
                    if (order.id === id) return ({ ...order, "order_status": 2 });
                    return order;
                }))
            }
        }).catch(err => toast.error(err.error));
        toast.dismiss(loader);
    }

    const onCloseBill = () => {
        setShowBill(false);
        setTimeout(() => {
            setShowBill2(false);
        }, 400);
    }

    return (
        <>
            {!!cancelId && <SureModal show={!!cancelId} onHide={() => setCancelId(null)} onYes={onCancelOrder} />}
            {!!undoId && <SureModal show={!!undoId} onHide={() => setUndoId(null)} onYes={onUndoOrder} />}
            {showBill2 &&
                <Modal
                    show={showBill}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={onCloseBill}
                    size='sm'
                >
                    <Modal.Body className='invoiceIframe'  style={{ minHeight:"80vh", maxHeight: '80vh', "overflowY": 'scroll', padding: 0 }}>
                        <iframe className='invoiceIframe' width="100%" style={{minHeight: "80vh"}} src={`${baseUrl}inventory/order/${order.safetyToken}/`} ></iframe>
                    </Modal.Body>
                </Modal>
            }
            <Card className='shadow-lg p-4 ms-4 border-none border-15 mt-2'>
                <div className='d-flex justify-content-between'>
                    <p className='my-0 mx-1 order-id-width'>{order.id}</p>
                    <p className='my-0 mx-1 order-id-width'>{moment(order.created_at).format("DD/MM/YYYY")}</p>
                    <p className='my-0 mx-1 order-id-width'>{moment(order.created_at).format("hh:mm a")}</p>
                    <p className='my-0 mx-1 table-no-width'>{order.qr_name}</p>
                    <p className='my-0 mx-1 customer-name-width'>{order.customer_name ? order.customer_name : 'Unknown'}</p>
                    <div className='d-flex actions-width justify-content-end'>
                        <span className={`badge d-flex align-items-center text-center bg-${order.order_status == 2 ? 'success' : order.order_status == 3 ? 'danger' : 'primary'} btn-sm my-0 mx-1`}>{order.order_status == 2 ? 'Completed' : order.order_status == 3 ? 'Canceled' : 'New'}</span>
                        <span>|</span>
                        <button onClick={() => { setShowBill(true); setShowBill2(true) }} className='btn btn-primary btn-sm my-0 mx-1'>View</button>
                        {/* <a href={`${baseUrl}inventory/order/${order.safetyToken}/`} target='blank' className='btn btn-primary btn-sm my-0 mx-1'>View</a> */}
                        {order.order_status == 1 ? <>
                            <button className='btn btn-success btn-sm my-0 mx-1' onClick={() => onCompleteOrder(order.id)}>Complete</button>
                            <button className='btn btn-danger btn-sm my-0 mx-1' onClick={() => setCancelId(order.id)}>Cancel</button>
                        </> : <>
                            <button className='btn btn-danger btn-sm my-0 mx-1' onClick={() => setUndoId(order.id)}>Undo</button>
                        </>}
                    </div>
                </div>
                <hr className='my-2' />
                <div className='d-flex justify-content-between'>
                    <h6 className='my-0 mx-1 order-id-width'></h6>
                    <div className='w-100'>
                        <div className='d-flex justify-content-between w-100'>
                            <h6 className='my-0 mx-1 table-no-width'>Food Item(s)</h6>
                            <h6 className='my-0 mx-1 quantity-width'>Quantity</h6>
                            <h6 className='my-0 mx-1 customer-name-width text-end'>Price</h6>
                        </div>
                        <hr className='my-2' />

                        {order.products.map(prod =>
                            <div className='d-flex justify-content-between w-100'>
                                <h6 className='my-0 mx-1 table-no-width fw-normal'>{prod.name}</h6>
                                <h6 className='my-0 mx-1 quantity-width text-end fw-normal'>{prod.quantity}</h6>
                                <h6 className='my-0 mx-1 customer-name-width text-end fw-normal'>₹{(prod.price_in_paisa / 100).toFixed(2)}</h6>
                            </div>
                        )}

                        <hr className='my-2' />
                        <div className='d-flex justify-content-between w-100'>
                            <h6 className='my-0 mx-1 table-no-width'></h6>
                            <h6 className='my-0 mx-1 quantity-width text-end'>Total: </h6>
                            <h6 className='my-0 mx-1 customer-name-width text-end'>₹{(order.total_price_in_paisa / 100).toFixed(2)}</h6>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default OrderCard
