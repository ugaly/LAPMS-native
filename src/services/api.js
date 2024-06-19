// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const base_url = 'http://kopakwetu.co.tz:9000/api/'
// const base_url = 'http://192.168.100.55:8001/api/';
// const base_url = 'http://192.168.0.120:8001/api/silent/';

// export default class API {
//   static ax = axios; // Using API.ax means that we have called it with all configurations
// }

// axios.defaults.baseURL = base_url;

// // Retrieve access token from AsyncStorage
// const accessToken = await AsyncStorage.getItem("access");

// if (accessToken) {
//   axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
// }

// axios.interceptors.request.use(async (config) => {
//   const source = axios.CancelToken.source();
//   config.cancelToken = source.token;
//   setTimeout(() => source.cancel('Timed out after 30s'), 86400000);
//   return config;
// });


import axios from 'axios';

const instance = axios.create({
//    baseURL: 'http://kopakwetu.co.tz:8001/api/silent',
    baseURL: 'http://192.168.15.38:8000/api/',
});

export default instance;
