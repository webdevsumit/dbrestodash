import {
    createBrowserRouter, Outlet,
} from "react-router-dom";

import { loader as RazorPayGatewayLoader } from "../components/paymentPages/IndiaPayment/RazorPayGateway";
import RazorPayGateway from "../components/paymentPages/IndiaPayment/RazorPayGateway";
import Error404Page from './../components/Error404Page'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Error404Page />,
    },
    {
        path: "/preregistratoin",
        element: <Outlet />,
        errorElement: <Error404Page />,
        children: [
            {
                path: "/preregistratoin",
                element: <h1>Pre Registration</h1>,
                errorElement: <Error404Page />,
            },
            {
                path: "/preregistratoin/payment",
                element: <RazorPayGateway />,
                loader: RazorPayGatewayLoader,
            },
        ]
    },
    {
        path: "/waitinglist",
        element: <h1>Waiting List</h1>,
        errorElement: <Error404Page />,
    },
    // {
    //     path: "/:storeId/signup",
    //     loader: SignupLoader,
    //     element: <Signup />,
    // },
    // {
    //     path: "/:storeId/login",
    //     loader: LoginLoader,
    //     element: <Login />,
    // },
    // {
    //     path: "/:storeId/forgot-password",
    //     element: <ForgotPassword />,
    // },
    // {
    //     path: "/:storeId/sign-out",
    //     element: <SignOut />,
    //     loader: SignOutLoader,
    // },
]);