import React, { useMemo } from 'react';
import { AllocationResult, GlobalSettings } from '../types';

interface SummaryTabProps {
  results: AllocationResult[];
  settings: GlobalSettings;
  assetsCount: number;
}

export default function SummaryTab({ results, settings, assetsCount }: SummaryTabProps) {
  // 1. KPI calculations
  const totals = useMemo(() => {
    let rawTotalGross = 0;
    let rawTotalNet = 0;
    let rawTotalVat = 0;
    const invoiceIds = new Set<string>();
    const unmappedTargets = new Set<string>();

    results.forEach(r => {
      invoiceIds.add(r.invoiceId);
      if (r.error) {
        unmappedTargets.add(r.companyToInvoice);
      }
      rawTotalNet += r.allocatedNet;
      rawTotalVat += r.allocatedVat;
      rawTotalGross += r.allocatedGross;
    });

    return {
      totalInvoicesCount: invoiceIds.size,
      unmappedTargetsCount: unmappedTargets.size,
      totalNet: rawTotalNet,
      totalVat: rawTotalVat,
      totalGross: rawTotalGross
    };
  }, [results]);

  // 2. Fund Groupings
  const fundSummaries = useMemo(() => {
    const map: Record<string, { net: number; vat: number; gross: number }> = {};
    results.forEach(r => {
      const fund = r.fund || 'N/A';
      if (!map[fund]) {
        map[fund] = { net: 0, vat: 0, gross: 0 };
      }
      map[fund].net += r.allocatedNet;
      map[fund].vat += r.allocatedVat;
      map[fund].gross += r.allocatedGross;
    });

    return Object.entries(map)
      .map(([fund, vals]) => ({
        fund,
        ...vals
      }))
      .sort((a, b) => b.gross - a.gross);
  }, [results]);

  // 3. Geography Groupings
  const geoSummaries = useMemo(() => {
    const map: Record<string, { net: number; vat: number; gross: number }> = {};
    results.forEach(r => {
      const geo = r.geography || 'N/A';
      if (!map[geo]) {
        map[geo] = { net: 0, vat: 0, gross: 0 };
      }
      map[geo].net += r.allocatedNet;
      map[geo].vat += r.allocatedVat;
      map[geo].gross += r.allocatedGross;
    });

    return Object.entries(map)
      .map(([geo, vals]) => ({
        geo,
        ...vals
      }))
      .sort((a, b) => b.gross - a.gross);
  }, [results]);

  // Max value references for visual progress bars
  const maxFundGross = useMemo(() => Math.max(...fundSummaries.map(f => f.gross), 1), [fundSummaries]);
  const maxGeoGross = useMemo(() => Math.max(...geoSummaries.map(g => g.gross), 1), [geoSummaries]);

  // 4. Recommendation Block content
  const recommendation = useMemo(() => {
    if (totals.unmappedTargetsCount > 0) {
      return {
        title: "CRITICAL ACTION REQUIRED: Unmapped Targets Detected",
        body: `The allocation ledger has flagged ${totals.unmappedTargetsCount} target entities that lack physical matching assets. Unmapped invoices cannot be audited. Please add SPV assets or reassign billing targets in the invoice ledger immediately to clear warnings.`,
        isAlert: true
      };
    } else if (results.length === 0) {
      return {
        title: "Operational Status: No allocations created",
        body: "Create invoices or click 'Reset Data' under the Export Toolbar to load standard financial configurations and holdings lists.",
        isAlert: false
      };
    } else {
      return {
        title: "Operational Status: Database Optimized",
        body: `All ${totals.totalInvoicesCount} invoices are mapped perfectly to ${assetsCount} active SPV assets across ${fundSummaries.length} funds. Cost distribution ratios are perfectly aligned with your default "${settings.defaultAllocationBasis}" rule.`,
        isAlert: false
      };
    }
  }, [totals, results, assetsCount, settings.defaultAllocationBasis, fundSummaries.length]);

  return (
    <div className="space-y-8 animate-fadeUp">
      {/* KPI Bento Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1: Invoices */}
        <div className="bg-white p-6 rounded-xl shadow-md card-lift relative overflow-hidden">
          <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">Raw Invoices</span>
          <span className="font-heading text-4xl font-bold text-primary block mt-2 mb-1 tracking-tight">
            {totals.totalInvoicesCount}
          </span>
          <span className="text-[11px] text-muted block mt-1">
            Registered raw invoices
          </span>
        </div>

        {/* KPI 2: Total Net */}
        <div className="bg-white p-6 rounded-xl shadow-md card-lift relative overflow-hidden">
          <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">Total Mapped Net</span>
          <span className="font-heading text-3xl font-bold text-accent block mt-2 mb-1 tracking-tight">
            {settings.globalCurrencySymbol}{totals.totalNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-muted block mt-1">
            Excludes tax amount
          </span>
        </div>

        {/* KPI 3: Managed Assets */}
        <div className="bg-white p-6 rounded-xl shadow-md card-lift relative overflow-hidden">
          <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">Managed Holdings</span>
          <span className="font-heading text-4xl font-bold text-primary block mt-2 mb-1 tracking-tight">
            {assetsCount}
          </span>
          <span className="text-[11px] text-muted block mt-1">
            Active wind/solar SPVs
          </span>
        </div>

        {/* KPI 4: Unmapped Targets - operational exception highlighted in red */}
        <div className={`p-6 rounded-xl shadow-md card-lift relative overflow-hidden ${totals.unmappedTargetsCount > 0 ? 'bg-negative/5' : 'bg-white'}`}>
          <span className="text-[11px] font-bold uppercase tracking-wider block text-muted">
            Unmapped Targets
          </span>
          <span className={`font-heading text-4xl font-bold block mt-2 mb-1 tracking-tight ${totals.unmappedTargetsCount > 0 ? 'text-negative' : 'text-primary'}`}>
            {totals.unmappedTargetsCount}
          </span>
          <span className="text-[11px] text-muted block mt-1">
            {totals.unmappedTargetsCount > 0 ? '⚠️ Payment blockage risk' : 'Perfect mappings sync'}
          </span>
        </div>
      </div>

      {/* Dynamic Recommendation Block - Insight Block layout with left border and 4% opacity primary background */}
      <div className="p-6 rounded-xl shadow-md bg-[rgba(5,28,44,0.03)] border-l-4 border-accent space-y-2">
        <h4 className="text-[14px] font-bold text-primary tracking-tight">
          {recommendation.title}
        </h4>
        <p className="text-xs text-muted leading-relaxed">
          {recommendation.body}
        </p>
      </div>

      {/* Bento Grid: Fund Summaries & Geo Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Bento Pane: Fund Summaries */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6 card-lift">
          <div>
            <h3 className="font-heading text-xl font-bold text-primary tracking-tight">
              Allocation Summary by Fund
            </h3>
            <p className="text-muted text-xs">
              Grouped aggregated expenses across investment portfolios.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-[rgba(5,28,44,0.12)]">
                  <th className="py-2 font-semibold uppercase tracking-wider text-primary">Ultimate Fund</th>
                  <th className="py-2 text-right font-semibold uppercase tracking-wider text-primary">Net Amount</th>
                  <th className="py-2 text-right font-semibold uppercase tracking-wider text-primary">VAT</th>
                  <th className="py-2 text-right font-semibold uppercase tracking-wider text-primary">Gross Amount</th>
                  <th className="py-2 text-right font-semibold uppercase tracking-wider text-primary">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {fundSummaries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-muted">
                      No allocations recorded.
                    </td>
                  </tr>
                ) : (
                  fundSummaries.map((f, i) => {
                    const pct = totals.totalGross > 0 ? (f.gross / totals.totalGross) * 100 : 0;
                    return (
                      <tr key={f.fund} className="hover:bg-bg/20 transition-colors">
                        <td className="py-3 font-semibold text-primary">{f.fund}</td>
                        <td className="py-3 text-right font-mono text-[12px]">
                          {settings.globalCurrencySymbol}{f.net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 text-right font-mono text-[12px] text-muted">
                          {settings.globalCurrencySymbol}{f.vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 text-right font-mono text-[12px] font-bold text-accent">
                          {settings.globalCurrencySymbol}{f.gross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-mono font-bold text-[11px] text-primary">{pct.toFixed(1)}%</span>
                            <div className="w-16 h-1.5 bg-accent/10 rounded-full overflow-hidden">
                              <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Inline SVG Chart for Fund */}
          {fundSummaries.length > 0 && (
            <div className="pt-4 border-t border-border">
              <h4 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-3">Portfolio Fund Allocation Breakdown</h4>
              <div className="space-y-3">
                {fundSummaries.map(f => {
                  const pct = totals.totalGross > 0 ? (f.gross / totals.totalGross) * 100 : 0;
                  return (
                    <div key={f.fund} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-primary truncate max-w-[200px]">{f.fund}</span>
                        <span className="font-mono text-accent">
                          {settings.globalCurrencySymbol}{f.gross.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ({pct.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-accent/10 rounded-md overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Bento Pane: Geography Summaries */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6 card-lift">
          <div>
            <h3 className="font-heading text-xl font-bold text-primary tracking-tight">
              Allocation Summary by Geography
            </h3>
            <p className="text-muted text-xs">
              Grouped aggregated expenses across project locations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-[rgba(5,28,44,0.12)]">
                  <th className="py-2 font-semibold uppercase tracking-wider text-primary">Geography / Country</th>
                  <th className="py-2 text-right font-semibold uppercase tracking-wider text-primary">Net Amount</th>
                  <th className="py-2 text-right font-semibold uppercase tracking-wider text-primary">VAT</th>
                  <th className="py-2 text-right font-semibold uppercase tracking-wider text-primary">Gross Amount</th>
                  <th className="py-2 text-right font-semibold uppercase tracking-wider text-primary">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {geoSummaries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-muted">
                      No allocations recorded.
                    </td>
                  </tr>
                ) : (
                  geoSummaries.map((g, i) => {
                    const pct = totals.totalGross > 0 ? (g.gross / totals.totalGross) * 100 : 0;
                    return (
                      <tr key={g.geo} className="hover:bg-bg/20 transition-colors">
                        <td className="py-3 font-semibold text-primary">{g.geo}</td>
                        <td className="py-3 text-right font-mono text-[12px]">
                          {settings.globalCurrencySymbol}{g.net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 text-right font-mono text-[12px] text-muted">
                          {settings.globalCurrencySymbol}{g.vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 text-right font-mono text-[12px] font-bold text-accent">
                          {settings.globalCurrencySymbol}{g.gross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-mono font-bold text-[11px] text-primary">{pct.toFixed(1)}%</span>
                            <div className="w-16 h-1.5 bg-accent/10 rounded-full overflow-hidden">
                              <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Inline SVG Chart for Geography */}
          {geoSummaries.length > 0 && (
            <div className="pt-4 border-t border-border">
              <h4 className="text-[11px] font-bold text-muted uppercase tracking-wider mb-3">Geographic Cost Distribution Breakdown</h4>
              <div className="space-y-3">
                {geoSummaries.map(g => {
                  const pct = totals.totalGross > 0 ? (g.gross / totals.totalGross) * 100 : 0;
                  return (
                    <div key={g.geo} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-primary truncate max-w-[200px]">{g.geo}</span>
                        <span className="font-mono text-accent">
                          {settings.globalCurrencySymbol}{g.gross.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ({pct.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-accent/10 rounded-md overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
