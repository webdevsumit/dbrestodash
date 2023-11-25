import {
    createBrowserRouter, Outlet,
} from "react-router-dom";

import { loader as RazorPayGatewayLoader } from "../components/paymentPages/IndiaPayment/RazorPayGateway";
import RazorPayGateway from "../components/paymentPages/IndiaPayment/RazorPayGateway";
import Error404Page from './../components/Error404Page'
import Dashboard from "../pages/Dashboard";
import Main, { mainLoader } from "../pages/Main";
import Settings from '../pages/Settings';
import Inventory from "../pages/Inventory";
import Qrcodes from "../pages/Qrcodes";
import Orders from "../pages/Orders";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Menu from "../pages/Menu";
import MenuCart from "../pages/MenuCart";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        loader: mainLoader,
        errorElement: <Error404Page />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
            {
                path: "/inventory",
                element: <Inventory />,
            },
            {
                path: "/qrcodes",
                element: <Qrcodes />,
            },
            {
                path: "/orders",
                element: <Orders />,
            },
        ]
    },
    {
        path: "/:storeId/:qrId",
        element: <Outlet />,
        errorElement: <Error404Page />,
        children: [
            {
                path: "/:storeId/:qrId/payment",
                element: <RazorPayGateway />,
                loader: RazorPayGatewayLoader,
            }
        ]
    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <Error404Page />,
    },
    {
        path: "/signup/:plan",
        element: <Signup />,
        errorElement: <Error404Page />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <Error404Page />,
    },
    {
        path: "/forgotpassword",
        element: <ForgotPassword />,
        errorElement: <Error404Page />,
    },
    {
        path: "/menu/:menuId",
        element: <Menu />,
        errorElement: <Error404Page />,
        children: [
            {
                path: "/menu/:menuId/cart",
                element: <MenuCart />,
                errorElement: <Error404Page />,
            }
        ]
    },
]);