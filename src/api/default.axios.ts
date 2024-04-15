import { config } from '@/config.app';
import axios from 'axios';

export const instance = axios.create({
    baseURL: config.BackendURL,
    responseType: 'json',
    validateStatus: (status) => {
        switch (status) {
            case 200:
                return true;
            case 201:
                return true;
            default:
                return false;
        }
    },
});

// instance.interceptors.request.use(
//     function (config) {
//         devLog(
//             `${config.method} Request to ${config.url} (${config.auth ? '🔒' : '🔓'}). ${config.data ? 'Payload:' : ''}`,
//             config.data ? config.data : '',
//         );

//         return config;
//     },
//     function (error) {
//         devLog('Error while sending request', error);
//         throw error;
//     },
// );

// instance.interceptors.response.use(
//     function (response) {
//         devLog(
//             `Response from ${response.config.url}. ${response.data ? 'Response body:' : ''}`,
//             response.data ? response.data : '',
//         );

//         return response;
//     },
//     function (error) {
//         devLog('Error while receiving response', error);
//         throw error;
//     },
// );
