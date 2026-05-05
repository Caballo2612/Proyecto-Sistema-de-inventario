import Login from "./auth/Login"
import { Layout } from "./layout/Layout"
import { Routes, Route } from "react-router-dom"
import { Dashboard } from "./routes/Dashboard"
import { Compras } from "./routes/Compras"
import { Users } from "./routes/Users"
import { Productos } from "./routes/Productos"
import { Proveedores } from "./routes/Proveedores"
import Config from "./routes/Config"
import appFireBase from "./credentials"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import Loader from "./components/molecules/Loader"
import { Ventas } from "./routes/Ventas"

const Auth = getAuth(appFireBase);
const firestore = getFirestore(appFireBase);

function App() {

  const [usuario, setUsuario] = useState(undefined);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (usuario === undefined) return (
    <div className="grid place-items-center h-dvh bg-linear-to-r from-[#cfdef3] to-[#e0eafc]">
        <Loader />
    </div>
  );

  return (
    <Routes>
      {usuario
        ?
        <Route element={<Layout usuario={usuario} firestore={firestore} />} >
          <Route path="/" element={<Dashboard firestore={firestore} usuario={usuario} />} />
          <Route path="/Compras" element={<Compras />} />
          <Route path="/Ventas/:view" element={<Ventas firestore={firestore} usuario={usuario} />} />
          <Route path="/Usuarios" element={<Users firestore={firestore} usuario={usuario} />} />
          <Route path="/Productos" element={<Productos firestore={firestore} />} />
          <Route path="/Proveedores" element={<Proveedores firestore={firestore} />} />
          <Route path="/Configuracion/:section" element={<Config firestore={firestore} usuario={usuario} />} />
        </Route>
        :
        <Route path="*" element={<Login />} />
      }
    </Routes>
  )
}

export default App
