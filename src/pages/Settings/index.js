import React, { useEffect, useState } from 'react';
import './style.css';
import GeneralSettings from '../../components/GeneralSettings';
import SubAccountSettings from '../../components/SubAccountSettings';
import { getAccountDataApi } from '../../apis/common';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import PaymentSettings from '../../components/PaymentSettings';
import { isMobile } from 'react-device-detect';

function Settings() {

  const [data, setData] = useState(null);

  const fetchData = async () => {
    await getAccountDataApi().then(res => {
      if (res.data.status === "success") {
        setData(res.data.data);
      } else toast.error(res.data.message)
    }).catch(err => toast.error(err.message))
  }

  useEffect(()=>{
    fetchData();
  }, [])

  if(!data) 
    return <Loader />

  return (
    <div className=''>
      <GeneralSettings accountData={data} />
      <div className={isMobile?'p-1':'p-3'}></div>
      <PaymentSettings />
      <div className={isMobile?'p-1':'p-3'}></div>
      <SubAccountSettings subAccountsData={data.sub_accounts} />
    </div>
  )
}

export default Settings
