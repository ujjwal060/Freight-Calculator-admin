import axios from 'axios';

const instance = axios.create({
  baseURL:'http://15.134.44.62:8888/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;


