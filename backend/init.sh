#!/bin/bash
#? https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgres
# project_name=${PWD##*/}
sudo npm install npm@latest -g
npm init -y
npm i express prisma nodemon --save-dev
npm i cors
npx prisma init
echo "Ahora debe configurar la coneccion a db"
printf "Si termino ingrese una tecla"
read option
npx prisma db pull
echo "Ahora debe revisar el esquema de prisma"
printf "Si termino ingrese una tecla"
read option
npm install @prisma/client
npx prisma generate
npx prisma db push

# Hola mundo
#? https://expressjs.com/es/starter/hello-world.html
touch app.js
printf "const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(\`Example app listening on port \${port}\`)
})" > ./app.js

npx nodemon app