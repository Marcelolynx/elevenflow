import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";  
import AtendimentosPage from "./pages/Atendimentos";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/atendimentos" element={<AtendimentosPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
