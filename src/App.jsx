import Login from "./auth/login"
import { Layout } from "./layout/Layout"
import { Routes, Route } from "react-router-dom"
import { Dashboard } from "./routes/Dashboard"


function App() {

  return (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
    </Routes>
  )
}

export default App
