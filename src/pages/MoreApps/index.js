import React from 'react'
import { Card } from 'react-bootstrap';
import "./style.css";
import { Link } from 'react-router-dom';

function MoreApps() {
    return (
        <Card className='settings-card shadow-lg p-4 ms-4 border-none border-15'>
            <div className='d-flex'>
                <h3 className='h3'>Apps</h3>
            </div>
            <hr className='m-0' />
            <div className='w-100 d-flex subaccount'>
                <Link to="/rawmaterial" className={`btn btn-primary moreapp-card p-3 m-4 cursor-pointer`}>
                    Manage Your <br />
                    Raw material
                </Link>
            </div>
        </Card>
    )
}

export default MoreApps;
