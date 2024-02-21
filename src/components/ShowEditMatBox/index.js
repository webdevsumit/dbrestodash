import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap';

function ShowEditMatBox({ onclose, editMat, setEditMat, unitOptions, onAddOrUpdate }) {

    const [showBox, setShowBox] = useState(true);
    const onCloseCanvas = () => {
        setShowBox(false);
        setTimeout(() => {
            onclose();
        }, 400);
    }

    const onClickSave = () => {
        onAddOrUpdate(onCloseCanvas);
    }

    return (
        <Offcanvas show={showBox} placement="end" onHide={onCloseCanvas} >
            <Offcanvas.Header closeButton className=''>
                <Offcanvas.Title>{!!editMat.id ? "Edit" : "Add"} Raw Material</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <form className='' onSubmit={e => { e.preventDefault(); }}>
                    <div className="form-group my-1">
                        <label>Name</label>
                        <input
                            className="form-control "
                            placeholder="Wheat Flour"
                            value={editMat.name}
                            onChange={e => setEditMat(prev => ({ ...prev, "name": e.target.value }))}
                        />
                    </div>
                    <div className='row my-1'>
                        <div className='col-6'>
                            <label>Quantity</label>
                            <input
                                type="number"
                                className="form-control "
                                placeholder="50"
                                disabled={!!editMat.id}
                                value={editMat.quantity}
                                onChange={e => setEditMat(prev => ({ ...prev, "quantity": e.target.value }))}
                            />
                        </div>
                        <div className='col-6'>
                            <label>Unit {!unitOptions.length && <>(First, Add Units.)</>}</label>
                            <select className="form-control" value={editMat.unit} onChange={(e) => setEditMat(prev => ({ ...prev, "unit": e.target.value }))} id={"unit" + setEditMat.id}>
                                <option value="">Select Unit</option>
                                {unitOptions.map(uni =>
                                    <option key={uni.id} value={uni.unit}>{uni.unit}</option>
                                )}
                            </select>
                        </div>
                    </div>
                </form>
            </Offcanvas.Body>
            <hr className='m-0' />
            <div className="offcanvas-footer d-flex justify-content-end">
                <button className='btn btn-secondary btn-min-width m-1' onClick={onCloseCanvas} >Cancel</button>
                <button className='btn btn-success btn-min-width m-1' onClick={onClickSave} >{!!editMat.id ? "Update" : "Add"}</button>
            </div>
        </Offcanvas>
    )
}

export default ShowEditMatBox
