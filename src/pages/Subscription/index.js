import React, { useState } from 'react'
import { cancelSubscribePlanAtMonthEndAPI, getSubscriptionDetailsAPI } from '../../apis/common'
import toast from 'react-hot-toast';
import { Link, redirect, useLoaderData } from 'react-router-dom';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import moment from 'moment';

export const subscriptionLoader = async () => {
    let data;
    await getSubscriptionDetailsAPI().then(res => {
        if (res.data.status === "success") {
            data = res.data.data;
        }
    }).catch(err => toast.error(err.message));
    if (!!data) {
        return { "subscriptionData": data }
    }
    return redirect("/plans")
}

function Subscription() {

    const { subscriptionData } = useLoaderData();
    const [data, setData] = useState(subscriptionData);
    const [showCancelBox, setShowCancelBox] = useState(false);
    const [cancelReason, setCancelReason] = useState("");

    const cancelPlan = async () => {
        if (cancelReason.length < 25) {
            toast.error("Provide atleast 25 characters in the reason.");
            return;
        }
        const loader = toast.loading("Canceling the plan...", {duration: 20000})
        await cancelSubscribePlanAtMonthEndAPI({ "reason": cancelReason }).then(res => {
            if (res.data.status === "success") {
                setData(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.error));
        setShowCancelBox(false);
        toast.dismiss(loader);
    }

    return (
        <>
            <Modal show={showCancelBox} onHide={() => setShowCancelBox(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Provide reason</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Reason</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={cancelReason}
                                onChange={e => {
                                    if(e.target.value.length<=1000)
                                        setCancelReason(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <small className='fw-bold'><span className={cancelReason.length < 25 ? "m-0 text-danger" : "m-0"}>{cancelReason.length}</span>/1000</small>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCancelBox(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={cancelPlan}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card className='shadow p-4 ms-4 me-3 my-2 border-none border-15'>
                <h3 className='h3'>Subscription Details</h3>
                <table className='table'>
                    <tbody>
                        <tr>
                            <td>Plan Name</td>
                            <td>:</td>
                            <td>{data.notes.name.toUpperCase()}</td>
                        </tr>
                        <tr>
                            <td>Business Name</td>
                            <td>:</td>
                            <td>{data.notes.business_name}</td>
                        </tr>
                        <tr>
                            <td>Owner Name</td>
                            <td>:</td>
                            <td>{data.notes.owner_name}</td>
                        </tr>
                        <tr>
                            <td>Generate QR Codes upto</td>
                            <td>:</td>
                            <td>{data.notes.qr_codes}</td>
                        </tr>
                        <tr>
                            <td>Create sub accounts upto</td>
                            <td>:</td>
                            <td>{data.notes.sub_accounts}</td>
                        </tr>
                        <tr>
                            <td>Create at</td>
                            <td>:</td>
                            <td>{moment.unix(data.created_at).format("DD/MM/YYYY")}</td>
                        </tr>
                        <tr>
                            <td>Cycled at</td>
                            <td>:</td>
                            <td>{moment.unix(data.current_start).format("DD/MM/YYYY")}</td>
                        </tr>
                        <tr>
                            <td>Expires at</td>
                            <td>:</td>
                            <td>{moment.unix(data.current_end).format("DD/MM/YYYY")}</td>
                        </tr>
                        <tr>
                            <td>Payment method used</td>
                            <td>:</td>
                            <td>{data.payment_method}</td>
                        </tr>
                        <tr>
                            <td>Subscription Id</td>
                            <td>:</td>
                            <td>{data.id}</td>
                        </tr>
                        <tr>
                            <td>Payment Status</td>
                            <td>:</td>
                            <td>{data.status}</td>
                        </tr>
                        <tr>
                            <td>Pay</td>
                            <td>:</td>
                            <td><a target='blank' href={data.short_url}>{data.short_url}</a></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <Link to="/plans"><span className='btn btn-primary me-2'>Plans</span></Link>
                    <button className='btn btn-secondary ' onClick={() => setShowCancelBox(true)}>Cancel Plan</button>
                </div>
                <small className='mt-3 mb-0'><i>Any kind of refund is not applicable on Canceling, Upgrading or Downgrading the plan.</i></small>
                <small className='mt-0'><i>Plan can only be cancelled if the payment status is not completed.</i></small>
                <small className='mt-0'><i>For any query please contact, +91 7999004229.</i></small>
            </Card>
        </>
    )
}

export default Subscription
