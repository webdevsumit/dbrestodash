import React, { useEffect, useState } from 'react';
import "./style.css"
import { getPlanIdsAPI, subscribePlanAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import { Modal } from 'react-bootstrap';

function Plans() {

    const [planIds, setPlanIds] = useState(["3"]);
    const [currentPlanId, setCurrentPlanId] = useState("");
    const [refreshBox, setRefreshBox] = useState(false);

    const fetchIds = async () => {
        await getPlanIdsAPI().then(res => {
            if (res.data.status === "success") {
                setPlanIds(res.data.data);
                setCurrentPlanId(res.data.current_plan_id);
            } else {
                toast.error(res.data.message)
            }
        }).catch(err => toast.error(err.message))
    }

    useEffect(() => {
        fetchIds();
    }, [])

    const handleClick = async (plan_id, plan_name) => {
        if (plan_id === currentPlanId) {
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
                <RenderCards planIds={planIds} handleClick={handleClick} currentPlanId={currentPlanId} />
                <p className='w-100 text-center'>Contact us for any inquiry, custom plan or for any discount.</p>
            </div>
        </>
    )
}

export default Plans


function CardDescription({ title, description }) {
    return (
        <div className="plan-card-description">
            <h2>{title}</h2>
            {/* <p>{description}</p> */}
        </div>
    );
};

function CardBilling({ price, deleted }) {
    return (
        <div className="plan-card-billing">
            <p>
                <strong className="price">₹ {price}</strong>
                <strong> / mo.</strong>
            </p>
            <p>
                <span style={{ opacity: 0.8 }} className="deleted">
                    <del>₹ {deleted}/monthly</del>
                </span>
            </p>
        </div>
    );
};

function CardFeatures({ data }) {
    return (
        <div className="plan-card-features">
            <ul>
                {
                    data.map((item, index) => {
                        return (
                            <li key={index}>{item}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

function CardAction({ clickMe, planId, plan_name, currentPlanId }) {
    return (
        <div className="plan-card-action">
            <button onClick={() => clickMe(planId, plan_name)}>{currentPlanId === planId ? "PLAN ACTIVATED" : "BUY NOW"}</button>
        </div>
    );
};

function PricingCard(props) {
    const {
        type,
        title,
        description,
        price,
        deleted,
        mostPopular,
        data,
        clickMe,
        planId,
        plan_name,
        currentPlanId
    } = props;

    return (
        <div className={`plan-card pricing-card ${type}`}>
            {(mostPopular) ? <span className="most-popular">Mostly Bought</span> : null}
            <CardDescription title={title} description={description} />
            <CardBilling price={price} deleted={deleted} />
            <CardFeatures data={data} />
            <CardAction clickMe={clickMe} planId={planId} plan_name={plan_name} currentPlanId={currentPlanId} />
        </div>
    );
};

function RenderCards({ planIds, handleClick, currentPlanId }) {
    return (
        <div className="plan-app-wrapper">
            {
                cardsData.map((props, index) => {
                    return (
                        <PricingCard
                            {...props}
                            key={props.id}
                            clickMe={handleClick}
                            planId={planIds[index]}
                            currentPlanId={currentPlanId}
                        />
                    )
                })
            }
        </div>
    );
};

const cardsData = [
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
