import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';
const serverURL = isDev ? '/api' : 'http://52.78.130.165:80/api';

export default ({
  baseURL,
  withToken,
}: {
  baseURL: '/auth' | '/article' | '/user';
  withToken: boolean;
}) => {
  const headers = withToken
    ? { authorization: `Token ${window.localStorage.getItem('token')}` }
    : undefined;
  return axios.create({ baseURL: serverURL + baseURL, headers });
};
