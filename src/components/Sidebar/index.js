import React from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOutdApi } from '../../apis/common';

function Sidebar() {

    const navigate = useNavigate();

    const logout = async () => {
        await signOutdApi().then(res=>{
            if(res.data.status==="success"){
                localStorage.clear();
                navigate("/login");
            }
        })
    } 

    return (
        <Card className='sidebar-main shadow-lg p-3 m-3' >
            <div className='sidebar-logo-div' >
                <Card.Img className='sidebar-logo' variant="top" src="/logo512.png" />
            </div>
            <hr />
            <div className='px-2 py-2'>
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "navlink navlink-pending" : isActive ? "navlink navlink-active" : "navlink"
                    }
                >
                    <img alt='LinkIcon' className='sidebar-link-icon' src='/assets/svgs/dashboard.svg' />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/settings"
                    className={({ isActive, isPending }) =>
                        isPending ? "navlink navlink-pending" : isActive ? "navlink navlink-active" : "navlink"
                    }
                >
                    <img alt='LinkIcon' className='sidebar-link-icon' src='/assets/svgs/settings.svg' />
                    Settings
                </NavLink>
                <NavLink
                    to="/inventory"
                    className={({ isActive, isPending }) =>
                        isPending ? "navlink navlink-pending" : isActive ? "navlink navlink-active" : "navlink"
                    }
                >
                    <img alt='LinkIcon' className='sidebar-link-icon' src='/assets/svgs/inventory.svg' />
                    Inventory
                </NavLink>
                <NavLink
                    to="/qrcodes"
                    className={({ isActive, isPending }) =>
                        isPending ? "navlink navlink-pending" : isActive ? "navlink navlink-active" : "navlink"
                    }
                >
                    <img alt='LinkIcon' className='sidebar-link-icon' src='/assets/svgs/qr.svg' />
                    QR Codes
                </NavLink>
                <NavLink
                    to="/orders"
                    className={({ isActive, isPending }) =>
                        isPending ? "navlink navlink-pending" : isActive ? "navlink navlink-active" : "navlink"
                    }
                >
                    <img alt='LinkIcon' className='sidebar-link-icon' src='/assets/svgs/orders.svg' />
                    Orders
                </NavLink>
            </div>
            <div className='sidebar-footer'>
                <hr />
                <div onClick={logout} className='logout-button'>
                    <img className='sidebar-link-icon' src='/assets/svgs/logout.svg' alt='logout'/>
                    LOGOUT
                </div>
            </div>
        </Card>
    )
}

export default Sidebar
