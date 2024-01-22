import React, { } from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOutdApi } from '../../apis/common';
import { useSelector } from 'react-redux';
import { getAuthData } from '../../redux/navbar';
import { isMobile } from 'react-device-detect';

function Sidebar({ setShowNav }) {

    const navigate = useNavigate();
    const authData = useSelector(getAuthData);

    const lisksList = [
        {
            "text": "Dashboard",
            "img": "/assets/svgs/dashboard.svg",
            "link": "/",
            "perm": "access_dashboard"
        },
        {
            "text": "Tables & QR",
            "img": "/assets/svgs/qr.svg",
            "link": "/qrcodes",
            "perm": "access_qrcodes"
        },
        {
            "text": "Orders",
            "img": "/assets/svgs/orders.svg",
            "link": "/orders",
            "perm": "access_orders",
            "isDisabled": isMobile
        },
        {
            "text": "Menu Inventory",
            "img": "/assets/svgs/inventory.svg",
            "link": "/inventory",
            "perm": "access_inventory",
            "isDisabled": isMobile
        },
        {
            "text": "Settings",
            "img": "/assets/svgs/settings.svg",
            "link": "/settings",
            "perm": "access_settings"
        },
    ]

    const logout = async () => {
        await signOutdApi().then(res => {
            if (res.data.status === "success") {
                localStorage.clear();
                navigate("/login");
            }
        })
    }

    return (
        <Card className='sidebar-main shadow-lg p-3 m-3' >
            <div className='sidebar-logo-div' >
                {!!authData?.data?.business_logo ?
                    <Card.Img className='sidebar-logo' variant="top" src={authData?.data?.business_logo} />
                    :
                    <div className='sidebar-logo-name-wrapper'
                        style={{
                            fontFamily: "'Brush Script MT', cursive", fontWeight: 'bold'
                        }}
                    >
                        <h3>
                            <img width={40} src='/assets/svgs/food.svg' /> <br />
                            {authData?.data?.business_name?.split(" ")[0]?.slice(0, 1)?.toUpperCase()}
                            {authData?.data?.business_name?.split(" ")[1]?.slice(0, 1)?.toUpperCase()}
                        </h3>
                    </div>
                }
            </div>
            <hr />
            <div className='hide-sidebar-btn' onClick={()=>setShowNav(false)}>{"<<"}</div>
            <div className='px-2 py-2'>
                {!!authData?.permissions && lisksList.filter(link=>!link.isDisabled).map(link => {
                    if (authData.permissions[link.perm])
                        return (
                            <NavLink
                                key={link.link}
                                to={link.link}
                                className={({ isActive, isPending }) =>
                                    isPending ? "navlink navlink-pending" : isActive ? "navlink navlink-active" : "navlink"
                                }
                            >
                                <img alt='LinkIcon' className='sidebar-link-icon' src={link.img} />
                                {link.text}
                            </NavLink>
                        )
                    return null;
                })}
            </div>
            <div className='sidebar-footer'>
                <div className={`card shadow border-${authData.daysLeft <= 0 ? "danger" : (authData.daysLeft < 6 ? "warning" : "success")} bg-${authData.daysLeft <= 0 ? "danger" : (authData.daysLeft < 6 ? "warning" : "success")} d-flex justify-content-center align-items-center p-2`}>
                    <h6 className='text-white m-0'>{authData.planName}</h6>
                    <h3 className='text-white m-0'>{authData.daysLeft < 0 ? "Expired" : `${authData.daysLeft} days`}</h3>
                    {authData.daysLeft >= 0 && <h6 className='text-white m-0'>left</h6>}
                </div>
                <Link to={`/subscription`} className='btn btn-primary mt-1'>Plan Details</Link>
                <hr />
                <div onClick={logout} className='logout-button'>
                    <img className='sidebar-link-icon' src='/assets/svgs/logout.svg' alt='logout' />
                    LOGOUT
                </div>
            </div>
        </Card>
    )
}

export default Sidebar
