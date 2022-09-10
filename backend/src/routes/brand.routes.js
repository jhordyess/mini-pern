import { BaseRouter } from "./base.routes.js";
import BrandCtl from "./../controllers/brand.controller.js";

export default BaseRouter([
  { method: "POST", path: "/", func: new BrandCtl().createBrand },
]);
