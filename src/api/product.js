import { basePath, apiVersion } from "./config";


export function getProductsApi() {
    const url = `${basePath}/${apiVersion}/get-products`;

    return fetch(url)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

//funcion para obtener los cursos de udemy consume el api de udemy
export function getCourseDataUdemyApi(id) {
    // const url = `https://www.udemy.com/api-2.0/courses/${id}`;
    const baseUrl = `https://www.udemy.com/api-2.0/courses/238934/?fields[course]=title,headline,url,price,image_480x270`;
    const coursesParams = `?fields[course]=title,headline,url,price,image_480x270`;
    const url = baseUrl + coursesParams;

    return fetch(url)
        .then(async response => {
            return { code: response.status, data: await response.json() };
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function deleteProductApi(token, id) {
    const url = `${basePath}/${apiVersion}/delete-product/${id}`;

    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}


export function addProductApi(token, product) {
    const url = `${basePath}/${apiVersion}/add-product`;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "applition/json",
            Authorization: token
        },
        body: JSON.stringify(product)
    };
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}


export function updateProductApi(token, id, data) {

    const url = `${basePath}/${apiVersion}/update-product/${id}`;

    const params = {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}