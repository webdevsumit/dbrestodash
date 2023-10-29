import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import './style.css'

function SubAccountSettings() {

    const [data, setData] = useState({
        "name": "",
        "email": "",
        "password": "",
    })

    const onSubmitForm = async () => {

    }

    return (
        <Card className='settings-card shadow-lg p-4 ms-4 border-none border-15'>
            <h3 className='h3 text-decoration-underline'>Sub Accounts</h3>
            <div className='w-100 d-flex subaccount'>
                <div className='card subaccount-card p-2 m-2'>
                    <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onSubmitForm(); }}>
                        <div className="form-group my-2">
                            <label for="name">Name</label>
                            <input
                                className="form-control "
                                id="name"
                                placeholder="Restaurant name"
                                value={data.name}
                                onChange={e => setData(prev => ({ ...prev, "name": e.target.value }))}
                            />
                        </div>
                        <div className="form-group my-2">
                            <label for="email">Email Address</label>
                            <input
                                type="email"
                                className="form-control "
                                id="email"
                                placeholder="eg. example@gmail.com"
                                value={data.email}
                                onChange={e => setData(prev => ({ ...prev, "email": e.target.value }))}
                            />
                        </div>
                        <div className="form-group my-2">
                            <label for="password">Password</label>
                            <input
                                type='password'
                                className="form-control "
                                id="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={e => setData(prev => ({ ...prev, "password": e.target.value }))}
                            />
                        </div>
                        <button type="submit" className="btn btn-success m-1">Save</button>
                        <button type="button" className="btn btn-secondary m-1">Cancel</button>
                        <button type="button" className="btn btn-danger m-1">Disable</button>
                    </form>
                </div>
                <div className='card subaccount-card p-2 m-2'>
                    <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onSubmitForm(); }}>
                        <div className="form-group my-2">
                            <label for="name">Name</label>
                            <input
                                className="form-control "
                                id="name"
                                placeholder="Restaurant name"
                                value={data.name}
                                onChange={e => setData(prev => ({ ...prev, "name": e.target.value }))}
                            />
                        </div>
                        <div className="form-group my-2">
                            <label for="email">Email Address</label>
                            <input
                                type="email"
                                className="form-control "
                                id="email"
                                placeholder="eg. example@gmail.com"
                                value={data.email}
                                onChange={e => setData(prev => ({ ...prev, "email": e.target.value }))}
                            />
                        </div>
                        <div className="form-group my-2">
                            <label for="password">Password</label>
                            <input
                                type='password'
                                className="form-control "
                                id="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={e => setData(prev => ({ ...prev, "password": e.target.value }))}
                            />
                        </div>
                        <button type="submit" className="btn btn-success m-1">Save</button>
                        <button type="button" className="btn btn-secondary m-1">Cancel</button>
                        <button type="button" className="btn btn-danger m-1">Disable</button>
                    </form>
                </div>
            </div>
        </Card>
    )
}

export default SubAccountSettings
