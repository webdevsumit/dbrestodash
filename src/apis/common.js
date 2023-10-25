import axios from "axios";

// const baseUrl = 'http://127.0.0.1:8000/v1/';
const baseUrl = 'https://be.dbresto.com/v1/';


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

export async function signOutdApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}customer_app/${localStorage.getItem("storeId")}/signOut/`,
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

export async function signupApi(payloads, storeId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}customer_app/${storeId}/signup/`,
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

export async function loginApi(payloads, storeId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}customer_app/${storeId}/login/`,
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

export async function checkAndSetUserAPI() {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}customer_app/${localStorage.getItem("storeId")}/checkAuth/`,
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

