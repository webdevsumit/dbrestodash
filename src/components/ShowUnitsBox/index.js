import React, { useState } from 'react'
import { Card, Offcanvas } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { addNewCategoryAPI, addNewUnitAPI, deleteCategoryByIdAPI, deleteUnitByIdAPI } from '../../apis/common';

function ShowUnitsBox({ onclose, units, setUnits }) {

    const [unitText, setUnitText] = useState("");
    const [showBox, setShowBox] = useState(true);
    const onCloseCanvas = () => {
        setShowBox(false);
        setTimeout(() => {
            onclose();
        }, 400);
    }

    const onAddNewUnit = async (e) => {
        e.preventDefault();
        if (!unitText) {
            toast.error("Please provide name.");
            return;
        }
        await addNewUnitAPI({ "unit": unitText }).then(res => {
            if (res.data.status === "success") {
                setUnits(prev=>[...prev, res.data.data]);
                setUnitText("");
                toast.success("Unit added.");
            }
        }).catch(err => toast.error(err.message));
    }

    const onDeleteUnit = async (id) => {
        await deleteUnitByIdAPI({ id }).then(res => {
            if (res.data.status === "success") {
                setUnits(prev=>prev.filter(u=>u.id!==id));
                toast.success("Unit deleted.");
            }
        }).catch(err => toast.error(err.message));
    }

    return (
        <Offcanvas show={showBox} placement="end" onHide={onCloseCanvas} >
            <Offcanvas.Header closeButton className=''>
                <Offcanvas.Title>units</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {!units.length &&
                    <>
                        <Card className='settings-card p-1 text-center'>
                            No unit added yet.
                        </Card>
                        <Card className='settings-card p-1 text-center mt-2'>
                            Add common units: KG, Liter, etc.
                        </Card>
                    </>
                }
                {
                    units.map((uni, index) =>
                        <Card key={index} className='settings-card py-2 px-3 mb-1 w-100 flex-row d-flex justify-content-between'>
                            {uni.unit}
                            <img onClick={() => onDeleteUnit(uni.id)} className='cursor-pointer' src='/assets/svgs/deleteRed.svg' width="26px" alt='delete' />
                        </Card>
                    )
                }
            </Offcanvas.Body>
            <hr className='m-0' />
            <form className="form-group offcanvas-footer d-flex justify-content-between" onSubmit={onAddNewUnit}>
                <input className='form-control w-75 m-1' placeholder='Enter new unit here' value={unitText} onChange={e => setUnitText(e.target.value)} />
                <button type='submit' className='btn btn-success btn-min-width m-1'>Add</button>
            </form>
        </Offcanvas>
    )
}

export default ShowUnitsBox
