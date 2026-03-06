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
import { useState } from "react"
import { doc, getDoc, getFirestore } from "firebase/firestore"

const Auth = getAuth(appFireBase);
const firestore = getFirestore(appFireBase);

function App() {

  const [usuario, setUsuario] = useState(null)

  async function getRol(uid) {
    const docuRef = doc(firestore, `Usuarios/${uid}`);
    const docucifrada = await getDoc(docuRef);

    const finalDocu = docucifrada.data();

    return {
      rol: finalDocu.rol,
      nombre: finalDocu.nombre,
    };
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((finalDocu) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: finalDocu.rol,
        nombre: finalDocu.nombre,
      };
      setUsuario(userData);
    });
  }

  onAuthStateChanged(Auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!usuario) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUsuario(null);
    }
  });

  return (
    <Routes>
      {usuario
        ?
        <Route element={<Layout usuario={usuario} />} >
          <Route path="/" element={<Dashboard firestore={firestore} />} />
          <Route path="/Compras" element={<Compras />} />
          <Route path="/Usuarios" element={<Users firestore={firestore} />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Proveedores" element={<Proveedores />} />
        </Route>
        :
        <Route path="*" element={<Login />} />
      }
    </Routes>
  )
}

export default App
