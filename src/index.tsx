import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from "./App";

const domRoot = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

domRoot.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);