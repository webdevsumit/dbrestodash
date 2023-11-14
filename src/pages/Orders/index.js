import React, { useEffect, useState } from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import OrderFilterBox from '../../components/OrderFilterBox';
import { cancelOrderAPI, completeOrderAPI, filterOrdersAPI, undoOrderAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import moment from 'moment/moment';
import SureModal from '../../components/SureModal';

function Orders() {

  const refreshTime = 20;
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [TotalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [refreshTimer, setRefreshTimer] = useState(refreshTime);
  const [filters, setFilters] = useState({
    "completed": "0",
    "startDate": null,
    "endDate": null,
    "search": ""
  })

  const [cancelId, setCancelId] = useState(null);
  const [undoId, setUndoId] = useState(null);

  const onSearch = () => {
    setFilters(prev => ({ ...prev, "search": searchText }));
  }

  const fetchOrders = async () => {
    const payload = { page };
    if (filters.completed === "1" || filters.completed === "0") {
      payload["completed"] = filters.completed;
    }
    if (!!filters.startDate) {
      payload["startDate"] = moment(filters.startDate);
    }
    if (!!filters.endDate) {
      payload["endDate"] = moment(filters.endDate);
    }
    if (!!filters.search) {
      payload["search"] = filters.search;
    }
    let loader;
    if (!!data) {
      loader = toast.loading("Refreshing...");
    }
    await filterOrdersAPI(payload).then(res => {
      if (res.data.status === "success") {
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
      }
    }).catch(err => toast.error(err.error));
    if (!!loader) {
      toast.dismiss(loader);
    }
  }

  useEffect(() => {
    if (refreshTimer >= 0) {
      setTimeout(() => {
        setRefreshTimer(prev => prev - 1);
      }, 1000);
    } else {
      setRefreshCounter(prev => prev + 1);
      setRefreshTimer(refreshTime);
    }
  }, [refreshTimer])

  useEffect(() => {
    fetchOrders();
  }, [filters, refreshCounter, page]);

  const onCancelOrder = async () => {
    const loader = toast.loading("Saving...");
    await cancelOrderAPI({ id: cancelId }).then(res => {
      if (res.data.status === "success") {
        setData(prev => prev.map(order => {
          if (order.id === cancelId) return ({ ...order, "is_canceled": true });
          return order;
        }));
        setCancelId(null);
      }
    }).catch(err => toast.error(err.error));
    toast.dismiss(loader);
  }

  const onUndoOrder = async () => {
    const loader = toast.loading("Saving...");
    await undoOrderAPI({ id: undoId }).then(res => {
      if (res.data.status === "success") {
        setData(prev => prev.map(order => {
          if (order.id === undoId) return ({ ...order, "completed": false, "is_canceled": false });
          return order;
        }))
        setUndoId(null);
      }
    }).catch(err => toast.error(err.error));
    toast.dismiss(loader);
  }

  const onCompleteOrder = async (id) => {
    const loader = toast.loading("Saving...");
    await completeOrderAPI({ id }).then(res => {
      if (res.data.status === "success") {
        setData(prev => prev.map(order => {
          if (order.id === id) return ({ ...order, "completed": true });
          return order;
        }))
      }
    }).catch(err => toast.error(err.error));
    toast.dismiss(loader);
  }

  return (
    <>
      {!!cancelId && <SureModal show={!!cancelId} onHide={() => setCancelId(null)} onYes={onCancelOrder} />}
      {!!undoId && <SureModal show={!!undoId} onHide={() => setUndoId(null)} onYes={onUndoOrder} />}
      {showFilter && <OrderFilterBox onclose={() => setShowFilter(false)} filters={filters} setFilters={setFilters} />}
      <Card className='shadow-sm p-4 ms-4 border-none border-15 order-header'>
        <div className='d-flex justify-content-between'>
          <h3 className='h3 m-0 p-0'>Orders</h3>
          <div className='d-flex'>
            <div className="form-group my-0 mx-2 d-flex">
              <form onSubmit={e => { e.preventDefault(); onSearch() }} className='d-flex'>
                <input
                  style={{ width: '210px' }}
                  className="form-control"
                  placeholder="Search by id or name"
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
                <img onClick={onSearch} width={30} className='cursor-pointer me-1' src='/assets/svgs/search.svg' alt='search' />
              </form>
              <img width={27} className='cursor-pointer mx-1' onClick={() => setShowFilter(true)} src='/assets/svgs/filter.svg' alt='search' />
              <img width={22} className='cursor-pointer ms-1' onClick={() => setRefreshCounter(prev => prev + 1)} src='/assets/svgs/refresh.svg' alt='search' />
              <p className='fw-light timer-width text-end'>{refreshTimer > 9 ? refreshTimer : `0${refreshTimer}`}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h6 className='my-0 mx-1 order-id-width'>Order Id</h6>
          <h6 className='my-0 mx-1 order-id-width'>Order Date</h6>
          <h6 className='my-0 mx-1 order-id-width'>Order Time</h6>
          <h6 className='my-0 mx-1 table-no-width'>Table No.</h6>
          <h6 className='my-0 mx-1 customer-name-width'>Customer Name</h6>
          <h6 className='my-0 mx-1 actions-width text-end'>Status & Actions</h6>
        </div>
      </Card>
      {data.map((order) =>
        <Card className='shadow-lg p-4 ms-4 border-none border-15 mt-2'>
          <div className='d-flex justify-content-between'>
            <p className='my-0 mx-1 order-id-width'>{order.id}</p>
            <p className='my-0 mx-1 order-id-width'>{moment(order.created_at).format("DD/MM/YYYY")}</p>
            <p className='my-0 mx-1 order-id-width'>{moment(order.created_at).format("hh:mm a")}</p>
            <p className='my-0 mx-1 table-no-width'>{order.qr_name}</p>
            <p className='my-0 mx-1 customer-name-width'>{order.customer_name ? order.customer_name : 'Unknown'}</p>
            <div className='d-flex actions-width justify-content-end'>
              <span className={`badge d-flex align-items-center text-center bg-${order.completed ? 'success' : order.is_canceled ? 'danger' : 'primary'} btn-sm my-0 mx-1`}>{order.completed ? 'Completed' : order.is_canceled ? 'Canceled' : 'New'}</span>
              <span>|</span>
              <a href={`https://be.dbresto.com/v1/inventory/order/${order.safetyToken}/`} target='blank' className='btn btn-primary btn-sm my-0 mx-1'>View</a>
              {!order.completed && !order.is_canceled ? <>
                <button className='btn btn-success btn-sm my-0 mx-1' onClick={() => onCompleteOrder(order.id)}>Complete</button>
                <button className='btn btn-danger btn-sm my-0 mx-1' onClick={() => setCancelId(order.id)}>Cancel</button>
              </> : <>
                <button className='btn btn-danger btn-sm my-0 mx-1' onClick={() => setUndoId(order.id)}>Undo</button>
              </>}
            </div>
          </div>
          <hr className='my-2' />
          <div className='d-flex justify-content-between'>
            <h6 className='my-0 mx-1 order-id-width'></h6>
            <div className='w-100'>
              <div className='d-flex justify-content-between w-100'>
                <h6 className='my-0 mx-1 table-no-width'>Food Item(s)</h6>
                <h6 className='my-0 mx-1 quantity-width'>Quantity</h6>
                <h6 className='my-0 mx-1 customer-name-width text-end'>Price</h6>
              </div>
              <hr className='my-2' />

              {order.products.map(prod =>
                <div className='d-flex justify-content-between w-100'>
                  <h6 className='my-0 mx-1 table-no-width fw-normal'>{prod.name}</h6>
                  <h6 className='my-0 mx-1 quantity-width text-end fw-normal'>{prod.quantity}</h6>
                  <h6 className='my-0 mx-1 customer-name-width text-end fw-normal'>₹{(prod.price_in_paisa / 100).toFixed(2)}</h6>
                </div>
              )}

              <hr className='my-2' />
              <div className='d-flex justify-content-between w-100'>
                <h6 className='my-0 mx-1 table-no-width'></h6>
                <h6 className='my-0 mx-1 quantity-width text-end'>Total: </h6>
                <h6 className='my-0 mx-1 customer-name-width text-end'>₹{(order.total_price_in_paisa / 100).toFixed(2)}</h6>
              </div>
            </div>
          </div>
        </Card>
      )}
      <Card className='shadow-lg p-4 mt-2 ms-4 border-none border-15'>
        <div className='d-flex justify-content-end'>
          <button className='btn btn-primary my-0 mx-1 prev-next-btn-size' disabled={page <= 1} onClick={() => setPage(prev => prev > 1 ? prev - 1 : prev)}>Prevous</button>
          <button className='btn btn-primary my-0 mx-1 prev-next-btn-size' disabled={page >= TotalPages} onClick={() => setPage(prev => prev < TotalPages ? prev + 1 : prev)}>Next</button>
        </div>
      </Card>
    </>
  )
}

export default Orders
