import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { getDescByProductIdAPI, saveDescByProductIdAPI } from '../../apis/common';
import toast from 'react-hot-toast';

function DescModal({ show, onHide, product }) {
    const [text, setText] = useState("");
    const [localShow, setLocalShow] = useState(show);
    const onLocaLHide = () => {
        setLocalShow(false);
        setTimeout(() => {
            onHide();
        }, 400);
    }

    const saveDesc = async () => {
        if (!text) return;
        const loaderId = toast.loading("Saving...")
        await saveDescByProductIdAPI({ id: product.id, text }).then(res => {
            if (res.data.status === "success") {
                toast.success("Saved Description");
                onLocaLHide();
            } else toast.error(res.data.message)
        }).catch(err => toast.error(err.message))
        toast.dismiss(loaderId);
    }

    const getDesc = async () => {
        const loaderId = toast.loading("Saving...")
        await getDescByProductIdAPI({ id: product.id }).then(res => {
            if (res.data.status === "success") {
                setText(res.data.text);
            } else toast.error(res.data.message)
        }).catch(err => toast.error(err.message))
        toast.dismiss(loaderId);
    }

    useEffect(() => {
        getDesc();
    }, [product]);

    return (
        <Modal
            show={localShow}
            onHide={onLocaLHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Product Description
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={text} onChange={e => setText(e.target.value)} rows={5} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-success' onClick={saveDesc}>Save</Button>
                <Button onClick={onLocaLHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DescModal;