import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap';
import toast from 'react-hot-toast';
import moment from 'moment';

function OrderFilterBox({ onclose, filters, setFilters }) {

    const [filter, setFilter] = useState({...filters});

    const [showBox, setShowBox] = useState(true);
    const onCloseCanvas = () => {
        setShowBox(false);
        setTimeout(() => {
            onclose();
        }, 400);
    }

    const onClickApply = () => {
        if(moment(filter.startDate)>=moment(filter.endDate)){
            toast.error("Interval is invalid.");
            return;
        }
        setFilters(filter);
        onCloseCanvas();
    }

    return (
        <Offcanvas show={showBox} className="" placement="end" onHide={onCloseCanvas} >
            <Offcanvas.Header closeButton className=''>
                <Offcanvas.Title>Filter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className=''>
                <div className="form-group mb-2">
                    <label className="" htmlFor="filtercompleted">Status</label>
                    <select className="form-control" value={filter.order_status} onChange={val => setFilter(prev => ({ ...prev, "order_status": val.target.value }))} id="filtercompleted">
                        <option value="">All</option>
                        <option value="1">New</option>
                        <option value="2">Complted</option>
                        <option value="3">Canceled</option>
                    </select>
                </div>
                <div className='d-flex w-100 justify-content-between'>
                    <div className="form-group mb-2">
                        <label className="">From</label>
                        <input
                            type='date'
                            style={{ width: '180px' }}
                            className="form-control"
                            placeholder="DD/MM/YYYY"
                            value={filter.startDate}
                            onChange={e => setFilter(prev => ({ ...prev, startDate: e.target.value }))}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label className="">To</label>
                        <input
                            type='date'
                            style={{ width: '180px' }}
                            className="form-control"
                            placeholder="DD/MM/YYYY"
                            value={filter.endDate}
                            onChange={e => setFilter(prev => ({ ...prev, endDate: e.target.value }))}
                        />
                    </div>
                </div>
                <button onClick={onClickApply} className='btn btn-success w-100 mt-3'>Apply</button>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default OrderFilterBox
