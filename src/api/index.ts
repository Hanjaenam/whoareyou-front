import axios from 'axios';

const serverURL = '/api';

export default ({ baseURL }: { baseURL: string }) => axios.create({ baseURL: serverURL + baseURL });
