import express from "express";
import morgan from "morgan";
import cors from "cors";

import routerProduct from "./routes/product.routes.js";
import routerCategory from "./routes/category.routes.js";
import routerBrand from "./routes/brand.routes.js";

const app = express();
const port = process.env.PORT || 4062;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //?
app.use(cors({ origin: "*" }));

app.use("/product", routerProduct);
app.use("/category", routerCategory);
app.use("/brand", routerBrand);

app.listen(port, () => {
  console.log("Server initialized");
});
