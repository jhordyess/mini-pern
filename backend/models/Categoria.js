const BaseModel = require("./BaseModel");

class Categoria extends BaseModel {
  alta = async ({ nombre }) =>
    await this.prisma.categoria.upsert({
      where: {
        nombre: nombre,
      },
      update: {},
      create: {
        nombre: nombre,
      },
    });
}

module.exports = Categoria;
