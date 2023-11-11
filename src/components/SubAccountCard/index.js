import React, { useState } from 'react'
import { changeSubAccountPassApi, changeSubAccountStatusAPI, saveSubAccountDataApi } from '../../apis/common';
import toast from 'react-hot-toast';
import './style.css';

function SubAccountCard({ index, subAccount, newToAdd, arrLen, onUpdateData, onDeleteCard }) {

    const returnDefaultData = () => {
        return { ...subAccount, contact_number: !newToAdd ? subAccount.user.username : subAccount.contact_number }
    }

    const [data, setData] = useState(returnDefaultData());
    const [newAccout, setNewAccount] = useState(newToAdd);
    const [changingPass, setChangingPass] = useState(false);

    const onClickDisableEnable = async () => {
        await changeSubAccountStatusAPI({ ...data, userId: subAccount.user?.id }).then(res => {
            if (res.data.status === "success") {
                setData(prev => ({ ...prev, "is_diabled": res.data.is_diabled }));
                onUpdateData({ ...returnDefaultData(), "is_diabled": res.data.is_diabled }, index, data.id);
                toast.success("Saved Successfully.")
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
    }

    const changeNameEmail = async () => {
        await saveSubAccountDataApi({ ...data, userId: subAccount.user?.id }).then(res => {
            if (res.data.status === "success") {
                setData(prev => ({ ...prev, id: res.data.id }));
                onUpdateData({ ...res.data.data }, index, !newAccout ? res.data.data.id : null);
                setNewAccount(false)
                toast.success("Saved Successfully.")
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
    }

    const changePass = async () => {
        await changeSubAccountPassApi({ ...data, userId: subAccount.user?.id }).then(res => {
            if (res.data.status === "success") {
                setData(prev => ({ ...prev, password: "" }));
                setChangingPass(false);
                toast.success("Changed Successfully.")
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
    }

    const onSubmitForm = async () => {
        if (changingPass) {
            changePass();
        } else {
            changeNameEmail();
        }
    }


    return (
        <div className='card subaccount-card p-2 m-2'>
            <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onSubmitForm(); }}>
                {
                    !changingPass &&
                    <>
                        <div className="form-group my-2">
                            <label htmlFor={"name" + index}>Name</label>
                            <input
                                className="form-control "
                                id={"name" + index}
                                placeholder="Name"
                                value={data.name}
                                onChange={e => setData(prev => ({ ...prev, "name": e.target.value }))}
                            />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor={"contact_number" + index}>Contact Number (12 digits, no space)</label>
                            <input
                                type="number"
                                className="form-control "
                                id={"contact_number" + index}
                                placeholder="Contact number"
                                value={data.contact_number}
                                onChange={e => setData(prev => ({ ...prev, "contact_number": e.target.value }))}
                            />
                        </div>
                        <div className='row ms-1 my-2'>
                            <div className="col-6 form-check">
                                <input type="checkbox" checked={data.access_dashboard} onChange={e => setData(prev => ({ ...prev, "access_dashboard": e.target.checked }))} className="form-check-input cursor-pointer" id={"dashboard"+index} />
                                <label className="form-check-label cursor-pointer" htmlFor={"dashboard"+index}>Dashboard</label>
                            </div>
                            <div className="col-6 form-check">
                                <input type="checkbox" checked={data.access_settings} onChange={e => setData(prev => ({ ...prev, "access_settings": e.target.checked }))} className="form-check-input cursor-pointer" id={"access_settings"+index} />
                                <label className="form-check-label cursor-pointer" htmlFor={"access_settings"+index}>Settings</label>
                            </div>
                            <div className="col-6 form-check">
                                <input type="checkbox" checked={data.access_inventory} onChange={e => setData(prev => ({ ...prev, "access_inventory": e.target.checked }))} className="form-check-input cursor-pointer" id={"access_inventory"+index} />
                                <label className="form-check-label cursor-pointer" htmlFor={"access_inventory"+index}>Inventory</label>
                            </div>
                            <div className="col-6 form-check">
                                <input type="checkbox" checked={data.access_qrcodes} onChange={e => setData(prev => ({ ...prev, "access_qrcodes": e.target.checked }))} className="form-check-input cursor-pointer" id={"access_qrcodes"+index} />
                                <label className="form-check-label cursor-pointer" htmlFor={"access_qrcodes"+index}>Qr Codes</label>
                            </div>
                            <div className="col-6 form-check">
                                <input type="checkbox" checked={data.access_orders} onChange={e => setData(prev => ({ ...prev, "access_orders": e.target.checked }))} className="form-check-input cursor-pointer" id={"access_orders"+index} />
                                <label className="form-check-label cursor-pointer" htmlFor={"access_orders"+index}>Orders</label>
                            </div>
                        </div>
                    </>
                }
                {
                    !newAccout &&
                    <>
                        <small className="form-text mb-4">Status: <span className={`text-${data.is_diabled ? 'danger' : "success"} subaccountCardStatus`}>{data.is_diabled ? "Deactivated" : 'Activated'}</span></small>
                        <br />
                    </>
                }
                {
                    (changingPass || newToAdd) ?
                        <div className="form-group my-2">
                            <label htmlFor={"pass" + index} >Password</label>
                            <input
                                type='password'
                                className="form-control "
                                id={"pass" + index}
                                placeholder="New password"
                                value={data.password}
                                onChange={e => setData(prev => ({ ...prev, "password": e.target.value }))}
                            />
                        </div>
                        :
                        <>
                            <small id={"passHelp"+index} onClick={() => setChangingPass(prev => !prev)} className="form-text text-muted text-decoration-underline cursor-pointer mb-4">Click here to change password</small>
                            <br />
                        </>

                }
                <button type="submit" className="btn btn-success btn-min-width m-1">Save</button>
                {
                    (index !== 0 || !newAccout || arrLen > 1) &&
                    <button type="button" onClick={() => {
                        if (changingPass) setChangingPass(false);
                        else if (newAccout) onDeleteCard(index);
                        else setData(returnDefaultData())
                    }} className="btn btn-secondary btn-min-width m-1">{newAccout ? 'Cancel' : 'Discard'}</button>
                }

                {
                    (!newAccout && !changingPass) &&
                    <button type="button" onClick={onClickDisableEnable} className={`btn btn-${data.is_diabled ? "success" : 'danger'} btn-min-width m-1`}>{data.is_diabled ? 'Activate' : 'Deactivate'}</button>
                }
            </form>
        </div>
    )
}

export default SubAccountCard
