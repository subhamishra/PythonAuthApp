import axios from 'axios';

const parsedError = (response) => {
    if (response.status === 401) {
        const message = 'Your session has expired, Please login again';     
        return Promise.reject({ message: message, status: response.serviceResponse.Status });
    } else if (response.status === 404) {
        return Promise.reject({ message: 'Page Not Found', status: response.serviceResponse.Status });
    } else {
        let message = response.data;
        return Promise.reject({ message: message, status: response.serviceResponse.Status });
    }
}

const parseBody = (response) => {
    if (response && (response.data === null || response.data === undefined)) {
        return Promise.reject({ message: 'Resource Not Found' });
    }

    let exception = true;

    if(response.data && (response.status === 200 || response.status === 201 )) {
        exception = false;
    }

    return exception ? parsedError(response.data) : response.data;
};

let instance = axios.create({
    baseURL: "http://localhost:8000/api/",
});

instance.interceptors.request.use((config) => {
    if (!window.location.pathname.includes('register') && window.location.pathname !== "/") {
        config.headers.Authorization = 'Token '+localStorage.getItem('token')
    }
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    let result = parseBody(response);
    return result;    
}, error => {
    console.warn("Error status", error);
    return Promise.reject(error);
});

export const API = instance;