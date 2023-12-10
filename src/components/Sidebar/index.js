import React, { useEffect } from 'react';
import './style.css';
import { Card } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOutdApi } from '../../apis/common';
import { useSelector } from 'react-redux';
import { getAuthData } from '../../redux/navbar';

function Sidebar() {

    const navigate = useNavigate();
    const authData = useSelector(getAuthData);

    const logout = async () => {
        await signOutdApi().then(res => {
            if (res.data.status === "success") {
                localStorage.clear();
                navigate("/login");
            }
        })
    }

    useEffect(() => {
        let plan = localStorage.getItem("plan");
        if (!!plan) {
            plan = JSON.parse(plan)
            // setDaysLeft()
        }
    }, [])

    return (
        <Card className='sidebar-main shadow-lg p-3 m-3' >
            <div className='sidebar-logo-div' >
                {!!authData.business_logo ?
                    <Card.Img className='sidebar-logo' variant="top" src={authData.business_logo} />
                    :
                    <div className='sidebar-logo-name-wrapper'>
                        <h3>
                            {authData?.business_name?.split(" ")[0]?.slice(0, 1)?.toUpperCase()}
                            {authData?.business_name?.split(" ")[1]?.slice(0, 1)?.toUpperCase()}
                        </h3>
                    </div>
                }
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
