import response from "./../utils/routes.response.js";
import BaseController from "./base.controller.js";

export default class ProductCtl extends BaseController {
  listAllProducts = async (req, res) => {
    const { page = 0, rowsPerPage = 10, sortOrder = {} } = req.query;
    let products = await this.prisma.product.findMany({
      skip: this.prismaSkip(page, rowsPerPage),
      take: this.prismaTake(rowsPerPage),
      orderBy: this.prismaOrderBy(sortOrder, [
        { col: "category", subcol: "name" },
        { col: "brand", subcol: "name" },
      ]),
      where: {
        deleted: false,
      },
      select: {
        id: true,
        sku: true,
        productName: true,
        price: true,
        stock: true,
        category: {
          select: { name: true },
        },
        brand: {
          select: { name: true },
        },
      },
    });
    products = products.map((item) => {
      //? Lote rechazado, rechazado 😵
      item.category = item.category.name;
      item.brand = item.brand.name;
      return item;
    });
    await this.disconnect();
    return response.normal({
      data: { count: await this.#countProducts(), list: products },
    });
  };

  createProduct = async (req, res) => {
    const {
      sku,
      productName,
      price,
      stock,
      details = "",
      category,
      brand,
    } = req.body;
    if (!(sku && productName && price && stock && category && brand))
      throw response.throw({ message: "Invalid properties" });
    const product = await this.prisma.product.create({
      data: {
        sku: sku,
        productName: productName,
        price: parseInt(price),
        stock: parseInt(stock),
        details: details,
        category: {
          connectOrCreate: {
            where: {
              name: category,
            },
            create: {
              name: category,
            },
          },
        },
        brand: {
          connectOrCreate: {
            where: {
              name: brand,
            },
            create: {
              name: brand,
            },
          },
        },
      },
    });
    await this.disconnect();
    if (typeof product.id === "undefined")
      throw response.throw({ message: "Can't create product!" });
    return response.normal({
      statusCode: 201,
      data: { product, message: "Product created" },
    });
  };

  #countProducts = async (sw = false) =>
    !sw
      ? await this.prisma.product.count()
      : await this.prisma.product.count({
          where: {
            deleted: false,
          },
        });
}
