import React from 'react';
import "./style.css"
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { Outlet, redirect } from 'react-router-dom';
import toast from 'react-hot-toast';
import { checkUserAPI } from '../../apis/common';

export const mainLoader = async () => {
    let authenticated = false;
    await checkUserAPI().then(res=>{
        if(res.data.status==="success"){
            authenticated = true;
        }
    }).catch(err=>toast.error(err.message));
    
    if(authenticated)
        return {};
    return redirect("/login")
}

function Main() {
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
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Main
