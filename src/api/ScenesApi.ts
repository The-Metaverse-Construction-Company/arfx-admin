import axios from 'axios';
import Endpoints from '../constants/Endpoints';
import { ScenesResponse } from '../models/Scenes';

export const GetScenes = async (
  pageNo = 1,
  limit = 30,
  searchText?: string
) => {
  let endpoint = `${Endpoints.HOST}${Endpoints.GET_SCENES}?pageNo=${pageNo}&limit=${limit}`;
  if (searchText) {
    endpoint = `${endpoint}&searchText=${searchText}`;
  }

  const response = await axios.get<ScenesResponse>(endpoint);
  const scenes = response.data;
  return scenes;
};

export const GetScenesTest = () => {};
