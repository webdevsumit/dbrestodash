import React, { useEffect, useState } from 'react'
import { Offcanvas } from 'react-bootstrap';
import "./style.css"
import { fetchMenuProductDataAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import ImageGallery from "./../ImageGallery";

function MenuDesc({ onHide, productId, onClickAdd }) {

    const { menuId, tableNo } = useParams();
    const [localShow, setLocalShow] = useState(true);
    const onLocaLHide = () => {
        setLocalShow(false);
        setTimeout(() => {
            onHide();
        }, 400);
    }

    const [data, setData] = useState(null);

    const fetchProductData = async () => {
        await fetchMenuProductDataAPI({ "id": productId, "token": menuId, tableNo }).then(res => {
            if (res.data.status === "success") {
                setData(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
    }

    useEffect(() => {
        fetchProductData();
    }, [])

    return (
        <Offcanvas show={localShow} placement='bottom' className="desc-canvas" onHide={onLocaLHide}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{data?.name} {!data && <p>loading...</p>}</Offcanvas.Title>
            </Offcanvas.Header>
            {!!data &&
                <Offcanvas.Body className='h-100 descCanvasBody'>
                    <div id='image_modal_header' className='w-100 mb-4'>
                        <ImageGallery productId={data.id} productImages={!!data.images.length ? data.images : [{ "image": "/assets/svgs/food.svg" }]} />
                    </div>
                    {!!data.description && <h5>Description and Recipe</h5>}
                    {data.description}
                </Offcanvas.Body>
            }
            <hr className='m-0' />
            {!!data &&
                <div className="offcanvas-footer d-flex justify-content-between">
                    <button type='submit' className='btn btn-success btn-min-width m-1'>₹{(data.price_in_paisa / 100).toFixed(2)}</button>
                    <button type='submit' className='btn btn-success btn-min-width m-1' onClick={() => onClickAdd(data.id)}>+Add</button>
                </div>
            }
        </Offcanvas>
    )
}

export default MenuDesc
