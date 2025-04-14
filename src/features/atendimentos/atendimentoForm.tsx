import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Atendimento } from "@/types/Atendimento";
import { getGlobalProcedures } from "@/services/procedimentoService";
import { addAttendance } from "@/services/atendimentoService";
import { Procedure } from "@/types/Procedure";

export default function AttendanceForm() {
  const { user } = useAuth();
  const [paciente, setPaciente] = useState("");
  const [procedimentos, setProcedimentos] = useState<Procedure[]>([]);
  const [procedimentoId, setProcedimentoId] = useState("");

  const selectedProc = procedimentos.find((p) => p.id === procedimentoId);

  useEffect(() => {
    getGlobalProcedures().then(setProcedimentos);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid || !selectedProc || paciente.trim() === "") return;

    const novo: Atendimento = {
      paciente,
      procedimentoId: selectedProc.id!,
      procedimentoNome: selectedProc.nome,
      valor: selectedProc.valor,
      data: new Date().toISOString(),
      nomeDra: user.displayName ?? user.email ?? "Dra. Desconhecida"
    };

    await addAttendance(user.uid, novo);
    setPaciente("");
    setProcedimentoId("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-3 text-center">Lançar Atendimento</h2>

      <input
        type="text"
        placeholder="Nome do Paciente"
        className="w-full border p-2 mb-2 rounded"
        value={paciente}
        onChange={(e) => setPaciente(e.target.value)}
      />

      <select
        className="w-full border p-2 mb-2 rounded"
        value={procedimentoId}
        onChange={(e) => setProcedimentoId(e.target.value)}
      >
        <option value="">Selecione o Procedimento</option>
        {procedimentos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nome} - R$ {p.valor}
          </option>
        ))}
      </select>

      {selectedProc && (
        <div className="text-right text-sm mb-2 text-gray-600">
          Valor: R$ {selectedProc.valor.toFixed(2)}
        </div>
      )}

      <button className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 transition">
        Registrar Atendimento
      </button>
    </form>
  );
}
