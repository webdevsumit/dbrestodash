import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/v1/';
// const baseUrl = 'https://be.dbresto.com/v1/'n;


const APICalller = async (method, url, payload={}, ContentType="application/json") => {
    return await new Promise(async (onResolve, onReject) => {
        if (method === "POST") {
            await axios.post(
                `${baseUrl}${url}`,
                payload,
                {
                    headers: {
                        'Content-Type': ContentType,
                        'Accept': "application/json",
                        'Authorization': `Token ${localStorage.getItem("token")}`
                    }
                }
            )
                .then(res => onResolve(res))
                .catch(err => onReject(err));
        } else if (method === "GET") {
            await axios.get(
                `${baseUrl}${url}`,
                {
                    headers: {
                        'Content-Type': ContentType,
                        'Accept': "application/json",
                        'Authorization': `Token ${localStorage.getItem("token")}`
                    }
                }
            )
                .then(res => onResolve(res))
                .catch(err => onReject(err));
        }
    });
}


export async function signupApi(payloads) {
    return APICalller("POST", "auth/signup/", payloads);
}

export async function loginApi(payloads) {
    return APICalller("POST", "auth/login/", payloads);
}

export async function checkUserAPI() {
    return APICalller("GET", "auth/checkAuth/");
}

export async function signOutdApi() {
    return APICalller("GET", "auth/logout/");
}

export async function getAccountDataApi() {
    return APICalller("GET", "account/getAccountData/");
}

export async function saveAccountDataApi(payloads) {
    return APICalller("POST", "account/saveAccountData/", payloads);
}

export async function saveSubAccountDataApi(payloads) {
    return APICalller("POST", "account/saveSubAccountData/", payloads);
}

export async function changeSubAccountPassApi(payloads) {
    return APICalller("POST", "account/changeSubAccountPass/", payloads);
}

export async function changeSubAccountStatusAPI(payloads) {
    return APICalller("POST", "account/changeSubAccountStatus/", payloads);
}

export async function changeLogoAPI(payloads) {
    return APICalller("POST", "account/changeLogo/", payloads, "multipart/form-data");
}

export async function fetchProductsAPI() {
    return APICalller("GET", "inventory/fetchProducts/");
}

export async function fetchCategoriesAPI() {
    return APICalller("GET", "inventory/fetchCategories/");
}

export async function addNewCategoryAPI(payload) {
    return APICalller("POST", "inventory/addNewCategory/", payload);
}

export async function deleteCategoryByIdAPI(payload) {
    return APICalller("POST", "inventory/deleteCategoryById/", payload);
}

export async function addNewProductAPI(payload) {
    return APICalller("POST", "inventory/addNewProduct/", payload);
}

export async function changeProductStatusByIdAPI(payload) {
    return APICalller("POST", "inventory/changeProductStatusById/", payload);
}

export async function changeProductByIdAPI(payload) {
    return APICalller("POST", "inventory/changeProductById/", payload);
}
