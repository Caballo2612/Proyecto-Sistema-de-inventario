import Login from "./auth/Login"
import { Layout } from "./layout/Layout"
import { Routes, Route } from "react-router-dom"
import { Dashboard } from "./routes/Dashboard"
import { Compras } from "./routes/Compras"
import { Users } from "./routes/Users"
import { Productos } from "./routes/Productos"
import { Proveedores } from "./routes/Proveedores"
import appFireBase from "./credentials"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"

const Auth = getAuth(appFireBase)

function App() {

  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (usuarioFireBase) => {
      if (usuarioFireBase) {
        setUsuario(usuarioFireBase)
      } else {
        setUsuario(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <Routes>
      <Route index element={<Login />} />
      {usuario
        ?
        <Route element={<Layout correoUsuario={usuario.email} />} >
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Compras" element={<Compras />} />
          <Route path="/Usuarios" element={<Users />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Proveedores" element={<Proveedores />} />
        </Route>
        :
        <Route index element={<Login />} />
      }
    </Routes>
  )
}

export default App
