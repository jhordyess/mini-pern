import "./App.css";
import MUIDTserver from "./components/jhs-mui-dt/Index";
const exampleCols = [
  { name: "id", label: "id", options: { display: "excluded" } },
  { name: "codigo", label: "Codigo" },
  { name: "nombre", label: "Nombre" },
  { name: "precio", label: "Precio" },
  { name: "stock", label: "Stock" },
  { name: "categoria", label: "Categoria" },
  { name: "marca", label: "Marca" },
];

function App() {
  return (
    <MUIDTserver
      url="articulo"
      columns={exampleCols}
      title="Lista de articulos"
    />
  );
}

export default App;
