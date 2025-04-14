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
    <div className="bg-white mt-6 p-4 rounded shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Atendimentos Recentes</h2>
      {atendimentos.length === 0 ? (
        <p className="text-gray-500 text-sm">Nenhum atendimento lançado ainda.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Paciente</th>
              <th className="p-2 border">Procedimento</th>
              <th className="p-2 border">Valor</th>
              <th className="p-2 border">Data</th>
            </tr>
          </thead>
          <tbody>
            {atendimentos.map((a, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-2 border">{a.paciente}</td>
                <td className="p-2 border">{a.procedimentoNome}</td>
                <td className="p-2 border">R$ {a.valor.toFixed(2)}</td>
                <td className="p-2 border">{new Date(a.data).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
