
import React, { Suspense } from 'react'
import './components/Header/Translation/18n'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

