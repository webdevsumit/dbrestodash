import React, { useState } from 'react'
import './style.css';
import { Card } from 'react-bootstrap';
import CreateOrder from '../CreateOrder';

function Topbar() {

    const [createOrder, setCreateOrder] = useState(false);

    return (
        <>
            <CreateOrder show={createOrder} onHide={()=>setCreateOrder(false)} />
            <div className='Topbar-main'>
                <Card className='shadow p-2 border-none Topbar-main-btn' onClick={()=>setCreateOrder(true)} >
                    Create Order
                </Card>
                <Card className='shadow p-2 border-none topbar-profile' >
                    SD
                </Card>
            </div>
        </>
    )
}

export default Topbar
