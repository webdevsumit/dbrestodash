import React, { useEffect, useState } from 'react';
// import "./style.css";
// import { useCallback } from "react";
// import useRazorpay from "react-razorpay";
// import { completeOrderByIdApi, creatingRazOrderPaymentDetailsByIdApi } from '../../../../apis/common';
// import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import NormalButton1 from '../../../commons/NormalButton1';

const language = !!localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

export const loader = async ({ params }) => {
  return { storeId: params.storeId }
}

function RazorPayGateway() {

  // const navigate = useNavigate()
  // const location = useLocation()
  // const { storeId } = useLoaderData();
  // const [Razorpay, isLoaded] = useRazorpay();
  // const [showBtn, setShowBtn] = useState(false);
  // const [amountPaid, setAmountPaid] = useState(false);

  // const handlePayment = useCallback(async () => {
  //   let order;
  //   // let address;
  //   let rid;
  //   let storeColor;
  //   let storeName;
  //   let customer_name;
  //   let customer_email;
  //   let customer_contact;
  //   let orderidInDb;
  //   const storeLogo = localStorage.getItem("store_logo");

  //   await creatingRazOrderPaymentDetailsByIdApi(storeId).then(res => {
  //     if (res.data.status === "success") {
  //       order = res.data.order;
  //       // address = res.data.address;
  //       rid = res.data.rid;
  //       storeColor = res.data.storeColor;
  //       storeName = res.data.storeName;
  //       customer_name = res.data.customer_name;
  //       customer_email = res.data.customer_email;
  //       customer_contact = res.data.customer_contact;
  //       orderidInDb = res.data.orderidInDb;
  //     } else {
  //       toast.error(res.data.error[language]);
  //       navigate(-1);
  //     }
  //   }).catch(err => {
  //     toast.error(err.message);
  //     navigate(-1);
  //   });

  //   if (!order) return;

  //   // eslint-disable-next-line
  //   const options = {
  //     key: rid,
  //     amount: order.amount_due,
  //     currency: "INR",
  //     name: storeName,
  //     description: "Order",
  //     image: storeLogo,
  //     order_id: order.id,
  //     handler: async (res) => {
  //       setAmountPaid(true);
  //       await completeOrderByIdApi(res, storeId, orderidInDb).then(res => {
  //         if (res.data.status === "success") {
  //           toast.success(res.data.message[language]);
  //           navigate(`/${storeId}/menu/previous-orders/${orderidInDb}/`);
  //         } else toast.error(res.data.error[language])
  //       }).catch(err => console.log(err));
  //     },
  //     prefill: {
  //       name: customer_name,
  //       email: customer_email,
  //       contact: customer_contact,
  //     },
  //     notes: order.notes,
  //     theme: {
  //       color: storeColor,
  //     },
  //   };

  //   if (!!order) {
  //     const rzpay = new Razorpay(options);
  //     rzpay.open();
  //   }
  //   // eslint-disable-next-line
  // }, [Razorpay]);

  // useEffect(() => {
  //   if (isLoaded) {
  //     handlePayment();
  //   }
  //   // eslint-disable-next-line
  // }, [isLoaded, handlePayment]);

  // useEffect(() => {
  //   if (location.pathname.search("RazorPayGateway") !== -1 && isLoaded) {
  //     handlePayment();
  //   }
  //   setTimeout(() => {
  //     setShowBtn(true)
  //   }, 3000);
  //   // eslint-disable-next-line
  // }, [location.pathname])


  return (
    <div className="App">
      {/* {!amountPaid ? <>
        {showBtn ? <h3>You are about to finish.</h3> : <h3>Completing your request. Please wait...</h3>}
        {showBtn && <NormalButton1 label='Continue' onClick={handlePayment} />}
      </> : <>
        <h3>Thank you so much.</h3>
        <h6>Redirecting to order.</h6>
      </>} */}
    </div>
  );
}

export default RazorPayGateway;