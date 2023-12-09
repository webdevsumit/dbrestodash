import React, { useState } from 'react'
import './style.css';
import { Card } from 'react-bootstrap';
import CreateOrder from '../CreateOrder';

function Topbar() {

    const [createOrder, setCreateOrder] = useState(false);

    return (
        <>
            <CreateOrder show={createOrder} onHide={() => setCreateOrder(false)} />
            <div className='Topbar-main'>
                <Card className='shadow p-2 border-none Topbar-main-btn' onClick={() => setCreateOrder(true)} >
                    Create Order
                </Card>
                <Card className='shadow-lg p-2 border-none topbar-profile cursor-pointer' onClick={()=>window.open("tel:917999004229", "blank")} >
                    <img width={30} src='/assets/svgs/phone.svg' alt='Phone' />
                    {/* {localStorage.getItem("username")?.length === 12 ? localStorage.getItem("username")?.substring(2, 4) : localStorage.getItem("username")?.toUpperCase()?.substring(0, 2)} */}
                </Card>
            </div>
        </>
    )
}

export default Topbar
