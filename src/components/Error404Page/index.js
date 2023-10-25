import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Error404Page() {
	return (
		<div className=''>
			<div className='Error404Page'>
				<h1>404</h1>
				<h2>Page Not Found</h2>
				<a href="https://dbresto.com">Go Back To Home</a>
			</div>
		</div>
	)
}

export default Error404Page