import React, { useState } from 'react';
import { Invoice, Asset, GlobalSettings } from '../types';
import { parseCSV } from '../csvUtils';

interface InvoicesTabProps {
  invoices: Invoice[];
  assets: Asset[];
  settings: GlobalSettings;
  onAddInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  onUpdateInvoice: (invoice: Invoice) => void;
  onDeleteInvoice: (id: string) => void;
  onBulkImportInvoices: (imported: Omit<Invoice, 'id'>[]) => void;
}

export default function InvoicesTab({
  invoices,
  assets,
  settings,
  onAddInvoice,
  onUpdateInvoice,
  onDeleteInvoice,
  onBulkImportInvoices
}: InvoicesTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isCsvImporting, setIsCsvImporting] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [csvError, setCsvError] = useState<string | null>(null);

  // New Invoice Form state
  const [newInvoice, setNewInvoice] = useState<Omit<Invoice, 'id'>>({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    supplier: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    allocationTarget: '',
    vatRateOverride: null
  });

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editInvoiceData, setEditInvoiceData] = useState<Invoice | null>(null);

  // Unique billing targets from active assets for dropdown list
  const activeTargets = Array.from(new Set(assets.map(a => a.companyToInvoice.trim()))).filter(Boolean);

  // Filtered Invoices
  const filteredInvoices = invoices.filter(inv =>
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.allocationTarget.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoice.invoiceNumber || !newInvoice.allocationTarget || newInvoice.unitPrice <= 0) {
      alert("Invoice Number, Allocation Target and Unit Price > 0 are required.");
      return;
    }
    onAddInvoice(newInvoice);
    setNewInvoice({
      invoiceNumber: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      supplier: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      allocationTarget: activeTargets[0] || '',
      vatRateOverride: null
    });
    setIsAdding(false);
  };

  const startEditing = (inv: Invoice) => {
    setEditingId(inv.id);
    setEditInvoiceData({ ...inv });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditInvoiceData(null);
  };

  const saveEdit = () => {
    if (editInvoiceData) {
      if (!editInvoiceData.invoiceNumber || !editInvoiceData.allocationTarget || editInvoiceData.unitPrice <= 0) {
        alert("Invoice Number, Allocation Target and Unit Price > 0 are required.");
        return;
      }
      onUpdateInvoice(editInvoiceData);
      setEditingId(null);
      setEditInvoiceData(null);
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
      
      // Find matches
      const numberIdx = headers.findIndex(h => h.includes('number') || h.includes('inv') || h.includes('id'));
      const dateIdx = headers.findIndex(h => h.includes('date'));
      const supplierIdx = headers.findIndex(h => h.includes('supplier') || h.includes('vendor'));
      const descIdx = headers.findIndex(h => h.includes('desc') || h.includes('detail') || h.includes('item'));
      const qtyIdx = headers.findIndex(h => h.includes('qty') || h.includes('quantity') || h.includes('count'));
      const priceIdx = headers.findIndex(h => h.includes('price') || h.includes('rate') || h.includes('cost') || h.includes('unit'));
      const targetIdx = headers.findIndex(h => h.includes('target') || h.includes('alloc') || h.includes('company') || h.includes('billing'));
      const vatIdx = headers.findIndex(h => h.includes('vat') || h.includes('tax') || h.includes('override'));

      if (numberIdx === -1 || targetIdx === -1 || priceIdx === -1) {
        setCsvError("Required headers not found. CSV must contain headers similar to: 'Invoice Number', 'Allocation Target' (e.g. ORIT), and 'Unit Price'. Optional: 'Invoice Date', 'Supplier', 'Description', 'Quantity', 'VAT Rate Override'.");
        return;
      }

      const importedInvoices: Omit<Invoice, 'id'>[] = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length === 0 || !row[numberIdx]) continue;

        // Parse quantity
        let quantity = 1;
        if (qtyIdx !== -1 && row[qtyIdx]) {
          const parsedQty = parseFloat(row[qtyIdx]);
          if (!isNaN(parsedQty)) {
            quantity = parsedQty;
          }
        }

        // Parse unit price
        let unitPrice = 0;
        if (row[priceIdx]) {
          const parsedPrice = parseFloat(row[priceIdx].replace(/[^\d.]/g, ''));
          if (!isNaN(parsedPrice)) {
            unitPrice = parsedPrice;
          }
        }

        // Parse VAT rate override
        let vatRateOverride: number | null = null;
        if (vatIdx !== -1 && row[vatIdx]) {
          const rawVat = row[vatIdx].trim();
          if (rawVat && rawVat.toLowerCase() !== 'null' && rawVat.toLowerCase() !== 'none') {
            const parsedVat = parseFloat(rawVat.replace(/%/g, ''));
            if (!isNaN(parsedVat)) {
              vatRateOverride = parsedVat > 1 ? parsedVat / 100 : parsedVat;
            }
          }
        }

        importedInvoices.push({
          invoiceNumber: row[numberIdx],
          invoiceDate: dateIdx !== -1 ? row[dateIdx] || new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          supplier: supplierIdx !== -1 ? row[supplierIdx] || '' : 'Generic Supplier',
          description: descIdx !== -1 ? row[descIdx] || '' : 'Expense',
          quantity,
          unitPrice,
          allocationTarget: row[targetIdx] || 'Unassigned',
          vatRateOverride
        });
      }

      if (importedInvoices.length === 0) {
        setCsvError("No valid rows were found under the headers.");
        return;
      }

      onBulkImportInvoices(importedInvoices);
      setIsCsvImporting(false);
      setCsvText('');
      setCsvError(null);
    } catch (err: any) {
      setCsvError(`Parser error: ${err.message || 'unknown error'}`);
    }
  };

  const downloadSampleCSV = () => {
    const headers = ["Invoice Number", "Invoice Date", "Supplier", "Description", "Quantity", "Unit Price", "Allocation Target", "VAT Rate Override"];
    const rows = [
      ["INV-2026-101", "2026-04-10", "EcoTech Services", "Solar Inverter Replacement", "2", "4500", "ORIT", "20%"],
      ["INV-2026-102", "2026-04-15", "Apex Engineering", "Wind Turbine Blade Inspection", "1", "12500", "Haymaker", ""],
      ["INV-2026-103", "2026-05-01", "County Compliance Co", "Annual Safety Audit Report", "1", "3400", "REIP", "18%"]
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "invoices_import_sample.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Header Action Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-md">
        <div>
          <h2 className="font-heading text-2xl font-bold text-primary tracking-tight">
            Raw Invoice Entry Register
          </h2>
          <p className="text-muted text-xs">
            Direct expense input panel. Assign billing target entities to trigger real-time division.
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
            New Invoice Row
          </button>
        </div>
      </div>

      {/* CSV Bulk Import Section */}
      {isCsvImporting && (
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4 border-l-4 border-accent animate-fadeUp">
          <div className="flex justify-between items-center pb-2 border-b">
            <h3 className="font-heading text-lg font-bold text-primary">Bulk Import Invoices via CSV</h3>
            <button onClick={() => setIsCsvImporting(false)} className="text-muted hover:text-primary text-xl font-bold font-mono">
              ×
            </button>
          </div>
          
          <div className="p-4 bg-bg rounded-lg text-xs space-y-2 text-muted">
            <p>
              Paste comma-separated values (CSV) with a header row. Required headers are: <strong>Invoice Number</strong>, <strong>Allocation Target</strong> (representing the target entity to split costs across), and <strong>Unit Price</strong>. Optional: <em>Invoice Date</em>, <em>Supplier</em>, <em>Description</em>, <em>Quantity</em>, <em>VAT Rate Override</em>.
            </p>
            <button
              onClick={downloadSampleCSV}
              className="flex items-center gap-1.5 text-accent font-semibold hover:underline bg-white px-2.5 py-1 rounded border border-border mt-1"
            >
              Download Standard Invoices template CSV
            </button>
          </div>

          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder={`"Invoice Number","Invoice Date","Supplier","Description","Quantity","Unit Price","Allocation Target","VAT Rate Override"\n"INV-2026-901","2026-06-12","SolarCorp","Hardware Upgrade","2","6500","Viners","5%"`}
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
              Parse & Load Invoices
            </button>
          </div>
        </div>
      )}

      {/* New Invoice Entry form */}
      {isAdding && (
        <form onSubmit={handleAddSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 animate-fadeUp">
          <div className="flex justify-between items-center pb-2 border-b">
            <h3 className="font-heading text-lg font-bold text-primary">Enter New Expense Invoice</h3>
            <button type="button" onClick={() => setIsAdding(false)} className="text-muted hover:text-primary text-xl font-bold font-mono">
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Invoice Number *</label>
              <input
                type="text"
                required
                value={newInvoice.invoiceNumber}
                onChange={(e) => setNewInvoice({ ...newInvoice, invoiceNumber: e.target.value })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent font-semibold"
                placeholder="e.g. INV-2026-099"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Invoice Date</label>
              <input
                type="date"
                required
                value={newInvoice.invoiceDate}
                onChange={(e) => setNewInvoice({ ...newInvoice, invoiceDate: e.target.value })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent font-mono"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Supplier Vendor</label>
              <input
                type="text"
                value={newInvoice.supplier}
                onChange={(e) => setNewInvoice({ ...newInvoice, supplier: e.target.value })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="e.g. Asset Tech Ltd"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Description</label>
              <input
                type="text"
                value={newInvoice.description}
                onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="e.g. Blade upgrade"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Quantity</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                required
                value={newInvoice.quantity}
                onChange={(e) => setNewInvoice({ ...newInvoice, quantity: parseFloat(e.target.value) || 0 })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent font-mono"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Unit Price ({settings.globalCurrencySymbol}) *</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                required
                value={newInvoice.unitPrice || ''}
                onChange={(e) => setNewInvoice({ ...newInvoice, unitPrice: parseFloat(e.target.value) || 0 })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent font-mono"
                placeholder="0.00"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">Allocation Target Co. *</label>
              <select
                required
                value={newInvoice.allocationTarget}
                onChange={(e) => setNewInvoice({ ...newInvoice, allocationTarget: e.target.value })}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent font-semibold"
              >
                <option value="">-- Choose target company --</option>
                {activeTargets.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
                {/* Fallback option if user wants to type or use an empty database target */}
                <option value="ORIT">ORIT (Fallback)</option>
                <option value="Haymaker">Haymaker (Fallback)</option>
                <option value="Viners">Viners (Fallback)</option>
                <option value="REIP">REIP (Fallback)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-primary uppercase tracking-wider">VAT Rate Override (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                placeholder="Default"
                value={newInvoice.vatRateOverride !== null ? newInvoice.vatRateOverride * 100 : ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setNewInvoice({ ...newInvoice, vatRateOverride: val === '' ? null : parseFloat(val) / 100 });
                }}
                className="p-2 border rounded bg-[#FFFDE7] text-[13px] focus:outline-none focus:ring-1 focus:ring-accent font-mono"
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
              Save Invoice
            </button>
          </div>
        </form>
      )}

      {/* Invoices Table Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden card-lift">
        {/* Search bar */}
        <div className="p-4 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search invoices..."
              className="w-full pl-3 pr-4 py-1.5 rounded bg-bg text-[12px] border-none focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <div>
              Invoices: <span className="text-primary font-bold">{invoices.length}</span> rows
            </div>
            <div>
              Total Net: <span className="text-primary font-bold">
                {settings.globalCurrencySymbol}{invoices.reduce((sum, inv) => sum + (inv.quantity * inv.unitPrice), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Table layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b-2 border-[rgba(5,28,44,0.12)]">
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Invoice Number</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Date</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Supplier</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary">Description</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">Qty</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">Unit Price</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-center">Billing Target</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">VAT Rate</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">Taxable Net</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">VAT Amount</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-right">Gross Amount</th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-primary text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-5 py-8 text-center text-muted">
                    No raw invoices found. Create a new invoice or upload via CSV Bulk Import.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv, index) => {
                  const isEditing = editingId === inv.id;

                  // Compute inline calculations instantly
                  const netValue = inv.quantity * inv.unitPrice;
                  const vatRateUsed = inv.vatRateOverride !== null ? inv.vatRateOverride : settings.defaultVatRate;
                  const vatAmount = netValue * vatRateUsed;
                  const grossAmount = netValue + vatAmount;

                  // Target Mapping Check: check if the billing target is currently matched with at least one asset
                  const isMapped = assets.some(
                    a => a.companyToInvoice.trim().toLowerCase() === inv.allocationTarget.trim().toLowerCase()
                  );

                  return (
                    <tr
                      key={inv.id}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-bg/20'} hover:bg-bg/40 transition-colors`}
                    >
                      {/* Inv Number */}
                      <td className="px-5 py-3 font-semibold text-primary">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editInvoiceData?.invoiceNumber || ''}
                            onChange={(e) => setEditInvoiceData({ ...editInvoiceData!, invoiceNumber: e.target.value })}
                            className="w-full p-1 border rounded bg-[#FFFDE7] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        ) : (
                          inv.invoiceNumber
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 font-mono text-[12px] text-muted">
                        {isEditing ? (
                          <input
                            type="date"
                            value={editInvoiceData?.invoiceDate || ''}
                            onChange={(e) => setEditInvoiceData({ ...editInvoiceData!, invoiceDate: e.target.value })}
                            className="w-full p-1 border rounded bg-[#FFFDE7] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        ) : (
                          inv.invoiceDate
                        )}
                      </td>

                      {/* Supplier */}
                      <td className="px-4 py-3 text-[12px]">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editInvoiceData?.supplier || ''}
                            onChange={(e) => setEditInvoiceData({ ...editInvoiceData!, supplier: e.target.value })}
                            className="w-full p-1 border rounded bg-[#FFFDE7] text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        ) : (
                          inv.supplier
                        )}
                      </td>

                      {/* Description */}
                      <td className="px-4 py-3 text-muted text-[12px]">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editInvoiceData?.description || ''}
                            onChange={(e) => setEditInvoiceData({ ...editInvoiceData!, description: e.target.value })}
                            className="w-full p-1 border rounded bg-[#FFFDE7] text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        ) : (
                          inv.description || '—'
                        )}
                      </td>

                      {/* Qty */}
                      <td className="px-4 py-3 text-right font-mono text-[12px]">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={editInvoiceData?.quantity || 1}
                            onChange={(e) => setEditInvoiceData({ ...editInvoiceData!, quantity: parseFloat(e.target.value) || 0 })}
                            className="w-16 p-1 text-right border rounded bg-[#FFFDE7] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        ) : (
                          inv.quantity
                        )}
                      </td>

                      {/* Unit Price */}
                      <td className="px-4 py-3 text-right font-mono text-[12px]">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={editInvoiceData?.unitPrice || 0}
                            onChange={(e) => setEditInvoiceData({ ...editInvoiceData!, unitPrice: parseFloat(e.target.value) || 0 })}
                            className="w-24 p-1 text-right border rounded bg-[#FFFDE7] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        ) : (
                          `${settings.globalCurrencySymbol}${inv.unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                        )}
                      </td>

                      {/* Allocation Target with warnings for unmapped targets */}
                      <td className="px-4 py-3 text-center">
                        {isEditing ? (
                          <select
                            value={editInvoiceData?.allocationTarget || ''}
                            onChange={(e) => setEditInvoiceData({ ...editInvoiceData!, allocationTarget: e.target.value })}
                            className="p-1 border rounded bg-[#FFFDE7] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent"
                          >
                            {activeTargets.map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="inline-flex flex-col items-center gap-1">
                            <span className="px-2 py-0.5 rounded-full bg-accent/5 text-accent text-[11px] font-bold">
                              {inv.allocationTarget}
                            </span>
                            {!isMapped && (
                              <span className="text-[10px] text-negative font-semibold bg-negative/5 px-2 py-0.5 rounded-full border border-negative/10">
                                ⚠️ Unmapped Target
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* VAT Override */}
                      <td className="px-4 py-3 text-right font-mono text-[12px] text-muted">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.5"
                            placeholder="Default"
                            value={editInvoiceData?.vatRateOverride !== null ? (editInvoiceData?.vatRateOverride || 0) * 100 : ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditInvoiceData({
                                ...editInvoiceData!,
                                vatRateOverride: val === '' ? null : parseFloat(val) / 100
                              });
                            }}
                            className="w-20 p-1 text-right border rounded bg-[#FFFDE7] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        ) : (
                          inv.vatRateOverride !== null ? (
                            <span className="text-primary font-medium">{(inv.vatRateOverride * 100).toFixed(1)}% (O)</span>
                          ) : (
                            <span>{(settings.defaultVatRate * 100).toFixed(1)}%</span>
                          )
                        )}
                      </td>

                      {/* Calculated net, vat, gross */}
                      <td className="px-4 py-3 text-right font-mono text-[12px] font-semibold text-primary">
                        {settings.globalCurrencySymbol}{netValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-[12px] text-muted">
                        {settings.globalCurrencySymbol}{vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-[12px] font-bold text-accent">
                        {settings.globalCurrencySymbol}{grossAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
                              onClick={() => startEditing(inv)}
                              title="Edit Invoice"
                              className="px-2 py-0.5 text-xs text-primary bg-bg hover:bg-border/40 rounded transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete invoice ${inv.invoiceNumber}?`)) {
                                  onDeleteInvoice(inv.id);
                                }
                              }}
                              title="Delete Invoice"
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
