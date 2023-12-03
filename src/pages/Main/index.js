import React, { useEffect } from 'react';
import "./style.css"
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import toast from 'react-hot-toast';
import { checkUserAPI } from '../../apis/common';
import { useDispatch } from 'react-redux';
import { setAuthData } from "./../../redux/navbar";

export const mainLoader = async () => {
    let authenticated = false;
    let data = null;
    await checkUserAPI().then(res => {
        if (res.data.status === "success") {
            authenticated = true;
            data = res.data.data;
            localStorage.setItem("username", res.data.data.user.username);
        }
    }).catch(err => toast.error(err.message));

    if (authenticated)
        return { data };
    return redirect("/login")
}

function Main() {

    const { data } = useLoaderData();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAuthData(data));
    }, [])

    return (
        <div className='main-main'>
            <div className='main-sidebar-div' >
                <Sidebar />
            </div>
            <div className='main-container-div' >
                <div className='main-topbar-div'>
                    <Topbar />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Main
