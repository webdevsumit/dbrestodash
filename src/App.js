import './App.css';
import React, { } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from './actions/routes';
import { Toaster } from 'react-hot-toast';

function App() {
	
	return (
		<div>
			<Toaster 
				position="top-right" 
				toastOptions={{
						duration: 5000,
					}}
			/>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
