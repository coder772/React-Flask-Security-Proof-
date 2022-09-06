import Api from '../api/api';

export const login = async (data) => {
  return Api.post('login?include_auth_token', data);
};

export const register = async (data) => {
  return Api.post('register', data);
};
