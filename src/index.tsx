import React from "react";
import { render } from "react-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import App from "./App";
import "fontsource-roboto";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: red,
    background: {
      default: "#202124",
    },
  },
});

render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
