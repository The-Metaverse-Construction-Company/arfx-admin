import axios from 'axios';
import Endpoints from '../constants/Endpoints';
import { AdminLoginInfo, AdminResponse } from '../models/Admin';

export const PostLogin = async (adminInfo: AdminLoginInfo) => {
  const endpoint = `${Endpoints.HOST}${Endpoints.POST_LOGIN}`;
  const body = {
    username: adminInfo.username,
    password: adminInfo.password,
  };
  const response = await axios.post<AdminResponse>(endpoint, body);
  const admin = response.data;
  return admin;
};

export const PostLoginTest = () => {};
