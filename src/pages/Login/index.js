import React, { useState } from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { loginApi } from '../../apis/common';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const onSubmitForm = async () => {
        if (!data.email || !data.password) {
            toast.error("All fields are required.");
            return;
        }
        await loginApi({ ...data }).then(res => {
            if (res.data.status === "success") {
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
                        <h3 className='signup-head mx-2 mt-4'>Login</h3>
                        <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onSubmitForm(); }}>
                            <div className="form-group my-2">
                                <label for="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    value={data.email}
                                    onChange={e => setData(prev => ({ ...prev, "email": e.target.value }))}
                                />
                            </div>
                            <div className="form-group my-2">
                                <label for="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={data.password}
                                    onChange={e => setData(prev => ({ ...prev, "password": e.target.value }))}
                                />
                            </div>
                            <label className="form-check-label cursor-pointer" for="privacycheck"><small>Do not have an account? <Link to="/signup" >Register here</Link>.</small></label><br/>
                            <button type="submit" className="btn btn-primary mt-1">Login</button>
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

export default Login
