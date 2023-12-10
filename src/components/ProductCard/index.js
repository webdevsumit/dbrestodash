import React, { useEffect, useState } from 'react'
import { addNewProductAPI, changeProductByIdAPI, changeProductStatusByIdAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import './style.css';

function ProductCard({ index, product, newToAdd, arrLen, onUpdateData, onDeleteCard, categoryOptions, setProductToAddImages, setProductToAddDesc }) {

    const returnDefaultData = () => {
        return { ...product }
    }

    const [data, setData] = useState(returnDefaultData());
    const [newProduct, setNewProduct] = useState(newToAdd);
    const [isSaving, setIsSaving] = useState(false);

    const showDiscardButton = () => {
        return (
            data.category !== product.category
            || data.name !== product.name
            || data.price_in_paisa !== product.price_in_paisa
        )
    }

    const onClickDisableEnable = async (is_diabled = true) => {
        const savingToast = toast.loading("Saving...", {duration: 20000});
        await changeProductStatusByIdAPI({ "id": data.id, "is_diabled": is_diabled }).then(res => {
            if (res.data.status === "success") {
                setData(res.data.data);
                onUpdateData(res.data.data, index, res.data.data.id);
                toast.success("Saved Successfully.")
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
        toast.dismiss(savingToast);
    }

    const onAddNewProduct = async () => {
        const payload = {
            "category": data.category,
            "name": data.name,
            "price_in_paisa": data.price_in_paisa
        }
        const savingToast = toast.loading("Saving...", {duration: 20000});
        await addNewProductAPI(payload).then(res => {
            if (res.data.status === "success") {
                setData(res.data.data);
                setNewProduct(false);
                onUpdateData(res.data.data, index, res.data.data.id)
                toast.success("Added Successfully.")
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
        toast.dismiss(savingToast);
    }

    const onSaveProduct = async () => {
        const payload = {
            "id": data.id,
            "category": data.category,
            "name": data.name,
            "price_in_paisa": data.price_in_paisa
        }
        const savingToast = toast.loading("Saving...", {duration: 20000});
        await changeProductByIdAPI(payload).then(res => {
            if (res.data.status === "success") {
                setData(res.data.data);
                onUpdateData(res.data.data, index, res.data.data.id)
                toast.success("Saved Successfully.")
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
        toast.dismiss(savingToast);
    }

    const onSubmitForm = async () => {
        if (isSaving) {
            return;
        }
        setIsSaving(true)
        if (newProduct) {
            await onAddNewProduct();
        } else {
            onSaveProduct();
        }
        setIsSaving(false)
    }


    return (
        <div className={`card product-card p-2 m-2 ${newProduct ? "border-primary" : "border-secondary"}`}>
            <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onSubmitForm(); }}>

                <div className="form-group my-2">
                    <label htmlFor={"name" + index}>Name</label>
                    <input
                        className="form-control "
                        id={"name" + index}
                        placeholder="Name"
                        value={data.name}
                        onChange={e => setData(prev => ({ ...prev, "name": e.target.value }))}
                    />
                </div>
                <div className="form-group my-2">
                    <label htmlFor={"category" + index}>Category {!categoryOptions.length && <>(First, add category.)</>}</label>
                    <select className="form-control" value={data.category} onChange={(e) => setData(prev => ({ ...prev, "category": e.target.value }))} id={"category" + index}>
                        <option value="">Select Category</option>
                        {categoryOptions.map(cat =>
                            <option key={cat.id} value={cat.category}>{cat.category}</option>
                        )}
                    </select>
                </div>
                <div className="form-group my-2 row">
                    <div className='col-6'>
                        <label htmlFor={"category" + index}>Price (in Paisa)</label>
                        <input
                            type="number"
                            className="form-control "
                            id={"price" + index}
                            placeholder="5000"
                            value={data.price_in_paisa}
                            onChange={e => setData(prev => ({ ...prev, "price_in_paisa": e.target.value }))}
                        />
                    </div>
                    <div className='col-6'>
                        <label htmlFor={"category" + index}>Images</label><br />
                        <button type='button' disabled={newProduct} title={newProduct ? "First save that." : "Images"} onClick={() => setProductToAddImages(data)} className="btn btn-secondary btn-min-width w-100 m-0">Edit Images</button>
                    </div>
                </div>

                {
                    !newProduct &&
                    <>
                        <small className="form-text mb-4">Status: <span className={`text-${data.is_diabled ? 'danger' : "success"} subaccountCardStatus`}>{data.is_diabled ? "Disabled" : 'Enabled'}</span></small>
                        <br />
                    </>
                }
                {!newProduct &&
                    <button type="button" className="btn btn-success btn-min-width m-1" onClick={() => setProductToAddDesc(data)}>Edit Description</button>
                }
                <button type="submit" className="btn btn-success btn-min-width m-1">{isSaving ? "Saving..." : "Save"}</button>
                {
                    (((index !== 0 || arrLen > 1) && newProduct) || (!newProduct && showDiscardButton())) &&
                    <button type="button" onClick={() => {
                        if (newProduct) onDeleteCard(index);
                        else setData(returnDefaultData())
                    }} className="btn btn-secondary btn-min-width m-1">{newProduct ? 'Cancel' : 'Discard'}</button>
                }

                {
                    (!newProduct) &&
                    <button type="button" onClick={() => onClickDisableEnable(data.is_diabled ? false : true)} className={`btn btn-${data.is_diabled ? "success" : 'danger'} btn-min-width m-1`}>{data.is_diabled ? 'Enable' : 'Disable'}</button>
                }
            </form>
        </div>
    )
}

export default ProductCard
