import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "fontsource-roboto";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";
import axios from "axios";
import { darkTheme } from "./utilities/MuiThemes";
import { PublicClientApplication } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "./msalConfig";
import { MsalProvider } from "@azure/msal-react";

const msalInstance = new PublicClientApplication(msalConfig);

axios.interceptors.request.use(async (config) => {
  const tokenResponse = await msalInstance.acquireTokenSilent({
    account: msalInstance.getAllAccounts()[0],
    ...loginRequest,
  });
  if (tokenResponse) {
    const accessToken = tokenResponse.accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const render = () => {
  ReactDOM.render(
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </MsalProvider>,
    document.getElementById("root")
  );
};

render();

declare global {
  interface Window {
    Store: any;
  }
}

window.Store = store;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
