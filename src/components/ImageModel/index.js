import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ImageGallery from '../ImageGallery';

function ImageModel(props) {
    const [product, setProduct] = useState(props.product);

    useEffect(()=>{
        setProduct(props.product);
    }, [props.product])
    
    return (
        <Modal
            {...props}
            size="500px"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
    
        >
            <Modal.Header closeButton id='image_modal_header'>
                <Modal.Title id="contained-modal-title-vcenter">
                    Product Images
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!!product && <ImageGallery productId={product.id} />}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ImageModel;