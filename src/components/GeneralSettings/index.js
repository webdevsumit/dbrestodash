import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import { changeLogoAPI, saveAccountDataApi } from '../../apis/common';
import toast from 'react-hot-toast';
import "./style.css";
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../redux/navbar';

function GeneralSettings({ accountData }) {

    const dispatch = useDispatch();

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

    const onUploadLogo = async (e) => {
        let file = e.target.files[0];
        if(!!file){
            const form = new FormData();
            form.append("logo", file);
            await changeLogoAPI(form).then(res=>{
                if(res.data.status === "success"){
                    toast.success("Logo changed successfylly.");
                    dispatch(setAuthData(res.data.data));
                }
            })
        }
    }

    return (
        <Card className='settings-card shadow-lg p-4 ms-4 border-none border-15'>
            <h3 className='h3 text-decoration-underline'>General Settings</h3>
            <div>
                <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onSubmitForm(); }}>
                    <div className="form-group my-2">
                        <label htmlFor="business_name">Restaurant Name</label>
                        <input
                            className="form-control thoseMiniFields"
                            id="business_name"
                            placeholder="Restaurant name"
                            value={data.business_name}
                            onChange={e => setData(prev => ({ ...prev, "business_name": e.target.value }))}
                        />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="email">Email Address</label>
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
                        <label htmlFor="name">Owner Name</label>
                        <input
                            className="form-control thoseMiniFields"
                            id="name"
                            placeholder="Owner Name"
                            value={data.owner_name}
                            onChange={e => setData(prev => ({ ...prev, "owner_name": e.target.value }))}
                        />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="phone">Contact Number</label>
                        <input
                            type='number'
                            className="form-control thoseMiniFields"
                            id="phone"
                            placeholder="eg. +919876543210"
                            value={data.contact_number}
                            onChange={e => setData(prev => ({ ...prev, "contact_number": e.target.value }))}
                        />
                    </div>
                    <button type="submit" className="btn btn-success btn-min-width m-1">Save</button>
                    <button type="button" onClick={onClickCancle} className="btn btn-secondary btn-min-width m-1">Discard</button>
                    <input onChange={onUploadLogo} type="file" accept="image/png, image/jpeg" className="btn btn-primary btn-min-width m-1 choose-image-btn" />
                    <button className="btn btn-primary btn-min-width gnrl-buttonWrapper m-1" >Chagne Logo</button>
                </form>
            </div>
        </Card>
    )
}

export default GeneralSettings
