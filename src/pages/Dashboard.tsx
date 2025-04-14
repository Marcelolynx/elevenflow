// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Bem-vinda ao ElevenFlow</h1>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/atendimentos")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Lançar Atendimento
        </button>

        <button
          onClick={() => navigate("/relatorios")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Ver Relatórios
        </button>
      </div>
    </div>
  );
}
