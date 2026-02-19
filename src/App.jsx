import Login from "./auth/login"
import { Layout } from "./layout/Layout"
import { Routes, Route } from "react-router-dom"


function App() {

  return (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<Login />} />
        </Route>
    </Routes>
  )
}

export default App
