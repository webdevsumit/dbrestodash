import React, { useState } from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { resetPasswordApi, sendOtpApi } from '../../apis/common';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        otpId: "",
        otp: ""
    })

    const onClickSendOtp = async () => {
        if (!data.email) {
            toast.error("All fields are required.");
            return;
        }
        await sendOtpApi({ "email": data.email }).then(res => {
            if (res.data.status === "success") {
                setData(prev => ({ ...prev, "otpId": res.data.id }))
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message))
    }

    const onClickResetPass = async () => {
        if (!data.otp || !data.password) {
            toast.error("All fields are required.");
            return;
        }
        await resetPasswordApi({ ...data }).then(res => {
            if (res.data.status === "success") {
                toast.success("Successfully changed password.");
                toast.success("You can login now.")
                navigate("/login")
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message))
    }

    return (
        <div className='signup-main'>
            <Card className='signup-card shadow-lg p-3 border-none border-15'>
                <div className='signup-card-inner'>
                    <div className='signup-left'>
                        <img className='signup-logo' src='/assets/logos/logo-light.svg' alt='logo' />
                        <hr />
                        <h3 className='signup-head mx-2 mt-4'>Reset Password</h3>

                        {!data.otpId ?
                            <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onClickSendOtp(); }}>
                                <div className="form-group my-2">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                        value={data.email}
                                        onChange={e => setData(prev => ({ ...prev, "email": e.target.value }))}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-1">Send OTP</button>
                                <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary ms-2 mt-1">Go Back</button>
                            </form>
                            :
                            <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onClickResetPass(); }}>
                                <div className="form-group my-2">
                                    <label htmlFor="OTP">OTP</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="OTP"
                                        placeholder="Enter OTP"
                                        value={data.otp}
                                        onChange={e => setData(prev => ({ ...prev, "otp": e.target.value }))}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="password">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter Password"
                                        value={data.password}
                                        onChange={e => setData(prev => ({ ...prev, "password": e.target.value }))}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-1">Reset Password</button>
                                <button type="button" onClick={() => setData(prev => ({ ...prev, otpId: "" }))} className="btn btn-secondary ms-2 mt-1">Cancel</button>
                            </form>
                        }

                    </div>
                    <div className='signup-right'>
                        <img className='signup-poster' src='/assets/jpgs/poster1.jpg' alt='poster' />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ForgotPassword
