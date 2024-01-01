import React, { useEffect } from 'react';
import "./style.css"
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { Outlet, json, redirect, useLoaderData, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { checkUserAPI } from '../../apis/common';
import { useDispatch } from 'react-redux';
import { setAuthData } from "./../../redux/navbar";
import moment from 'moment';
import { ProgressBar } from 'react-bootstrap';

export const mainLoader = async () => {
    let authenticated = false;
    let hasSomeIssue = true;
    let data = null;
    let planName = "FREE TRIAL";
    let daysLeft = 0;
    let hasLink;
    await checkUserAPI().then(res => {
        if (res.data.status === "success") {

            if (!!res.data.plan.subscription_details && (res.data.plan.subscription_details.status === 'created' || res.data.plan.subscription_details.status === 'pending')) {
                hasLink = res.data.plan.subscription_details.short_url;
            } else if (!!res.data.plan.subscription_details && (res.data.plan.subscription_details.status === 'completed' || (res.data.plan.subscription_details.status === 'cancelled' && moment.unix(res.data.plan.subscription_details.current_end) >= moment()))) {
                hasSomeIssue = false;
                planName = res.data.plan.plan_name.toUpperCase();
                daysLeft = moment.unix(res.data.plan.subscription_details.current_end).diff(moment(), 'days') + 1;
            } else if (moment(res.data.plan.started_at).add(Number(res.data.plan.days), "days") >= moment()) {
                hasSomeIssue = true;
                daysLeft = moment(res.data.plan.started_at).add(Number(res.data.plan.days), "days").diff(moment(), 'days') + 1
            } else if (moment(res.data.plan.started_at).add(Number(res.data.plan.days), "days") < moment()) {
                hasSomeIssue = false;
                daysLeft = moment(res.data.plan.started_at).add(Number(res.data.plan.days), "days").diff(moment(), 'days');
            } else {
                hasSomeIssue = true;
            }

            authenticated = true;
            data = res.data;
            localStorage.setItem("username", res.data.data.user.username);
            localStorage.setItem("plan", JSON.stringify(res.data.plan));
        }
    }).catch(err => toast.error(err.message));

    if (authenticated) {
        if (!!hasLink) {
            window.location.href = hasLink;
        }
        return { data, hasSomeIssue, planName, daysLeft };
    }
    return redirect("/login")
}

function Main() {

    const dispatch = useDispatch();
    const { state } = useNavigation();
    const { data, hasSomeIssue, planName, daysLeft } = useLoaderData();

    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (hasSomeIssue && window.location.pathname.search('plan') === -1 && hasSomeIssue && window.location.pathname.search('subscription') === -1) {
            navigate("/subscription");
            if (Object.keys(data.plan.subscription_details).length > 0) {
                toast.error("Your plan is expired.")
            } else {
                toast.error("Subscribe a plan to continue our services.")
            }
        }
        const dataToSet = { ...data, planName, daysLeft }
        dispatch(setAuthData(dataToSet));
    }, [location])

    if (hasSomeIssue && window.location.pathname.search('plan') === -1 && hasSomeIssue && window.location.pathname.search('subscription') === -1) {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                <p>loading...</p>
            </div>
        )
    }
    return (
        <>
            {state === 'loading' && (
                <ProgressBar animated now={100} label="loading..." style={{ position: 'absolute', top: 0, width: '100vw' }} />
            )}
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
        </>
    )
}

export default Main
