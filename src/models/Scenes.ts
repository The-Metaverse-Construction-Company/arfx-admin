export interface ScenesResponse {
  success: boolean;
  result: ScenesResult;
  errors: string[];
}

export interface SceneResponse {
  success: boolean
  result: SceneData
  errors: string[]
}

export interface ScenesResult {
  data: SceneData[];
  total: number;
  pages: number;
}

export interface SceneData {
  _id: string;
  productId: string;
  userId: string;
  published: boolean;
  deleted: boolean;
  adminAccountId: string;
  purchaseCount: number;
  createdAt: number;
  updatedAt: number;
  name: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  contentZip: ContentZip;
  previewImage: BlobItem;
  previewVideo: BlobItem;
  thumbnail: BlobItem;
  __v: number;
  hasOwned: boolean;

  /** Below properties are for local rendering */
  Error: string;
  Status: SceneStatus;
}

export interface ContentZip {
  blobURL: string;
  hash: string;
  version: number;
  state: number; //1 - completed, 2 - pending, 3 - failed.
}

export interface BlobItem {
  blobURL: string;
  state: number; //1 - completed, 2 - pending, 3 - failed.
}

export enum SceneStatus {
  None = 0,
  Creating,
  Updating,
  Deleting,
  Failed,
  UploadingZipContent,
  UploadingVideo,
  UpdatingImage,
}

export interface CreateScenePayload {
  id: string;
  title: string;
  description: string;
  price: number;
  sceneImage?: File;
  sceneVideo?: File;
  sceneFile?: File;
}

export interface UpdateScenePayload {
  title: string;
  description: string;
  price: number;
  scene?: SceneData;
  sceneImage?: File;
  sceneVideo?: File;
  sceneFile?: File;
}