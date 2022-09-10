import { BaseRouter } from "./base.routes.js";
import ProductCtl from "./../controllers/product.controller.js";

export default BaseRouter([
  { method: "GET", path: "/", func: new ProductCtl().listAllProducts },
  { method: "POST", path: "/", func: new ProductCtl().createProduct },
]);
