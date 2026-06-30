"use client";

import * as React from "react";
import { Calculator, FileText, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  calculateCattleViability,
  defaultCattleViabilityInput,
  type CattleViabilityInput,
  type CattleViabilityResult,
} from "@/lib/cattle-viability";

function cloneDefaultInput(): CattleViabilityInput {
  return { ...defaultCattleViabilityInput, initialDate: getTodayDateInputValue() };
}

function getTodayDateInputValue(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Manaus",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value ?? "2026";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";
  return `${year}-${month}-${day}`;
}

function parseNumber(value: string): number {
  const normalized = value.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatSignedCurrency(value: number): string {
  const absoluteValue = formatCurrency(Math.abs(value));

  if (value > 0) return absoluteValue;
  if (value < 0) return `−\u00A0${absoluteValue}`;
  return absoluteValue;
}

function formatNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function formatPercent(value: number, digits = 2): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function formatDate(value: string): string {
  if (!value) return "-";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("pt-BR").format(date);
}

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: string;
  suffix?: string;
  blankWhenZero?: boolean;
};

function NumberField({
  label,
  value,
  onChange,
  step = "0.01",
  suffix,
  blankWhenZero = false,
}: NumberFieldProps) {
  const initialValue =
    blankWhenZero && value === 0
      ? ""
      : Number.isFinite(value)
        ? String(value)
        : "";

  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <div className="relative">
        <Input
          type="number"
          inputMode="decimal"
          step={step}
          defaultValue={initialValue}
          onChange={(event) => onChange(parseNumber(event.target.value))}
          className={suffix ? "pr-12" : undefined}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-zinc-500">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TextField({ label, value, onChange }: TextFieldProps) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

type IntakeFieldProps = {
  value: number;
  unit: CattleViabilityInput["intakeUnit"];
  helperText: string;
  blankWhenZero?: boolean;
  onValueChange: (value: number) => void;
  onUnitChange: (unit: CattleViabilityInput["intakeUnit"]) => void;
};

function IntakeField({
  value,
  unit,
  helperText,
  blankWhenZero = false,
  onValueChange,
  onUnitChange,
}: IntakeFieldProps) {
  const initialValue =
    blankWhenZero && value === 0
      ? ""
      : Number.isFinite(value)
        ? String(value)
        : "";

  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-zinc-700">
        Consumo estimado
      </span>
      <div className="grid grid-cols-[minmax(0,1fr)_140px] gap-2">
        <Input
          type="number"
          inputMode="decimal"
          step={unit === "percentLiveWeight" ? "0.01" : "0.001"}
          defaultValue={initialValue}
          onChange={(event) => onValueChange(parseNumber(event.target.value))}
        />
        <select
          value={unit}
          onChange={(event) =>
            onUnitChange(event.target.value as CattleViabilityInput["intakeUnit"])
          }
          className="h-9 rounded-md border border-input bg-white px-3 text-sm text-zinc-900 shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <option value="percentLiveWeight">% PV</option>
          <option value="kgPerHeadDay">kg/animal/dia</option>
        </select>
      </div>
      <span className="text-sm text-zinc-500">{helperText}</span>
    </label>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-lg border-primary/20 py-5 shadow-sm">
      <CardContent className="px-5">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">{title}</h2>
        {children}
      </CardContent>
    </Card>
  );
}

function ResultLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-zinc-100 py-3 last:border-b-0">
      <span className="text-sm text-zinc-600">{label}</span>
      <span className="text-right text-sm font-semibold text-zinc-900">
        {value}
      </span>
    </div>
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function tableRows(rows: Array<[string, string]>): string {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td>${escapeHtml(label)}</td>
          <td>${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join("");
}

function resultTone(value: number) {
  if (value > 0) {
    return {
      card: "bg-green-50",
      border: "border-green-100",
      label: "text-green-700",
      value: "text-green-900",
    };
  }

  if (value < 0) {
    return {
      card: "bg-red-50",
      border: "border-red-100",
      label: "text-red-700",
      value: "text-red-900",
    };
  }

  return {
    card: "bg-zinc-50",
    border: "border-zinc-100",
    label: "text-zinc-500",
    value: "text-zinc-900",
  };
}

function buildReportHtml({
  input,
  result,
  intakeHelperText,
  logoUrl,
}: {
  input: CattleViabilityInput;
  result: CattleViabilityResult;
  intakeHelperText: string;
  logoUrl: string;
}) {
  const generatedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
  const productionMode =
    input.productionCostMode === "totalDaily"
      ? "Diária pronta"
      : "Compor diária";
  const productionRows: Array<[string, string]> =
    input.productionCostMode === "totalDaily"
      ? [
          ["Modo de cálculo", productionMode],
          ["Diária por animal", formatCurrency(input.dailyProductionCostPerHead)],
          ["Custo no ciclo por cabeça", formatCurrency(result.productionCostPerHead)],
        ]
      : [
          ["Modo de cálculo", productionMode],
          ["Dieta ou suplemento", input.supplementName || "-"],
          ["Custo da dieta/suplemento", `${formatCurrency(input.supplementCostPerKg)}/kg`],
          ["Consumo convertido", intakeHelperText],
          ["Custo dieta/dia", formatCurrency(result.supplementConsumedCostDay)],
          ["Custo operacional", `${formatCurrency(input.operationalCostPerHeadDay)}/dia`],
          ["Custo de pastagens", `${formatCurrency(input.pastureCostPerHeadDay)}/dia`],
          ["Diária calculada", formatCurrency(result.detailedProductionCostPerHeadDay)],
          ["Custo no ciclo por cabeça", formatCurrency(result.productionCostPerHead)],
        ];
  const reportFatteningResultPerHead =
    (result.finalCarcassArrobas - result.initialArrobas) *
      input.initialArrobaPrice -
    result.productionCostPerHead;
  const reportMarketEffectPerHead =
    result.finalCarcassArrobas *
    (input.saleArrobaPrice - input.initialArrobaPrice);
  const reportFatteningResultClass =
    reportFatteningResultPerHead > 0
      ? "positive"
      : reportFatteningResultPerHead < 0
        ? "negative"
        : "neutral";
  const reportMarketEffectClass =
    reportMarketEffectPerHead > 0
      ? "positive"
      : reportMarketEffectPerHead < 0
        ? "negative"
        : "neutral";
  const reportEstimatedResultClass =
    result.netProfitPerHead > 0
      ? "positive"
      : result.netProfitPerHead < 0
        ? "negative"
        : "neutral";

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Relatório de Viabilidade Pecuária | Cunha Hedge</title>
  <style>
    @page { margin: 16mm; }
    * { box-sizing: border-box; }
    html {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      margin: 0;
      color: #1f2937;
      font-family: Arial, Helvetica, sans-serif;
      background: #f4f7f5;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      background: #ffffff;
      padding: 28px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      border-bottom: 4px solid #28B463;
      padding-bottom: 18px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .brand img {
      width: 58px;
      height: 58px;
      object-fit: contain;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      color: #111827;
      line-height: 1.1;
    }
    .brand-subtitle {
      margin-top: 3px;
      font-size: 11px;
      color: #6b7280;
      letter-spacing: .04em;
      text-transform: uppercase;
    }
    .meta {
      text-align: right;
      font-size: 12px;
      color: #6b7280;
      line-height: 1.6;
    }
    h1 {
      margin: 28px 0 8px;
      font-size: 28px;
      color: #111827;
    }
    .lead {
      margin: 0 0 22px;
      color: #4b5563;
      font-size: 14px;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin: 22px 0;
    }
    .metric {
      border: 1px solid #dcfce7;
      border-radius: 8px;
      padding: 14px;
      background: #f7fdf9;
    }
    .metric.primary {
      background: #f0fdf4;
      border-color: #22c55e;
      color: #14532d;
    }
    .metric.primary .metric-label,
    .metric.primary .metric-value {
      color: #14532d;
    }
    .metric.positive {
      background: #f0fdf4;
      border-color: #bbf7d0;
    }
    .metric.negative {
      background: #fef2f2;
      border-color: #fecaca;
    }
    .metric.neutral {
      background: #f8fafc;
      border-color: #e5e7eb;
    }
    .metric.positive .metric-label,
    .metric.positive .metric-value {
      color: #166534;
    }
    .metric.negative .metric-label,
    .metric.negative .metric-value {
      color: #991b1b;
    }
    .metric.neutral .metric-label,
    .metric.neutral .metric-value {
      color: #374151;
    }
    .metric-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .04em;
      opacity: .82;
    }
    .metric-value {
      margin-top: 7px;
      font-size: 19px;
      font-weight: 800;
      line-height: 1.15;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    .section {
      margin-top: 16px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      break-inside: avoid;
    }
    .section h2 {
      margin: 0;
      background: #f0fdf4;
      color: #166534;
      font-size: 15px;
      padding: 11px 13px;
      border-bottom: 1px solid #dcfce7;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    td {
      padding: 9px 13px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: top;
    }
    tr:last-child td { border-bottom: 0; }
    td:first-child {
      color: #6b7280;
      width: 56%;
    }
    td:last-child {
      text-align: right;
      font-weight: 700;
      color: #111827;
    }
    .note {
      margin-top: 18px;
      padding: 12px 14px;
      border-left: 4px solid #28B463;
      background: #f8fafc;
      color: #4b5563;
      font-size: 11px;
      line-height: 1.45;
    }
    .footer {
      margin-top: 26px;
      border-top: 1px solid #e5e7eb;
      padding-top: 12px;
      color: #6b7280;
      font-size: 11px;
      display: flex;
      justify-content: space-between;
      gap: 18px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 16px;
    }
    .print-button {
      border: 0;
      border-radius: 6px;
      background: #28B463;
      color: #fff;
      padding: 10px 14px;
      font-weight: 700;
      cursor: pointer;
    }
    @media print {
      body { background: #fff; }
      .page { width: auto; min-height: auto; margin: 0; padding: 0; }
      .actions { display: none; }
    }
  </style>
</head>
<body>
  <main class="page">
    <div class="actions">
      <button class="print-button" onclick="window.print()">Imprimir ou salvar PDF</button>
    </div>

    <header class="header">
      <div class="brand">
        <img src="${escapeHtml(logoUrl)}" alt="Cunha Hedge" />
        <div>
          <div class="brand-title">Cunha Hedge</div>
          <div class="brand-subtitle">Crédito Rural e Hedge Pecuário</div>
        </div>
      </div>
      <div class="meta">
        <div>Relatório gerado em ${escapeHtml(generatedAt)}</div>
        <div>Propriedade: ${escapeHtml(input.propertyName || "-")}</div>
      </div>
    </header>

    <h1>Relatório de Viabilidade Pecuária</h1>
    <p class="lead">Resumo econômico da operação simulada com base nas premissas informadas.</p>

    <section class="summary">
      <div class="metric primary">
        <div class="metric-label">Preço de equilíbrio</div>
        <div class="metric-value">${escapeHtml(formatCurrency(result.breakevenPerSoldArroba))}</div>
      </div>
      <div class="metric ${reportFatteningResultClass}">
        <div class="metric-label">Resultado da engorda</div>
        <div class="metric-value">${escapeHtml(formatSignedCurrency(reportFatteningResultPerHead))}</div>
      </div>
      <div class="metric ${reportMarketEffectClass}">
        <div class="metric-label">Efeito do mercado</div>
        <div class="metric-value">${escapeHtml(formatSignedCurrency(reportMarketEffectPerHead))}</div>
      </div>
      <div class="metric ${reportEstimatedResultClass}">
        <div class="metric-label">Resultado estimado/cabeça</div>
        <div class="metric-value">${escapeHtml(formatSignedCurrency(result.netProfitPerHead))}</div>
      </div>
    </section>

    <div class="grid">
      <section class="section">
        <h2>Dados da Operação</h2>
        <table>
          <tbody>
            ${tableRows([
              ["Propriedade", input.propertyName || "-"],
              ["Tamanho do lote", `${formatNumber(input.lotSize, 0)} cab`],
              ["Data inicial", formatDate(input.initialDate)],
              ["Data final estimada", formatDate(result.finalDate)],
              ["Período", `${formatNumber(result.periodDays, 0)} dias`],
              ["GMD", `${formatNumber(input.averageDailyGainKg, 3)} kg/dia`],
            ])}
          </tbody>
        </table>
      </section>

      <section class="section">
        <h2>Dados Zootécnicos</h2>
        <table>
          <tbody>
            ${tableRows([
              ["Peso vivo inicial", `${formatNumber(input.initialLiveWeightKg, 2)} kg`],
              ["Peso vivo final", `${formatNumber(input.finalLiveWeightKg, 2)} kg`],
              ["Peso vivo médio", `${formatNumber(result.averageLiveWeightKg, 2)} kg`],
              ["Rendimento de carcaça final", `${formatNumber(input.carcassYieldPercent, 2)}%`],
              ["Peso de carcaça estimado", `${formatNumber(result.finalCarcassWeightKg, 2)} kg`],
              ["@ produzidas", formatNumber(result.producedArrobas, 2)],
            ])}
          </tbody>
        </table>
      </section>
    </div>

    <div class="grid">
      <section class="section">
        <h2>Custo de Produção</h2>
        <table>
          <tbody>${tableRows(productionRows)}</tbody>
        </table>
      </section>

      <section class="section">
        <h2>Compra, Venda e Crédito</h2>
        <table>
          <tbody>
            ${tableRows([
              ["Preço @ inicial", formatCurrency(input.initialArrobaPrice)],
              ["Preço @ venda", formatCurrency(input.saleArrobaPrice)],
              ["Seguro", `${formatCurrency(input.insuranceCostPerArroba)}/@`],
              ["Valor financiado", formatCurrency(input.financedValue)],
              ["Taxa de juros ao ano", `${formatNumber(input.annualInterestRatePercent, 2)}%`],
              ["Juro total", formatCurrency(result.totalInterest)],
              ["Juro por cabeça", formatCurrency(result.interestCostPerHead)],
            ])}
          </tbody>
        </table>
      </section>
    </div>

    <section class="section">
      <h2>Resultado Econômico</h2>
      <table>
        <tbody>
          ${tableRows([
            ["Custo compra animais por cabeça", formatCurrency(result.animalPurchaseCostPerHead)],
            ["Receita por cabeça", formatCurrency(result.saleRevenuePerHead)],
            ["Investimento por cabeça", formatCurrency(result.investmentPerHead)],
            ["Resultado da engorda/cabeça", formatSignedCurrency(reportFatteningResultPerHead)],
            ["Efeito do mercado/cabeça", formatSignedCurrency(reportMarketEffectPerHead)],
            ["Resultado estimado/cabeça", formatSignedCurrency(result.netProfitPerHead)],
            ["Preço de equilíbrio da operação", `${formatCurrency(result.breakevenPerSoldArroba)}/@`],
            ["Margem sobre o equilíbrio", `${formatCurrency(result.salePriceSpreadToBreakeven)}/@`],
            ["Custo produção total", formatCurrency(result.totalProductionCost)],
            ["Receita total", formatCurrency(result.totalRevenue)],
            ["Investimento total", formatCurrency(result.totalInvestment)],
            ["Lucro bruto total", formatCurrency(result.totalGrossProfit)],
            ["Resultado estimado final", formatCurrency(result.totalNetProfit)],
            ["Rentabilidade total", formatPercent(result.totalReturnPercent)],
            ["Rentabilidade mensal", formatPercent(result.monthlyReturnPercent)],
          ])}
        </tbody>
      </table>
    </section>

    <div class="note">
      Este relatório é uma simulação baseada nas premissas informadas no momento da geração. Os resultados dependem da qualidade dos dados inseridos e devem ser avaliados em conjunto com a realidade operacional e comercial da propriedade.
    </div>

    <footer class="footer">
      <span>Cunha Hedge | Crédito Rural e Hedge Pecuário</span>
      <span>Buritis-RO</span>
    </footer>
  </main>
</body>
</html>`;
}

export default function ViabilidadePecuariaCalculator() {
  const [input, setInput] = React.useState<CattleViabilityInput>(
    cloneDefaultInput
  );
  const [formResetKey, setFormResetKey] = React.useState(0);
  const result = React.useMemo(() => calculateCattleViability(input), [input]);
  const fatteningResultPerHead =
    (result.finalCarcassArrobas - result.initialArrobas) *
      input.initialArrobaPrice -
    result.productionCostPerHead;
  const marketEffectPerHead =
    result.finalCarcassArrobas *
    (input.saleArrobaPrice - input.initialArrobaPrice);
  const fatteningResultTone = resultTone(fatteningResultPerHead);
  const marketEffectTone = resultTone(marketEffectPerHead);
  const estimatedResultTone = resultTone(result.netProfitPerHead);
  const intakeEquivalentPercent =
    result.averageLiveWeightKg > 0
      ? (result.estimatedIntakeKgDay / result.averageLiveWeightKg) * 100
      : 0;
  const intakeHelperText =
    input.intakeUnit === "percentLiveWeight"
      ? `${formatNumber(input.intakeValue, 2)}% PV = ${formatNumber(
          result.estimatedIntakeKgDay,
          2
        )} kg/animal/dia`
      : `${formatNumber(input.intakeValue, 2)} kg/animal/dia = ${formatNumber(
          intakeEquivalentPercent,
          2
        )}% PV`;

  function update<K extends keyof CattleViabilityInput>(
    key: K,
    value: CattleViabilityInput[K]
  ) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function resetInput() {
    setInput(cloneDefaultInput());
    setFormResetKey((current) => current + 1);
  }

  function generateReport() {
    const logoUrl = `${window.location.origin}/images/logo-transparent.png`;
    const reportHtml = buildReportHtml({
      input,
      result,
      intakeHelperText,
      logoUrl,
    });
    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {
      const blob = new Blob([reportHtml], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "relatorio-viabilidade-pecuaria-cunha-hedge.html";
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    reportWindow.document.open();
    reportWindow.document.write(reportHtml);
    reportWindow.document.close();
    reportWindow.focus();
    window.setTimeout(() => reportWindow.print(), 300);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">
            Cunha Hedge
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">
            Simulador de viabilidade pecuária
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-600">
            Cálculo de rentabilidade, custo de produção e breakeven da @ vendida.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={resetInput}
            className="h-10 border-primary/30 text-primary hover:bg-primary/10"
          >
            <RefreshCw className="size-4" />
            Restaurar padrão
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div key={formResetKey} className="grid gap-6">
          <Section title="Operação">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Propriedade"
                value={input.propertyName}
                onChange={(value) => update("propertyName", value)}
              />
              <NumberField
                label="Tamanho do lote"
                value={input.lotSize}
                onChange={(value) => update("lotSize", value)}
                step="1"
                suffix="cab"
                blankWhenZero
              />
              <label className="grid gap-1.5">
                <span className="text-sm font-medium text-zinc-700">
                  Data inicial
                </span>
                <Input
                  type="date"
                  value={input.initialDate}
                  onChange={(event) => update("initialDate", event.target.value)}
                />
              </label>
              <NumberField
                label="GMD"
                value={input.averageDailyGainKg}
                onChange={(value) => update("averageDailyGainKg", value)}
                step="0.001"
                suffix="kg"
              />
            </div>
          </Section>

          <Section title="Dados zootécnicos">
            <div className="grid gap-4 md:grid-cols-3">
              <NumberField
                label="Peso vivo inicial"
                value={input.initialLiveWeightKg}
                onChange={(value) => update("initialLiveWeightKg", value)}
                suffix="kg"
                blankWhenZero
              />
              <NumberField
                label="Peso vivo final"
                value={input.finalLiveWeightKg}
                onChange={(value) => update("finalLiveWeightKg", value)}
                suffix="kg"
                blankWhenZero
              />
              <NumberField
                label="Rendimento de carcaça"
                value={input.carcassYieldPercent}
                onChange={(value) => update("carcassYieldPercent", value)}
                step="0.1"
                suffix="%"
              />
              <NumberField
                label="Preço @ inicial"
                value={input.initialArrobaPrice}
                onChange={(value) => update("initialArrobaPrice", value)}
                suffix="R$"
                blankWhenZero
              />
              <NumberField
                label="Preço @ venda"
                value={input.saleArrobaPrice}
                onChange={(value) => update("saleArrobaPrice", value)}
                suffix="R$"
                blankWhenZero
              />
            </div>
          </Section>

          <Section title="Custo de produção">
            <div className="grid gap-5">
              <div className="grid grid-cols-2 rounded-lg border border-zinc-200 bg-zinc-50 p-1">
                <button
                  type="button"
                  onClick={() => update("productionCostMode", "totalDaily")}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                    input.productionCostMode === "totalDaily"
                      ? "bg-white text-primary shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  Diária pronta
                </button>
                <button
                  type="button"
                  onClick={() => update("productionCostMode", "detailed")}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                    input.productionCostMode === "detailed"
                      ? "bg-white text-primary shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  Compor diária
                </button>
              </div>

              {input.productionCostMode === "totalDaily" ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <NumberField
                    label="Diária por animal"
                    value={input.dailyProductionCostPerHead}
                    onChange={(value) =>
                      update("dailyProductionCostPerHead", value)
                    }
                    step="0.01"
                    suffix="R$/dia"
                    blankWhenZero
                  />
                  <div className="rounded-lg bg-zinc-50 px-4 py-3">
                    <p className="text-sm text-zinc-600">Custo no ciclo/cab</p>
                    <p className="mt-1 text-lg font-semibold text-zinc-900">
                      {formatCurrency(result.productionCostPerHead)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField
                      label="Dieta ou suplemento"
                      value={input.supplementName}
                      onChange={(value) => update("supplementName", value)}
                    />
                    <NumberField
                      label="Custo da dieta/suplemento"
                      value={input.supplementCostPerKg}
                      onChange={(value) => update("supplementCostPerKg", value)}
                      step="0.01"
                      suffix="R$/kg"
                      blankWhenZero
                    />
                    <IntakeField
                      value={input.intakeValue}
                      unit={input.intakeUnit}
                      helperText={intakeHelperText}
                      blankWhenZero
                      onValueChange={(value) => update("intakeValue", value)}
                      onUnitChange={(unit) => update("intakeUnit", unit)}
                    />
                    <NumberField
                      label="Custo operacional"
                      value={input.operationalCostPerHeadDay}
                      onChange={(value) =>
                        update("operationalCostPerHeadDay", value)
                      }
                      step="0.01"
                      suffix="R$/dia"
                    />
                    <NumberField
                      label="Custo de pastagens"
                      value={input.pastureCostPerHeadDay}
                      onChange={(value) =>
                        update("pastureCostPerHeadDay", value)
                      }
                      step="0.01"
                      suffix="R$/dia"
                    />
                  </div>
                  <div className="grid gap-3 rounded-lg bg-zinc-50 px-4 py-3 md:grid-cols-3">
                    <ResultLine
                      label="Custo dieta/dia"
                      value={formatCurrency(result.supplementConsumedCostDay)}
                    />
                    <ResultLine
                      label="Diária calculada"
                      value={formatCurrency(
                        result.detailedProductionCostPerHeadDay
                      )}
                    />
                    <ResultLine
                      label="Custo no ciclo/cab"
                      value={formatCurrency(result.productionCostPerHead)}
                    />
                  </div>
                </div>
              )}
            </div>
          </Section>

          <Section title="Crédito e Hedge">
            <div className="grid gap-4 md:grid-cols-3">
              <NumberField
                label="Seguro"
                value={input.insuranceCostPerArroba}
                onChange={(value) => update("insuranceCostPerArroba", value)}
                step="0.01"
                suffix="R$/@"
                blankWhenZero
              />
              <NumberField
                label="Valor financiado"
                value={input.financedValue}
                onChange={(value) => update("financedValue", value)}
                step="100"
                suffix="R$"
                blankWhenZero
              />
              <NumberField
                label="Juros ao ano"
                value={input.annualInterestRatePercent}
                onChange={(value) => update("annualInterestRatePercent", value)}
                step="0.01"
                suffix="%"
                blankWhenZero
              />
            </div>
          </Section>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <Card className="rounded-lg border-primary/30 bg-white py-0 shadow-lg">
            <CardContent className="px-0">
              <div className="rounded-t-lg bg-primary px-6 py-5 text-white">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-md bg-white/15">
                    <Calculator className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm text-white/80">
                      Preço de equilíbrio da operação
                    </p>
                    <p className="text-3xl font-semibold">
                      {formatCurrency(result.breakevenPerSoldArroba)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-5 sm:px-6">
                <div className="space-y-2.5">
                  <div
                    className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-lg border px-4 py-3 ${fatteningResultTone.card} ${fatteningResultTone.border}`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase leading-snug ${fatteningResultTone.label}`}
                    >
                      Resultado da engorda
                    </p>
                    <p
                      className={`whitespace-nowrap text-right text-lg font-semibold leading-tight ${fatteningResultTone.value}`}
                    >
                      {formatSignedCurrency(fatteningResultPerHead)}
                    </p>
                  </div>
                  <div
                    className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-lg border px-4 py-3 ${marketEffectTone.card} ${marketEffectTone.border}`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase leading-snug ${marketEffectTone.label}`}
                    >
                      Efeito do mercado
                    </p>
                    <p
                      className={`whitespace-nowrap text-right text-lg font-semibold leading-tight ${marketEffectTone.value}`}
                    >
                      {formatSignedCurrency(marketEffectPerHead)}
                    </p>
                  </div>
                  <div
                    className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-lg border px-4 py-3 ${estimatedResultTone.card} ${estimatedResultTone.border}`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase leading-snug ${estimatedResultTone.label}`}
                    >
                      Resultado estimado/cabeça
                    </p>
                    <p
                      className={`whitespace-nowrap text-right text-lg font-semibold leading-tight ${estimatedResultTone.value}`}
                    >
                      {formatSignedCurrency(result.netProfitPerHead)}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <ResultLine
                    label="Receita total"
                    value={formatCurrency(result.totalRevenue)}
                  />
                  <ResultLine
                    label="Investimento total"
                    value={formatCurrency(result.totalInvestment)}
                  />
                  <ResultLine
                    label="Custo de produção total"
                    value={formatCurrency(result.totalProductionCost)}
                  />
                  <ResultLine
                    label="Lucro líquido final"
                    value={formatCurrency(result.totalNetProfit)}
                  />
                  <ResultLine
                    label="Rentabilidade total"
                    value={formatPercent(result.totalReturnPercent)}
                  />
                  <ResultLine
                    label="Rentabilidade mensal"
                    value={formatPercent(result.monthlyReturnPercent)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 rounded-lg border-zinc-200 py-5">
            <CardContent className="px-5">
              <h2 className="mb-3 text-lg font-semibold text-zinc-900">
                Indicadores
              </h2>
              <ResultLine
                label="Período"
                value={`${formatNumber(result.periodDays, 0)} dias`}
              />
              <ResultLine label="Data final" value={formatDate(result.finalDate)} />
              <ResultLine
                label="@ produzidas"
                value={formatNumber(result.producedArrobas, 2)}
              />
              <ResultLine
                label="Rendimento de carcaça"
                value={formatPercent(result.carcassYieldPercent)}
              />
              <ResultLine
                label="Peso de carcaça estimado"
                value={`${formatNumber(result.finalCarcassWeightKg, 2)} kg`}
              />
              <ResultLine
                label="Custo/@ produzida"
                value={formatCurrency(result.productionCostPerProducedArroba)}
              />
              <ResultLine
                label="Diária de produção"
                value={formatCurrency(result.productionCostPerHeadDay)}
              />
              <ResultLine
                label="Juro por cabeça"
                value={formatCurrency(result.interestCostPerHead)}
              />
            </CardContent>
          </Card>
        </aside>
      </div>

      <div className="mt-8 flex justify-center border-t border-primary/20 pt-8">
        <Button
          type="button"
          onClick={generateReport}
          size="lg"
          className="h-11 bg-primary px-6 text-white hover:bg-primary/90"
        >
          <FileText className="size-4" />
          Gerar relatório
        </Button>
      </div>
    </div>
  );
}
