// Validation schemas for the Vercel serverless enquiry functions.
//
// SOURCE OF TRUTH: lib/api-spec/openapi.yaml -> generated into
// lib/api-zod/src/generated/api.ts. These are copied here (rather than imported
// from @workspace/api-zod) so the Vercel functions are fully self-contained and
// don't depend on the workspace lib being built during Vercel's bundle step.
// If you change the OpenAPI spec, mirror the relevant changes here.
import { z } from "zod";

export const SubmitBtlEnquiryBody = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  mobileNumber: z.string(),
  currentPostcode: z.string(),
  isFirstTimeLandlord: z.enum(["yes", "no"]),
  investmentGoal: z.enum([
    "capital_growth",
    "rental_income",
    "portfolio_building",
    "tax_planning",
    "other",
  ]),
  preferredInvestmentLocation: z.string().nullish(),
  budgetDepositAvailable: z.string().nullish(),
  expectedPurchasePriceRange: z.string().nullish(),
  ownershipPreference: z.enum(["personal_name", "limited_company", "unsure"]),
  existingPropertiesOwned: z.string().nullish(),
  propertyType: z.enum([
    "single_let",
    "hmo",
    "serviced_accommodation",
    "multi_unit",
    "commercial_conversion",
    "unsure",
  ]),
  financeRequired: z.enum(["yes", "no", "unsure"]),
  expectedRentalIncome: z.string().nullish(),
  timescaleToInvest: z.string().nullish(),
  questionsOrConcerns: z.string().nullish(),
  consentToContact: z.boolean(),
  privacyAcknowledged: z.boolean(),
});

export const SubmitMortgageEnquiryBody = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  mobileNumber: z.string(),
  postcode: z.string(),
  mortgageType: z.enum([
    "residential",
    "buy_to_let",
    "remortgage",
    "product_transfer",
    "limited_company_btl",
    "bridging_development",
  ]),
  purchasePriceOrValue: z.string().nullish(),
  mortgageAmountRequired: z.string().nullish(),
  depositOrEquityAvailable: z.string().nullish(),
  employmentStatus: z.string(),
  annualIncome: z.string().nullish(),
  creditHistory: z.enum(["excellent", "good", "fair", "poor", "unsure"]),
  propertyLocation: z.string().nullish(),
  timescale: z.string().nullish(),
  hasMortgageOffer: z
    .union([z.literal("yes"), z.literal("no"), z.literal(null)])
    .nullish(),
  preferredContactMethod: z.string().nullish(),
  consentToContact: z.boolean(),
  privacyAcknowledged: z.boolean(),
});

export const SubmitTaxEnquiryBody = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  mobileNumber: z.string(),
  alreadyInvestingInProperty: z.enum(["yes", "no"]),
  alreadyHasLimitedCompany: z.enum(["yes", "no"]),
  serviceRequired: z.enum([
    "limited_company_setup",
    "bookkeeping",
    "annual_accounts",
    "corporation_tax",
    "self_assessment",
    "vat",
    "payroll",
    "spv_setup",
    "property_tax_planning",
    "other",
  ]),
  numberOfPropertiesOwned: z.string().nullish(),
  estimatedAnnualRentalIncome: z.string().nullish(),
  propertiesOwnedPersonallyOrCompany: z.string().nullish(),
  needCompaniesHouseHelp: z
    .union([z.literal("yes"), z.literal("no"), z.literal(null)])
    .nullish(),
  needBusinessBankAccountHelp: z
    .union([z.literal("yes"), z.literal("no"), z.literal(null)])
    .nullish(),
  needTaxAdviceBeforePurchase: z
    .union([z.literal("yes"), z.literal("no"), z.literal(null)])
    .nullish(),
  preferredContactMethod: z.string().nullish(),
  messageOrEnquiry: z.string().nullish(),
  consentToContact: z.boolean(),
  privacyAcknowledged: z.boolean(),
});
