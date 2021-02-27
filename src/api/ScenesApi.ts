import axios from "axios";
import Endpoints from "../constants/Endpoints";
import { CreateScenePayload, SceneResponse, ScenesResponse, SceneStatus } from "../models/Scenes";

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

  scenes.result.data.forEach((item) => item.Status = SceneStatus.None);

  return scenes;
};

export const PostScene = async (payload: CreateScenePayload) => {
  let endpoint = `${Endpoints.HOST}${Endpoints.POST_SCENES}`;

  const body = {
    name: payload.title,
    title: payload.title,
    description: payload.description,
    price: payload.price,
    discountPercentage: 0,
    published: true,
  };

  const response = await axios.post<SceneResponse>(endpoint, body);
  const scenes = response.data;
  return scenes;
};
