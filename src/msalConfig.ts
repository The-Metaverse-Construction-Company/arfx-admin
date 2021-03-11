import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: "33ffa829-e38a-431d-b8df-2c67a91b9615",
    authority: "https://login.microsoftonline.com/arfxhomedev.onmicrosoft.com",
    redirectUri: 'https://electronapps.z22.web.core.windows.net/',
    // redirectUri: `http://localhost:3000`,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  },
//   cache: {
//     cacheLocation: "sessionStorage",
//     storeAuthStateInCookie: false,
//   },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  scopes: ["https://arfxhomedev.onmicrosoft.com/arfxadmin/full"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
