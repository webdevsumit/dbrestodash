import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createOrderFromMenuAPI, fetchMenuCartDataAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import { Card, Offcanvas } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setItemsInCart } from '../../redux/navbar';
import { isMobile } from 'react-device-detect';
import InvoiceBox from '../../components/InvoiceBox';
// import MenuDesc from '../../components/MenuDesc';


function MenuCart() {

    const { menuId, tableNo } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [cartData, setCartData] = useState(null);
    const [baseImageUrl, setBaseImageUrl] = useState("");
    // const [showDescOf, setShowDescOf] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [payOnline, setPayOnline] = useState(false);
    const [upiAddr, setUpiAddr] = useState("");
    const [creatingOrder, setCreatingOrder] = useState(false);
    const [invoiceUrl, setInvoiceUrl] = useState("");
    const [olderBills, setOlderBills] = useState([]);

    const [localShow, setLocalShow] = useState(true);
    const onLocaLHide = () => {
        setLocalShow(false);
        setTimeout(() => {
            navigate(`/menu/${menuId}/${tableNo}/`);
        }, 400);
    }

    const fetchData = async (ids) => {
        if (!menuId) {
            toast.error("Please check URL.");
            return;
        }
        await fetchMenuCartDataAPI({ "token": menuId, ids, tableNo }).then(res => {
            if (res.data.status === "success") {
                setPayOnline(res.data.payOnline);
                setProducts(res.data.data);
                dispatch(setItemsInCart(res.data.data.length));
                let totalAmt = 0;
                res.data.data.forEach((prod) => {
                    let product = cartData.filter(prodId => prodId.id == prod.id)[0];
                    totalAmt += (prod.price_in_paisa * (!!product ? product.quantity : 0));
                });
                setTotalAmount(totalAmt);
                setBaseImageUrl(res.data.baseUrl);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message))
    }

    const fetchAndSet = () => {
        let cart = localStorage.getItem('cart');
        if (cart) {
            let cartData = JSON.parse(cart);
            if (!!cartData[menuId] && cartData[menuId].length) {
                setCartData(cartData[menuId]);
            }
        }
    }

    useEffect(() => {
        fetchAndSet();
        let olderBillsFromLS = localStorage.getItem("olderBills");
        if(!!olderBillsFromLS){
            olderBillsFromLS = JSON.parse(olderBillsFromLS);
            if(!!olderBillsFromLS && olderBillsFromLS.length>0){
                setOlderBills(olderBillsFromLS);
            }
        }
    }, []);

    useEffect(() => {
        if (!!cartData) {
            fetchData(cartData.map(prod => prod.id).join(","));
        }
    }, [cartData])

    const onClickAdd = (id) => {
        let cart = localStorage.getItem('cart');
        localStorage.removeItem("cart");
        if (!!cart) {
            let cartData = JSON.parse(cart);
            if (!!cartData[menuId]) {
                let product = cartData[menuId].filter(prodId => prodId.id == id)[0];
                cartData[menuId] = [...cartData[menuId].filter(prodId => prodId.id != id), { id, "quantity": 1 + product.quantity }];
                setCartData(cartData[menuId]);
            }
            localStorage.setItem("cart", JSON.stringify(cartData));
        }
    }

    const onClickDelete = (id) => {
        let cart = localStorage.getItem('cart');
        localStorage.removeItem("cart");
        if (!!cart) {
            let cartData = JSON.parse(cart);
            if (!!cartData[menuId]) {
                cartData[menuId] = cartData[menuId].filter(prodId => prodId.id != id);
                setCartData(cartData[menuId]);
            }
            localStorage.setItem("cart", JSON.stringify(cartData));
        }
    }

    const onClickDecrease = (id) => {
        let cart = localStorage.getItem('cart');
        localStorage.removeItem("cart");
        if (!!cart) {
            let cartData = JSON.parse(cart);
            if (!!cartData[menuId]) {
                let product = cartData[menuId].filter(prodId => prodId.id == id)[0];
                if (product.quantity > 1) {
                    cartData[menuId] = [...cartData[menuId].filter(prodId => prodId.id != id), { "id": product.id, "quantity": product.quantity - 1 }];
                } else {
                    cartData[menuId] = cartData[menuId].filter(prodId => prodId.id != id);
                }
                setCartData(cartData[menuId]);
            }
            localStorage.setItem("cart", JSON.stringify(cartData));
        }
    }

    const resetCart = () => {
        let cart = localStorage.getItem('cart');
        localStorage.removeItem("cart");
        if (!!cart) {
            let cartData = JSON.parse(cart);
            cartData[menuId] = [];
            dispatch(setItemsInCart([0]));
            setCartData([]);
            localStorage.setItem("cart", JSON.stringify(cartData));
        }
    }

    const continueOnLineProcessOnOrder = async (res) => {
        let paymentLink = `upi://pay?pa=${res.data.upi_address}&am=${(totalAmount / 100).toFixed(2)}&mam=1&cu=INR&pn=OrderId-${res.data.orderId}`;
        const waitLoader = toast.loading("Waiting for payment...", { duration: 20000 });
        // Open payment URL
        try {
            window.open(paymentLink);
        } catch (err) {
            toast.error(err.message);
        }

        // This event listener will be triggered when the page is redirected after the payment
        window.addEventListener('load', () => {
            // Open the invoice URL
            window.location.replace(res.data.url);
            toast.dismiss(waitLoader);
        });
    }

    const onCreateOrder = async () => {
        if (creatingOrder || !products.length) {
            toast("Please wait.")
            return;
        }
        // if(!isMobile){
        //     toast.error("It just works on mobile phones.")
        //     return;
        // }
        const payload = {
            "token": menuId,
            "tableName": tableNo,
            "products": cartData.map(prod => ({ "id": prod.id, "quantity": prod.quantity })),
            "name": "",
            "phone": "",
        }
        setCreatingOrder(true);
        const loader = toast.loading("Creating Order...", { duration: 20000 })
        await createOrderFromMenuAPI(payload).then(res => {
            if (res.data.status === "success") {
                resetCart();
                setUpiAddr(res.data.upi_address);
                setInvoiceUrl(res.data.url);
                if (!!loader) {
                    toast.dismiss(loader);
                }
                if (payOnline) {
                    // continueOnLineProcessOnOrder(res);
                }
            }
        }).catch(err => toast.error(err.message));
        setCreatingOrder(false);
        if (!!loader) {
            toast.dismiss(loader)
        }
    }

    return (

        <Offcanvas show={localShow} placement='bottom' className="cart-canvas" onHide={onLocaLHide}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='cart-body'>
                {!!invoiceUrl && <InvoiceBox url={invoiceUrl} setInvoiceUrl={setInvoiceUrl} />}
                {/* {!!showDescOf && <MenuDesc onHide={() => setShowDescOf(null)} productId={showDescOf} onClickAdd={onClickAdd} />} */}
                <div className='Menu-cart-outer'>
                    <div className='Menu-cart-main'>
                        <main>
                            <div className='d-flex food-card-box'>
                                {products.map((prod, index) =>
                                    <Card key={index} className='shadow border-none d-flex justify-content-end food-card m-2' style={{ backgroundImage: !!prod.image ? `url(${baseImageUrl.substring(0, baseImageUrl.length - 1)}${prod.image})` : "url('/assets/svgs/food.svg')", backgroundSize: !!prod.image ? 'cover' : "contain" }}>
                                        <div className='h-100 bg-curtom-for-food bg-curtom-for-food1'>
                                            <h6>{prod.name}</h6>
                                            <div className='w-100 bg-curtom-for-food d-flex w-100 button-badge-box-cart'>
                                                <span className='btn btn-sm btn-success m-1 mx-0 p-0 w-100'>₹{(prod.price_in_paisa / 100).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className='w-100 bg-curtom-for-food d-flex w-100 button-badge-box'>
                                            <span className='btn-white text-danger fw-bolder m-1 py-0' onClick={() => onClickDelete(prod.id)}><img src='/assets/svgs/deleteRed.svg' alt='delete' width={25} /></span>
                                            <span className='btn-white text-danger fw-bolder m-1 py-0' onClick={() => onClickDecrease(prod.id)}>-</span>
                                            <span className='btn-white text-dark fw-bolder m-1 py-0'>{cartData.filter(cProd => cProd.id == prod.id)[0]?.quantity}</span>
                                            <span className='btn-white text-success fw-bolder m-1 py-0' onClick={() => onClickAdd(prod.id)}>+</span>
                                        </div>
                                    </Card>
                                )}
                                {
                                    (!cartData || cartData.length === 0) &&
                                    <>
                                        <p className='w-100 text-center mt-4 mb-0'>There is no item in the cart.</p>
                                    </>
                                }
                                {
                                    !!olderBills.length &&
                                    <p className='w-100 text-center h6 mt-4 mb-0'>
                                        <Link to="/menu/bills">Check Older Orders</Link>
                                    </p>
                                }
                                {/* <Link className='w-100 text-center mt-0' to="/menu/ASFD">Go Back</Link> */}
                                <div className='Menu-cart-extra-div'></div>
                            </div>
                        </main>
                    </div>
                </div>
            </Offcanvas.Body>
            <footer className='Menu-cart-main-nav d-flex p-auto shadow-sm justify-content-between p-2 align-items-center'>
                <div className='fw-bold'>₹{(totalAmount / 100).toFixed(2)}</div>
                <span className='btn btn-success' onClick={onCreateOrder}>{payOnline ? "Order Now" : "Order Now"}</span>
            </footer>
        </Offcanvas>
    )
}

export default MenuCart

// upi://pay?pn=with%20DBResto.com%20&pa=9584004790@ybl&cu=INR&am=1&url=https%3A%2F%2Fdash.dbresto.com%2Fcompletedamount
// upi://pay?pa=abc@upi&pn=payeeName&tr=1234&tn=Pay%20to%20payeeName&am=1&mam=1&cu=INR&url=https%3A%2F%2Fdash.dbresto.com%2Fcompletedamount
// https://stackoverflow.com/a/64724053/13310509
