import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

function FullScreenModal() {

    const [showModal, setShowModal] = useState(true);

    function openFullScreen() {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    return (
        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Turn on full screen mode?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button className='btn-success' onClick={() => { openFullScreen(); setShowModal(false) }}>Okay</Button>
                <Button onClick={() => setShowModal(false)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FullScreenModal
