import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { getPaymentDetailsAPI, setPaymentDetailsAPI } from '../../apis/common';
import toast from 'react-hot-toast';

function PaymentSettings() {

    const dataTemplate = {
        "payment_gateway": "0",
        "razorpay_id": "",
        "razorpay_secret_key": "",
        "upi_address": "",
    }

    const [initData, setInitData] = useState({...dataTemplate})
    const [data, setData] = useState({...dataTemplate})

    const [typingDisabled, setTypingDisabled] = useState(true);

    const onSubmitForm = async () => {
        const loader = toast.loading("Saving...", {duration: 20000});
        await setPaymentDetailsAPI({ ...data }).then(res => {
            if (res.data.status === "success") {
                toast.success("Saved successully.")
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
        toast.dismiss(loader);
    }

    const gettingData = async () => {
        await getPaymentDetailsAPI().then(res => {
            if (res.data.status === "success") {
                setData(prev => ({
                    ...prev,
                    ...res.data.data
                }));
                setInitData(prev => ({
                    ...prev,
                    ...res.data.data
                }));
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
    }

    useEffect(() => {
        gettingData();
    }, [])

    return (
        <Card className='settings-card shadow-lg p-4 ms-4 border-none border-15'>
            <h3 className='h3 text-decoration-underline'>Payment Settings</h3>
            <div>
                <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onSubmitForm(); }}>
                    <div className="input-group form-group w-50 mb-3 no-drop">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="paymentGateway">Payment Gateway</label>
                        </div>
                        <select className="form-control shadow-none" value={data.payment_gateway} disabled={false} onChange={val => { setData(prev => ({ ...prev, "payment_gateway": val.target.value })); setTypingDisabled(true) }} id="paymentGateway">
                            <option value="">Select</option>
                            <option value={0}>QR on bill</option>
                            <option value={1}>None ( Offline )</option>
                            <option disabled={true} value={2}>Razorpay</option>
                            <option disabled={true} value={3}>Integrated</option>
                        </select>
                    </div>

                    {
                        data.payment_gateway == 0 &&
                        <div className="form-group my-2">
                            <label htmlFor="upi_address">Merchant UPI Address</label>
                            <input
                                className="form-control w-50"
                                id="upi_address"
                                placeholder={"Merchant UPI address"}
                                value={data.upi_address}
                                onChange={e => setData(prev => ({ ...prev, "upi_address": e.target.value }))}
                            />
                        </div>
                    }
                    {
                        data.payment_gateway == 2 &&
                        <>
                            <div className="form-group my-2">
                                <label htmlFor="razorpay_id">Razorpay Id</label>
                                <input
                                    className="form-control w-50"
                                    id="razorpay_id"
                                    placeholder={typingDisabled ? "************************************" : "Enter Razorpay Id"}
                                    disabled={typingDisabled}
                                    value={data.razorpay_id}
                                    onChange={e => setData(prev => ({ ...prev, "razorpay_id": e.target.value }))}
                                />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="razorpay_secret_key">Razorpay Secret Key</label>
                                <input
                                    className="form-control w-50"
                                    id="razorpay_secret_key"
                                    placeholder={typingDisabled ? "************************************" : "Enter Razorpay Secret Key"}
                                    disabled={typingDisabled}
                                    value={data.razorpay_secret_key}
                                    onChange={e => setData(prev => ({ ...prev, "razorpay_secret_key": e.target.value }))}
                                />
                            </div>
                        </>
                    }

                    <div className='mb-2'>
                        {
                            data.payment_gateway == 0 &&
                            <p className='text-muted h-6 m-0'>
                                QR will be added on bills and you will get money on your merchant UPI account. <br />
                            </p>
                        }
                        <p className='text-muted h-6 mb-0'>Razorpay and Integrated options are coming in next update.</p>
                    </div>

                    <button type="submit" className="btn btn-success m-1">Save</button>
                    {/* <button type="button" className="btn btn-secondary m-1" onClick={()=>setData({...initData})}>Discard</button> */}
                    {
                        typingDisabled && data.payment_gateway == 2 &&
                        <button type="button" onClick={() => setTypingDisabled(false)} className="btn btn-primary m-1">Enable Typing</button>
                    }
                </form>
            </div>
        </Card>
    )
}

export default PaymentSettings
