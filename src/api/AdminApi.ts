import axios from 'axios';
import Endpoints from '../constants/Endpoints';
import { AdminResponse } from '../models/Admin';

export const PostLogin = async (
  username = 'testmail0001@mailnesia.com',
  password = 'test123'
) => {
  const endpoint = `${Endpoints.HOST}${Endpoints.POST_LOGIN}`;
  const body = {
    username,
    password,
  };
  const response = await axios.post<AdminResponse>(endpoint, body);
  const admin = response.data;
  return admin;
};

export const PostLoginTest = () => {};
