import axios from 'axios';

const serverURL = '/api';

export default ({ baseURL }: { baseURL: '/auth' | '/article' | '/user' }) =>
  axios.create({ baseURL: serverURL + baseURL });
