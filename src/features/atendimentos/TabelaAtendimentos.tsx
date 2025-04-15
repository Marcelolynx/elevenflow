import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAtendimento } from "@/services/atendimentoService";
import { Atendimento } from "@/types/Atendimento";

export default function TabelaAtendimentos() {
  const { user } = useAuth();
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getAtendimento(user.uid).then(setAtendimentos);
    }
  }, [user]);

  return (
    <div className="bg-[#f6f4f7] p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Últimos lançamentos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-[#e8e5ec] text-left">
            <tr>
              <th className="p-3">Pacientes</th>
              <th className="p-3">Procedimento</th>
              <th className="p-3 text-right">Valor</th>
              <th className="p-3 text-right">Data</th>
            </tr>
          </thead>
          <tbody>
            {atendimentos.map((a, i) => (
              <tr
                key={i}
                className="border-t border-gray-200 hover:bg-gray-100 transition"
              >
                <td className="p-3">{a.paciente}</td>
                <td className="p-3">{a.procedimentoNome}</td>
                <td className="p-3 text-right">R$ {a.valor.toFixed(2)}</td>
                <td className="p-3 text-right">
                  {new Date(a.data).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
