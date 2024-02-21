import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap';

function ShowQuantityDetailedBox({ onclose, quantityDetails, onAddQuantity }) {

    const [showBox, setShowBox] = useState(true);
    const onCloseCanvas = () => {
        setShowBox(false);
        setTimeout(() => {
            onclose();
        }, 400);
    }

    return (
        <Offcanvas show={showBox} placement="end" onHide={onCloseCanvas} >
            <Offcanvas.Header closeButton className=''>
                <Offcanvas.Title>{quantityDetails.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShowQuantityDetailedBox
