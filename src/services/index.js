import axios from 'axios';

export function getUser(params) {
  return axios.get('https://randomuser.me/api', { params });
}
