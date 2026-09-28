export type MortgageInputs = {
  price: number;
  downPaymentPercent: number; // 0-100
  interestRatePercent: number; // annual, e.g. 6.5
  termYears: number; // e.g. 30
  annualPropertyTaxPercent: number; // % of home price per year
  annualInsurance: number; // $ per year
  monthlyHOA: number; // $ per month
};

export type MortgageResult = {
  loanAmount: number;
  downPaymentAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  totalPaidOverTerm: number;
  totalInterestPaid: number;
};

export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const {
    price,
    downPaymentPercent,
    interestRatePercent,
    termYears,
    annualPropertyTaxPercent,
    annualInsurance,
    monthlyHOA,
  } = inputs;

  const downPaymentAmount = price * (downPaymentPercent / 100);
  const loanAmount = Math.max(price - downPaymentAmount, 0);
  const monthlyRate = interestRatePercent / 100 / 12;
  const numPayments = termYears * 12;

  let monthlyPrincipalAndInterest = 0;
  if (loanAmount > 0) {
    monthlyPrincipalAndInterest =
      monthlyRate === 0
        ? loanAmount / numPayments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const monthlyTax = (price * (annualPropertyTaxPercent / 100)) / 12;
  const monthlyInsurance = annualInsurance / 12;

  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyTax + monthlyInsurance + monthlyHOA;

  const totalPaidOverTerm = monthlyPrincipalAndInterest * numPayments;
  const totalInterestPaid = totalPaidOverTerm - loanAmount;

  return {
    loanAmount,
    downPaymentAmount,
    monthlyPrincipalAndInterest,
    monthlyTax,
    monthlyInsurance,
    monthlyHOA,
    totalMonthlyPayment,
    totalPaidOverTerm,
    totalInterestPaid: Math.max(totalInterestPaid, 0),
  };
}
