import './components/Header/18n.js'
import React, { Suspense } from 'react'
import './components/Header/Translation/18n'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

