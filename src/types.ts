export interface Asset {
  id: string;
  name: string;
  spv: string;
  portfolio: string;
  fund: string;
  companyToInvoice: string;
  geography: string;
  ownership: number; // e.g. 1 for 100%, 0.5 for 50%
  capacity: number; // in MW
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  supplier: string;
  description: string;
  quantity: number;
  unitPrice: number;
  allocationTarget: string; // matches Asset.companyToInvoice
  vatRateOverride: number | null; // e.g. 0.20, or null to use default
}

export interface AllocationResult {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  invoiceDate: string;
  supplier: string;
  description: string;
  assetName: string;
  companyToInvoice: string;
  fund: string;
  geography: string;
  allocatedNet: number;
  allocatedVat: number;
  allocatedGross: number;
  allocationBasisUsed: string;
  error?: string;
}

export interface GlobalSettings {
  defaultVatRate: number; // e.g. 0.20
  globalCurrencySymbol: string; // e.g. "£"
  defaultAllocationBasis: 'Asset Count' | 'Capacity' | 'Ownership Capacity';
}

export type AppTab = 'instructions' | 'settings' | 'assets' | 'invoices' | 'allocation_detail' | 'summary';
