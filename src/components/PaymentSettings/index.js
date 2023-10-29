import React, { useState } from 'react'
import { Card } from 'react-bootstrap';

function PaymentSettings() {

    const [data, setData] = useState({
        "payment_gateway": "0",
        "razorpay_id": "",
        "razorpay_secret_key": "",
    })

    const [typingDisabled, setTypingDisabled] = useState(true);

    const onSubmitForm = async () => {

    }

    return (
        <Card className='settings-card shadow-lg p-4 ms-4 border-none border-15'>
            <h3 className='h3 text-decoration-underline'>Payment Settings</h3>
            <div>
                <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onSubmitForm(); }}>
                    <div class="input-group form-group w-50 mb-3 no-drop">
                        <div class="input-group-prepend">
                            <label class="input-group-text" htmlFor="paymentGateway">Payment Gateway</label>
                        </div>
                        <select class="form-control" value={data.payment_gateway} disabled={true} onChange={val => {setData(prev => ({ ...prev, "payment_gateway": val.target.value })); setTypingDisabled(true)}} id="paymentGateway">
                            <option value="">Select</option>
                            <option value="0">Integrated</option>
                            <option value="1">Razorpay</option>
                        </select>
                    </div>
                    {
                        data.payment_gateway === "1" &&
                        <>
                            <div className="form-group my-2">
                                <label htmlFor="razorpay_id">Razorpay Id</label>
                                <input
                                    className="form-control w-50"
                                    id="razorpay_id"
                                    placeholder={typingDisabled?"************************************":"Enter Razorpay Id"}
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
                                    placeholder={typingDisabled?"************************************":"Enter Razorpay Secret Key"}
                                    disabled={typingDisabled}
                                    value={data.razorpay_secret_key}
                                    onChange={e => setData(prev => ({ ...prev, "razorpay_secret_key": e.target.value }))}
                                />
                            </div>
                        </>
                    }

                    {/* <button type="submit" className="btn btn-success m-1">Save</button>
                    <button type="button" className="btn btn-secondary m-1">Cancel</button>
                    {
                        typingDisabled &&
                        <button type="button" onClick={()=>setTypingDisabled(false)} className="btn btn-primary m-1">Enable Typing</button>
                    } */}
                </form>
            </div>
        </Card>
    )
}

export default PaymentSettings
