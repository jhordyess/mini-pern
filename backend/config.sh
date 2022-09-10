#!/bin/bash
sudo npm i npm -g
npm i
npx prisma generate
npx prisma db push
