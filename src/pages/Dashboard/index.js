import React, { useEffect, useState } from 'react';
import './style.css'
import Chart from "react-apexcharts";
import { Card } from 'react-bootstrap';
import { orderSalesDataAPI, numberOfProductsSoldAPI, dashboardDataAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import moment from 'moment';
import { isMobile } from 'react-device-detect';

function Dashboard() {

  const [ordersCategories, setOrdersCategories] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [orderDataType, setOrderDataType] = useState(2);

  const [productCategories, setProductsCategories] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [productStartDate, setProductStartDate] = useState(moment().subtract(1, "months").format("YYYY-MM-DD"));
  const [productEndDate, setProductEndDate] = useState(moment().format("YYYY-MM-DD"));

  const [dashData, setDashData] = useState(null);

  const fetchDashData = async () => {
    await dashboardDataAPI({}).then(res => {
      if (res.data.status === "success") {
        setDashData(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => toast.error(err.message));
  }

  const fetchOrdersData = async (firstTime) => {
    let loader;
    if (!firstTime) {
      loader = toast.loading("fetching orders data.", { duration: 20000 });
    }
    await orderSalesDataAPI({ "data_type": orderDataType }).then(res => {
      if (res.data.status === "success") {
        setOrdersCategories(res.data.data.map(dt => moment((orderDataType == 1 ? dt.month : dt.day), (orderDataType == 1 ? "YYYY-MM" : "YYYY-MM-DD")).format()));
        setOrdersData(res.data.data.map(dt => (dt.total_sales / 100).toFixed(2)));
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => toast.error(err.message));
    if (loader) toast.dismiss(loader);
  }

  useEffect(() => {
    fetchOrdersData();
  }, [orderDataType])

  const fetchProductsData = async () => {
    const loader = toast.loading("fetching products data.", { duration: 20000 });
    const payload = {}
    if (!!productStartDate) {
      payload["start_date"] = productStartDate;
    }
    if (!!productStartDate) {
      payload["end_date"] = moment(productEndDate, "YYYY-MM-DD").add(1, "day").format("YYYY-MM-DD");
    }
    await numberOfProductsSoldAPI(payload).then(res => {
      if (res.data.status === "success") {
        setProductsCategories(res.data.data.map(dt => dt.product_name));
        setProductsData(res.data.data.map(dt => dt.total_sales));
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => toast.error(err.message));
    toast.dismiss(loader);
  }

  useEffect(() => {
    fetchDashData(true);
    fetchProductsData(true);
  }, [])

  return (
    <div className='dashboard-main'>
      {isMobile &&
        <Card className='shadow p-1 my-2 border-none border-15' style={{ width: '95%', marginLeft: "2.5%", marginRight: "2.5%" }}>
          <div className="form-group mb-2 w-50">
            <select className="form-control" value={orderDataType} onChange={e => setOrderDataType(e.target.value)} id="filterDropDownGraphType">
              <option value={1}>Yearly</option>
              <option value={2}>Monthly</option>
              <option value={3}>Weekly</option>
            </select>
          </div>
          <Chart
            options={{
              chart: { id: "order-line-graph" }, xaxis: { categories: ordersCategories, type: 'datetime' },
              title: {
                text: 'Sales (in ₹)',
                align: 'left'
              },
            }}
            series={[{ name: "Orders", data: ordersData }]}
            type="line"
            height={"300px"}
          />
        </Card>
      }
      <div className='d-flex w-100'>
        {!isMobile &&
          <Card className='shadow p-4 ms-4 me-3 my-2 border-none border-15 w-75'>
            <div className="form-group mb-2 w-25">
              <select className="form-control" value={orderDataType} onChange={e => setOrderDataType(e.target.value)} id="filterDropDownGraphType">
                <option value={1}>Yearly</option>
                <option value={2}>Monthly</option>
                <option value={3}>Weekly</option>
              </select>
            </div>
            <Chart
              options={{
                chart: { id: "order-line-graph" }, xaxis: { categories: ordersCategories, type: 'datetime' },
                title: {
                  text: 'Sales (in ₹)',
                  align: 'left'
                },
              }}
              series={[{ name: "Orders", data: ordersData }]}
              type="line"
              height={"300px"}
            />
          </Card>
        }
        <Card className={`shadow p-4 ${isMobile?'mx-1':'ms-3 me-4'} my-2 border-none border-15 w-${isMobile ? "100" : '25'}`}>
          <div className="badge p-2 m-1 rounded bg-success">
            <h6 className='m-0 text-start'>Total Sales (₹)</h6>
            <h3>{(dashData?.total_sales / 100).toFixed(2) || "00"}</h3>
          </div>
          <div className="badge p-2 m-1 rounded bg-primary">
            <h6 className='m-0 text-start'>Total Products Sold</h6>
            <h3>{dashData?.total_products_sold || "0"}</h3>
          </div>
          <div className="badge p-2 m-1 rounded bg-secondary">
            <h6 className='m-0 text-start'>Total Orders</h6>
            <h3>{dashData?.total_orders || "0"}</h3>
          </div>
        </Card>
      </div>
      <div className='d-flex w-100'>
        <Card className={`shadow w-100 p-4 ${isMobile?'mx-1 mt-2 mb-3':'mx-4 my-3'} border-none border-15`}>
          <div>
            <div className={`d-flex w-100 align-items-${isMobile ? "start flex-column" : "end"}`}>
              <div className="form-group mx-2">
                {/* <label className="">From</label> */}
                <input
                  type='date'
                  style={{ width: '180px' }}
                  className="form-control"
                  placeholder="DD/MM/YYYY"
                  value={productStartDate}
                  onChange={e => setProductStartDate(e.target.value)}
                />
              </div>
              {!isMobile ? <p className='p-0 m-2'>-</p> : <div className='w-100 my-1'></div>}
              <div className="form-group mx-2">
                {/* <label className="">To</label> */}
                <input
                  type='date'
                  style={{ width: '180px' }}
                  className="form-control"
                  placeholder="DD/MM/YYYY"
                  value={productEndDate}
                  onChange={e => setProductEndDate(e.target.value)}
                />
              </div>
              <div className={isMobile ? "mx-2 mt-2" : ""}>
                <button onClick={fetchProductsData} className='btn btn-md btn-success'>Apply</button>
              </div>
            </div>
          </div>
          <hr />
          <Chart
            options={{
              chart: { id: "products-bar-graph" }, xaxis: { categories: productCategories }, title: {
                text: isMobile ? 'Orders per product.' : 'Number of orders created per product.',
                align: 'left'
              },
            }}
            series={[{ name: "Orders", data: productsData }]}
            type="bar"
            width="100%"
            height={"300px"}
          />
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
