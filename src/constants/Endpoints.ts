const Endpoints = {
  HOST: 'https://electronapi.westus.cloudapp.azure.com',
  POST_LOGIN: '/v1/admin-accounts/auth/sign-in',
  GET_SCENES: '/v1/products',
  POST_SCENE: '/v1/products',
  POST_SCENE_FILE: '/v1/products/{productId}/{blobType}',
  PATCH_SCENE: '/v1/products/{productId}',
  PATCH_SCENE_FILE: '/v1/products/{productId}/{blobType}',
  DELETE_SCENE: '/v1/products/{productId}',
};

export default Endpoints;
