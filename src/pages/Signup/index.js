import React, { useState } from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { signupApi } from '../../apis/common';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        business_name: "",
        email: "",
        password: ""
    })
    const [confirmPass, setConfirmPass] = useState("");
    const [check, setCheck] = useState(false);

    const onSubmitForm = async () => {
        if (!data.business_name || !data.email || !data.password) {
            toast.error("All fields are required.");
            return;
        }
        if (data.password !== confirmPass) {
            toast.error("Passwords are not matching.");
            return;
        }
        if (!check) {
            toast.error("You need to check the checkbox.");
            return;
        }

        await signupApi({ ...data }).then(res => {
            if (res.data.status === "success") {
                toast.success("Successfully Registered.");
                localStorage.setItem("token", res.data.token)
                navigate("/");
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
                        <h3 className='signup-head mx-2 mt-4'>Register/Signup</h3>
                        <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onSubmitForm(); }}>
                            <div className='form-group my-2'>
                                <label htmlFor="business_name">Restaurant Name</label>
                                <input
                                    className='form-control'
                                    placeholder='Restaurant Name'
                                    id='business_name'
                                    value={data.business_name}
                                    onChange={e => setData(prev => ({ ...prev, "business_name": e.target.value }))}
                                />
                            </div>
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
                                <small id="emailHelp" className="form-text text-muted">We use email to login and to reset the password.</small>
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="password">Create Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={data.password}
                                    onChange={e => setData(prev => ({ ...prev, "password": e.target.value }))}
                                />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="password2">Confirm Password</label>
                                <input type="password" className="form-control" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} id="password2" placeholder="Re-enter Password" />
                            </div>
                            <div className="form-check my-2 mt-4">
                                <input type="checkbox" checked={check} onChange={e => setCheck(e.target.checked)} className="form-check-input cursor-pointer" id="privacycheck" />
                                <label className="form-check-label cursor-pointer" htmlFor="privacycheck"><small>I've read and agree with <a href='https://dbresto.com/termsandconditions/'>terms & conditons</a> and <a href='https://dbresto.com/privacypolicy/'>privcy policy</a>.</small></label>
                            </div>
                            <button type="submit" className="btn btn-primary mt-1">Register</button>
                        </form>
                    </div>
                    <div className='signup-right'>
                        <img className='signup-poster' src='/assets/jpgs/poster1.jpg' alt='poster' />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Signup
