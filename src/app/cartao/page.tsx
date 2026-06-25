import { Globe, Instagram, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: "Contato Rápido | Cunha Hedge",
  description:
    "Acesse rapidamente os canais da Cunha Hedge: WhatsApp de Diego, WhatsApp de Marcos, Instagram e site oficial.",
};

const links = [
  {
    label: "Falar com Diego Martins",
    description: "Atendimento direto pelo WhatsApp",
    href: "https://wa.me/5569993737919?text=Ol%C3%A1%20Diego%2C%20vim%20pelo%20cart%C3%A3o%20da%20Cunha%20Hedge",
    icon: MessageCircle,
    className: "bg-green-600 text-white hover:bg-green-700",
    iconClassName: "bg-white/15",
  },
  {
    label: "Falar com Marcos Roberto",
    description: "Atendimento direto pelo WhatsApp",
    href: "https://wa.me/5569993521220?text=Ol%C3%A1%20Marcos%2C%20vim%20pelo%20cart%C3%A3o%20da%20Cunha%20Hedge",
    icon: MessageCircle,
    className: "bg-green-600 text-white hover:bg-green-700",
    iconClassName: "bg-white/15",
  },
  {
    label: "Acessar Instagram",
    description: "Acompanhe a Cunha Hedge",
    href: "https://www.instagram.com/cunhahedge/",
    icon: Instagram,
    className: "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50",
    iconClassName: "bg-zinc-100 text-zinc-700",
  },
  {
    label: "Conhecer nosso site",
    description: "Conheça nossas soluções",
    href: "https://cunhahedge.com.br/",
    icon: Globe,
    className: "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50",
    iconClassName: "bg-zinc-100 text-zinc-700",
  },
];

export default function CartaoPage() {
  return (
    <section className="bg-brand-light">
      <div className="mx-auto flex min-h-[calc(100vh-177px)] max-w-xl flex-col px-4 pb-10 pt-16 sm:pb-14 sm:pt-20">
        <div className="flex flex-1 flex-col">
          <div className="mb-8 flex justify-center">
            <Logo size="lg" />
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold uppercase text-primary">
              CANAIS OFICIAIS
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-900">
              Fale com a Cunha Hedge
            </h1>
          </div>

          <div className="mt-8 grid gap-3">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex min-h-20 items-center gap-4 rounded-lg px-5 py-4 shadow-sm transition-colors ${link.className}`}
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-md ${link.iconClassName}`}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-lg font-semibold leading-tight">
                      {link.label}
                    </span>
                    <span className="mt-1 block text-sm opacity-90">
                      {link.description}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Buritis-RO | Atendimento especializado ao agronegócio
          </p>
        </div>
      </div>
    </section>
  );
}
