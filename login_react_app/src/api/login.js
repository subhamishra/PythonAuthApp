import {API} from './index'


export const login = (data) => {
    return new Promise((resolve, reject) => {
        API.post('login', data, { responseType: 'text', headers: { 'content-type': 'application/json' } }
        )
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}