import React from 'react';

export default function InstructionsTab() {
  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Hero Welcome Card */}
      <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-accent relative overflow-hidden">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-wider text-accent uppercase bg-accent/10 px-3 py-1 rounded-full">
            Standard Operating Procedure (SOP)
          </span>
          <h1 className="font-heading text-4xl text-primary mt-4 mb-3 tracking-tight font-bold">
            Dynamic Invoice Expense Allocation Manual
          </h1>
          <p className="text-muted text-[14px] leading-relaxed">
            Welcome to the operational command center for investment fund expense sharing. This system automates the multi-entity division of project-level invoices based on actual capital weights or equal-split rules. It operates completely inside your browser with real-time automatic calculations.
          </p>
          <div className="mt-4 p-4 bg-accent/5 border border-accent/20 rounded-lg text-xs text-primary leading-relaxed flex flex-col gap-1">
            <span className="text-accent font-bold">Operational Notice</span>
            <p className="text-muted mt-0.5">
              All application data is securely persisted inside your browser's Local Storage. No financial records or client details are uploaded or stored on our web servers, ensuring complete data privacy.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Calculation Engines Section */}
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-border/80">
            <h2 className="font-heading text-xl font-bold tracking-tight text-primary">
              Multi-Basis Allocation Methodology
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-bg rounded-lg space-y-2">
              <h3 className="font-heading text-lg font-semibold text-primary">1. Asset Count</h3>
              <p className="text-xs text-muted leading-relaxed">
                Splits invoices equally among all active assets mapped to the Company to Invoice. Suitable for general administrative or compliance fees.
              </p>
              <div className="text-[11px] font-mono bg-white p-2 rounded text-accent border border-border">
                Ratio = 1 / Count
              </div>
            </div>

            <div className="p-4 bg-bg rounded-lg space-y-2">
              <h3 className="font-heading text-lg font-semibold text-primary">2. Capacity (MW)</h3>
              <p className="text-xs text-muted leading-relaxed">
                Splits invoices based on physical MW output capacity of each asset. Recommended for technical maintenance, grid, and engineering expenses.
              </p>
              <div className="text-[11px] font-mono bg-white p-2 rounded text-accent border border-border">
                Ratio = Asset MW / Total MW
              </div>
            </div>

            <div className="p-4 bg-bg rounded-lg space-y-2">
              <h3 className="font-heading text-lg font-semibold text-primary">3. Ownership Capacity</h3>
              <p className="text-xs text-muted leading-relaxed">
                Splits based on physical capacity weighted by actual ownership percentage. Perfect for auditing, investor reports, and capital calls.
              </p>
              <div className="text-[11px] font-mono bg-white p-2 rounded text-accent border border-border">
                Ratio = Own MW / Total Own MW
              </div>
            </div>
          </div>

          {/* SOP Step-by-Step */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">Operational Workflow Step-by-Step</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center font-semibold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-sm text-primary">Check Asset Database & Target Company Setup</h4>
                  <p className="text-xs text-muted">
                    Ensure assets have matching <strong>Company to Invoice</strong> labels under the <em>Asset Import</em> tab. These values must match the Invoice's target company for successful routing.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center font-semibold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-sm text-primary">Input Raw Invoice and Set Billing Target</h4>
                  <p className="text-xs text-muted">
                    Enter the supplier invoice details under <em>Invoice Input</em>. Specify the <strong>Allocation Target</strong> representing the billing company. Select a VAT Override if it differs from default rules.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center font-semibold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-sm text-primary">Audit Splits & Export Ledger Backups</h4>
                  <p className="text-xs text-muted">
                    Inspect calculated entries in <em>Allocation Detail</em> and review top-level metrics in the <em>Summary Dashboard</em>. Download CSV or generate backups for your ERP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips & Compliance Audit */}
        <div className="space-y-8">
          {/* Integrity Rules Block */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <h2 className="font-heading text-lg font-bold text-primary">System Integrity Rules</h2>
            </div>
            <ul className="space-y-3 text-xs leading-relaxed text-muted">
              <li className="flex items-start gap-2">
                <span className="text-positive shrink-0 mt-0.5">✓</span>
                <span><strong>No Manual Dropdown Overrides Needed:</strong> Ratios re-calculate instantly upon updating any asset capacity or invoice quantity.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-positive shrink-0 mt-0.5">✓</span>
                <span><strong>Unmapped Target Safety Net:</strong> Any target company not present in the asset database is output to the ledger flagged as ⚠️ <em>Unmapped Target</em> rather than being ignored.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-positive shrink-0 mt-0.5">✓</span>
                <span><strong>LocalStorage & Data Privacy:</strong> All your changes are strictly preserved within your local browser. There is no remote database or server communication, ensuring your financial information is never retained by third parties.</span>
              </li>
            </ul>
          </div>

          {/* Interactive Troubleshooting SOP Card */}
          <div className="p-5 bg-white rounded-xl shadow-md space-y-3">
            <h3 className="font-heading text-lg font-bold text-primary flex items-center gap-2">
              SOP Troubleshooting Q&A
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-primary block">Q: I imported a CSV, but got warning highlights?</span>
                <span className="text-muted block mt-0.5">A: It means your CSV columns or billing target values didn't match our asset companies. Update the Allocation Target to match Company to Invoice.</span>
              </div>
              <div className="pt-2 border-t border-border">
                <span className="font-semibold text-primary block">Q: How do I change the allocation basis globally?</span>
                <span className="text-muted block mt-0.5">A: Head to the <strong>Settings</strong> tab and choose a basis from the dropdown list. All allocations in the ledger update instantly.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
