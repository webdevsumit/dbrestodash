import React, { useEffect, useState } from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { addNewProductAPI, changeProductByIdAPI, changeProductStatusByIdAPI, fetchCategoriesAPI, fetchProductsAPI, getRawMaterialsAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import ShowCategoryBox from '../../components/ShowCategoryBox';
import ImageModel from '../../components/ImageModel';
import DescModal from '../../components/DescModal';
import ShowEditProdBox from '../../components/ShowEditProdBox';

function Inventory() {

  const productTemplate = {
    "name": "",
    "category": "",
    "price_in_paisa": "",
    "discount_percentage": "",
    "apply_discount": false,
    "rawMaterials": []
  }

  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showCategoryBox, setShowCategoryBox] = useState(false);
  const [productToAddImages, setProductToAddImages] = useState(null);
  const [productToAddDesc, setProductToAddDesc] = useState(null);
  const [editProd, setEditProd] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [rawmaterials, setRawMaterials] = useState([]);

  const fetchData = async () => {
    await fetchProductsAPI().then(res => {
      if (res.data.status === "success") {
        setData(res.data.data.length > 0 ? res.data.data : [{ ...productTemplate }]);
      } else toast.error(res.data.message)
    }).catch(err => toast.error(err.message))
  }

  const fetchCategories = async () => {
    await fetchCategoriesAPI().then(res => {
      if (res.data.status === "success") {
        setCategories(res.data.data);
      } else toast.error(res.data.message)
    }).catch(err => toast.error(err.message))
  }

  const fetchRawMaterials = async () => {
    await getRawMaterialsAPI().then(res => {
      if (res.data.status === "success") {
        setRawMaterials(res.data.data);
      } else toast.error(res.data.message)
    }).catch(err => toast.error(err.message))
  }

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchRawMaterials();
  }, []);

  const updateCategoryList = (cat, del = false) => {
    if (del) {
      setCategories(prev => [...prev.filter(categor => categor.id !== cat.id)]);
    } else {
      setCategories(prev => [...prev, { ...cat }]);
    }
  }

  const onClickDisableEnable = async (id, is_diabled = true) => {
    const savingToast = toast.loading("Saving...", { duration: 20000, id: "prod_status_toggler" });
    await changeProductStatusByIdAPI({ "id": id, "is_diabled": is_diabled }).then(res => {
      if (res.data.status === "success") {
        setData(prev => prev.map(prod => (prod.id === id ? res.data.data : prod)));
        toast.success((is_diabled ? "Disabled successfully." : "enabled successfully."));
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => toast.error(err.message));
    toast.dismiss(savingToast);
  }

  const onAddNewProduct = async (onCloseCanvas) => {
    const savingToast = toast.loading("Saving...", { duration: 20000 });
    await addNewProductAPI({ ...editProd }).then(res => {
      if (res.data.status === "success") {
        setData(prev => [res.data.data, prev]);
        onCloseCanvas();
        toast.success("Added Successfully.");
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => toast.error(err.message));
    toast.dismiss(savingToast);
  }

  const onSaveProduct = async (onCloseCanvas) => {
    const savingToast = toast.loading("Saving...", { duration: 20000 });
    await changeProductByIdAPI({ ...editProd }).then(res => {
      if (res.data.status === "success") {
        setData(prev => prev.map(prod => prod.id === editProd.id ? res.data.data : prod));
        onCloseCanvas();
        toast.success("Saved Successfully.");
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => toast.error(err.message));
    toast.dismiss(savingToast);
  }

  const onAddOrUpdate = (onCloseCanvas) => {
    if (isSaving) {
      return;
    }
    setIsSaving(true)
    if (!editProd.id) {
      onAddNewProduct(onCloseCanvas);
    } else {
      onSaveProduct(onCloseCanvas);
    }
    setIsSaving(false)
  }

  if (!data)
    return <Loader />

  return (
    <>
      {showCategoryBox && <ShowCategoryBox onclose={() => setShowCategoryBox(false)} categories={categories} updateCategoryList={updateCategoryList} />}
      <ImageModel product={productToAddImages} show={!!productToAddImages} onHide={() => setProductToAddImages(null)} />
      {!!productToAddDesc && <DescModal product={productToAddDesc} show={!!productToAddDesc} onHide={() => setProductToAddDesc(null)} />}
      {!!editProd && <ShowEditProdBox onclose={() => setEditProd(null)} editProd={editProd} setEditProd={setEditProd} categories={categories} onAddOrUpdate={onAddOrUpdate} rawmaterials={rawmaterials} />}
      <Card className='settings-card shadow-lg p-4 ms-4 border-none border-15'>
        <div className='d-flex'>
          <h3 className='h3'>Inventory</h3>
          <div>
            <button onClick={() => setEditProd({ ...productTemplate })} className='btn btn-primary btn-sm ms-4'>Add New</button>
            <button onClick={() => setShowCategoryBox(true)} className='btn btn-primary btn-sm ms-4'>Categories</button>
          </div>
        </div>
        <hr className='m-0' />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Off(%)</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((prod, ind) =>
              <tr key={ind}>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>{(prod.price_in_paisa / 100).toFixed(2)}</td>
                <td>{!prod.apply_discount ? "--" : prod.discount_percentage}</td>
                <td>
                  <div class="form-check form-switch">
                    <input className="form-check-input shadow-none" onChange={e => onClickDisableEnable(prod.id, !prod.is_diabled)} checked={!prod.is_diabled} type="checkbox" role="switch" />
                  </div>
                </td>
                <td>
                  <button type="button" disabled={prod.is_diabled} onClick={() => setEditProd(prod)} className="btn btn-success btn-sm m-1 p-1"><img width={20} src='/assets/svgs/editWhite.svg' alt='edit' /></button>
                  <button type="button" disabled={prod.is_diabled} onClick={() => setProductToAddImages(prod)} className="btn btn-success btn-sm m-1 p-1"><img width={20} src='/assets/svgs/editImage.svg' alt='edit images' /></button>
                  <button type="button" disabled={prod.is_diabled} onClick={() => setProductToAddDesc(prod)} className="btn btn-success btn-sm m-1 p-1"><img width={20} src='/assets/svgs/editDesc.svg' alt='Edit Desc' /></button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </>
  )
}

export default Inventory
