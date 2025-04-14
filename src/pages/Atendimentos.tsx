import AtendimentoForm from "@/features/atendimentos/atendimentoForm";
import TabelaAtendimentos from "@/features/atendimentos/TabelaAtendimentos";

export default function AtendimentoPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <AtendimentoForm />
      <TabelaAtendimentos />
    </div>
  );
}
