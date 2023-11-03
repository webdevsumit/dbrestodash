import axios from "axios";

// const baseUrl = 'http://127.0.0.1:8000/v1/';
const baseUrl = 'https://be.dbresto.com/v1/';


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

export async function saveSubAccountDataApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/saveSubAccountData/`,
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

export async function changeSubAccountPassApi(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/changeSubAccountPass/`,
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

export async function changeSubAccountStatusAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/changeSubAccountStatus/`,
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

export async function changeLogoAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}account/changeLogo/`,
            payloads,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Accept': "application/json",
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}
