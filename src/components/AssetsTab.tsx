import React, { useState } from 'react';
import { Asset, GlobalSettings } from '../types';
import { parseCSV } from '../csvUtils';

interface AssetsTabProps {
  assets: Asset[];
  settings: GlobalSettings;
  onAddAsset: (asset: Omit<Asset, 'id'>) => void;
  onUpdateAsset: (asset: Asset) => void;
  onDeleteAsset: (id: string) => void;
  onBulkImportAssets: (imported: Omit<Asset, 'id'>[]) => void;
  onResetAssets: () => void;
}

export default function AssetsTab({
  assets,
  settings,
  onAddAsset,
  onUpdateAsset,
  onDeleteAsset,
  onBulkImportAssets,
  onResetAssets
}: AssetsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isCsvImporting, setIsCsvImporting] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [csvError, setCsvError] = useState<string | null>(null);

  // New Asset Form state
  const [newAsset, setNewAsset] = useState<Omit<Asset, 'id'>>({
    name: '',
    spv: '',
    portfolio: '',
    fund: '',
    companyToInvoice: '',
    geography: '',
    ownership: 1.0,
    capacity: 10.0
  });

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAssetData, setEditAssetData] = useState<Asset | null>(null);

  // Filtered Assets
  const filteredAssets = assets.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.spv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.portfolio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.companyToInvoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.fund.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.geography.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name || !newAsset.companyToInvoice) {
      alert("Asset Name and Company to Invoice are required.");
      return;
    }
    onAddAsset(newAsset);
    setNewAsset({
      name: '',
      spv: '',
      portfolio: '',
      fund: '',
      companyToInvoice: '',
      geography: '',
      ownership: 1.0,
      capacity: 10.0
    });
    setIsAdding(false);
  };

  const startEditing = (asset: Asset) => {
    setEditingId(asset.id);
    setEditAssetData({ ...asset });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditAssetData(null);
  };

  const saveEdit = () => {
    if (editAssetData) {
      if (!editAssetData.name || !editAssetData.companyToInvoice) {
        alert("Asset Name and Company to Invoice are required.");
        return;
      }
      onUpdateAsset(editAssetData);
      setEditingId(null);
      setEditAssetData(null);
    }
  };

  const handleCsvImport = () => {
    try {
      setCsvError(null);
      if (!csvText.trim()) {
        setCsvError("Please paste or type CSV data.");
        return;
      }

      const rows = parseCSV(csvText);
      if (rows.length < 2) {
        setCsvError("Invalid CSV format. CSV must contain a header row and at least one data row.");
        return;
      }

      const headers = rows[0].map(h => h.toLowerCase().trim().replace(/[\s_()%-]+/g, ''));
      
      // Map indexes
      const nameIdx = headers.findIndex(h => h.includes('name') || h.includes('asset'));
      const spvIdx = headers.findIndex(h => h.includes('spv'));
      const portfolioIdx = headers.findIndex(h => h.includes('portfolio'));
      const fundIdx = headers.findIndex(h => h.includes('fund'));
      const companyIdx = headers.findIndex(h => h.includes('company') || h.includes('billing') || h.includes('target'));
      const geoIdx = headers.findIndex(h => h.includes('geo') || h.includes('country'));
      const ownIdx = headers.findIndex(h => h.includes('ownership') || h.includes('share'));
      const capIdx = headers.findIndex(h => h.includes('capacity') || h.includes('mw') || h.includes('size'));

      if (nameIdx === -1 || companyIdx === -1) {
        setCsvError("Could not find required headers. CSV must contain columns similar to: 'Asset Name', 'Company to Invoice'. Optional: 'SPV', 'Portfolio', 'Fund', 'Geography', 'Ownership %', 'Capacity (MW)'.");
        return;
      }

      const importedAssets: Omit<Asset, 'id'>[] = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length === 0 || !row[nameIdx]) continue;

        // Parse ownership % (e.g. "100%", "80%", "0.5")
        let ownership = 1.0;
        if (ownIdx !== -1 && row[ownIdx]) {
          const rawOwn = row[ownIdx].replace(/%/g, '').trim();
          const parsedOwn = parseFloat(rawOwn);
          if (!isNaN(parsedOwn)) {
            ownership = parsedOwn > 1 ? parsedOwn / 100 : parsedOwn;
          }
        }

        // Parse capacity
        let capacity = 10.0;
        if (capIdx !== -1 && row[capIdx]) {
          const rawCap = row[capIdx].replace(/[^\d.]/g, '').trim();
          const parsedCap = parseFloat(rawCap);
          if (!isNaN(parsedCap)) {
            capacity = parsedCap;
          }
        }

        importedAssets.push({
          name: row[nameIdx] || 'Unnamed Asset',
          spv: spvIdx !== -1 ? row[spvIdx] || '' : '',
          portfolio: portfolioIdx !== -1 ? row[portfolioIdx] || '' : '',
          fund: fundIdx !== -1 ? row[fundIdx] || '' : '',
          companyToInvoice: row[companyIdx] || 'Unassigned',
          geography: geoIdx !== -1 ? row[geoIdx] || '' : '',
          ownership,
          capacity
        });
      }

      if (importedAssets.length === 0) {
        setCsvError("No valid rows were found under the headers.");
        return;
      }

      onBulkImportAssets(importedAssets);
      setIsCsvImporting(false);
      setCsvText('');
      setCsvError(null);
    } catch (err: any) {
      setCsvError(`Parser error: ${err.message || 'unknown error'}`);
    }
  };

  const downloadSampleCSV = () => {
    const headers = ["Asset Name", "SPV", "Portfolio", "Fund", "Company to Invoice", "Geography / Country", "Ownership %", "Capacity (MW)"];
    const rows = [
      ["Ballymacarney Solar Park", "Ballymacarney SPV Ltd", "ORIT", "Renewable Capital I", "ORIT", "Ireland", "100%", "25.5"],
      ["Haymaker Wind Farm", "Haymaker Wind SPV", "REIP", "Renewable Capital II", "Haymaker", "UK", "50%", "40.0"],
      ["Viners Solar Array", "Viners Solar SPV", "Viners", "Green Infrastructure Fund", "Viners", "UK", "100%", "15.0"]
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "assets_import_sample.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Find max capacity for visual data bars
  const maxCapacity = Math.max(...assets.map(a => a.capacity), 1);

  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Tab Header Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-md">
        <div>
          <h2 className="font-heading text-2xl font-bold text-primary tracking-tight">
            Asset Database v2
          </h2>
          <p className="text-muted text-xs">
            Single Source of Truth for investment holdings. Define physical capacities and equity stakes.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => { setIsCsvImporting(!isCsvImporting); setIsAdding(false); }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-border text-[12px] font-semibold text-primary hover:bg-bg transition-colors"
          >
            Bulk CSV Import
          </button>
          <button
            onClick={() => { setIsAdding(!isAdding); setIsCsvImporting(false); }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-accent text-white text-[12px] font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            Add Asset
          </button>
        </div>
      </div>

      {/* CSV Bulk Import Section */}
      {isCsvImporting && (
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4 border-l-4 border-accent animate-fadeUp">
          <div className="flex justify-between items-center pb-2 border-b">
            <h3 className="font-heading text-lg font-bold text-primary">Bulk Import holding Assets via CSV</h3>
            <button onClick={() => setIsCsvImporting(false)} className="text-muted hover:text-primary text-xl font-bold font-mono">
              ×
            </button>
          </div>
          
          <div className="p-4 bg-bg rounded-lg text-xs space-y-2 text-muted">
            <p>
              Please paste comma-separated values (CSV) with a header row below. Required headers are: <strong>Asset Name</strong>, <strong>Company to Invoice</strong> (or <em>Billing Target</em>). Optional headers include: <em>SPV</em>, <em>Portfolio</em>, <em>Fund</em>, <em>Geography / Country</em>, <em>Ownership %</em>, <em>Capacity (MW)</em>.
            </p>
            <button
              onClick={downloadSampleCSV}
              className="flex items-center gap-1.5 text-accent font-semibold hover:underline bg-white px-2.5 py-1 rounded border border-border mt-1"
            >
              Download Standard Template CSV
            </button>
          </div>

          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder={`"Asset Name","SPV","Portfolio","Fund","Company to Invoice","Geography","Ownership %","Capacity (MW)"\n"Drumcondra Battery","Drumcondra SPV","ORIT","Renewable Capital I","ORIT","Ireland","100%","10.0"`}
            rows={6}
            className="w-full p-3 font-mono text-[11px] rounded border border-border bg-[#FFFDE7] focus:outline-none focus:ring-1 focus:ring-accent"
          />

          {csvError && (
            <div className="p-3 bg-negative/5 border border-negative/20 text-negative text-xs rounded flex items-center gap-2">
              <span>⚠️</span>
              <span>{csvError}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsCsvImporting(false)}
              className="px-4 py-2 rounded text-xs font-semibold text-muted hover:bg-bg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCsvImport}
              className="px-5 py-2 rounded bg-accent text-white text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              Parse and Import holdings
            </button>
          </div>
        </div>
      )}

      {/* Add New Asset Inline Form */}
      {isAdding && (
        <form onSubmit={handleAddSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 animate-fadeUp">
          <div className="flex justify-between items-center pb-2 border-b">
            <h3 className="font-heading text-lg font-bold text-primary">Create New Asset Holding</h3>
            <button type="button" onClick={() => setIsAdding(false)} className="text-muted hover:text-primary text-xl font-bold font-mono">
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Asset Name *</label>
              <input
                type="text"
                required
                value={newAsset.name}
                onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="e.g. Drumcondra Battery"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">SPV Company</label>
              <input
                type="text"
                value={newAsset.spv}
                onChange={(e) => setNewAsset({ ...newAsset, spv: e.target.value })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="e.g. Drumcondra SPV Ltd"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Portfolio Group</label>
              <input
                type="text"
                value={newAsset.portfolio}
                onChange={(e) => setNewAsset({ ...newAsset, portfolio: e.target.value })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="e.g. ORIT"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Billing Company Target *</label>
              <input
                type="text"
                required
                value={newAsset.companyToInvoice}
                onChange={(e) => setNewAsset({ ...newAsset, companyToInvoice: e.target.value })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="e.g. ORIT"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Ultimate Fund</label>
              <input
                type="text"
                value={newAsset.fund}
                onChange={(e) => setNewAsset({ ...newAsset, fund: e.target.value })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="e.g. Renewable Capital I"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Geography / Country</label>
              <input
                type="text"
                value={newAsset.geography}
                onChange={(e) => setNewAsset({ ...newAsset, geography: e.target.value })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="e.g. Ireland"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Equity Ownership %</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={newAsset.ownership * 100}
                onChange={(e) => setNewAsset({ ...newAsset, ownership: (parseFloat(e.target.value) || 0) / 100 })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Capacity size (MW)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newAsset.capacity}
                onChange={(e) => setNewAsset({ ...newAsset, capacity: parseFloat(e.target.value) || 0 })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded text-xs font-semibold text-muted hover:bg-bg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-accent text-white text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              Save New Asset
            </button>
          </div>
        </form>
      )}

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden card-lift">
        {/* Search & Stats bar */}
        <div className="p-4 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assets..."
              className="w-full pl-3 pr-4 py-1.5 rounded bg-bg text-[12px] border-none focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <div>
              Total: <span className="text-primary font-bold">{assets.length}</span> holdings
            </div>
            <div>
              Total Capacity: <span className="text-primary font-bold">
                {assets.reduce((sum, a) => sum + a.capacity, 0).toFixed(1)} MW
              </span>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b-2 border-[rgba(5,28,44,0.12)]">
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Asset Name</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">SPV</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Portfolio</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Billing Co.</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Ultimate Fund</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Geography</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">Ownership</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">Capacity (MW)</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">Own MW (Calculated)</th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-5 py-8 text-center text-muted">
                    No holding assets match the search query. Click 'Add Asset' or reset default data.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset, index) => {
                  const isEditing = editingId === asset.id;
                  const ownCapacity = asset.capacity * asset.ownership;

                  return (
                    <tr
                      key={asset.id}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-bg/20'} hover:bg-bg/40 transition-colors`}
                    >
                      {/* Name */}
                      <td className="px-5 py-3 font-semibold text-primary">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editAssetData?.name || ''}
                            onChange={(e) => setEditAssetData({ ...editAssetData!, name: e.target.value })}
                            className="w-full p-1 border rounded bg-[#FFFDE7] text-xs focus:outline-none focus:ring-1 focus:ring-accent font-semibold"
                          />
                        ) : (
                          asset.name
                        )}
                      </td>

                      {/* SPV */}
                      <td className="px-4 py-3 text-muted text-[12px]">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editAssetData?.spv || ''}
                            onChange={(e) => setEditAssetData({ ...editAssetData!, spv: e.target.value })}
                            className="w-full p-1 border rounded bg-[#FFFDE7] text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        ) : (
                          asset.spv || '—'
                        )}
                      </td>

                      {/* Portfolio */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editAssetData?.portfolio || ''}
                            onChange={(e) => setEditAssetData({ ...editAssetData!, portfolio: e.target.value })}
                            className="w-full p-1 border rounded bg-[#FFFDE7] text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-accent/5 text-accent text-[11px] font-bold">
                            {asset.portfolio || '—'}
                          </span>
                        )}
                      </td>

                      {/* Billing Target Company */}
                      <td className="px-4 py-3 font-medium text-primary">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editAssetData?.companyToInvoice || ''}
                            onChange={(e) => setEditAssetData({ ...editAssetData!, companyToInvoice: e.target.value })}
                            className="w-full p-1 border rounded bg-[#FFFDE7] text-xs focus:outline-none focus:ring-1 focus:ring-accent font-medium"
                          />
                        ) : (
                          asset.companyToInvoice
                        )}
                      </td>

                      {/* Fund */}
                      <td className="px-4 py-3 text-muted text-[12px]">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editAssetData?.fund || ''}
                            onChange={(e) => setEditAssetData({ ...editAssetData!, fund: e.target.value })}
                            className="w-full p-1 border rounded bg-[#FFFDE7] text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        ) : (
                          asset.fund || '—'
                        )}
                      </td>

                      {/* Geography */}
                      <td className="px-4 py-3 text-[12px]">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editAssetData?.geography || ''}
                            onChange={(e) => setEditAssetData({ ...editAssetData!, geography: e.target.value })}
                            className="w-full p-1 border rounded bg-[#FFFDE7] text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        ) : (
                          asset.geography || '—'
                        )}
                      </td>

                      {/* Ownership % */}
                      <td className="px-4 py-3 text-right font-mono text-[12px]">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={(editAssetData?.ownership || 0) * 100}
                              onChange={(e) => setEditAssetData({ ...editAssetData!, ownership: (parseFloat(e.target.value) || 0) / 100 })}
                              className="w-16 p-1 text-right border rounded bg-[#FFFDE7] text-xs focus:outline-none focus:ring-1 focus:ring-accent font-mono"
                            />
                            <span>%</span>
                          </div>
                        ) : (
                          `${(asset.ownership * 100).toFixed(0)}%`
                        )}
                      </td>

                      {/* Capacity MW */}
                      <td className="px-4 py-3 text-right font-mono text-[12px]">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={editAssetData?.capacity || 0}
                            onChange={(e) => setEditAssetData({ ...editAssetData!, capacity: parseFloat(e.target.value) || 0 })}
                            className="w-20 p-1 text-right border rounded bg-[#FFFDE7] text-xs focus:outline-none focus:ring-1 focus:ring-accent font-mono"
                          />
                        ) : (
                          <div className="flex flex-col items-end gap-1">
                            <span>{asset.capacity.toFixed(1)} MW</span>
                            {/* Inline Capacity Data Bar */}
                            <div className="w-20 h-1 bg-accent/10 rounded overflow-hidden">
                              <div
                                className="h-full bg-accent"
                                style={{ width: `${Math.min((asset.capacity / maxCapacity) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Calculated Own Capacity */}
                      <td className="px-4 py-3 text-right font-mono text-[12px] font-semibold text-accent">
                        {isEditing ? (
                          <span className="text-muted text-[11px] italic">Auto-calc</span>
                        ) : (
                          <span>{ownCapacity.toFixed(2)} MW</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3 text-center">
                        {isEditing ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={saveEdit}
                              title="Save Changes"
                              className="px-2 py-0.5 text-xs bg-positive/10 text-positive rounded hover:bg-positive/20 transition-colors font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              title="Cancel"
                              className="px-2 py-0.5 text-xs bg-negative/10 text-negative rounded hover:bg-negative/20 transition-colors font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => startEditing(asset)}
                              title="Edit Asset"
                              className="px-2 py-0.5 text-xs text-primary bg-bg hover:bg-border/40 rounded transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${asset.name}? This will affect allocations targetting "${asset.companyToInvoice}".`)) {
                                  onDeleteAsset(asset.id);
                                }
                              }}
                              title="Delete Asset"
                              className="px-2 py-0.5 text-xs text-negative bg-negative/5 hover:bg-negative/10 rounded transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
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
