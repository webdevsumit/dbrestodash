import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { getDescByProductIdAPI, saveDescByProductIdAPI } from '../../apis/common';
import toast from 'react-hot-toast';

function InvoiceBox({ url }) {
    return (
        <Modal
            show={true}
            // onHide={() => { }}
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