import React from "react";
import Details from "@components/Details";
import MUIDT from "@components/MUIDT";
const exampleCols = [
  { name: "id", label: "id", options: { display: "excluded" } },
  { name: "sku", label: "SKU" },
  { name: "productName", label: "Product Name" },
  { name: "price", label: "Price" },
  { name: "stock", label: "Stock" },
  { name: "category", label: "Category" },
  { name: "brand", label: "Brand" },
];

const formData = [
  {
    label: "Product name",
    name: "productName",
    default: "",
    options: { required: true },
  },
  {
    label: "Price",
    name: "price",
    default: "",
    options: { required: true, type: "number" },
  },
  {
    label: "Stock",
    name: "stock",
    default: "",
    options: { required: true, type: "number" },
  },
  {
    label: "Details",
    name: "details",
    default: "",
    options: {},
  },
  {
    label: "Category",
    name: "category",
    default: "",
    options: { required: true },
  },
  {
    label: "Brand",
    name: "brand",
    default: "",
    options: { required: true },
  },
];

export default function () {
  return (
    <MUIDT
      url="product"
      formData={formData}
      columns={exampleCols}
      title="Products list"
      ExpandableRow={Details}
    />
  );
}
