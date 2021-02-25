export interface ScenesResponse {
  success: boolean;
  result: ScenesResult;
  errors: string[];
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
}

export interface ContentZip {
  blobURL: string;
  hash: string;
  version: number;
}

export interface BlobItem {
  blobURL: string;
}
