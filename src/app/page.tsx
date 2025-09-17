import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Crédito rural e hedge pecuário com foco em resultado
          </h1>
          <p className="mt-4 text-lg">
            Protegemos seu preço, organizamos seu crédito e reduzimos riscos no campo.
            Atuação especializada em Rondônia.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild className="bg-green-600 text-white hover:bg-green-700">
              <a href="https://wa.me/5569993737919?text=Quero%20uma%20consulta" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
            </Button>
            <Button variant="outline" asChild><Link href="/servicos">Ver serviços</Link></Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Base RO x SP, gestão de risco e estratégias com opções.</p>
        </div>
        <div className="rounded-2xl border-brand bg-white p-6 shadow-lg">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-lg">✓</span>
            </div>
            <p className="font-semibold text-brand text-lg">Diagnóstico gratuito</p>
            <p className="text-sm text-muted-foreground">Entenda seu ponto de equilíbrio e qual preço travar.</p>
          </div>
          <form className="grid gap-3" action="https://formspree.io/f/myzdqlby" method="POST">
            <input className="border border-primary/30 rounded-lg px-3 py-2 focus:border-primary focus:outline-none" name="nome" placeholder="Seu nome" required />
            <input className="border border-primary/30 rounded-lg px-3 py-2 focus:border-primary focus:outline-none" name="whatsapp" placeholder="WhatsApp" required />
            <textarea className="border border-primary/30 rounded-lg px-3 py-2 focus:border-primary focus:outline-none" name="mensagem" placeholder="Conte brevemente sua operação" rows={3}/>
            <Button type="submit" className="btn-primary">Quero meu diagnóstico</Button>
          </form>
        </div>
      </section>

      {/* SERVIÇOS RÁPIDOS */}
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-3 gap-6">
          {[
            { t: "Hedge Pecuário", d: "Travas com opções e futuros para proteger arroba." },
            { t: "Crédito Rural", d: "Estruturação de propostas e acompanhamento com bancos." },
            { t: "Análise de Risco", d: "Cenários, custos por arroba e ponto de equilíbrio." },
          ].map((s) => (
            <Card key={s.t} className="card-service">
              <CardContent className="p-6">
                <h3 className="font-semibold text-brand text-lg">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-primary text-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Vamos organizar seu risco e seu crédito?</h2>
          <p className="text-lg text-green-100 mb-8">Atendimento em Buritis-RO e região.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-green-50">
              <a href="https://wa.me/5569993737919?text=Quero%20falar%20com%20a%20Cunha%20Hedge" target="_blank" rel="noopener noreferrer">Chamar no WhatsApp</a>
            </Button>
            <Button asChild size="lg" className="bg-green-600 text-white hover:bg-green-700">
              <Link href="/contato">Ver contato</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
