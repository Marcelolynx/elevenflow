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
    <form onSubmit={handleSubmit} 
    className="bg-[#f6f4f7] p-6 rounded-md shadow-md mb-6">

      <h2 className="text-lg font-semibold mb-4">Cadastrar atendimento</h2>

<div className="flex flex-col gap-4 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Nome do paciente"
          value={paciente}
          onChange={(e) => setPaciente(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <select
          value={procedimentoId}
          onChange={(e) => setProcedimentoId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
        <option value="">Selecione o procedimento</option>
          {procedimentos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} – R$ {p.valor}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-[#005e60] text-white px-5 py-2 rounded hover:bg-[#00494b] transition"
        >
          SALVAR
        </button>
        </div>
    </form>
  );
}
