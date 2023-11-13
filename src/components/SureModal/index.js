import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SureModal({ show, onHide, onYes }) {
   
    const [localShow, setLocalShow] = useState(show);
    const onLocaLHide = () => {
        setLocalShow(false);
        setTimeout(() => {
            onHide();
        }, 400);
    }

    return (
        <Modal
            show={localShow}
            onHide={onLocaLHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            // centered
            backdrop="static"
            keyboard={false}

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Action Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-warning' style={{width: '100px'}} onClick={onYes}>Yes</Button>
                <Button className='btn-secondary' style={{width: '100px'}} onClick={onLocaLHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SureModal;