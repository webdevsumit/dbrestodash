import React, { useEffect, useState } from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import OrderFilterBox from '../../components/OrderFilterBox';
import { filterOrdersAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import moment from 'moment/moment';
import OrderCard from '../../components/OrderCard';

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
    "order_status": "",
    "startDate": null,
    "endDate": null,
    "search": ""
  })

  const onSearch = () => {
    setFilters(prev => ({ ...prev, "search": searchText }));
  }

  const fetchOrders = async () => {
    const payload = { page };
    if (filters.order_status) {
      payload["order_status"] = filters.order_status;
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
      loader = toast.loading("Refreshing...", {duration: 20000});
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

  return (
    <>
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
      {
        data.length === 0 && <Card className='shadow-lg p-4 ms-4 border-none border-15 mt-2'>
          {
            filters.order_status === "1" ? "No New Order" : 
              filters.order_status === "2" ? "No Completed Order." : 
                filters.order_status === "3" ? "No Canceled Order." : 
                  "There is no order."
          }
        </Card>
      }
      {data.map((order) => <OrderCard key={order.id} order={order} setData={setData} /> )}
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
