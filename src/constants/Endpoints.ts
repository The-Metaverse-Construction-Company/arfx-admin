const Endpoints = {
  HOST: 'https://electronapi.westus.cloudapp.azure.com',
  POST_LOGIN: '/v1/admin-accounts/auth/sign-in',
  GET_SCENES: '/v1/products',
  POST_SCENE: '/v1/products',
  DELETE_SCENE: '/v1/products/{productId}',
  POST_SCENE_FILE: '/v1/products/{productId}/{blobType}',
};

export default Endpoints;
