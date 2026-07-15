# Dynamic Invoice Allocation & Multi-Entity Cost Distribution Excel Toolkit

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-success)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange)

**Allocate supplier invoices across assets, funds, companies, and geographies automatically using configurable allocation rules—available as a free browser version and an Excel workbook with no installation required.**

> ## **No signup. No installation. Free.**
>
> 🌐 **Open in Browser**
>
> *(HTML Live Demo)*
>
> 📥 **Download Excel**
>
> *(GitHub Release / Gumroad)*

---

# Screenshots

### Browser Version

<!-- screenshot: browser version -->

*A browser-based interface for importing invoices, selecting allocation rules, and reviewing allocation summaries without opening Excel.*

---

### Excel Version

<!-- screenshot: excel version -->

*The Excel workbook automatically transforms imported invoices into allocation-ready accounting records and management summaries.*

---

# What It Helps You Track

- Supplier invoices allocated consistently across multiple legal entities and operating assets.
- Cost distribution by Fund, Geography, SPV, and billing company without rebuilding reports.
- Allocation results under different methodologies such as Asset Count, Capacity, or Ownership Capacity.
- Missing or unmapped allocation targets before accounting entries are exported.
- Complete allocation audit trails from original invoice through every allocated transaction.
- Finance-ready allocation summaries that remain synchronized with imported source data.

---

# Quick Start Workflow

### 1. Configure allocation rules once

Open the **Settings** sheet and define the few parameters that control the workbook.

Typical examples include:

- Default VAT rate
- Currency symbol
- Allocation basis
    - Asset Count
    - Capacity
    - Ownership Capacity

These settings become the single source of truth used throughout every calculation.

---

### 2. Import existing operational data

Paste the latest asset master list into **Asset Import**.

Paste supplier invoices into **Invoice Input**.

No restructuring is required.

Data can come directly from:

- accounting software exports
- ERP reports
- CSV files
- copied spreadsheet tables

The workbook automatically expands as additional rows are added.

---

### 3. Review allocation results instantly

Switch to **Allocation Detail** or **Allocation Summary**.

Every invoice is automatically distributed according to the selected allocation methodology.

No formulas need to be copied.

No Pivot Tables need refreshing.

No manual allocation worksheets need maintenance.

---

### 4. Refresh whenever new invoices arrive

Replace imported asset data whenever portfolio structures change.

Append new invoices as they arrive.

The workbook automatically recalculates every allocation and management summary without rebuilding reports.

**Set a few key parameters. Drop in existing data. Get the analysis. Refresh whenever needed.**

---

# Why I Built This

Many finance teams already have invoice allocation workbooks.

The problem is rarely the calculation itself.

The real problem is that every new billing company, investment vehicle, or operating entity usually introduces another worksheet, another copied formula block, and another opportunity for allocation errors.

Over time, these workbooks become collections of nearly identical calculators that are difficult to audit and almost impossible to maintain consistently.

I built this toolkit to replace duplicated calculation sheets with a reusable allocation framework.

Instead of maintaining separate calculators for every entity, invoices flow through one allocation engine driven by asset master data and configurable allocation rules.

For example:

**Before**

A maintenance invoice for a portfolio company arrives.

Finance staff manually decides which calculator to open, copies formulas, adjusts ranges, verifies percentages, refreshes summaries, and checks whether every allocated amount still reconciles to the original invoice.

Each additional entity increases both workload and audit risk.

**After**

The invoice is pasted once.

The allocation target identifies the relevant asset group.

The engine distributes the invoice automatically according to the selected allocation basis, validates missing mappings, generates detailed accounting records, and immediately updates Fund and Geography summaries.

The workbook becomes a reusable analytical process rather than another customized spreadsheet.
# Common Invoice Allocation Problems This Solves

| Problem | Without This Tool | With This Tool |
|----------|-------------------|----------------|
| Multiple entity-specific allocation workbooks | Every legal entity requires its own calculator, creating duplicated logic and inconsistent maintenance. | One allocation engine automatically routes invoices to the correct assets using the selected billing entity. |
| Allocation rules change over time | Formula updates must be repeated across many worksheets, increasing the risk of inconsistent calculations. | Allocation methodology is controlled from a single Settings sheet and applied consistently across every invoice. |
| Asset portfolios change frequently | New assets require manual formula expansion and summary updates. Missing references often go unnoticed. | New assets are added to the master asset table, and allocation ranges expand automatically. |
| Allocation reconciliation is difficult | Finance teams manually compare invoice totals with distributed amounts across multiple worksheets. | Every allocated line remains traceable back to the original invoice while Net, VAT, and Gross values stay fully reconciled. |
| Management reporting requires manual Pivot Tables | Fund and geographic summaries must be rebuilt or refreshed after every reporting cycle. | Summary views update automatically as new invoices and assets are imported. |
| Incorrect allocation targets remain unnoticed | Misspelled or unknown billing entities often produce incomplete allocations without obvious warnings. | Unmapped allocation targets are immediately flagged so errors can be corrected before posting accounting entries. |

---

# Who This Is For

This workbook is designed for organizations that allocate shared operating costs across multiple assets, legal entities, investment vehicles, or geographic regions while requiring a transparent audit trail.

Typical users include:

- Corporate finance teams managing shared operating expenses.
- Infrastructure and renewable energy investment managers.
- Property, infrastructure, and private equity fund administrators.
- Family offices managing multi-entity operating structures.
- Accounting teams preparing allocation journals before ERP import.
- Financial analysts responsible for recurring cost allocation and management reporting.

This workbook is **not** intended to replace ERP systems or enterprise accounting platforms. Instead, it standardizes one of the most error-prone analytical processes before data enters those systems.

No spreadsheet expertise is required. Open the browser version or Excel workbook, import existing data, and begin allocating invoices immediately.

---

# About

I build lightweight Excel and browser-based decision-support tools for operational problems that involve too many moving parts to manage reliably by memory alone.

Rather than creating large enterprise systems, I focus on reusable analytical frameworks that answer one practical question:

**"What information needs to be visible in one place to make the next decision confidently?"**

The Dynamic Invoice Allocation & Multi-Entity Cost Distribution Excel Toolkit is one example of that approach—turning a repetitive financial allocation process into a repeatable analytical workflow instead of another collection of copied spreadsheets.

---

# Technical Details

<details>
<summary><strong>For technical reviewers, Excel practitioners, and collaborators</strong></summary>

---

## Workbook Architecture

The workbook follows a strict separation between inputs, calculation logic, validation, and reporting.

```text
                User Guidance
                     │
                     ▼
              Instructions Sheet
                     │
      ┌──────────────┴──────────────┐
      ▼                             ▼
 Settings                    Asset Import
      │                             │
      └──────────────┬──────────────┘
                     ▼
              Invoice Input
                     │
                     ▼
          Allocation Engine
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
 Allocation Detail      Allocation Summary
```

| Layer | Worksheet | Primary Responsibility |
|--------|-----------|------------------------|
| Guidance | Instructions | Operating procedures and troubleshooting |
| Configuration | Settings | VAT, currency, allocation methodology |
| Master Data | Asset Import | Single source of truth for asset metadata |
| Transaction Input | Invoice Input | Supplier invoice entry |
| Calculation | Allocation Engine | Dynamic invoice distribution engine |
| Detailed Output | Allocation Detail | Auditable allocation records |
| Decision Support | Allocation Summary | Fund and Geography reporting |

### Data Flow

```
Settings
        \
Asset Import ---> Allocation Engine ---> Allocation Detail
        /                           \
Invoice Input -----------------------> Allocation Summary
```

Validation occurs before reporting.

Invoices cannot be successfully allocated unless the billing entity exists inside the asset master table.

---

## Three Traps That Catch Even Experienced Finance Teams

### Trap 1 — Copying Entity-Specific Allocation Worksheets

**Decision**

A new operating company is added.

A copy of an existing allocation worksheet is created.

| Traditional Approach | Allocation Framework |
|----------------------|----------------------|
| Duplicate worksheet | Reuse one allocation engine |
| Duplicate formulas | Dynamic arrays expand automatically |
| Maintain multiple logic copies | Maintain one calculation model |

The copied workbook initially produces the correct numbers.

Several months later, allocation rules change.

Only some worksheets receive the updated formulas.

The organization now operates multiple versions of the same allocation methodology.

### Why the reasoning fails

The analytical model is embedded inside duplicated worksheets instead of centralized business rules.

### Correct approach

Maintain one allocation engine.

Only asset master data and allocation parameters change.

Calculation logic never needs to be duplicated.

<details>
<summary>Formula principles</summary>

- LET()
- FILTER()
- REDUCE()
- LAMBDA()
- Dynamic Spill Arrays

One formula generates the complete allocation table.

</details>

---

### Trap 2 — Assuming Equal Allocation Is Always Fair

**Decision**

Every asset receives an equal percentage of operating costs.

| Equal Split | Capacity-Based Allocation |
|--------------|--------------------------|
| 25% | Capacity Share |
| Ignores asset scale | Reflects operational exposure |

Example:

Four assets receive identical maintenance charges.

One asset represents 60 MW.

Three assets represent only 10 MW each.

Equal allocation understates the largest operating asset while overstating smaller assets.

### Correct approach

Allocation methodology should reflect operational economics.

The workbook supports:

- Asset Count
- Capacity
- Ownership Capacity

without changing downstream reports.

<details>
<summary>Formula principles</summary>

Allocation ratios are selected dynamically through a SWITCH statement referencing the Settings sheet.

</details>

---

### Trap 3 — Believing Imported Data Is Always Complete

**Decision**

Invoices are allocated immediately after import.

The billing entity contains a spelling inconsistency.

Instead of stopping the process, many spreadsheets simply produce empty lookups.

Management reports appear complete while part of the invoice remains unallocated.

### Why the reasoning fails

Missing master-data relationships become hidden accounting errors.

### Correct approach

Unknown billing entities are immediately flagged as **Unmapped Target** before financial posting.

Allocation continues only after master data is corrected.

<details>
<summary>Formula principles</summary>

FILTER() validates entity membership.

If no matching assets exist, the engine generates an explicit warning record instead of silent calculation failures.

</details>

---

## Example Scenario

A renewable energy investment manager receives a supplier invoice for annual maintenance totaling **£240,000** before VAT.

The invoice is assigned to the operating company responsible for four solar assets.

The allocation methodology selected in **Settings** is **Ownership Capacity**.

The asset master contains the following ownership capacities:

| Asset | Ownership Capacity (MW) |
|-------|-------------------------:|
| Asset A | 60 |
| Asset B | 30 |
| Asset C | 20 |
| Asset D | 10 |

Total ownership capacity equals **120 MW**.

The allocation engine automatically calculates proportional allocation ratios of **50%**, **25%**, **16.67%**, and **8.33%**.

Instead of allocating £60,000 equally to each asset, the workbook distributes costs according to actual economic ownership:

| Asset | Allocated Net |
|-------|--------------:|
| Asset A | £120,000 |
| Asset B | £60,000 |
| Asset C | £40,000 |
| Asset D | £20,000 |

VAT is calculated automatically using either the invoice-specific override or the global VAT setting.

The resulting allocation table immediately updates Fund and Geography summaries while preserving complete traceability back to the original supplier invoice.

This approach improves cost attribution, reduces manual reconciliation, and produces allocation records suitable for accounting review and ERP import.

## Formula Reference

<details>
<summary><strong>Settings & Configuration</strong></summary>

### Default VAT Rate

**Purpose**

Provides the default VAT rate whenever an invoice does not specify an invoice-specific override.

**Referenced by**

- Invoice Input
- Allocation Engine

**Logic**

```excel
IF(VAT Override="", Default VAT Rate, VAT Override)
```

---

### Default Allocation Basis

**Purpose**

Defines the allocation methodology applied across the entire workbook.

Supported options:

- Asset Count
- Capacity
- Ownership Capacity

The Allocation Engine references this parameter dynamically, allowing the allocation methodology to change without modifying any formulas.

</details>

---

<details>
<summary><strong>Asset Import</strong></summary>

### Ownership Capacity

**Purpose**

Calculates the effective ownership capacity used by proportional allocation.

**Formula**

```excel
=IF(A2:A100000="","",G2:G100000*H2:H100000)
```

Where:

- G = Ownership %
- H = Capacity (MW)

The calculation automatically expands as additional assets are imported.

</details>

---

<details>
<summary><strong>Invoice Input</strong></summary>

### Taxable Net

```excel
=IF(A2:A100000="","",E2:E100000*F2:F100000)
```

Calculates invoice value before VAT.

---

### VAT Amount

```excel
=IF(
A2:A100000="",
"",
I2:I100000*
IF(
H2:H100000="",
Settings!$B$4,
H2:H100000
)
)
```

Uses the invoice-specific VAT rate whenever available.

Otherwise the global VAT parameter is applied.

---

### Gross Amount

```excel
=IF(A2:A100000="","",I2:I100000+J2:J100000)
```

Produces the accounting-ready gross invoice amount.

</details>

---

<details>
<summary><strong>Allocation Engine</strong></summary>

The Allocation Engine is intentionally implemented as a single dynamic-array formula.

Major Excel functions include:

| Function | Purpose |
|----------|----------|
| LET | Variable definition and improved readability |
| FILTER | Match assets belonging to the selected billing entity |
| REDUCE | Iterate through every imported invoice |
| LAMBDA | Reusable row-level allocation logic |
| SWITCH | Select allocation methodology dynamically |
| MAKEARRAY | Generate allocation rows automatically |
| HSTACK | Assemble output columns |
| VSTACK | Append invoice allocation blocks |

Allocation ratios are generated according to the configured methodology:

### Asset Count

```text
Allocation Ratio = 1 ÷ Number of Matching Assets
```

---

### Capacity

```text
Allocation Ratio

=

Asset Capacity

/

Total Capacity
```

---

### Ownership Capacity

```text
Allocation Ratio

=

Ownership Capacity

/

Total Ownership Capacity
```

The resulting allocation ratios are multiplied by:

- Net Amount
- VAT
- Gross Amount

to generate fully reconciled allocation records.

</details>

---

<details>
<summary><strong>Summary Sheets</strong></summary>

### Dynamic Fund List

Uses:

```excel
UNIQUE()
SORT()
FILTER()
```

to generate the complete Fund dimension automatically.

---

### Dynamic Geography List

Uses the same pattern to generate all reporting regions automatically.

---

### Summary Totals

Generated through:

```excel
SUMIFS()
```

for

- Net
- VAT
- Gross

without Pivot Tables.

</details>

---

## Validation Rules

| Field | Validation Rule | Error Behavior |
|--------|-----------------|----------------|
| Invoice Number | Cannot be blank for active records | Row ignored |
| Invoice Date | Must be a valid Excel date | User correction required |
| Quantity | Must be numeric and ≥ 0 | Calculation prevented |
| Unit Price | Must be numeric | Calculation prevented |
| Allocation Target | Must match an existing Company to Invoice | Warning record generated |
| VAT Override | Blank or valid percentage | Falls back to Default VAT |
| Company to Invoice | Must exist in Asset Import | Allocation blocked |
| Ownership % | Between 0% and 100% | Invalid values excluded |
| Capacity | Must be positive | Capacity allocation unavailable |
| Ownership Capacity | Formula-generated only | Protected column |
| Default VAT Rate | Between 0% and 100% | Configuration warning |
| Allocation Basis | Asset Count / Capacity / Ownership Capacity | Defaults to Asset Count |

### Automatic Guard Conditions

- Empty invoice rows are ignored.
- Empty asset rows are ignored.
- Unknown billing entities generate an **⚠ Unmapped Target** record.
- Dynamic arrays expand automatically without copied formulas.
- Summary reports refresh automatically after recalculation.
- All allocated Net, VAT, and Gross totals reconcile back to their originating invoice.

</details>

---

## Other Tools in This Series

These workbooks follow the same design philosophy: lightweight analytical frameworks that simplify recurring operational decisions without replacing enterprise systems.

- **Demand-Adaptive Inventory Planning & Purchasing Decision Toolkit** — Inventory planning, reorder timing, and purchasing simulation.
- **Restaurant Menu Master Workbook** — Centralized menu configuration, modifier management, and pricing governance.
- **Retail & Maquila Inventory Ledger** — Track inventory from bulk purchasing through contract manufacturing to finished SKU sales.
- **Construction Estimate & Cost Tracking Toolkit** — Quantity takeoffs, cost estimation, and project budget monitoring.
- More tools are available through the GitHub repository and Gumroad product library.

---

## License

This project is licensed under the **Apache License 2.0**.

You are free to use, modify, and distribute this workbook in accordance with the terms of the Apache License 2.0.

See the `LICENSE` file for the complete license text.
