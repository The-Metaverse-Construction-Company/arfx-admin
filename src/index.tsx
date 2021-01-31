import React from "react";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import App from "./App";
import "fontsource-roboto";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: red,
    background: {
      default: "#202124",
    },
  },
});

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
