"use client";

import * as React from "react";
import Link from "next/link";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <div className="md:hidden">
      <button
        aria-label="Abrir menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-primary/30 text-primary hover:bg-primary/10 transition cursor-pointer"
      >
        <span className="sr-only">Menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 right-0 z-50 w-64 h-full bg-white shadow-xl border-l border-primary/20 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-primary">Menu</span>
              <button
                aria-label="Fechar menu"
                onClick={() => setOpen(false)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-primary/10 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              <Link href="/quem-somos" className="py-2 text-gray-700 hover:text-primary" onClick={() => setOpen(false)}>
                Quem somos
              </Link>
              <Link href="/servicos" className="py-2 text-gray-700 hover:text-primary" onClick={() => setOpen(false)}>
                Serviços
              </Link>
              <Link href="/contato" className="py-2 text-gray-700 hover:text-primary" onClick={() => setOpen(false)}>
                Contato
              </Link>
            </nav>

            <a
              href="https://wa.me/5569993737919?text=Olá%20Cunha%20Hedge"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center h-10 rounded-md bg-green-600 text-white hover:bg-green-700 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default MobileMenu;


