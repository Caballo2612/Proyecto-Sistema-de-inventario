import Login from "./auth/login"
import { Layout } from "./layout/Layout"
import { Routes, Route } from "react-router-dom"
import { Dashboard } from "./routes/Dashboard"
import { Compras } from "./routes/Compras"
import { Users } from "./routes/Users"
import { Productos } from "./routes/Productos"
import { Proveedores } from "./routes/Proveedores"


function App() {

  return (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Compras" element={<Compras />} />
            <Route path="/Usuarios" element={<Users />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Proveedores" element={<Proveedores />} />
        </Route>
    </Routes>
  )
}

export default App
