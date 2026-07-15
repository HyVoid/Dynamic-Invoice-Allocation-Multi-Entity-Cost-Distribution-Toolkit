import React, { useState, useEffect, useRef } from 'react';
import { Asset, Invoice, GlobalSettings, AppTab } from './types';
import {
  DEFAULT_SETTINGS,
  DEFAULT_ASSETS,
  DEFAULT_INVOICES,
  calculateAllocations
} from './data';

// Component imports
import InstructionsTab from './components/InstructionsTab';
import SettingsTab from './components/SettingsTab';
import AssetsTab from './components/AssetsTab';
import InvoicesTab from './components/InvoicesTab';
import AllocationDetailTab from './components/AllocationDetailTab';
import SummaryTab from './components/SummaryTab';

export default function App() {
  // 1. Core states
  const [activeTab, setActiveTab] = useState<AppTab>('summary');
  const [settings, setSettings] = useState<GlobalSettings>(DEFAULT_SETTINGS);
  const [assets, setAssets] = useState<Asset[]>(DEFAULT_ASSETS);
  const [invoices, setInvoices] = useState<Invoice[]>(DEFAULT_INVOICES);
  const [lastSaved, setLastSaved] = useState<string>('');
  
  // Backup upload ref
  const backupInputRef = useRef<HTMLInputElement>(null);

  // 2. Load initial states from LocalStorage on mount
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('dia_settings');
      const storedAssets = localStorage.getItem('dia_assets');
      const storedInvoices = localStorage.getItem('dia_invoices');
      const storedLastSaved = localStorage.getItem('dia_last_saved');

      if (storedSettings) setSettings(JSON.parse(storedSettings));
      if (storedAssets) setAssets(JSON.parse(storedAssets));
      if (storedInvoices) setInvoices(JSON.parse(storedInvoices));
      if (storedLastSaved) {
        setLastSaved(storedLastSaved);
      } else {
        const now = new Date().toLocaleTimeString();
        setLastSaved(now);
      }
    } catch (e) {
      console.error("Failed to load data from LocalStorage: ", e);
    }
  }, []);

  // 3. Auto-save triggers on any state modification
  const saveToLocalStorage = (
    currentSettings: GlobalSettings,
    currentAssets: Asset[],
    currentInvoices: Invoice[]
  ) => {
    try {
      const now = new Date().toLocaleTimeString('en-US', { hour12: false });
      const today = new Date().toISOString().split('T')[0];
      const timestamp = `${today} ${now}`;

      localStorage.setItem('dia_settings', JSON.stringify(currentSettings));
      localStorage.setItem('dia_assets', JSON.stringify(currentAssets));
      localStorage.setItem('dia_invoices', JSON.stringify(currentInvoices));
      localStorage.setItem('dia_last_saved', timestamp);

      setLastSaved(timestamp);
    } catch (e) {
      console.error("Auto-save failed: ", e);
    }
  };

  // State handlers with Auto-Save callback
  const handleUpdateSettings = (newSettings: GlobalSettings) => {
    setSettings(newSettings);
    saveToLocalStorage(newSettings, assets, invoices);
  };

  const handleAddAsset = (newAsset: Omit<Asset, 'id'>) => {
    const id = `asset-${Date.now()}`;
    const updated = [...assets, { ...newAsset, id }];
    setAssets(updated);
    saveToLocalStorage(settings, updated, invoices);
  };

  const handleUpdateAsset = (updatedAsset: Asset) => {
    const updated = assets.map(a => a.id === updatedAsset.id ? updatedAsset : a);
    setAssets(updated);
    saveToLocalStorage(settings, updated, invoices);
  };

  const handleDeleteAsset = (id: string) => {
    const updated = assets.filter(a => a.id !== id);
    setAssets(updated);
    saveToLocalStorage(settings, updated, invoices);
  };

  const handleBulkImportAssets = (imported: Omit<Asset, 'id'>[]) => {
    const withIds = imported.map((item, index) => ({
      ...item,
      id: `asset-import-${Date.now()}-${index}`
    }));
    const updated = [...assets, ...withIds];
    setAssets(updated);
    saveToLocalStorage(settings, updated, invoices);
  };

  const handleResetAssets = () => {
    setAssets(DEFAULT_ASSETS);
    saveToLocalStorage(settings, DEFAULT_ASSETS, invoices);
  };

  // Invoice Handlers
  const handleAddInvoice = (newInvoice: Omit<Invoice, 'id'>) => {
    const id = `inv-${Date.now()}`;
    const updated = [...invoices, { ...newInvoice, id }];
    setInvoices(updated);
    saveToLocalStorage(settings, assets, updated);
  };

  const handleUpdateInvoice = (updatedInvoice: Invoice) => {
    const updated = invoices.map(i => i.id === updatedInvoice.id ? updatedInvoice : i);
    setInvoices(updated);
    saveToLocalStorage(settings, assets, updated);
  };

  const handleDeleteInvoice = (id: string) => {
    const updated = invoices.filter(i => i.id !== id);
    setInvoices(updated);
    saveToLocalStorage(settings, assets, updated);
  };

  const handleBulkImportInvoices = (imported: Omit<Invoice, 'id'>[]) => {
    const withIds = imported.map((item, index) => ({
      ...item,
      id: `inv-import-${Date.now()}-${index}`
    }));
    const updated = [...invoices, ...withIds];
    setInvoices(updated);
    saveToLocalStorage(settings, assets, updated);
  };

  // 4. Calculate dynamic allocation results
  const allocationResults = calculateAllocations(assets, invoices, settings);

  // 5. System Reset Trigger
  const handleResetAllData = () => {
    if (confirm("Are you sure you want to completely reset all data? This will overwrite existing assets, invoices, and restore original values.")) {
      setSettings(DEFAULT_SETTINGS);
      setAssets(DEFAULT_ASSETS);
      setInvoices(DEFAULT_INVOICES);
      
      const now = new Date().toLocaleTimeString('en-US', { hour12: false });
      const today = new Date().toISOString().split('T')[0];
      const timestamp = `${today} ${now}`;
      
      localStorage.setItem('dia_settings', JSON.stringify(DEFAULT_SETTINGS));
      localStorage.setItem('dia_assets', JSON.stringify(DEFAULT_ASSETS));
      localStorage.setItem('dia_invoices', JSON.stringify(DEFAULT_INVOICES));
      localStorage.setItem('dia_last_saved', timestamp);
      
      setLastSaved(timestamp);
      alert("System restored to initial standard configuration successfully.");
    }
  };

  // 6. Export/Import Backups
  const handleExportBackup = () => {
    const backupData = {
      version: "2.0.0",
      timestamp: new Date().toISOString(),
      settings,
      assets,
      invoices
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `invoice_allocation_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.settings && parsed.assets && parsed.invoices) {
          setSettings(parsed.settings);
          setAssets(parsed.assets);
          setInvoices(parsed.invoices);
          saveToLocalStorage(parsed.settings, parsed.assets, parsed.invoices);
          alert("Backup configuration and records loaded successfully.");
        } else {
          alert("Invalid backup file format. Must contain settings, assets, and invoices keys.");
        }
      } catch (err) {
        alert("Failed to parse backup JSON file. Ensure file is uncorrupted.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* ── STICKY NAVIGATION BAR (56px high, white background, bottom border) ── */}
      <header className="sticky top-0 z-50 h-[56px] bg-white border-b border-border shadow-nav shrink-0">
        <div className="max-w-[1400px] h-full mx-auto px-10 flex items-center justify-between">
          {/* Left Brand Identifier (Clean Minimalist text title) */}
          <div className="flex items-center gap-3">
            <span className="font-heading text-xl font-semibold tracking-tight text-primary">
              Dynamic Invoice Allocation & Multi-Entity Cost Distribution Toolkit
            </span>
          </div>

          {/* Right Tab Switcher */}
          <nav className="flex h-full items-center">
            <button
              onClick={() => setActiveTab('summary')}
              className={`h-full px-4 flex items-center gap-1.5 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'summary'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-primary/60 hover:text-primary'
              }`}
            >
              Summary Dashboard
            </button>
            <button
              onClick={() => setActiveTab('allocation_detail')}
              className={`h-full px-4 flex items-center gap-1.5 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'allocation_detail'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-primary/60 hover:text-primary'
              }`}
            >
              Allocation Ledger
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`h-full px-4 flex items-center gap-1.5 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'invoices'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-primary/60 hover:text-primary'
              }`}
            >
              Invoice Input
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`h-full px-4 flex items-center gap-1.5 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'assets'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-primary/60 hover:text-primary'
              }`}
            >
              Asset Import
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`h-full px-4 flex items-center gap-1.5 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'settings'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-primary/60 hover:text-primary'
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`h-full px-4 flex items-center gap-1.5 text-xs font-semibold tracking-wide border-b-2 transition-all ${
                activeTab === 'instructions'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-primary/60 hover:text-primary'
              }`}
            >
              SOP Instructions
            </button>
          </nav>
        </div>
      </header>

      {/* ── DYNAMIC GLOBAL OPERATIONS TOOLBAR (Sub-header) ── */}
      <section className="bg-white border-b border-border/60 py-2.5">
        <div className="max-w-[1400px] mx-auto px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Metadata Auto-Save indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <div className="w-2 h-2 rounded-full bg-positive animate-pulse" />
            <span>Auto-save: <strong className="text-primary">Enabled</strong></span>
            {lastSaved && (
              <span className="hidden sm:inline border-l pl-2 border-border">
                Last saved: <strong className="text-primary font-bold">{lastSaved}</strong>
              </span>
            )}
          </div>

          {/* Backup/Export Utility Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* hidden upload input */}
            <input
              type="file"
              ref={backupInputRef}
              onChange={handleImportBackup}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => backupInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-bg text-primary text-[11px] font-semibold border border-border hover:bg-border/30 transition-colors"
            >
              Import Backup
            </button>
            <button
              onClick={handleExportBackup}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-bg text-primary text-[11px] font-semibold border border-border hover:bg-border/30 transition-colors"
            >
              Export Backup
            </button>
            <button
              onClick={handleResetAllData}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-negative/5 text-negative text-[11px] font-semibold border border-negative/10 hover:bg-negative/10 transition-colors"
            >
              Reset Data
            </button>
          </div>
        </div>
      </section>

      {/* ── MAIN WORKSPACE CONTENT CONTAINER (Max-width 1400px, 40px left/right padding) ── */}
      <main className="flex-grow py-8 max-w-[1400px] w-full mx-auto px-10">
        {/* Tab content router */}
        <div className="relative">
          {activeTab === 'instructions' && <InstructionsTab />}
          
          {activeTab === 'settings' && (
            <SettingsTab settings={settings} onUpdateSettings={handleUpdateSettings} />
          )}

          {activeTab === 'assets' && (
            <AssetsTab
              assets={assets}
              settings={settings}
              onAddAsset={handleAddAsset}
              onUpdateAsset={handleUpdateAsset}
              onDeleteAsset={handleDeleteAsset}
              onBulkImportAssets={handleBulkImportAssets}
              onResetAssets={handleResetAssets}
            />
          )}

          {activeTab === 'invoices' && (
            <InvoicesTab
              invoices={invoices}
              assets={assets}
              settings={settings}
              onAddInvoice={handleAddInvoice}
              onUpdateInvoice={handleUpdateInvoice}
              onDeleteInvoice={handleDeleteInvoice}
              onBulkImportInvoices={handleBulkImportInvoices}
            />
          )}

          {activeTab === 'allocation_detail' && (
            <AllocationDetailTab results={allocationResults} settings={settings} />
          )}

          {activeTab === 'summary' && (
            <SummaryTab
              results={allocationResults}
              settings={settings}
              assetsCount={assets.length}
            />
          )}
        </div>
      </main>

      {/* ── FOOTER BAR ── */}
      <footer className="py-4 border-t border-border bg-white shrink-0">
        <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center text-[11px] text-muted font-mono">
          <span>Dynamic Invoice Allocation Calculator © 2026</span>
          <span className="hidden sm:inline">Operational Ledger System</span>
        </div>
      </footer>
    </div>
  );
}
