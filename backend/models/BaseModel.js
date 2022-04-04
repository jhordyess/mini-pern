const { PrismaClient } = require("@prisma/client");

class BaseModel {
  prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  desconectar = async () => {
    await this.prisma.$disconnect();
  };

  cvSkip = (page = 0, rowsPerPage = 10) => {
    let skip = 0;
    try {
      skip = parseInt(page) * parseInt(rowsPerPage);
    } catch (error) {
      console.log("error", error);
    } finally {
      return skip;
    }
  };

  cvTake = (rowsPerPage = 10) => {
    let take = 0;
    try {
      take = parseInt(rowsPerPage);
    } catch (error) {
      console.log("error", error);
    } finally {
      return take;
    }
  };

  /**
   *
   * @param {(string | Object)} sortOrder - Cadena que se converte a Objeto
   * @param {Object[]} n_1s - Arreglo de Objectos, que se utiliza si la tabla tiene una relacion n a 1
   * @returns {Object[]} El arreglo formateado, que necesita Prisma para usar OrderBy
   *
   * @example
   *
   *      cvOrderBy({ name: "stock", direction: "desc" }, [{ col: "marca", subcol: "nombre" }, ]);
   */
  //TODO n_1s necesita saber el tipo de datos del objeto dentro del arreglo ? Quiza migrar a typescript y usar types?
  cvOrderBy = (sortOrder = {}, n_1s = []) => {
    let ordenar = [];
    try {
      if (typeof sortOrder === "string") {
        sortOrder = JSON.parse(sortOrder);
      }
      if (
        typeof sortOrder.name !== "undefined" &&
        typeof sortOrder.direction !== "undefined"
      ) {
        const aux = {};
        let n_1 = n_1s.find((str) => str.col === sortOrder.name);
        if (typeof n_1 !== "undefined") {
          const temp = {};
          temp[String(n_1.subcol)] = String(sortOrder.direction);
          aux[String(n_1.col)] = temp;
        } else {
          aux[String(sortOrder.name)] = String(sortOrder.direction);
        }
        ordenar = [aux];
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      return ordenar;
    }
  };
}

module.exports = BaseModel;
