import React from "react";
import { render } from "react-dom";
import "./index.css";
import Product from "./Product";

render(
  <React.StrictMode>
    <Product />
  </React.StrictMode>,
  document.getElementById("root")
);
