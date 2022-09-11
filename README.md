# Mini PERN project

CRUD under construction 🏗, using the PERN stack.

## Info

### Database

![Logical model](/database/logical_model.drawio.png)

### Interaction

![Interaction](/interaction.drawio.png)

<a href="https://app.diagrams.net/#Uhttps%3A%2F%2Fgithub.com%2Fjhordyess%2Fmini-pern%2Fraw%2Fmain%2Finteraction.drawio.png" target="_blank">Edit in diagrams.net</a>

### Ports

- backend: <http://localhost:4062>
- frontend: <http://localhost:3640>
- database: <http://localhost:5432>

### Postman

Import the [postman_collection.json](/postman_collection.json) and send requests.

## Multi-container Docker app

Run the `build.sh` file, it will create a new project named `mini-pern` and run it; so you can visit:

- backend: <http://localhost:4062>
- frontend: <http://localhost:3640>

## Dev Info

- JavaScript library: [Meta - React](https://reactjs.org/)
- React UI library: [Material-UI](https://mui.com/)
- Responsible datatables component: [MUI-Datatables - Datatables for Material-UI](https://github.com/gregnb/mui-datatables)
- Promise-based HTTP client: [Axios](https://axios-http.com/)
- Web framework: [Express](http://expressjs.com/)
- Open source ORM: [Prisma](https://www.prisma.io/)
- Open source object-relational database: [PostgreSQL](https://www.postgresql.org/)
- Module bundler: [OpenJS Foundation - Webpack](https://webpack.js.org/)
- Server Environment : [OpenJS Foundation - Node.js](https://nodejs.org/)
- [VSCode](https://code.visualstudio.com/) with [remote containers](https://code.visualstudio.com/docs/remote/containers) ([Docker](https://www.docker.com/) multiple containers)

## TODO

- Complete the CRUD, only read available.

## License

© 2022 [Jhordyess](https://github.com/jhordyess). Under the [MIT](https://choosealicense.com/licenses/mit/) license.

---

Made with 💪 by [Jhordyess](https://www.jhordyess.com/)
