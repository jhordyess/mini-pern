# mini-proyecto PERN

CRUD en desarrollo 🏗, usando el stack PERN.

## Descripción

### BBDD

![Modelo logico](/database/modelo_logico.drawio.png)

### Interacción

![Interaccion](/Interaccion.drawio.png)

<a href="https://app.diagrams.net/#Uhttps%3A%2F%2Fgithub.com%2Fjhordyess%2Fmini-proyecto-pern%2Fraw%2Fmain%2FInteraccion.drawio.png" target="_blank">Edit in diagrams.net</a>

### Conexión a BBDD y puertos

Siguiendo lo establecido en `docker-compose.yml` y `/database/install-db.sh`, la información para `.env` de Prisma es:

- Usuario: _admin-user_
- Contraseña: _7jWflTrT6tcKzVz9k0Ir_
- Host: _pg-sql_
- Puerto: _5432_
- Base de datos: _crud-db_

La redirección de puertos (que usa Axios también), es:

- backend: <http://localhost:81>
- frontend: <http://localhost:80>
- bbdd: <http://localhost:5432>

### Sin datos

De momento esta versión aún no permite la creación de registros, pero se tiene implementado un `post` `request` para el backend: <http://localhost:81/articulos> con el siguiente body:

```[javascript]
{
    "codigo": "AL-2",
    "nombre": "Nombre 1",
    "precio": 50,
    "stock": 100,
    "detalles": "",
    "categoria":"Categoria 2",
    "marca":"Marca 2"
}
```

Nótese que el campo **codigo** es único.

## Dev Info

- JavaScript library: [Meta - React](https://reactjs.org/)
- Build tool: [Meta - Create React App](https://create-react-app.dev/)
- React UI library: [Material-UI](https://mui.com/)
- Responsible datatables component: [MUI-Datatables - Datatables for Material-UI](https://github.com/gregnb/mui-datatables)
- Promise-based HTTP client: [Axios](https://axios-http.com/)
- Web framework: [Express](http://expressjs.com/)
- Open source ORM: [Prisma](https://www.prisma.io/)
- Open source object-relational database: [PostgreSQL](https://www.postgresql.org/)
- [VSCode](https://code.visualstudio.com/) with [remote containers](https://code.visualstudio.com/docs/remote/containers) ([Docker](https://www.docker.com/) multiple containers with [NodeJS](https://nodejs.org/))

---
@2022 Jhordyess
