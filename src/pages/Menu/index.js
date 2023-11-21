import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMenuDataAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import { Card } from 'react-bootstrap';
import MenuDesc from '../../components/MenuDesc';
import FullScreenModal from '../../components/FullScreenModal';

function Menu() {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [baseImageUrl, setBaseImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDescOf, setShowDescOf] = useState(null);
  const [itemsInCart, setItemsInCart] = useState(0);

  const fetchData = async () => {
    if (!menuId) {
      toast.error("Please check URL.");
      return;
    }
    await fetchMenuDataAPI({ "token": menuId }).then(res => {
      if (res.data.status === "success") {
        setProducts(res.data.products);
        setCategories(res.data.categories);
        setBaseImageUrl(res.data.baseUrl);
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => toast.error(err.message))
  }

  const onSearch = (e) => {
    e.preventDefault();
  }

  const fetchAndSet = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
      let cartData = JSON.parse(cart);
      if (!!cartData[menuId]) {
        setItemsInCart(cartData[menuId].length);
      }
    }
  }

  useEffect(() => {
    fetchAndSet();
    fetchData();
  }, [])

  const onClickAdd = (id) => {
    let cart = localStorage.getItem('cart');
    localStorage.removeItem("cart");
    if (!!cart) {
      let cartData = JSON.parse(cart);
      if (!!cartData[menuId]) {
        cartData[menuId] = [...cartData[menuId].filter(prodId => prodId.id != id), { id, "quantity": 1 }];
      } else {
        cartData[menuId] = [{ id, "quantity": 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(cartData));
      setItemsInCart(cartData[menuId].length);
    } else {
      let cartData = { [menuId]: [{ id, "quantity": 1 }] };
      localStorage.setItem("cart", JSON.stringify(cartData));
      setItemsInCart(cartData[menuId].length);
    }
  }

  return (
    <>
      {!!showDescOf && <MenuDesc onHide={() => setShowDescOf(null)} productId={showDescOf} onClickAdd={onClickAdd} />}
      <FullScreenModal />
      <div className='Menu-outer'>
        <div className='Menu-main'>
          <nav className='Menu-main-nav d-flex p-auto shadow-sm justify-content-between p-2 align-items-center'>
            <form className='form-group search-input' onSubmit={onSearch}>
              <input
                type='search'
                className='form-control w-100 search-box shadow-none'
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder='Search food here'
              />
            </form>
            <img src='/assets/svgs/foodCart.svg' onClick={() => navigate(`/menu/${menuId}/cart`)} width={35} alt='Cart' />
            {itemsInCart > 0 && <div className='cart-badge'>{itemsInCart}</div>}
          </nav>
          <main>
            <div className='d-flex category-section'>
              <span className={`m-2 btn btn${selectedCategory === "" ? "" : "-outline"}-primary`} onClick={() => setSelectedCategory("")} >All</span>
              {categories.map((cat, index) =>
                <span key={index} className={`my-2 mx-1 btn btn${selectedCategory === cat.category ? "" : "-outline"}-primary`} onClick={() => setSelectedCategory(cat.category)} >{cat.category}</span>
              )}
            </div>
            <hr className='m-0' />
            <div className='d-flex food-card-box'>
              {products.filter(prod => (!selectedCategory || prod.category == selectedCategory)).map((prod, index) =>
                <Card key={index} className='shadow border-none d-flex justify-content-end food-card m-2' style={{ backgroundImage: !!prod.image ? `url(${baseImageUrl.substring(0, baseImageUrl.length - 1)}${prod.image})` : "url('/assets/svgs/food.svg')", backgroundSize: !!prod.image ? 'cover' : "contain" }}>
                  <div className='h-100 bg-curtom-for-food bg-curtom-for-food1' onClick={() => setShowDescOf(prod.id)}>
                    <h6>{prod.name}</h6>
                  </div>
                  <div className='w-100 bg-curtom-for-food d-flex w-100 button-badge-box'>
                    <span className='btn btn-sm btn-primary m-1 p-0 button-badge' onClick={() => setShowDescOf(prod.id)}>₹{(prod.price_in_paisa / 100).toFixed(2)}</span>
                    <span className='btn btn-sm btn-success m-1 p-0 button-badge' onClick={() => onClickAdd(prod.id)}>+Add</span>
                  </div>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Menu
