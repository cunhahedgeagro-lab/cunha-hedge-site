import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Serviços | Cunha Hedge",
  description: "Conheça nossos serviços: hedge pecuário, crédito rural, análise de risco e consultoria agropecuária.",
};

export default function Servicos() {
  const servicos = [
    {
      titulo: "Hedge Pecuário",
      descricao: "Proteção de preço através de estratégias com opções e futuros",
      detalhes: [
        "Travas de preço com opções de compra e venda",
        "Estratégias com futuros de boi gordo",
        "Análise de base RO x SP",
        "Gestão de margem e risco",
        "Acompanhamento de posições"
      ],
      beneficios: "Reduza o risco de oscilação de preços e garanta margem mínima na venda do seu gado."
    },
    {
      titulo: "Crédito Rural",
      descricao: "Estruturação e acompanhamento de propostas de financiamento",
      detalhes: [
        "Análise de viabilidade do projeto",
        "Estruturação de propostas",
        "Acompanhamento com bancos",
        "Negociação de condições",
        "Gestão de documentação"
      ],
      beneficios: "Aumente suas chances de aprovação e obtenha as melhores condições de financiamento."
    },
    {
      titulo: "Análise de Risco",
      descricao: "Avaliação detalhada de cenários e custos de produção",
      detalhes: [
        "Cálculo de custo por arroba",
        "Análise de ponto de equilíbrio",
        "Cenários de preço e produtividade",
        "Análise de sensibilidade",
        "Relatórios detalhados"
      ],
      beneficios: "Entenda seus custos reais e tome decisões mais assertivas na gestão da propriedade."
    },
    {
      titulo: "Consultoria Agropecuária",
      descricao: "Orientação técnica e estratégica para o agronegócio",
      detalhes: [
        "Planejamento estratégico",
        "Análise de investimentos",
        "Gestão de custos",
        "Otimização de processos",
        "Suporte técnico contínuo"
      ],
      beneficios: "Maximize a eficiência e rentabilidade da sua operação pecuária."
    }
  ];

  const faq = [
    {
      pergunta: "Como funciona o hedge pecuário?",
      resposta: "O hedge pecuário é uma estratégia de proteção de preço que utiliza instrumentos financeiros (opções e futuros) para travar o preço de venda do seu gado, reduzindo o risco de oscilação de preços no mercado."
    },
    {
      pergunta: "Qual o valor mínimo para contratar os serviços?",
      resposta: "Não há valor mínimo. Atendemos desde pequenos produtores até grandes fazendas, adaptando nossas estratégias às necessidades e porte de cada operação."
    },
    {
      pergunta: "Quanto tempo leva para estruturar um crédito rural?",
      resposta: "O tempo varia conforme a complexidade do projeto e a documentação disponível. Em média, entre 15 a 30 dias para propostas bem estruturadas."
    },
    {
      pergunta: "Oferecem acompanhamento após a contratação?",
      resposta: "Sim, oferecemos acompanhamento contínuo para todos os nossos serviços, garantindo que você tenha suporte durante toda a operação."
    }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Nossos Serviços
        </h1>
        <p className="text-lg text-secondary-600">
          Soluções completas para crédito rural e gestão de risco pecuário
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {servicos.map((servico, index) => (
          <Card key={index} className="h-full">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{servico.titulo}</h3>
              <p className="text-secondary-600 mb-4">{servico.descricao}</p>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">O que incluímos:</h4>
                <ul className="text-sm text-secondary-600 space-y-1">
                  {servico.detalhes.map((detalhe, i) => (
                    <li key={i}>• {detalhe}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-primary-50 p-3 rounded-lg border border-primary-100">
                <p className="text-sm font-medium text-primary-800">{servico.beneficios}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Perguntas Frequentes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {faq.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{item.pergunta}</h3>
                <p className="text-zinc-600 text-sm">{item.resposta}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-zinc-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Pronto para começar?</h2>
        <p className="text-zinc-600 mb-6">
          Entre em contato conosco para uma consulta personalizada e descubra 
          como podemos ajudar sua operação.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <a href="https://wa.me/5569993737919?text=Quero%20conhecer%20os%20serviços">
              Falar no WhatsApp
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/contato">Ver contato</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
