import React from 'react'
import './style.css';
import { Card } from 'react-bootstrap';

function Topbar() {
    return (
        <div className='Topbar-main'>
            <Card className='shadow p-2 border-none Topbar-main-btn' >
                Create Order
            </Card>
            <Card className='shadow p-2 border-none topbar-profile' >
                SD
            </Card>
        </div>
    )
}

export default Topbar
