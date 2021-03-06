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

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
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

axios.interceptors.request.use((config) => {
  const adminResponse = store.getState().admin.result;
  if (adminResponse) {
    const accessToken = adminResponse.token;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
