import React, { useEffect, useState } from 'react'

function UserBills() {

    const [olderBills, setOlderBills] = useState([]);

    useEffect(() => {
        let olderBillsFromLS = localStorage.getItem("olderBills");
        if (!!olderBillsFromLS) {
            olderBillsFromLS = JSON.parse(olderBillsFromLS);
            if (!!olderBillsFromLS && olderBillsFromLS.length > 0) {
                setOlderBills(olderBillsFromLS);
            }
        }
    }, []);

    return (
        <div className='p-4'>
            {olderBills.map(bill =>
                <React.Fragment key={bill}>
                    <a className='btn btn-primary w-100 mb-2' href={bill}>{bill.split("/")[bill.split("/").length - 1]}</a> <br />
                </React.Fragment>
            )}
            {olderBills.length === 0 && <p>Empty</p>}
            {!!olderBills.length && <button className='btn btn-danger w-100 mb-2' onClick={() => { localStorage.removeItem("olderBills"); setOlderBills([]); }} >Remove All</button>}
        </div>
    )
}

export default UserBills
