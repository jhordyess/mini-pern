import { PrismaClient } from "@prisma/client";

export default class BaseController {
  prisma;
  relation;

  constructor(relation = []) {
    this.prisma = new PrismaClient();
    this.relation = relation;
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
   * @returns {Object[]}
   */

  prismaOrderBy = (sortOrder = {}) => {
    let order = [];
    if (typeof sortOrder === "string") {
      sortOrder = JSON.parse(sortOrder);
    }
    if (
      typeof sortOrder.name !== "undefined" &&
      typeof sortOrder.direction !== "undefined"
    ) {
      const aux = {};
      const n_1 = this.relation.find((str) => str.table === sortOrder.name);
      if (typeof n_1 !== "undefined") {
        const temp = {};
        temp[n_1.column] = String(sortOrder.direction);
        aux[n_1.table] = temp;
      } else {
        aux[sortOrder.name] = String(sortOrder.direction);
      }
      order = [aux];
    }
    return order;
  };

  formatRelation = (data = []) => data.map(this.formatObj);

  /**
   * Rewrite obj values, using this.relation. Ex: {table:{column:"123"}} => {table:"123"}
   * @param {Object} obj
   * @returns
   */
  formatObj = (obj = {}) => {
    this.relation.forEach((item) => {
      obj[item.table] = obj[item.table][item.column];
    });
    return obj;
  };
}
