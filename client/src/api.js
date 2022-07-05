import axios from 'axios';

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
     const {origin} = new URL(config.url);
     const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
     const token = localStorage.getItem("access-token");
     if(allowedOrigins.includes(origin))
     {
        config.headers.authorization = token
     }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const fetchProductList = async({ pageParam = 0 }) =>{
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`);
    return data;
}



export const fetchProductDetail = async(product_id) =>{
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`);
    return data;
}

export const fetchRegister = async(user)=>
{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`, user);
    return data;
}

export const fetchLogin = async(user)=>
{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`, user);
    return data;
}


export const fetchMe = async()=>
{
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`);
    return data;
}

export const fetchLogout = async()=>
{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`, {
        refresh_token: localStorage.getItem("refresh-token")
    });
    return data;
}