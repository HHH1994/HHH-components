import axios from "axios";

let axiosIns = axios.create();

//axiosIns.defaults.baseURL = "http://192.168.3.11:3000/api/";


axiosIns.interceptors.request.use(config => {
    return config;
},
err => {
    console.log(err);
});


axiosIns.interceptors.response.use(res => {
    return res.data;
},
err => {
    console.log(err);
});

export default axiosIns;