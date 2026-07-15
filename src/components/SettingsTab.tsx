import React from 'react';
import { GlobalSettings } from '../types';

interface SettingsTabProps {
  settings: GlobalSettings;
  onUpdateSettings: (newSettings: GlobalSettings) => void;
}

export default function SettingsTab({ settings, onUpdateSettings }: SettingsTabProps) {
  const handleChange = (key: keyof GlobalSettings, value: any) => {
    onUpdateSettings({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Tab Header */}
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-primary tracking-tight">
            System Settings & Parameters
          </h2>
          <p className="text-muted text-xs">
            Manage global defaults, currency symbols, and mathematical allocation weights. Changes propagate instantly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Settings Form Card */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6 md:col-span-2">
          <h3 className="font-heading text-lg font-semibold text-primary border-b pb-2">
            Global Variables Configuration
          </h3>

          <div className="space-y-5">
            {/* Currency Symbol Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-primary">
                Global Currency Symbol
              </label>
              <div className="relative">
                <select
                  value={settings.globalCurrencySymbol}
                  onChange={(e) => handleChange('globalCurrencySymbol', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md border border-border bg-[#FFFDE7] text-primary text-[13px] font-semibold focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="£">£ (GBP - British Pound)</option>
                  <option value="$">$ (USD - United States Dollar)</option>
                  <option value="€">€ (EUR - Euro)</option>
                  <option value="¥">¥ (JPY/CNY - Yen/Renminbi)</option>
                  <option value="₣">₣ (CHF - Swiss Franc)</option>
                </select>
              </div>
              <span className="text-[11px] text-muted">Defines the primary monetary glyph rendered in financial tables and summaries.</span>
            </div>

            {/* Default VAT Rate Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-primary">
                Default VAT Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={settings.defaultVatRate * 100}
                  onChange={(e) => handleChange('defaultVatRate', parseFloat(e.target.value) / 100 || 0)}
                  className="w-full px-3 py-2 rounded-md border border-border bg-[#FFFDE7] text-primary text-[13px] font-semibold focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <span className="text-[11px] text-muted">Default tax rate applied to raw invoices unless explicitly overridden.</span>
            </div>

            {/* Default Allocation Basis */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-primary">
                Default Allocation Basis
              </label>
              <div className="relative">
                <select
                  value={settings.defaultAllocationBasis}
                  onChange={(e) => handleChange('defaultAllocationBasis', e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-md border border-border bg-[#FFFDE7] text-primary text-[13px] font-semibold focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="Asset Count">Asset Count (Equal Share Split)</option>
                  <option value="Capacity">Capacity (Weighted by Megawatt Size)</option>
                  <option value="Ownership Capacity">Ownership Capacity (Weighted by Economic MW Size)</option>
                </select>
              </div>
              <span className="text-[11px] text-muted">Defines the primary mathematical formula used by the allocation engine globally.</span>
            </div>
          </div>
        </div>

        {/* Informative Side Card */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-md border-l-3 border-accent bg-[rgba(5,28,44,0.02)] space-y-3">
            <h4 className="font-heading text-lg font-bold text-primary flex items-center gap-2">
              Calculations Guide
            </h4>
            <div className="text-xs space-y-2 text-muted leading-relaxed">
              <p>
                <strong>Asset Count</strong>: Splits invoice evenly. If 5 assets correspond to a billing company, each asset gets exactly 20.00% of the cost.
              </p>
              <p>
                <strong>Capacity</strong>: If billing company Haymaker has 3 assets with 10MW, 20MW, and 50MW respectively, they split the expense in ratios of 12.5%, 25.0%, and 62.5%.
              </p>
              <p>
                <strong>Ownership Capacity</strong>: Adjusts physical capacity by your equity stake. This ensures you only pay for your economic share of physical assets.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md text-xs text-muted leading-relaxed">
            <span className="font-semibold text-primary block mb-1">Backup Recommendation:</span>
            To preserve multiple calculation scenarios or audit logs, utilize the <strong>Export Backup</strong> feature in the horizontal toolbar. Backups are stored as lightweight JSON files.
          </div>
        </div>
      </div>
    </div>
  );
}
