import React from "react";
import "./App.css";
//TODO fix path name
import MUIDTserver from "./components/MUIDTserver/MUIDTserver.js";
const exampleCols = [
  { name: "id", label: "id", options: { display: "excluded" } },
  { name: "sku", label: "SKU" },
  { name: "productName", label: "Product Name" },
  { name: "price", label: "Price" },
  { name: "stock", label: "Stock" },
  { name: "category", label: "Category" },
  { name: "brand", label: "Brand" },
];

function App() {
  return (
    <MUIDTserver url="product" columns={exampleCols} title="Products list" />
  );
}

export default App;
