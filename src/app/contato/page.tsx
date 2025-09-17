import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/PhoneInput";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Contato | Cunha Hedge",
  description: "Entre em contato com a Cunha Hedge. Atendimento em Buritis-RO e região para crédito rural e hedge pecuário.",
};

export default function Contato() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Entre em Contato
        </h1>
        <p className="text-lg text-zinc-600">
          Estamos prontos para ajudar com sua operação pecuária
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Formulário de Contato */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Envie sua mensagem</h2>
              <form className="space-y-4" action="https://formspree.io/f/myzdqlby" method="POST">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium mb-1">
                      Nome *
                    </label>
                    <Input
                      id="nome"
                      name="nome"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium mb-1">
                      Telefone/WhatsApp *
                    </label>
                    <PhoneInput
                      id="telefone"
                      name="telefone"
                      placeholder="(69) 99999-9999"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium mb-1">
                    Assunto *
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Selecione o assunto</option>
                    <option value="hedge-pecuario">Hedge Pecuário</option>
                    <option value="credito-rural">Crédito Rural</option>
                    <option value="analise-risco">Análise de Risco</option>
                    <option value="consultoria">Consultoria</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium mb-1">
                    Mensagem *
                  </label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    placeholder="Conte-nos sobre sua necessidade..."
                    rows={4}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700 cursor-pointer">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Informações de Contato */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Informações de Contato</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2 text-primary">WhatsApp</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Diego Martins</p>
                      <a 
                        href="https://wa.me/5569993737919" 
                        className="text-primary hover:text-primary/80 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        (69) 9 9373-7919
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Marcos Roberto</p>
                      <a 
                        href="https://wa.me/5569993521220" 
                        className="text-primary hover:text-primary/80 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        (69) 9 9352-1220
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1 text-primary">E-mail</h3>
                  <a 
                    href="mailto:cunhahedgeagro@gmail.com" 
                    className="text-gray-600 hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    cunhahedgeagro@gmail.com
                  </a>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1 text-primary">Endereço</h3>
                  <p className="text-gray-600">
                    Av. Porto Velho 2041, Setor 04<br />
                    Buritis - RO
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>


          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Localização</h2>
              <div className="aspect-video rounded-lg overflow-hidden border">
                <iframe
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Av.%20Porto%20Velho%202041%2C%20Setor%2004%2C%20Buritis%20-%20RO&output=embed"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-zinc-600 mt-3">
                Atendemos produtores em Buritis-RO e toda a região. 
                Visitas técnicas disponíveis mediante agendamento.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Final */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Precisa de uma resposta rápida?</h2>
        <p className="text-zinc-600 mb-6">
          Entre em contato via WhatsApp para atendimento imediato.
        </p>
        <Button asChild size="lg">
          <a 
            href="https://wa.me/5569993737919?text=Olá%20Cunha%20Hedge,%20gostaria%20de%20mais%20informações"
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
