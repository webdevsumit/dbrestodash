import './App.css';
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from './actions/routes';
import { Toaster } from 'react-hot-toast';
import smartlookClient from 'smartlook-client';

function App() {

	useEffect(() => {
		if (window.location.protocol === 'https:') {
			smartlookClient.init('274c0819d2e0ed0caaf2b06d93cbf2f3591f397e');
			console.log("someasdlfkjalksjdf");
		}
	}, [])

	return (
		<div>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous"></link>
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 5000,
				}}
			/>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
