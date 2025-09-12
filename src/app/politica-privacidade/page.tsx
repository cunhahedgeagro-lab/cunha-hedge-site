export const metadata = {
  title: "Política de Privacidade | Cunha Hedge",
  description: "Política de privacidade e proteção de dados da Cunha Hedge conforme a LGPD.",
};

export default function PoliticaPrivacidade() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Política de Privacidade
        </h1>
        <p className="text-lg text-zinc-600">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>

      <div className="prose prose-zinc max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Informações Gerais</h2>
          <p className="text-zinc-600 mb-4">
            A Cunha Hedge, empresa de consultoria em crédito rural e hedge pecuário, 
            compromete-se a proteger a privacidade e os dados pessoais de seus clientes 
            e visitantes do site, em conformidade com a Lei Geral de Proteção de Dados 
            (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Dados Coletados</h2>
          <p className="text-zinc-600 mb-4">
            Coletamos os seguintes tipos de dados pessoais:
          </p>
          <ul className="list-disc pl-6 text-zinc-600 space-y-2">
            <li>Dados de identificação: nome, e-mail, telefone</li>
            <li>Dados de localização: endereço, cidade, estado</li>
            <li>Dados profissionais: informações sobre sua atividade agropecuária</li>
            <li>Dados de navegação: cookies e informações de acesso ao site</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Finalidade do Tratamento</h2>
          <p className="text-zinc-600 mb-4">
            Utilizamos seus dados pessoais para:
          </p>
          <ul className="list-disc pl-6 text-zinc-600 space-y-2">
            <li>Prestação de serviços de consultoria em crédito rural e hedge pecuário</li>
            <li>Comunicação sobre nossos serviços e produtos</li>
            <li>Envio de conteúdos educativos e informativos</li>
            <li>Melhoria da experiência do usuário em nosso site</li>
            <li>Cumprimento de obrigações legais e regulamentares</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Base Legal</h2>
          <p className="text-zinc-600 mb-4">
            O tratamento de seus dados pessoais é baseado em:
          </p>
          <ul className="list-disc pl-6 text-zinc-600 space-y-2">
            <li>Consentimento do titular dos dados</li>
            <li>Execução de contrato ou procedimentos preliminares</li>
            <li>Cumprimento de obrigação legal</li>
            <li>Legítimo interesse para melhoria de nossos serviços</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Compartilhamento de Dados</h2>
          <p className="text-zinc-600 mb-4">
            Seus dados pessoais podem ser compartilhados com:
          </p>
          <ul className="list-disc pl-6 text-zinc-600 space-y-2">
            <li>Instituições financeiras para análise de crédito</li>
            <li>Corretoras e bolsas para operações de hedge</li>
            <li>Prestadores de serviços que nos auxiliam na operação</li>
            <li>Autoridades competentes quando exigido por lei</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Direitos do Titular</h2>
          <p className="text-zinc-600 mb-4">
            Você tem direito a:
          </p>
          <ul className="list-disc pl-6 text-zinc-600 space-y-2">
            <li>Confirmar a existência de tratamento de seus dados</li>
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
            <li>Solicitar a portabilidade dos dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Segurança dos Dados</h2>
          <p className="text-zinc-600 mb-4">
            Implementamos medidas técnicas e organizacionais adequadas para proteger 
            seus dados pessoais contra acesso não autorizado, alteração, divulgação 
            ou destruição. Utilizamos criptografia, controles de acesso e monitoramento 
            contínuo de segurança.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Retenção de Dados</h2>
          <p className="text-zinc-600 mb-4">
            Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir 
            as finalidades descritas nesta política, respeitando os prazos legais 
            de retenção aplicáveis ao nosso setor.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Cookies</h2>
          <p className="text-zinc-600 mb-4">
            Utilizamos cookies para melhorar sua experiência de navegação, analisar 
            o uso do site e personalizar conteúdo. Você pode configurar seu navegador 
            para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contato</h2>
          <p className="text-zinc-600 mb-4">
            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
            entre em contato conosco:
          </p>
            <div className="bg-zinc-50 p-4 rounded-lg">
              <p className="text-zinc-700">
                <strong>E-mail:</strong> cunhahedgeagro@gmail.com<br />
                <strong>WhatsApp:</strong> (69) 9 9373-7919<br />
                <strong>Endereço:</strong> Av. Porto Velho 2041, Setor 04 - Buritis - RO
              </p>
            </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Alterações</h2>
          <p className="text-zinc-600 mb-4">
            Esta política pode ser atualizada periodicamente. Recomendamos que você 
            revise esta página regularmente para se manter informado sobre como 
            protegemos seus dados pessoais.
          </p>
        </section>
      </div>
    </div>
  );
}
