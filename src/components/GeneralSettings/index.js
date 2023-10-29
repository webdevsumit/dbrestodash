import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import { saveAccountDataApi } from '../../apis/common';
import toast from 'react-hot-toast';

function GeneralSettings({ accountData }) {

    const setDefaultData = () => {
        return {
            "business_name": accountData.business_name,
            "email": accountData.user.email,
            "owner_name": accountData.owner_name,
            "contact_number": accountData.contact_number
        };
    }

    const [data, setData] = useState(setDefaultData())

    const onClickCancle = () => {
        setData(setDefaultData())
    }

    const onSubmitForm = async () => {
        await saveAccountDataApi({ ...data }).then(res => {
            if (res.data.status === "success") {
                toast.success("Saved Successfully.");
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
    }

    return (
        <Card className='settings-card shadow-lg p-4 ms-4 border-none border-15'>
            <h3 className='h3 text-decoration-underline'>General Settings</h3>
            <div>
                <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onSubmitForm(); }}>
                    <div className="form-group my-2">
                        <label for="business_name">Restaurant Name</label>
                        <input
                            className="form-control thoseMiniFields"
                            id="business_name"
                            placeholder="Restaurant name"
                            value={data.business_name}
                            onChange={e => setData(prev => ({ ...prev, "business_name": e.target.value }))}
                        />
                    </div>
                    <div className="form-group my-2">
                        <label for="email">Email Address</label>
                        <input
                            type="email"
                            className="form-control thoseMiniFields"
                            id="email"
                            placeholder="eg. example@gmail.com"
                            value={data.email}
                            onChange={e => setData(prev => ({ ...prev, "email": e.target.value }))}
                        />
                    </div>
                    <div className="form-group my-2">
                        <label for="name">Owner Name</label>
                        <input
                            className="form-control thoseMiniFields"
                            id="name"
                            placeholder="Owner Name"
                            value={data.owner_name}
                            onChange={e => setData(prev => ({ ...prev, "owner_name": e.target.value }))}
                        />
                    </div>
                    <div className="form-group my-2">
                        <label for="phone">Contact Number</label>
                        <input
                            type='number'
                            className="form-control thoseMiniFields"
                            id="phone"
                            placeholder="eg. +919876543210"
                            value={data.contact_number}
                            onChange={e => setData(prev => ({ ...prev, "contact_number": e.target.value }))}
                        />
                    </div>
                    <button type="submit" className="btn btn-success m-1">Save</button>
                    <button type="button" onClick={onClickCancle} className="btn btn-secondary m-1">Cancel</button>
                    <button type="button" className="btn btn-primary m-1">Change Logo</button>
                </form>
            </div>
        </Card>
    )
}

export default GeneralSettings
