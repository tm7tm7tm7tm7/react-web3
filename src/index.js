import React, { StrictMode } from "react"; // StrictMode 嚴格模式 https://zh-hant.reactjs.org/docs/strict-mode.html
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
