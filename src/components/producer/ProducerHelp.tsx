/**
 * Ajuda do Produtor
 * FAQ simplificado (sem desburocratização - BLOCO 4 removido)
 */

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, FileText, ExternalLink } from "lucide-react";

const faqItems = [
  {
    question: "O que é o Cultivo+?",
    answer:
      "O Cultivo+ conecta agricultores familiares a compradores como escolas, ONGs e comércios locais, facilitando a venda direta da produção.",
  },
  {
    question: "Como funciona o match com compradores?",
    answer:
      "Nossa IA analisa a perecibilidade dos seus produtos, distância dos compradores e impacto social para sugerir as melhores vendas.",
  },
  {
    question: "Como cadastro minha produção?",
    answer:
      "Vá até a aba 'Produção', clique no botão + e informe o tipo de alimento, quantidade e data estimada de colheita.",
  },
  {
    question: "Preciso pagar para usar o app?",
    answer:
      "Não! O Cultivo+ é gratuito para agricultores familiares. Nosso objetivo é reduzir o desperdício e conectar você a compradores.",
  },
  {
    question: "Como entro em contato com um comprador?",
    answer:
      "Na aba 'Vendas', você verá os compradores sugeridos. Ao aceitar uma sugestão, o contato é feito internamente pela plataforma.",
  },
];

const ProducerHelp = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Ajuda</h1>
          <p className="text-sm text-muted-foreground">
            Dúvidas frequentes sobre o app
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-3">
        <h2 className="font-semibold text-foreground">Perguntas Frequentes</h2>

        {faqItems.map((item, index) => (
          <div key={index} className="card-elevated overflow-hidden">
            <button
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <span className="font-medium text-foreground pr-4">
                {item.question}
              </span>
              {expandedFaq === index ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {expandedFaq === index && (
              <div className="px-4 pb-4 pt-0">
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Link para documentação */}
      <div className="card-elevated p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Guia de Documentos</p>
            <p className="text-sm text-muted-foreground">
              Saiba quais documentos você precisa
            </p>
          </div>
          <ExternalLink className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default ProducerHelp;
