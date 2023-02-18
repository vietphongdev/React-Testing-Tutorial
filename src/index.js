import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SignIn from "./SignIn";
import * as serviceWorker from "./serviceWorker";
import { Joke } from "./Fetch-Api/Joke";

ReactDOM.render(
  <React.StrictMode>
    <Joke />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
