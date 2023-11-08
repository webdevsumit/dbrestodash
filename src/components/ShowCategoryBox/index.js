import React, { useState } from 'react'
import { Card, Offcanvas } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { addNewCategoryAPI, deleteCategoryByIdAPI } from '../../apis/common';

function ShowCategoryBox({ onclose, categories, updateCategoryList}) {

    const [catText, setCatText] = useState("");
    const [showBox, setShowBox] = useState(true);
    const onCloseCanvas = () => {
        setShowBox(false);
        setTimeout(() => {
            onclose();
        }, 400);
    }

    const onAddNewCat = async (e) => {
        e.preventDefault();
        if(!catText){
            toast.error("Please provide name.");
            return;
        }
        await addNewCategoryAPI({"category": catText}).then(res=>{
            if(res.data.status==="success"){
                updateCategoryList(res.data.data);
                setCatText("");
                toast.success("Category added.");
            }
        }).catch(err=>toast.error(err.message));
    }

    const onDeleteCategory = async (id) => {
        await deleteCategoryByIdAPI({id}).then(res=>{
            if(res.data.status==="success"){
                updateCategoryList({id}, true);
                toast.success("Category deleted.");
            }
        }).catch(err=>toast.error(err.message));
    }

    return (
        <Offcanvas show={showBox} placement="end" onHide={onCloseCanvas} >
            <Offcanvas.Header closeButton className=''>
                <Offcanvas.Title>Categories</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {!categories.length &&
                    <Card className='settings-card p-1 text-center'>
                        No category added yet.
                    </Card>
                }
                {
                    categories.map(cat =>
                        <Card className='settings-card py-2 px-3 mb-1 w-100 flex-row d-flex justify-content-between'>
                            {cat.category}
                            <img onClick={()=>onDeleteCategory(cat.id)} className='cursor-pointer' src='/assets/svgs/deleteRed.svg' width="26px" alt='delete' />
                        </Card>
                    )
                }
            </Offcanvas.Body>
            <hr className='m-0' />
            <form class="form-group offcanvas-footer d-flex justify-content-between" onSubmit={onAddNewCat}>
                <input className='form-control w-75 m-1' placeholder='Enter new category here' value={catText} onChange={e => setCatText(e.target.value)} />
                <button type='submit' className='btn btn-success btn-min-width m-1'>Add</button>
            </form>
        </Offcanvas>
    )
}

export default ShowCategoryBox
