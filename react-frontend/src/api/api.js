import Axios from 'axios';

const Api = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  
});

export default Api;
