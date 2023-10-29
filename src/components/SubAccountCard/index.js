import React, { useState } from 'react'
import { saveSubAccountDataApi } from '../../apis/common';
import toast from 'react-hot-toast';

function SubAccountCard({ index, subAccount, newToAdd, onUpdateData, onDeleteCard }) {

    const returnDefaultData = () => {
        return { ...subAccount, contact_number: !newToAdd ? subAccount.user.username : subAccount.contact_number }
    }

    const [data, setData] = useState(returnDefaultData());
    const [newAccout, setNewAccount] = useState(newToAdd)

    const onClickDisableEnable = async () => {

    }

    const onSubmitForm = async () => {
        await saveSubAccountDataApi({ ...data, userId: subAccount.user?.id }).then(res => {
            if (res.data.status === "success") {
                setData(prev => ({ ...prev, id: res.data.id }));
                onUpdateData({ ...data, id: res.data.id }, index, newAccout ? res.data.id : null);
                setNewAccount(false)
                toast.success("Saved Successfully.")
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
    }

    return (
        <div className='card subaccount-card p-2 m-2'>
            <form className='mx-4 mt-4' onSubmit={e => { e.preventDefault(); onSubmitForm(); }}>
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
                    <label htmlFor={"contact_number" + index}>Contact Number (without space)</label>
                    <input
                        type="number"
                        className="form-control "
                        id={"contact_number" + index}
                        placeholder="Contact number"
                        value={data.contact_number}
                        onChange={e => setData(prev => ({ ...prev, "contact_number": e.target.value }))}
                    />
                </div>
                <div className="form-group my-2">
                    <label htmlFor={"password" + index}>Password</label>
                    <input
                        type='password'
                        className="form-control "
                        id={"password" + index}
                        placeholder="New password"
                        value={data.password}
                        onChange={e => setData(prev => ({ ...prev, "password": e.target.value }))}
                    />
                    {!newAccout && <small>* Leave blank, if you don't want to change it.</small>}
                </div>
                <button type="submit" className="btn btn-success btn-min-width m-1">Save</button>
                {
                    (index !== 0 || !newAccout) &&
                    <button type="button" onClick={() => {
                        if (newAccout) onDeleteCard(index);
                        else setData(returnDefaultData())
                    }} className="btn btn-secondary btn-min-width m-1">{newAccout ? 'Cancel' : 'Discard'}</button>
                }
                {
                    !newAccout &&
                    <button type="button" onClick={onClickDisableEnable} className="btn btn-danger btn-min-width m-1">{subAccount.is_diabled ? 'Enable' : 'Disable'}</button>
                }
            </form>
        </div>
    )
}

export default SubAccountCard
