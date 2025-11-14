import axios from '../api/axios';

const useApi = () => {
  const token = localStorage.getItem('token'); // or sessionStorage if you store it there

  const authHeaders = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  const get = async (url) => {
    const res = await axios.get(url, authHeaders);
    return res.data;
  };

  const post = async (url, data) => {
    const res = await axios.post(url, data, authHeaders);
    return res.data;
  };

  const put = async (url, data) => {
    const res = await axios.put(url, data, authHeaders);
    return res.data;
  };

  const del = async (url) => {
    const res = await axios.delete(url, authHeaders);
    return res.data;
  };

  return { get, post, put, del };
};

export default useApi;