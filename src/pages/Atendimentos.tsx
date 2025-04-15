import AtendimentoForm from "@/features/atendimentos/atendimentoForm";
import TabelaAtendimentos from "@/features/atendimentos/TabelaAtendimentos";

export default function AtendimentoPage() {
  return (
    <div className="min-h-screen bg-[#fefaf8] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <AtendimentoForm />
        <TabelaAtendimentos />
      </div>
    </div>
  );
  
}
