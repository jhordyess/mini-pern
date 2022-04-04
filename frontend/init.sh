#!/bin/bash
project_name=${PWD##*/}
sudo npm install npm@latest -g
npx create-react-app ./$project_name
rm -rf ./$project_name/.git
mv ./$project_name/* ./$project_name/.[!.]* .
rm -rf ./$project_name

npm i @mui/material @mui/icons-material tss-react
npm i mui-datatables
npm i axios react-csv react-drag-drop-files
npm start