import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import './style.css'
import SubAccountCard from '../SubAccountCard';

function SubAccountSettings({ subAccountsData }) {

    const subaccountTemplate = {
        "contact_number": "",
        "email": "",
        "password": "",
    }

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
        <Card className='settings-card shadow-lg p-4 ms-4 border-none border-15'>
            <div className='d-flex'>
                <h3 className='h3 text-decoration-underline'>Sub Accounts</h3>
                <button onClick={() => setData(prev => [{ ...subaccountTemplate }, ...prev])} className='btn btn-primary ms-4'>Add New</button>
            </div>
            <div className='w-100 d-flex subaccount'>
                {data.map((subAcc, index) =>
                    <SubAccountCard key={!!subAcc.id ? `${subAcc.id}${index}` : index} index={index} newToAdd={!subAcc.id} arrLen={data.length} subAccount={subAcc} onUpdateData={onUpdateData} onDeleteCard={onDeleteCard} />
                )}
            </div>
        </Card>
    )
}

export default SubAccountSettings
