import { Asset, Invoice, AllocationResult, GlobalSettings } from './types';

export const DEFAULT_SETTINGS: GlobalSettings = {
  defaultVatRate: 0.20,
  globalCurrencySymbol: "£",
  defaultAllocationBasis: "Asset Count"
};

export const DEFAULT_ASSETS: Asset[] = [
  {
    id: "asset-1",
    name: "Ballymacarney Solar Park",
    spv: "Ballymacarney SPV Ltd",
    portfolio: "ORIT",
    fund: "Renewable Capital I",
    companyToInvoice: "ORIT",
    geography: "Ireland",
    ownership: 1.00,
    capacity: 25.5
  },
  {
    id: "asset-2",
    name: "Haymaker Wind Farm",
    spv: "Haymaker Wind SPV",
    portfolio: "REIP",
    fund: "Renewable Capital II",
    companyToInvoice: "Haymaker",
    geography: "UK",
    ownership: 0.50,
    capacity: 40.0
  },
  {
    id: "asset-3",
    name: "Viners Solar Array",
    spv: "Viners Solar SPV",
    portfolio: "Viners",
    fund: "Green Infrastructure Fund",
    companyToInvoice: "Viners",
    geography: "UK",
    ownership: 1.00,
    capacity: 15.0
  },
  {
    id: "asset-4",
    name: "REIP Solar Park",
    spv: "REIP Solar SPV",
    portfolio: "REIP",
    fund: "Renewable Capital II",
    companyToInvoice: "REIP",
    geography: "Ireland",
    ownership: 0.80,
    capacity: 30.0
  },
  {
    id: "asset-5",
    name: "Drumcondra Battery Storage",
    spv: "Drumcondra Battery SPV",
    portfolio: "ORIT",
    fund: "Renewable Capital I",
    companyToInvoice: "ORIT",
    geography: "Ireland",
    ownership: 1.00,
    capacity: 10.0
  },
  {
    id: "asset-6",
    name: "Cruachan Hydro-Power",
    spv: "Cruachan Hydro SPV",
    portfolio: "REIP",
    fund: "Renewable Capital II",
    companyToInvoice: "REIP",
    geography: "UK",
    ownership: 1.00,
    capacity: 50.0
  }
];

export const DEFAULT_INVOICES: Invoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-001",
    invoiceDate: "2026-01-10",
    supplier: "GridConnect Ltd",
    description: "Annual Grid Connection Service Fee",
    quantity: 1,
    unitPrice: 15000,
    allocationTarget: "ORIT",
    vatRateOverride: null
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-002",
    invoiceDate: "2026-01-15",
    supplier: "EcoMaintenance Inc",
    description: "Quarterly Turbines Maintenance & Cleaning",
    quantity: 1,
    unitPrice: 28000,
    allocationTarget: "Haymaker",
    vatRateOverride: 0.18
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-003",
    invoiceDate: "2026-02-01",
    supplier: "GreenSurveyors Co",
    description: "Ecological Site Impact Survey Report",
    quantity: 1,
    unitPrice: 8500,
    allocationTarget: "REIP",
    vatRateOverride: null
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-004",
    invoiceDate: "2026-02-18",
    supplier: "SolOptima",
    description: "Inverter Upgrade Hardware Parts",
    quantity: 4,
    unitPrice: 3200,
    allocationTarget: "Viners",
    vatRateOverride: 0.05
  },
  {
    id: "inv-5",
    invoiceNumber: "INV-2026-005",
    invoiceDate: "2026-03-05",
    supplier: "PowerLaw LLP",
    description: "Regulatory Compliance Consulting Services",
    quantity: 1,
    unitPrice: 12000,
    allocationTarget: "ORIT",
    vatRateOverride: null
  }
];

export function calculateAllocations(
  assets: Asset[],
  invoices: Invoice[],
  settings: GlobalSettings
): AllocationResult[] {
  const results: AllocationResult[] = [];

  for (const inv of invoices) {
    const netTotal = inv.quantity * inv.unitPrice;
    const vatRate = inv.vatRateOverride !== null ? inv.vatRateOverride : settings.defaultVatRate;
    const vatTotal = netTotal * vatRate;
    const grossTotal = netTotal + vatTotal;

    // Filter assets matching this invoice's target
    const matchedAssets = assets.filter(
      a => a.companyToInvoice.trim().toLowerCase() === inv.allocationTarget.trim().toLowerCase()
    );

    if (matchedAssets.length === 0) {
      // Create warning row for unmapped targets
      results.push({
        id: `alloc-error-${inv.id}`,
        invoiceId: inv.id,
        invoiceNumber: inv.invoiceNumber,
        invoiceDate: inv.invoiceDate,
        supplier: inv.supplier,
        description: inv.description,
        assetName: "⚠️ Unmapped Target",
        companyToInvoice: inv.allocationTarget,
        fund: "N/A",
        geography: "N/A",
        allocatedNet: netTotal,
        allocatedVat: vatTotal,
        allocatedGross: grossTotal,
        allocationBasisUsed: settings.defaultAllocationBasis,
        error: `No asset corresponds to billing target "${inv.allocationTarget}"`
      });
      continue;
    }

    // Determine ratios based on settings.defaultAllocationBasis
    let totalBasisValue = 0;
    const basis = settings.defaultAllocationBasis;

    if (basis === "Asset Count") {
      totalBasisValue = matchedAssets.length;
    } else if (basis === "Capacity") {
      totalBasisValue = matchedAssets.reduce((sum, a) => sum + a.capacity, 0);
    } else if (basis === "Ownership Capacity") {
      totalBasisValue = matchedAssets.reduce((sum, a) => sum + (a.capacity * a.ownership), 0);
    }

    for (const asset of matchedAssets) {
      let assetBasisValue = 0;
      if (basis === "Asset Count") {
        assetBasisValue = 1;
      } else if (basis === "Capacity") {
        assetBasisValue = asset.capacity;
      } else if (basis === "Ownership Capacity") {
        assetBasisValue = asset.capacity * asset.ownership;
      }

      const ratio = totalBasisValue > 0 ? (assetBasisValue / totalBasisValue) : 0;
      const allocatedNet = netTotal * ratio;
      const allocatedVat = allocatedNet * vatRate;
      const allocatedGross = allocatedNet + allocatedVat;

      results.push({
        id: `alloc-${inv.id}-${asset.id}`,
        invoiceId: inv.id,
        invoiceNumber: inv.invoiceNumber,
        invoiceDate: inv.invoiceDate,
        supplier: inv.supplier,
        description: inv.description,
        assetName: asset.name,
        companyToInvoice: asset.companyToInvoice,
        fund: asset.fund,
        geography: asset.geography,
        allocatedNet,
        allocatedVat,
        allocatedGross,
        allocationBasisUsed: basis
      });
    }
  }

  return results;
}
