import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { getDescByProductIdAPI, saveDescByProductIdAPI } from '../../apis/common';
import toast from 'react-hot-toast';

function InvoiceBox({ url, setInvoiceUrl }) {

    const [show, setShow] = useState(true);

    useEffect(() => {
        if (url) {
            let urlLst = [url];
            let olderBillsFromLS = localStorage.getItem("olderBills");
            if (!!olderBillsFromLS) {
                olderBillsFromLS = JSON.parse(olderBillsFromLS);
                if (!!olderBillsFromLS && olderBillsFromLS.length > 0) {
                    localStorage.setItem("olderBills", JSON.stringify([...olderBillsFromLS, ...urlLst]));
                }else{
                    localStorage.setItem("olderBills", JSON.stringify(urlLst));
                }
            }else{
                localStorage.setItem("olderBills", JSON.stringify(urlLst));
            }
        }
    }, []);

    const onHide = () => {
        setShow(false);
        setTimeout(()=>{
            setInvoiceUrl(null);
        }, 400);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            // size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order Created
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Your food is on the way. Don't forget to pay the bill.
            </Modal.Body>
            <Modal.Footer>
                <a className='btn btn-primary' href={url}>Check Invoice</a>
            </Modal.Footer>
        </Modal>
    );
}

export default InvoiceBox;