import ViabilidadePecuariaCalculator from "@/components/ViabilidadePecuariaCalculator";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Simulador de Viabilidade Pecuária | Cunha Hedge",
  description:
    "Simulador de rentabilidade, breakeven e custo da arroba vendida para operações pecuárias.",
};

export default function ViabilidadePecuariaPage() {
  return <ViabilidadePecuariaCalculator />;
}
