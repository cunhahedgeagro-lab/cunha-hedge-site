export type ProductionCostMode = "totalDaily" | "detailed";
export type IntakeUnit = "percentLiveWeight" | "kgPerHeadDay";

export type CattleViabilityInput = {
  propertyName: string;
  lotSize: number;
  initialLiveWeightKg: number;
  finalLiveWeightKg: number;
  carcassYieldPercent: number;
  averageDailyGainKg: number;
  initialDate: string;
  productionCostMode: ProductionCostMode;
  dailyProductionCostPerHead: number;
  intakeValue: number;
  intakeUnit: IntakeUnit;
  supplementName: string;
  supplementCostPerKg: number;
  initialArrobaPrice: number;
  saleArrobaPrice: number;
  operationalCostPerHeadDay: number;
  pastureCostPerHeadDay: number;
  insuranceCostPerArroba: number;
  financedAnimalsValue: number;
  financedSupplementValue: number;
  annualInterestRatePercent: number;
};

export type CattleViabilityResult = {
  initialArrobas: number;
  finalLiveArrobas: number;
  finalCarcassWeightKg: number;
  finalCarcassArrobas: number;
  averageLiveWeightKg: number;
  periodDays: number;
  periodMonths: number;
  finalDate: string;
  producedArrobas: number;
  carcassYieldPercent: number;
  carcassDailyGainKg: number;
  estimatedIntakeKgDay: number;
  supplementCostPerKg: number;
  supplementConsumedCostDay: number;
  detailedProductionCostPerHeadDay: number;
  productionCostPerHeadDay: number;
  animalPurchaseCostPerHead: number;
  saleRevenuePerHead: number;
  grossProfitPerHead: number;
  totalSupplementCostPerHead: number;
  totalOperationalCostPerHead: number;
  totalPastureCostPerHead: number;
  totalInsuranceCostPerHead: number;
  productionCostPerHead: number;
  productionCostPerProducedArroba: number;
  interestCostPerHead: number;
  investmentPerHead: number;
  netProfitPerHead: number;
  totalReturnPercent: number;
  monthlyReturnPercent: number;
  breakevenPerSoldArroba: number;
  salePriceSpreadToBreakeven: number;
  totalAnimalPurchaseCost: number;
  totalSupplementCost: number;
  totalOperationalCost: number;
  totalPastureCost: number;
  totalInvestment: number;
  totalRevenue: number;
  totalGrossProfit: number;
  totalProductionCost: number;
  totalNetProfit: number;
  totalFinancedValue: number;
  yearFraction: number;
  periodInterestRatePercent: number;
  totalInterest: number;
};

export const defaultCattleViabilityInput: CattleViabilityInput = {
  propertyName: "",
  lotSize: 0,
  initialLiveWeightKg: 0,
  finalLiveWeightKg: 0,
  carcassYieldPercent: 52,
  averageDailyGainKg: 1,
  initialDate: "",
  productionCostMode: "detailed",
  dailyProductionCostPerHead: 0,
  intakeValue: 0,
  intakeUnit: "percentLiveWeight",
  supplementName: "",
  supplementCostPerKg: 0,
  initialArrobaPrice: 0,
  saleArrobaPrice: 0,
  operationalCostPerHeadDay: 0.6,
  pastureCostPerHeadDay: 1,
  insuranceCostPerArroba: 0,
  financedAnimalsValue: 0,
  financedSupplementValue: 0,
  annualInterestRatePercent: 0,
};

function safeDivide(numerator: number, denominator: number): number {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
    return 0;
  }

  return numerator / denominator;
}

function addDays(dateText: string, days: number): string {
  const date = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(date.getTime()) || !Number.isFinite(days)) {
    return "";
  }

  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  return date.toISOString().slice(0, 10);
}

function toDecimal(percent: number): number {
  return percent / 100;
}

export function calculateCattleViability(
  input: CattleViabilityInput
): CattleViabilityResult {
  const lotSize = Math.max(0, input.lotSize);
  const initialArrobas = input.initialLiveWeightKg / 30;
  const finalLiveArrobas = input.finalLiveWeightKg / 30;
  const finalCarcassWeightKg =
    input.finalLiveWeightKg * toDecimal(input.carcassYieldPercent);
  const finalCarcassArrobas = finalCarcassWeightKg / 15;
  const periodDays = safeDivide(
    input.finalLiveWeightKg - input.initialLiveWeightKg,
    input.averageDailyGainKg
  );
  const periodMonths = safeDivide(periodDays, 30.4);
  const finalDate = addDays(input.initialDate, periodDays);
  const producedArrobas = safeDivide(
    finalCarcassWeightKg - input.initialLiveWeightKg / 2,
    15
  );
  const carcassYieldPercent = safeDivide(
    finalCarcassWeightKg,
    input.finalLiveWeightKg
  );
  const carcassDailyGainKg = safeDivide(
    finalCarcassWeightKg - input.initialLiveWeightKg / 2,
    periodDays
  );
  const averageLiveWeightKg =
    (input.initialLiveWeightKg + input.finalLiveWeightKg) / 2;
  const estimatedIntakeKgDay =
    input.intakeUnit === "percentLiveWeight"
      ? averageLiveWeightKg * toDecimal(input.intakeValue)
      : input.intakeValue;
  const supplementCostPerKg = input.supplementCostPerKg;
  const supplementConsumedCostDay = estimatedIntakeKgDay * supplementCostPerKg;
  const detailedProductionCostPerHeadDay =
    supplementConsumedCostDay +
    input.operationalCostPerHeadDay +
    input.pastureCostPerHeadDay;
  const productionCostPerHeadDay =
    input.productionCostMode === "totalDaily"
      ? input.dailyProductionCostPerHead
      : detailedProductionCostPerHeadDay;
  const animalPurchaseCostPerHead = input.initialArrobaPrice * initialArrobas;
  const saleRevenuePerHead = input.saleArrobaPrice * finalCarcassArrobas;
  const grossProfitPerHead = saleRevenuePerHead - animalPurchaseCostPerHead;
  const usesDetailedCost = input.productionCostMode === "detailed";
  const totalSupplementCostPerHead = usesDetailedCost
    ? supplementConsumedCostDay * periodDays
    : 0;
  const totalOperationalCostPerHead = usesDetailedCost
    ? input.operationalCostPerHeadDay * periodDays
    : 0;
  const totalPastureCostPerHead = usesDetailedCost
    ? input.pastureCostPerHeadDay * periodDays
    : 0;
  const totalInsuranceCostPerHead =
    input.insuranceCostPerArroba * finalCarcassArrobas;
  const productionCostPerHead = productionCostPerHeadDay * periodDays;
  const productionCostPerProducedArroba = safeDivide(
    productionCostPerHead,
    producedArrobas
  );
  const totalFinancedValue =
    input.financedAnimalsValue + input.financedSupplementValue;
  const yearFraction = safeDivide(periodDays, 365);
  const periodInterestRatePercent =
    yearFraction * input.annualInterestRatePercent;
  const totalInterest = totalFinancedValue * toDecimal(periodInterestRatePercent);
  const interestCostPerHead = safeDivide(totalInterest, lotSize);
  const investmentPerHead =
    animalPurchaseCostPerHead +
    productionCostPerHead +
    interestCostPerHead +
    totalInsuranceCostPerHead;
  const netProfitPerHead =
    saleRevenuePerHead -
    animalPurchaseCostPerHead -
    productionCostPerHead -
    totalInsuranceCostPerHead -
    interestCostPerHead;
  const totalReturnPercent = safeDivide(netProfitPerHead, investmentPerHead);
  const monthlyReturnPercent = safeDivide(totalReturnPercent, periodMonths);
  const breakevenPerSoldArroba = safeDivide(
    animalPurchaseCostPerHead +
      productionCostPerHead +
      totalInsuranceCostPerHead +
      interestCostPerHead,
    finalCarcassArrobas
  );
  const salePriceSpreadToBreakeven =
    input.saleArrobaPrice - breakevenPerSoldArroba;
  const totalAnimalPurchaseCost = lotSize * animalPurchaseCostPerHead;
  const totalSupplementCost = lotSize * totalSupplementCostPerHead;
  const totalOperationalCost = lotSize * totalOperationalCostPerHead;
  const totalPastureCost = lotSize * totalPastureCostPerHead;
  const totalInvestment = lotSize * investmentPerHead;
  const totalRevenue = lotSize * saleRevenuePerHead;
  const totalGrossProfit = lotSize * grossProfitPerHead;
  const totalProductionCost = lotSize * productionCostPerHead;
  const totalNetProfit = lotSize * netProfitPerHead;
  return {
    initialArrobas,
    finalLiveArrobas,
    finalCarcassWeightKg,
    finalCarcassArrobas,
    averageLiveWeightKg,
    periodDays,
    periodMonths,
    finalDate,
    producedArrobas,
    carcassYieldPercent,
    carcassDailyGainKg,
    estimatedIntakeKgDay,
    supplementCostPerKg,
    supplementConsumedCostDay,
    detailedProductionCostPerHeadDay,
    productionCostPerHeadDay,
    animalPurchaseCostPerHead,
    saleRevenuePerHead,
    grossProfitPerHead,
    totalSupplementCostPerHead,
    totalOperationalCostPerHead,
    totalPastureCostPerHead,
    totalInsuranceCostPerHead,
    productionCostPerHead,
    productionCostPerProducedArroba,
    interestCostPerHead,
    investmentPerHead,
    netProfitPerHead,
    totalReturnPercent,
    monthlyReturnPercent,
    breakevenPerSoldArroba,
    salePriceSpreadToBreakeven,
    totalAnimalPurchaseCost,
    totalSupplementCost,
    totalOperationalCost,
    totalPastureCost,
    totalInvestment,
    totalRevenue,
    totalGrossProfit,
    totalProductionCost,
    totalNetProfit,
    totalFinancedValue,
    yearFraction,
    periodInterestRatePercent,
    totalInterest,
  };
}
