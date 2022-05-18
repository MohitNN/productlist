import axios from 'axios';
import store from '../store/index';

const customAxios = axios.create({
    baseURL: ``,
    timeout: 10000,
});
const requestHandler = request => {
    let idToken = store.state.auth.idToken;
    request.headers.Authorization = 'Bearer ' + idToken;
    return request;
};
const responseHandler = response => {
    if (response.status == 401) {
        store.dispatch('auth/logout')
    }
    return response;
};

const errorHandler = error => {
    if (error.response.status == 401) {
        // store.dispatch('auth/logoutIfToken')
    }
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

export default customAxios;
