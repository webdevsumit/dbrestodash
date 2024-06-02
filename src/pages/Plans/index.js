import React, { useEffect, useState } from 'react';
import "./style.css"
import { getPlanIdsAPI, subscribePlanAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import { Modal } from 'react-bootstrap';

const sampleCardsData = [
    {
        id: 3,
        plan_name: "premium",
        type: 'pro',
        title: 'Premium',
        description: 'Lorem ipsum',
        price: 699,
        deleted: 999,
        mostPopular: false,
        data: ['50 QR Codes', '8 Sub Accounts', 'Inventory Management', '24/7 Chat Support']
    }
];

function Plans() {

    const [refreshBox, setRefreshBox] = useState(false);
    const [cardsData, setCardsData] = useState(null);

    const fetchIds = async () => {
        await getPlanIdsAPI().then(res => {
            if (res.data.status === "success") {
                setCardsData({
                    ...sampleCardsData,
                    price: res.data.price,
                    qr_codes: res.data.qr_codes,
                    sub_accounts: res.data.sub_accounts,
                    plan_id: res.data.plan_id,
                    current_plan_id: res.data.current_plan_id,
                })
            } else {
                toast.error(res.data.message)
            }
        }).catch(err => toast.error(err.message))
    }

    useEffect(() => {
        fetchIds();
    }, [])

    const handleClick = async (plan_id, plan_name) => {
        if (plan_id === cardsData.current_plan_id) {
            toast("This is your current plan.");
            return;
        }
        if (!plan_id || !plan_name) {
            toast.error("Something is missing.");
            return;
        }
        const loader = toast.loading("Creating, Please not not refresh...", { duration: 20000 });
        await subscribePlanAPI({ plan_id, plan_name }).then(res => {
            if (res.data.status === "success") {
                setRefreshBox(true);
                window.open(res.data.link, '_blank').focus();
            } else {
                toast.error(res.data.message)
            }
        }).catch(err => toast.error(err.message));
        toast.dismiss(loader);
    }

    return (
        <>
            <Modal show={refreshBox}>
                <Modal.Header>
                    <Modal.Title>Refresh the page.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please refresh the page after subscription.</p>
                </Modal.Body>
                <Modal.Footer>
                    <a className='btn btn-primary' href='/'>Refresh</a>
                </Modal.Footer>
            </Modal>
            <div className='p-4 pt-0 ms-4'>
                {!!cardsData && <RenderCards cardsData={cardsData} handleClick={handleClick} />}
                <p className='w-100 text-center'>Contact us for any inquiry, custom plan or for any discount.</p>
            </div>
        </>
    )
}

export default Plans


function RenderCards({ cardsData, handleClick }) {
    return (
        <div className="plan-app-wrapper">
            <div className={`plan-card pricing-card pro`}>
                <div className="plan-card-description">
                    <h2>Custom Plan</h2>
                    {/* <p>{description}</p> */}
                </div>
                <div className="plan-card-billing">
                    <p>
                        <strong className="price">₹ {cardsData.price}</strong>
                        <strong> / mo.</strong>
                    </p>
                    <p>
                        <span style={{ opacity: 0.8 }} className="">
                            Including GST.
                        </span>
                    </p>
                </div>
                <div className="plan-card-features">
                    <ul>
                        <li>Upto {cardsData.qr_codes} QR Codes</li>
                        <li>Upto {cardsData.sub_accounts} Sub Accounts</li>
                        <li>Inventory Management</li>
                        <li>24/7 Chat Support</li>
                    </ul>
                </div>
                <div className="plan-card-action">
                    <button onClick={() => handleClick(cardsData.plan_id, "Custom")}>{cardsData.current_plan_id === cardsData.plan_id ? "PLAN ACTIVATED" : "BUY NOW"}</button>
                </div>
            </div>
        </div>
    );
};
