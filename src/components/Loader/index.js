import React, { } from 'react'
import { Card } from 'react-bootstrap';

function Loader() {

    return (
        <Card className='settings-card shadow-lg p-4 ms-4 border-none border-15 loader-h-100 d-flex justify-content-center align-items-center'>
            <img className='image-loader' src='/assets/gifs/loader.gif' alt='loader' />
            loading...
        </Card>
    )
}

export default Loader
