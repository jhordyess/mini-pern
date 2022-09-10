import { PrismaClient } from "@prisma/client";

export default class BaseController {
  prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  disconnect = async () => {
    await this.prisma.$disconnect();
  };

  /**
   * Skip query
   * @param {Number} page
   * @param {Number} rowsPerPage
   * @returns {Number}
   */
  prismaSkip = (page = 0, rowsPerPage = 10) => {
    let skip = 0;
    skip = parseInt(page) * parseInt(rowsPerPage);
    return skip;
  };
  /**
   * Take query
   * @param {Number} rowsPerPage
   * @returns {Number}
   */
  prismaTake = (rowsPerPage = 10) => {
    let take = 0;
    take = parseInt(rowsPerPage);
    return take;
  };

  /**
   * OrderBy query
   * @param {(string | Object)} sortOrder - String into object.
   * @param {Object[]} fk_relation - Array of objects, for n to 1 relations with some table.
   * @returns {Object[]}
   *
   * @example
   *
   *      cvOrderBy({ name: "stock", direction: "desc" }, [{ col: "brand", subcol: "name" }, ]);
   */

  prismaOrderBy = (sortOrder = {}, fk_relation = []) => {
    let ordenar = [];
    if (typeof sortOrder === "string") {
      sortOrder = JSON.parse(sortOrder);
    }
    if (
      typeof sortOrder.name !== "undefined" &&
      typeof sortOrder.direction !== "undefined"
    ) {
      const aux = {};
      const n_1 = fk_relation.find((str) => str.col === sortOrder.name);
      if (typeof n_1 !== "undefined") {
        const temp = {};
        temp[String(n_1.subcol)] = String(sortOrder.direction);
        aux[String(n_1.col)] = temp;
      } else {
        aux[String(sortOrder.name)] = String(sortOrder.direction);
      }
      ordenar = [aux];
    }
    return ordenar;
  };
}
