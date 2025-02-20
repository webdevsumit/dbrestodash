import axios from "axios";

export let baseUrl = 'http://127.0.0.1:8000/v1/';
if(window.location.protocol === 'https:') baseUrl = 'https://be.dbresto.com/v1/';


const APICalller = async (method, url, payload = {}, ContentType = "application/json") => {
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

export async function loginSubAccountApi(payloads) {
    return APICalller("POST", "auth/loginSubAccount/", payloads);
}

export async function sendOtpApi(payloads) {
    return APICalller("POST", "auth/sendOtp/", payloads);
}

export async function resetPasswordApi(payloads) {
    return APICalller("POST", "auth/resetPassword/", payloads);
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

export async function getImagesByProductIdAPI(payload) {
    return APICalller("POST", "inventory/getImagesByProductId/", payload);
}

export async function addImageByProductIdAPI(payload) {
    return APICalller("POST", "inventory/addImageByProductId/", payload, "multipart/form-data");
}
export async function deleteImageByProductIdAndImageIdAPI(payload) {
    return APICalller("POST", "inventory/deleteImageByProductIdAndImageId/", payload, "multipart/form-data");
}

export async function replaceImageByProductIdAndImageIdAPI(payload) {
    return APICalller("POST", "inventory/replaceImageByProductIdAndImageId/", payload, "multipart/form-data");
}

export async function saveDescByProductIdAPI(payload) {
    return APICalller("POST", "inventory/saveDescByProductId/", payload);
}

export async function getDescByProductIdAPI(payload) {
    return APICalller("POST", "inventory/getDescByProductId/", payload);
}

export async function filterProductsAPI(payload) {
    return APICalller("POST", "inventory/filterProducts/", payload);
}

export async function createOrderAPI(payload) {
    return APICalller("POST", "inventory/createOrder/", payload);
}

export async function filterOrdersAPI(payload) {
    return APICalller("POST", "inventory/filterOrders/", payload);
}

export async function completeOrderAPI(payload) {
    return APICalller("POST", "inventory/completeOrder/", payload);
}

export async function cancelOrderAPI(payload) {
    return APICalller("POST", "inventory/cancelOrder/", payload);
}

export async function undoOrderAPI(payload) {
    return APICalller("POST", "inventory/undoOrder/", payload);
}

export async function dashboardDataAPI(payload) {
    return APICalller("GET", "inventory/dashboard-data/", payload);
}

export async function orderSalesDataAPI(payload) {
    return APICalller("POST", "inventory/order-sales-data/", payload);
}

export async function numberOfProductsSoldAPI(payload) {
    return APICalller("POST", "inventory/number-of-products-sold/", payload);
}

export async function fetchMenuDataAPI(payload) {
    return APICalller("POST", "menu/fetchMenuData/", payload);
}

export async function fetchMenuProductDataAPI(payload) {
    return APICalller("POST", "menu/fetchMenuProductData/", payload);
}

export async function fetchMenuCartDataAPI(payload) {
    return APICalller("POST", "menu/fetchMenuCartData/", payload);
}

export async function getPaymentDetailsAPI(payload={}) {
    return APICalller("GET", "account/getPaymentDetails/", payload);
}

export async function setPaymentDetailsAPI(payload) {
    return APICalller("POST", "account/setPaymentDetails/", payload);
}

export async function createOrderFromMenuAPI(payload) {
    return APICalller("POST", "menu/createOrderFromMenu/", payload);
}

export async function getQrCodesAPI(payload={}) {
    return APICalller("GET", "account/getQrCodes/", payload);
}

export async function generateQrCodeAPI(payload={}) {
    return APICalller("GET", "account/generateQrCode/", payload);
}

export async function saveQrCodeAPI(payload={}) {
    return APICalller("POST", "account/saveQrCode/", payload);
}

export async function moveToTrashAndRestoreQrCodeAPI(payload={}) {
    return APICalller("POST", "account/moveToTrashAndRestoreQrCode/", payload);
}

export async function getPlanIdsAPI(payload) {
    return APICalller("GET", "auth/getPlanIds/", payload);
}

export async function subscribePlanAPI(payload) {
    return APICalller("POST", "auth/subscribePlan/", payload);
}

export async function getSubscriptionDetailsAPI(payload) {
    return APICalller("GET", "auth/getSubscriptionDetails/", payload);
}

export async function cancelSubscribePlanAtMonthEndAPI(payload) {
    return APICalller("POST", "auth/cancelSubscribePlanAtMonthEnd/", payload);
}

export async function fetchOrdersOnTableAPI(payload) {
    return APICalller("POST", "inventory/fetchOrdersOnTable/", payload);
}

export async function getRawMaterialsAPI(payload) {
    return APICalller("POST", "inventory/get-raw-materials/", payload);
}

export async function addRawMaterialAPI(payload) {
    return APICalller("POST", "inventory/add-raw-material/", payload);
}

export async function addNewUnitAPI(payload) {
    return APICalller("POST", "inventory/add-new-unit/", payload);
}

export async function deleteUnitByIdAPI(payload) {
    return APICalller("POST", "inventory/delete-unit-by-id/", payload);
}

export async function getRawMaterialDetailsAPI(payload) {
    return APICalller("POST", "inventory/getRawMaterialDetails/", payload);
}

export async function addMoreQuantityAPI(payload) {
    return APICalller("POST", "inventory/addMoreQuantity/", payload);
}
