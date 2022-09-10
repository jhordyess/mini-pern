#? Commands history
sudo npm i npm -g
# npm init -y

npm i react@^17 react-dom@^17
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
npm i -D webpack webpack-cli webpack-dev-server
npm i -D html-webpack-plugin css-loader style-loader
npm i -D css-minimizer-webpack-plugin terser-webpack-plugin clean-webpack-plugin

npm i @mui/material @emotion/react @emotion/styled @mui/icons-material #tss-react
npm i mui-datatables
npm i axios #react-csv react-drag-drop-files

mkdir -p src/components public
touch src/index.js src/components/App.jsx public/index.html webpack.config.js