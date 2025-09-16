import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Quem Somos | Cunha Hedge",
  description: "Conheça a equipe da Cunha Hedge: especialistas em crédito rural e hedge pecuário em Rondônia.",
};

export default function QuemSomos() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Quem Somos
        </h1>
        <p className="text-lg text-zinc-600">
          Especialistas em crédito rural e hedge pecuário com foco em resultado
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
          <p className="text-zinc-600 mb-4">
            Proteger o preço do seu gado, organizar seu crédito rural e reduzir riscos 
            no campo através de estratégias personalizadas e acompanhamento especializado.
          </p>
          <p className="text-zinc-600">
            Atuamos com foco em Rondônia, entendendo as particularidades do mercado 
            local e as necessidades específicas dos produtores da região.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nossos Diferenciais</h2>
          <ul className="space-y-2 text-zinc-600">
            <li>• Conhecimento profundo do mercado pecuário de RO</li>
            <li>• Estratégias personalizadas para cada operação</li>
            <li>• Acompanhamento contínuo e suporte técnico</li>
            <li>• Parceria com bancos e corretoras especializadas</li>
            <li>• Análise de risco detalhada e transparente</li>
          </ul>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nossa Equipe</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4 text-zinc-700">
              <p>
                Na Cunha Hedge, unimos conhecimento técnico e paixão pelo agronegócio. 
                <strong>Diego Martins, Engenheiro Agrônomo</strong>, e 
                <strong> Marcos Roberto, Zootecnista</strong>, somam suas experiências para oferecer uma 
                assessoria completa e confiável ao produtor rural.
              </p>
              <p>
                Nossa equipe acredita que a força do campo está em aliar tradição e inovação. 
                Com olhar atento às particularidades da região e às dinâmicas do mercado, 
                trabalhamos para transformar desafios em oportunidades, levando mais segurança, 
                clareza e eficiência para cada decisão.
              </p>
              <p className="text-zinc-600">
                Mais do que números, entregamos confiança e proximidade, sempre com o objetivo 
                de garantir resultados sólidos e sustentáveis para quem vive da pecuária e da agricultura.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-zinc-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Nossa Localização</h2>
        <p className="text-zinc-600 mb-4">
          Atendemos produtores em Buritis-RO e toda a região, com visitas técnicas 
          e consultoria presencial quando necessário.
        </p>
        <p className="text-sm text-zinc-500">
          Também oferecemos atendimento remoto para produtores de outras regiões 
          que desejam nossos serviços especializados.
        </p>
      </div>
    </div>
  );
}
