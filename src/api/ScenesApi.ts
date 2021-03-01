import axios from "axios";
import Endpoints from "../constants/Endpoints";
import {
  ScenePayload,
  SceneFileType,
  SceneResponse,
  ScenesResponse,
  SceneStatus,
} from "../models/Scenes";

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

  scenes.result.data.forEach((item) => (item.Status = SceneStatus.None));

  return scenes;
};

export const DeleteScene = async (sceneId: string) => {
  let route = Endpoints.DELETE_SCENE;
  route = route.replace("{productId}", sceneId);
  let endpoint = `${Endpoints.HOST}${route}`;

  const response = await axios.delete<SceneResponse>(endpoint);
  const scene = response.data;
  return scene;
};

export const PostScene = async (payload: ScenePayload) => {
  let endpoint = `${Endpoints.HOST}${Endpoints.POST_SCENE}`;

  const body = {
    name: payload.title,
    title: payload.title,
    description: payload.description,
    price: payload.price,
    discountPercentage: 0,
    published: true,
  };

  const response = await axios.post<SceneResponse>(endpoint, body);
  const scene = response.data;
  return scene;
};

export const PostSceneFile = async (
  sceneId: string,
  fileType: SceneFileType,
  file: File
) => {
  let route = Endpoints.POST_SCENE_FILE;
  route = route.replace("{productId}", sceneId);

  if (fileType === SceneFileType.Zip) {
    route = route.replace("{blobType}", "content-zip");
  } else if (fileType === SceneFileType.Image) {
    route = route.replace("{blobType}", "preview-image");
  } else if (fileType === SceneFileType.Video) {
    route = route.replace("{blobType}", "preview-video");
  } else {
    throw new Error("Invalid file type");
  }

  let endpoint = `${Endpoints.HOST}${route}`;

  var formData = new FormData();
  formData.append("blob", file);

  const response = await axios.post<SceneResponse>(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const scene = response.data;
  return scene;
};

export const PatchScene = async (payload: ScenePayload) => {
  let route = Endpoints.PATCH_SCENE;
  route = route.replace("{productId}", payload.id);
  let endpoint = `${Endpoints.HOST}${route}`;

  const body = {
    name: payload.title,
    title: payload.title,
    description: payload.description,
    price: payload.price,
    discountPercentage: 0,
    published: true,
  };

  const response = await axios.patch<SceneResponse>(endpoint, body);
  const scene = response.data;
  return scene;
};

export const PatchSceneFile = async (
  sceneId: string,
  fileType: SceneFileType,
  file: File
) => {
  let route = Endpoints.PATCH_SCENE_FILE;
  route = route.replace("{productId}", sceneId);

  if (fileType === SceneFileType.Zip) {
    route = route.replace("{blobType}", "content-zip");
  } else if (fileType === SceneFileType.Image) {
    route = route.replace("{blobType}", "preview-image");
  } else if (fileType === SceneFileType.Video) {
    route = route.replace("{blobType}", "preview-video");
  } else {
    throw new Error("Invalid file type");
  }

  let endpoint = `${Endpoints.HOST}${route}`;

  var formData = new FormData();
  formData.append("blob", file);

  const response = await axios.patch<SceneResponse>(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const scene = response.data;
  return scene;
};
