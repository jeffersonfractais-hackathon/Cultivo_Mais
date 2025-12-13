import { MessageCircle, FileText, HelpCircle, CheckCircle, AlertCircle, XCircle, ChevronRight } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question: "O que é o PAA?",
    answer: "O PAA (Programa de Aquisição de Alimentos) é um programa do governo que compra alimentos de agricultores familiares para doar a pessoas em situação de vulnerabilidade.",
  },
  {
    question: "O que é o PNAE?",
    answer: "O PNAE (Programa Nacional de Alimentação Escolar) garante que pelo menos 30% dos alimentos servidos nas escolas públicas sejam comprados de agricultores familiares.",
  },
  {
    question: "Preciso de CAF ou DAP?",
    answer: "Sim! A CAF (Cadastro de Agricultura Familiar) substituiu a DAP. É o documento que comprova que você é agricultor familiar e permite participar dos programas do governo.",
  },
  {
    question: "Quanto posso vender por ano?",
    answer: "Pelo PAA, você pode vender até R$ 12.000 por ano. Pelo PNAE, até R$ 40.000 por ano por DAP/CAF.",
  },
];

const eligibilitySteps = [
  { label: "CAF válida", status: "valid" as const },
  { label: "Documento pessoal", status: "valid" as const },
  { label: "Limite anual disponível", status: "warning" as const, detail: "Faltam R$ 8.500" },
  { label: "Produção cadastrada", status: "valid" as const },
];

const getStatusIcon = (status: "valid" | "warning" | "invalid") => {
  switch (status) {
    case "valid":
      return <CheckCircle className="w-5 h-5 text-success" />;
    case "warning":
      return <AlertCircle className="w-5 h-5 text-warning" />;
    case "invalid":
      return <XCircle className="w-5 h-5 text-destructive" />;
  }
};

const HelpTab = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ajuda</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tire suas dúvidas sobre os programas
        </p>
      </div>

      {/* Eligibility Check */}
      <div className="card-elevated p-4 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">Verificação de Elegibilidade</h2>
            <p className="text-xs text-muted-foreground">Você pode vender para PAA/PNAE</p>
          </div>
        </div>

        <div className="space-y-3">
          {eligibilitySteps.map((step, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-3">
                {getStatusIcon(step.status)}
                <span className="text-sm font-medium text-foreground">{step.label}</span>
              </div>
              {step.detail && (
                <span className="text-xs text-warning font-medium">{step.detail}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Preview */}
      <div className="card-elevated p-4 bg-accent/50 border-accent animate-slide-up stagger-1">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Assistente Virtual</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Pergunte qualquer coisa sobre documentação e programas do governo.
            </p>
            <button className="mt-3 btn-primary w-full">
              Iniciar Conversa
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="animate-slide-up stagger-2">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Perguntas Frequentes</h2>
        </div>

        <div className="space-y-2">
          {faqItems.map((item, index) => (
            <div key={index} className="card-elevated overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-foreground pr-4">{item.question}</span>
                <ChevronRight 
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    expandedFaq === index ? "rotate-90" : ""
                  }`} 
                />
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4 animate-fade-in">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Documents Guide */}
      <div className="card-interactive p-4 animate-slide-up stagger-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Guia de Documentos</h3>
            <p className="text-sm text-muted-foreground">Veja tudo que você precisa</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default HelpTab;
