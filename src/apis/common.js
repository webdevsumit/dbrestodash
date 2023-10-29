import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/v1/';
// const baseUrl = 'https://be.dbresto.com/v1/';


export async function signupApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}auth/signup/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function loginApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}auth/login/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function checkUserAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}auth/checkAuth/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function signOutdApi() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}auth/logout/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getAccountDataApi() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}account/getAccountData/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function saveAccountDataApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/saveAccountData/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

// ===========================================================================

export async function sendOtpOnMailApi(payloads, storeId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}customer_app/${storeId}/sendOtpOnMail/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    // 'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function resetPasswordApi(payloads, storeId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}customer_app/${storeId}/resetPassword/`,
            payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    // 'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}
