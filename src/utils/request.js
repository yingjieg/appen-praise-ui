import axios from 'axios';

const instance = axios.create({
  responseType: 'json',
  timeout: 5000,
});

instance.interceptors.response.use(
  res => res.data,
  err => {
    throw new Error(err.response.data.message);
  }
);

export default instance;
