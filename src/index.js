import React from "react";
import { render } from "react-dom";
import App from "./App";
import logger from "redux-logger";
import { Provider } from "react-redux";
import store from "./store/store";
import { mathActions, analysisActions } from "./action-creators/actionCreator";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

analysisActions.analysisChoosen("buffer");
analysisActions.analysisChoosen("buffer");
analysisActions.analysisChoosen("intersection");