import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';
const serverURL = isDev ? '/api' : 'https://52.78.130.165:443/api';

export default ({ baseURL }: { baseURL: '/auth' | '/article' | '/user' }) =>
  axios.create({ baseURL: serverURL + baseURL });
