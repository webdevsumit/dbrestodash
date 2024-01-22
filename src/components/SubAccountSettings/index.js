import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import './style.css'
import SubAccountCard from '../SubAccountCard';
import { useSelector } from 'react-redux';
import { getAuthData } from '../../redux/navbar';
import { isMobile } from 'react-device-detect';

function SubAccountSettings({ subAccountsData }) {

    const subaccountTemplate = {
        "contact_number": "",
        "email": "",
        "password": "",
    }

    const authData = useSelector(getAuthData);

    const [data, setData] = useState(subAccountsData.length > 0 ? [...subAccountsData] : [{ ...subaccountTemplate }])

    const onUpdateData = async (newData, index, id = null) => {
        setData(prev => prev.map((subAcc, ind) => {
            if ((ind === index && !id) || (ind === index && id === subAcc.id)) return newData;
            else return subAcc;
        }));
    }

    const onDeleteCard = (index, id = null) => {
        setData(prev => prev.filter((subAcc, ind) => ind !== index));
    }

    return (
        <Card className={`settings-card shadow-lg ${isMobile ? '' : 'p-4 ms-4'} border-none border-15`}>
            <div className={isMobile ? 'd-flex px-4 pt-3' : 'd-flex'}>
                <h3 className='h3'>Sub Accounts</h3>
                <div>
                    <button onClick={() => setData(prev => [{ ...subaccountTemplate }, ...prev])} className='btn btn-primary btn-sm ms-4'>Add New</button>
                </div>
            </div>
            <hr className='m-0 mb-2' />
            <div className='w-100 d-flex subaccount'>
                {data.map((subAcc, index) =>
                    <SubAccountCard key={!!subAcc.id ? `${subAcc.id}${index}` : index} index={index} newToAdd={!subAcc.id} arrLen={data.length} subAccount={subAcc} onUpdateData={onUpdateData} onDeleteCard={onDeleteCard} loginUser={subAcc?.user?.id === authData?.data?.user?.id} />
                )}
            </div>
        </Card>
    )
}

export default SubAccountSettings
