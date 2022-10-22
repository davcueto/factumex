import axios from 'axios';

const clientAxios = axios.create({
  baseURL: "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/" //process.env.REACT_APP_ROOT_API,
});

export default clientAxios;