import axios from 'axios';
import { toast } from 'react-toastify';
import { messages } from '../constants';
import storage from 'redux-persist/lib/storage';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  const { response } = error;
  if (response && response.status >= 400 && response.status < 500 && response.status !== 401) {
    const { message } = response.data;
    if (message && message.includes('expired')) {
      storage.setItem('expiredMessage', messages.expiredSession);
      window.location = '/auth';
      return Promise.reject(error);
    }
    toast.error(message);
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common['Authorization'] = jwt;
}

const todoApi = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};

export default todoApi;
