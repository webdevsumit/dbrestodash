import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap';
import toast from 'react-hot-toast';

function ShowEditProdBox({ onclose, editProd, setEditProd, categories, onAddOrUpdate, rawmaterials }) {

    const [showBox, setShowBox] = useState(true);
    const onCloseCanvas = () => {
        setShowBox(false);
        setTimeout(() => {
            onclose();
        }, 400);
    }

    const onClickSave = () => {
        for(let i=0; i<editProd.rawMaterials?.length; i++){
            if(!editProd.rawMaterials[i].ref?.id || !editProd.rawMaterials[i].quantity ){
                toast.error("Please provide values in empty fields.");
                return;
            }
        }
        if(!editProd.category){
            toast.error("Please select category.");
            return;
        }
        if(!editProd.name){
            toast.error("Please provide name.");
            return;
        }
        if(!editProd.price_in_paisa){
            toast.error("Please provide price.");
            return;
        }
        onAddOrUpdate(onCloseCanvas);
    }

    return (
        <Offcanvas show={showBox} placement="end" onHide={onCloseCanvas} >
            <Offcanvas.Header closeButton className=''>
                <Offcanvas.Title>{!!editProd.id ? "Edit" : "Add"} Product</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <form className='mx-1' onSubmit={e => { e.preventDefault(); }}>
                    <div className="form-group mb-2">
                        <label>Name</label>
                        <input
                            className="form-control "
                            placeholder="Pasta"
                            value={editProd.name}
                            onChange={e => setEditProd(prev => ({ ...prev, "name": e.target.value }))}
                        />
                    </div>
                    <div className=' mb-2'>
                        <label>Category {!categories.length && <>(First, Add Units.)</>}</label>
                        <select className="form-control" value={editProd.category} onChange={(e) => setEditProd(prev => ({ ...prev, "category": e.target.value }))}>
                            <option value="">Select Category</option>
                            {categories.map(cat =>
                                <option key={cat.id} value={cat.category}>{cat.category}</option>
                            )}
                        </select>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <label>Price (in Paisa)</label>
                            <input
                                type="number"
                                className="form-control "
                                placeholder="5000"
                                value={editProd.price_in_paisa}
                                onChange={e => setEditProd(prev => ({ ...prev, "price_in_paisa": e.target.value }))}
                            />
                        </div>
                        <div className='col-6'>
                            <label>Discount (%)</label>
                            <input
                                type="number"
                                className="form-control "
                                placeholder="5"
                                value={editProd.discount_percentage}
                                onChange={e => setEditProd(prev => ({ ...prev, "discount_percentage": e.target.value }))}
                            />
                        </div>
                    </div>
                    <div class="form-check form-switch mt-2">
                        <label>Apply Discount</label>
                        <input
                            className="form-check-input shadow-none"
                            style={{ marginTop: '6px' }}
                            type="checkbox"
                            role="switch"
                            checked={editProd.apply_discount}
                            onChange={e => setEditProd(prev => ({ ...prev, "apply_discount": e.target.checked }))}
                        />
                    </div>
                    <hr />
                    <h6>Raw Materials Used</h6>
                    {editProd.rawMaterials?.map((mat, ind) =>
                        <div key={ind} className='row mb-2'>
                            <div className='col-7'>
                                <label>Raw Material {!rawmaterials.length && <>(First, Add Raw Material.)</>}</label>
                                <select className="form-control" value={mat.ref?.id} onChange={(e) => setEditProd(prev => ({ ...prev, "rawMaterials": prev.rawMaterials.map((rm, index) => ind === index ? ({ ...rm, "ref": { "id": e.target.value } }) : rm) }))}>
                                    <option value="">--Select--</option>
                                    {rawmaterials.map(rawMat =>
                                        <option key={rawMat.id} value={rawMat.id}>{rawMat.name} ({rawMat.unit})</option>
                                    )}
                                </select>
                            </div>
                            <div className='col-4'>
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    className="form-control "
                                    placeholder="5"
                                    value={mat.quantity}
                                    onChange={(e) => setEditProd(prev => ({ ...prev, "rawMaterials": prev.rawMaterials.map((rm, index) => ind === index ? ({ ...rm, "quantity": e.target.value }) : rm) }))}
                                />
                            </div>
                            <div className='col-1 d-flex justify-content-center align-items-center'>
                                <span className='cursor-pointer pt-4' onClick={() => setEditProd(prev => ({ ...prev, "rawMaterials": prev.rawMaterials.filter((rm, index) => ind !== index) }))} >&#10060;</span>
                            </div>
                        </div>
                    )}
                    <button className='btn btn-primary btn-sm me-1 my-1' onClick={() => setEditProd(prev => ({ ...prev, "rawMaterials": prev.rawMaterials ? [...prev.rawMaterials, { "ref": { "id": "" }, "quantity": "" }] : [{ "id": "", "quantity": "" }] }))} >Add</button>
                </form>
            </Offcanvas.Body>
            <hr className='m-0' />
            <div className="offcanvas-footer d-flex justify-content-end">
                <button className='btn btn-secondary btn-min-width m-1' onClick={onCloseCanvas} >Cancel</button>
                <button className='btn btn-success btn-min-width m-1' onClick={onClickSave} >{!!editProd.id ? "Update" : "Add"}</button>
            </div>
        </Offcanvas>
    )
}

export default ShowEditProdBox
