import "./globals.css";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

export const metadata = {
  title: "Cunha Hedge | Crédito Rural e Hedge Pecuário",
  description: "Consultoria financeira e agropecuária em Rondônia: crédito rural, proteção de preço e gestão de risco.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <header className="border-b border-primary/20 bg-white shadow-lg">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/quem-somos" className="inline-flex items-center h-10 text-gray-600 hover:text-primary transition-colors font-medium">Quem somos</Link>
              <Link href="/servicos" className="inline-flex items-center h-10 text-gray-600 hover:text-primary transition-colors font-medium">Serviços</Link>
              <Link href="/contato" className="inline-flex items-center h-10 font-semibold text-primary hover:text-primary/80 bg-primary/10 px-4 rounded-lg">Contato</Link>
            </nav>
            <MobileMenu />
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-primary/20 bg-primary/5">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Logo size="sm" />
              </div>
              <div className="text-center">
                <p>© {new Date().getFullYear()} Cunha Hedge — Buritis-RO • CNPJ 62.554.525/0001-26</p>
                <p className="mt-1 text-xs">Crédito Rural e Hedge Pecuário</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
