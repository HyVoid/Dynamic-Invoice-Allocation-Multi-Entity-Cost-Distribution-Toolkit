import React, { useState } from 'react';
import { AllocationResult, GlobalSettings } from '../types';
import { downloadCSV } from '../csvUtils';

interface AllocationDetailTabProps {
  results: AllocationResult[];
  settings: GlobalSettings;
}

export default function AllocationDetailTab({ results, settings }: AllocationDetailTabProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = results.filter(r =>
    r.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.companyToInvoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.fund.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.geography.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const headers = [
      "Invoice No",
      "Supplier",
      "Description",
      "Asset Name",
      "Company to Invoice",
      "Fund",
      "Geography / Country",
      "Allocated Net",
      "Allocated VAT",
      "Allocated Gross",
      "Allocation Basis"
    ];

    const rows = results.map(r => [
      r.invoiceNumber,
      r.supplier,
      r.description,
      r.assetName,
      r.companyToInvoice,
      r.fund,
      r.geography,
      r.allocatedNet.toFixed(2),
      r.allocatedVat.toFixed(2),
      r.allocatedGross.toFixed(2),
      r.allocationBasisUsed
    ]);

    downloadCSV("allocated_expenses_ledger.csv", headers, rows);
  };

  // Find max allocated gross for visual data bars
  const maxAllocatedGross = Math.max(...results.map(r => r.allocatedGross), 1);

  // Count unmapped errors
  const unmappedCount = results.filter(r => r.error).length;

  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Tab Header Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-md">
        <div>
          <h2 className="font-heading text-2xl font-bold text-primary tracking-tight animate-fadeUp">
            Allocation Ledger & Details
          </h2>
          <p className="text-muted text-xs">
            Dynamic array outputs. Spilt entries mapped to individual asset SPVs with custom audit trails.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-accent text-white text-[12px] font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            Export Allocation Ledger
          </button>
        </div>
      </div>

      {/* Unmapped Warnings Block */}
      {unmappedCount > 0 && (
        <div className="p-4 bg-negative/5 border-l-4 border-negative rounded-xl shadow-sm flex gap-3">
          <div>
            <h4 className="font-bold text-negative text-[14px]">
              ⚠️ Missing Billing Mappings Detected ({unmappedCount})
            </h4>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              The allocation engine detected invoices targetting companies that do not currently have corresponding assets registered in the database. These rows have been output as <strong>⚠️ Unmapped Target</strong>. Please check your asset companies or invoice entries.
            </p>
          </div>
        </div>
      )}

      {/* Allocation Spill Table Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden card-lift">
        {/* Search & Meta Bar */}
        <div className="p-4 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter allocation ledger..."
              className="w-full pl-3 pr-4 py-1.5 rounded bg-bg text-[12px] border-none focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <div className="flex items-center gap-1">
              Formula status: <span className="text-positive font-bold uppercase bg-positive/10 px-1.5 py-0.5 rounded text-[10px]">Real-time spill</span>
            </div>
            <div>
              Split rows: <span className="text-primary font-bold">{results.length}</span> lines
            </div>
          </div>
        </div>

        {/* Table layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b-2 border-[rgba(5,28,44,0.12)]">
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Invoice No</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Supplier</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Description</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Asset Mapped</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Billed Co.</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Fund</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Geography</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right font-mono">Basis Used</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">Alloc. Net</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">Alloc. VAT</th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">Alloc. Gross</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-5 py-8 text-center text-muted">
                    No allocated expenses ledger matches the filters. Check settings or create invoices.
                  </td>
                </tr>
              ) : (
                filteredResults.map((row, index) => {
                  const isError = !!row.error;

                  return (
                    <tr
                      key={row.id}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-bg/20'} ${isError ? 'bg-negative/5' : ''} hover:bg-bg/40 transition-colors`}
                    >
                      {/* Inv Number */}
                      <td className="px-5 py-3 font-semibold text-primary">{row.invoiceNumber}</td>
                      
                      {/* Supplier */}
                      <td className="px-4 py-3 text-[12px]">{row.supplier}</td>

                      {/* Description */}
                      <td className="px-4 py-3 text-muted text-[12px]">{row.description}</td>

                      {/* Asset Mapped */}
                      <td className="px-4 py-3 font-bold">
                        {isError ? (
                          <span className="text-negative inline-flex items-center gap-1 bg-negative/5 px-2.5 py-1 rounded-full text-xs font-bold border border-negative/10">
                            {row.assetName}
                          </span>
                        ) : (
                          <span className="text-primary">{row.assetName}</span>
                        )}
                      </td>

                      {/* Billed Co. */}
                      <td className="px-4 py-3 font-medium text-primary">
                        <span className="px-2 py-0.5 rounded bg-bg text-primary text-[11px] font-bold">
                          {row.companyToInvoice}
                        </span>
                      </td>

                      {/* Fund */}
                      <td className="px-4 py-3 text-muted text-[12px]">{row.fund}</td>

                      {/* Geography */}
                      <td className="px-4 py-3 text-[12px]">{row.geography}</td>

                      {/* Basis */}
                      <td className="px-4 py-3 text-right text-[11px] text-muted italic font-serif">
                        {row.allocationBasisUsed}
                      </td>

                      {/* Financial values */}
                      <td className="px-4 py-3 text-right font-mono text-[12px] text-primary">
                        {settings.globalCurrencySymbol}{row.allocatedNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-[12px] text-muted">
                        {settings.globalCurrencySymbol}{row.allocatedVat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-[12px] font-bold text-accent">
                        <div className="flex flex-col items-end gap-1">
                          <span>{settings.globalCurrencySymbol}{row.allocatedGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          {/* Inline data bar showing relative allocation size */}
                          {!isError && (
                            <div className="w-16 h-1 bg-accent/10 rounded overflow-hidden">
                              <div
                                className="h-full bg-accent"
                                style={{ width: `${Math.min((row.allocatedGross / maxAllocatedGross) * 100, 100)}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
