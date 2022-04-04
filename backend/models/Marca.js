const BaseModel = require("./BaseModel");

class Marca extends BaseModel {
  alta = async ({ nombre }) =>
    await this.prisma.marca.upsert({
      where: {
        nombre: nombre,
      },
      update: {},
      create: {
        nombre: nombre,
      },
    });
}

module.exports = Marca;
