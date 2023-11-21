import React, { useEffect, useState } from 'react';
import './style.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { addImageByProductIdAPI, deleteImageByProductIdAndImageIdAPI, getImagesByProductIdAPI, replaceImageByProductIdAndImageIdAPI } from '../../apis/common';
import { toast } from 'react-hot-toast';

function ImageGallery({ productId, productImages = null }) {

    const [images, setImages] = useState(null);

    // Defining image width and height...
    var windowInnerWidth = document.getElementById("image_modal_header")?.offsetWidth - 25;
    var windowInnerHeight = window.innerHeight;
    var imageSize = windowInnerWidth < windowInnerHeight ? windowInnerWidth : windowInnerHeight - 300;

    const getImages = async () => {
        await getImagesByProductIdAPI({ "id": productId }).then(res => {
            if (res.data.status === "success") {
                setImages(res.data.images);
            } else {
                toast.error(res.message)
            }
        }).catch(err => toast.error(err.message))
    }

    useEffect(() => {
        if (!!productImages) {
            setImages(productImages);
        } else {
            getImages();
        }
        // eslint-disable-next-line
    }, []);

    const onAddImage = async (e) => {
        if (images.length === 3) {
            toast.error("Cannot add more than 3 images.");
            return;
        }
        let image = e.target.files[0];
        if (!image) {
            toast.error("Image not found.");
            return;
        }
        if (image.size / 1024 > 500) {
            toast.error("Image Size should be less than 500 KB.");
            return;
        }

        let formdata = new FormData();
        formdata.append("id", productId);
        formdata.append("image", image);

        const toastId = toast.loading("Saving Image...")
        await addImageByProductIdAPI(formdata).then(res => {
            if (res.data.status === "success") {
                setImages(prevData => [...prevData, res.data.image]);
                toast.success("Added Successfully.")
            } else {
                toast.error(res.data.message)
            }
        }).catch(err => toast.error(err.message));
        toast.dismiss(toastId);
    }

    const onReplaceImage = async (e, imageId) => {
        let image = e.target.files[0];
        if (!image) {
            toast.error("Image not found.");
            return;
        }
        if (image.size / 1024 > 500) {
            toast.error("Image Size should be less than 500 KB.");
            return;
        }

        let formdata = new FormData();

        formdata.append("id", productId);
        formdata.append("imageId", imageId);
        formdata.append("image", image);

        const toastId = toast.loading("Saving Image...")
        await replaceImageByProductIdAndImageIdAPI(formdata).then(res => {
            if (res.data.status === "success") {
                setImages(prevData => prevData.map(tImage => {
                    if (tImage.id === imageId) return { id: tImage.id, image: res.data.image.image };
                    return tImage;
                }));
                toast.success("Saved Successfully.")
            } else {
                toast.error(res.data.message)
            }
        }).catch(err => toast.error(err.message));
        toast.dismiss(toastId);
    }

    const deleteImage = async (imageId) => {
        await deleteImageByProductIdAndImageIdAPI({ id: productId, imageId }).then(res => {
            if (res.data.status === "success") {
                setImages(prevData => prevData.filter(tImage => tImage.id !== imageId));
                toast.success("Image deleted.");
            } else {
                toast.error(res.data.message)
            }
        }).catch(err => toast.error(err.message));
    }

    const customIndicator = (index) => <div className='imageGallery-custom-indicator'></div>

    return (
        (!images || images.length === 0) ? <>
            {(!!images && images.length === 0) ? <>
                <div>
                    <div className='ImageGallery-divStyle' style={{ width: `${imageSize}px`, height: `${imageSize}px`, 'backgroundImage': `url("/assets/pngs/add.jpeg")` }}>
                        <label className='ImageGallery-spanStyle' htmlFor='ImageGallery-new-image-input-new-one'>Add New</label>
                        <input type="file" id="ImageGallery-new-image-input-new-one" className="ImageGallery-new-image-input" accept="image/png, image/jpeg" onChange={onAddImage} />
                    </div>
                </div>
            </> : <>
                <div>
                    <div className='ImageGallery-divStyle' style={{ width: `${imageSize}px`, height: `${imageSize}px`, 'backgroundImage': `url("/assets/icons/pngs/editWhite.png")` }}>
                        <span className='ImageGallery-spanStyle'>loading...</span>
                    </div>
                </div>
            </>}
        </> : <>
            <Slide
                arrows={false}
                indicators={customIndicator}
                transitionDuration="500"
                autoplay={true}
                easing='cubic'
                key={images.length}
            >
                {images.map((slideImage, index) => (
                    <div key={index}>
                        <div className='ImageGallery-divStyle ImageGallery-background w-100' style={{ width: `${imageSize - 4}px`, height: `${imageSize}px`, 'backgroundImage': `url(${slideImage.image})` }}>
                            {!productImages && <>
                                <span className='ImageGallery-spanStyle' onClick={() => deleteImage(slideImage.id)}>Delete</span>
                                <label className='ImageGallery-spanStyle' htmlFor={`ImageGallery-new-image-change-input-${index}`}>Replace</label>
                                <input type="file" id={`ImageGallery-new-image-change-input-${index}`} className="ImageGallery-new-image-input" accept="image/png, image/jpeg" onChange={(e) => onReplaceImage(e, slideImage.id)} />
                                <label className='ImageGallery-spanStyle' htmlFor={`ImageGallery-new-image-input-${index}`}>Add New</label>
                                <input type="file" id={`ImageGallery-new-image-input-${index}`} className="ImageGallery-new-image-input" accept="image/png, image/jpeg" onChange={onAddImage} />
                            </>}
                        </div>
                    </div>
                ))}
            </Slide>
        </>
    )
}

export default ImageGallery