const BaseModel = require("./BaseModel");
class Articulo extends BaseModel {
  buscarArticulos = async ({ page = 0, rowsPerPage = 10, sortOrder = {} }) => {
    let data = await this.prisma.articulo.findMany({
      skip: this.cvSkip(page, rowsPerPage),
      take: this.cvTake(rowsPerPage),
      orderBy: this.cvOrderBy(sortOrder, [
        { col: "categoria", subcol: "nombre" },
        { col: "marca", subcol: "nombre" },
      ]),
      where: {
        baja: false,
      },
      select: {
        id: true,
        codigo: true,
        nombre: true,
        precio: true,
        stock: true,
        categoria: {
          select: { nombre: true },
        },
        marca: {
          select: { nombre: true },
        },
      },
    });
    data = data.map((item) => {
      //? Lote rechazado, rechazado 😵
      item.categoria = item.categoria.nombre;
      item.marca = item.marca.nombre;
      return item;
    });
    return {
      count: await this.contarArticulos(),
      data: data,
    };
  };

  alta = async ({
    codigo,
    nombre,
    precio,
    stock,
    detalles,
    categoria,
    marca,
  }) => {
    const articulo = await this.prisma.articulo.create({
      data: {
        codigo: codigo,
        nombre: nombre,
        precio: parseInt(precio),
        stock: parseInt(stock),
        detalles: detalles,
        categoria: {
          connectOrCreate: {
            where: {
              nombre: categoria,
            },
            create: {
              nombre: categoria,
            },
          },
        },
        marca: {
          connectOrCreate: {
            where: {
              nombre: marca,
            },
            create: {
              nombre: marca,
            },
          },
        },
      },
    });
    if (typeof articulo.id !== "undefined")
      return { ok: true, msg: "Registrado correctamente" };
    else return { ok: false, msg: "No se pudo almacenar" };
  };

  contarArticulos = async (sw = false) => {
    if (!sw) return await this.prisma.articulo.count();
    else
      return await this.prisma.articulo.count({
        where: {
          baja: false,
        },
      });
  };
}
module.exports = Articulo;
