import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import "./style.css";

function FullScreenModal() {

    const [showModal, setShowModal] = useState(false);
    const [fullScreen, setFullscreen] = useState(false);

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
        setFullscreen(true);
    }

    function closeFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
        setFullscreen(false);
    }

    const onClosing = () => {
        setShowModal(false);
        localStorage.setItem("askedForFullScreen", "true");
    }

    useEffect(()=>{
        let askedForFullScreen = localStorage.getItem("askedForFullScreen");
        if(!askedForFullScreen){
            setShowModal(true);
        }
    }, [])

    return (
        <>
            <img onClick={() => {
                if(fullScreen){
                    closeFullScreen();
                }else{
                    openFullScreen();
                }
            }} className='fullScreenIcon' src='/assets/svgs/fullscreen.svg' alt='FS' />
            <Modal
                show={showModal}
                onHide={() => onClosing(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Full Screen Mode?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You can also do that later from lower right full screen icon.
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-success' onClick={() => { openFullScreen(); onClosing(false) }}>Okay</Button>
                    <Button onClick={() => onClosing(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default FullScreenModal
