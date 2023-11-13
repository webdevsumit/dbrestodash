import React, { useEffect, useState } from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { fetchCategoriesAPI, fetchProductsAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import ProductCard from '../../components/ProductCard';
import ShowCategoryBox from '../../components/ShowCategoryBox';
import ImageModel from '../../components/ImageModel';
import DescModal from '../../components/DescModal';

function Inventory() {

  const productTemplate = {
    "name": "",
    "category": "",
    "price_in_paisa": "",
  }

  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showCategoryBox, setShowCategoryBox] = useState(false);
  const [productToAddImages, setProductToAddImages] = useState(null);
  const [productToAddDesc, setProductToAddDesc] = useState(null);

  const onUpdateData = (newData, index, id = null) => {
    setData(prev => prev.map((prod, ind) => {
      if ((ind === index && !id) || (ind === index && id === prod.id)) return newData;
      else return prod;
    }));
  }

  const onDeleteCard = (index) => {
    setData(prev => prev.filter((prod, ind) => (ind !== index)));
  }

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

  useEffect(() => {
    fetchData();
    fetchCategories()

  }, []);

  const updateCategoryList = (cat, del = false) => {
    if (del) {
      setCategories(prev => [...prev.filter(categor => categor.id !== cat.id)]);
    } else {
      setCategories(prev => [...prev, { ...cat }]);
    }
  }

  if (!data)
    return <Loader />

  return (
    <>
      {showCategoryBox && <ShowCategoryBox onclose={() => setShowCategoryBox(false)} categories={categories} updateCategoryList={updateCategoryList} />}
      <ImageModel product={productToAddImages} show={!!productToAddImages} onHide={() => setProductToAddImages(null)} />
      {!!productToAddDesc && <DescModal product={productToAddDesc} show={!!productToAddDesc} onHide={() => setProductToAddDesc(null)} />}
      <Card className='settings-card shadow-lg p-4 ms-4 border-none border-15'>
        <div className='d-flex'>
          <h3 className='h3'>Inventory</h3>
          <div>
            <button onClick={() => setData(prev => [{ ...productTemplate }, ...prev])} className='btn btn-primary btn-sm ms-4'>Add New</button>
            <button onClick={() => setShowCategoryBox(true)} className='btn btn-primary btn-sm ms-4'>Categories</button>
          </div>
        </div>
        <hr className='m-0' />
        <div className='w-100 d-flex subaccount'>
          {data.map((prod, index) =>
            <ProductCard key={!!prod.id ? `${prod.id}${index}` : index} index={index} newToAdd={!prod.id} arrLen={data.length} product={prod} onDeleteCard={onDeleteCard} onUpdateData={onUpdateData} categoryOptions={categories} setProductToAddImages={setProductToAddImages} setProductToAddDesc={setProductToAddDesc} />
          )}
        </div>
      </Card>
    </>
  )
}

export default Inventory
