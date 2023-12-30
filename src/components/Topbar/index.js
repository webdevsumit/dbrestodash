import React, { useState } from 'react'
import './style.css';
import { Button, Card, Modal } from 'react-bootstrap';
import CreateOrder from '../CreateOrder';
import { useDispatch, useSelector } from 'react-redux';
import { getCreatingOrder, setCreatingOrder } from '../../redux/navbar';

function Topbar() {

    const creatingOrder = useSelector(getCreatingOrder);
    const dispatch = useDispatch();
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    return (
        <>
            <Modal show={showPhoneNumber} onHide={() => setShowPhoneNumber(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Call or WhatsApp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Mobile: +91 7999004229</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPhoneNumber(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <CreateOrder show={!!creatingOrder} onHide={() => dispatch(setCreatingOrder(null))} tableName={creatingOrder?.tableName} qr_id={creatingOrder?.qr_id} />
            <div className='Topbar-main'>
                <Card className='shadow p-2 border-none Topbar-main-btn' onClick={() => dispatch(setCreatingOrder({tableName: "Dashboard", qr_id: 0}))} >
                    Create Order
                </Card>
                <Card className='shadow-lg p-2 border-none topbar-profile cursor-pointer' onClick={() => setShowPhoneNumber(true)} >
                    <img width={30} src='/assets/svgs/phone.svg' alt='Phone' />
                    {/* {localStorage.getItem("username")?.length === 12 ? localStorage.getItem("username")?.substring(2, 4) : localStorage.getItem("username")?.toUpperCase()?.substring(0, 2)} */}
                </Card>
            </div>
        </>
    )
}

export default Topbar
