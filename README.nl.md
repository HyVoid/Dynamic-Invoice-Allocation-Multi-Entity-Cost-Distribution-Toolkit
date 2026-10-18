[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Dynamische factuurallocatie & kostenverdeling over meerdere entiteiten — Excel-toolkit

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-success)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange)

**Verdeel leveranciersfacturen automatisch over activa, fondsen, bedrijven en geografieën met configureerbare toewijningsregels—beschikbaar als gratis browserversie en als Excel-werkmap, zonder installatie.**

**Geen registratie. Geen installatie. Gratis in je browser.**

Probeer de browserversie gratis. Als je de Excel-versie nodig hebt, kun je die kopen met een 30-dagen geld-terug-garantie zonder vragen.
>
> 🌐 **In de browser openen (gratis)** → [hier](https://hyvoid.github.io/Dynamic-Invoice-Allocation-Multi-Entity-Cost-Distribution-Toolkit/)
>
> 📥 **Excel downloaden** → [aankooplink](https://www.theseusworkshop.com/l/vooco?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=invoice-allocation-calculator)
> 

---

## Wat het je helpt bijhouden

- Leveranciersfacturen die consistent worden toegedeeld over meerdere rechtspersonen en bedrijfsactiva.
- Kostenverdeling per Fonds, Geografie, SPV en facturerend bedrijf zonder herbouw van rapporten.
- Toewijningsresultaten onder verschillende methodologieën zoals Activa aantal, Capaciteit of Eigendomscapaciteit.
- Ontbrekende of niet-gemapte toewijningsdoelen voordat boekingen worden geëxporteerd.
- Volledige toewijnings-audittrails van de originele factuur tot elke toegedeelde transactie.
- Kantoorklare toewijningssamenvattingen die gesynchroniseerd blijven met geïmporteerde brondata.

---

## Snelstartworkflow

### 1. Toewijningsregels eenmalig configureren

Open het blad **Settings** en definieer de weinige parameters die de werkmap besturen.

Typische voorbeelden:

- Standaard btw-tarief
- Valutasymbool
- Toewijningsbasis
    - Activa aantal
    - Capaciteit
    - Eigendomscapaciteit

Deze instellingen worden de single source of truth voor elke berekening.

---

### 2. Bestaande operationele data importeren

Plak de nieuwste activa-stammlijst in **Asset Import**.

Plak leveranciersfacturen in **Invoice Input**.

Geen herstructurering nodig.

Data kan direct komen uit:

- exports van boekhoudsoftware
- ERP-rapporten
- CSV-bestanden
- gekopieerde spreadsheettabellen

De werkmap breidt automatisch uit naarmate rijen worden toegevoegd.

---

### 3. Toewijningsresultaten direct beoordelen

Schakel over naar **Allocation Detail** of **Allocation Summary**.

Elke factuur wordt automatisch verdeeld volgens de geselecteerde toewijningsmethodologie.

Er hoeven geen formules te worden gekopieerd.

Er hoeven geen pivottabellen te worden vernieuwd.

Er hoeven geen handmatige toewijningswerkbladen te worden onderhouden.

---

### 4. Vernieuwen wanneer nieuwe facturen binnenkomen

Vervang geïmporteerde activadata wanneer portefeuillestructuren wijzigen.

Voeg nieuwe facturen toe zodra ze binnenkomen.

De werkmap herberekent automatisch elke toewijning en managementsamenvatting zonder rapporten te herbouwen.

**Stel een paar sleutelparameters in. Gooi bestaande data erin. Krijg de analyse. Vernieuw wanneer nodig.**

---

## Waarom ik dit heb gebouwd

Veel financeteams hebben al factuurtoewijningswerkmappen.

Het probleem is zelden de berekening zelf.

Het echte probleem: elk nieuw facturerend bedrijf, elk nieuw beleggingsvehikel of elke nieuwe bedrijfsentiteit introduceert meestal nog een werkblad, nog een gekopieerd formuleblok en nog een kans op toewijningsfouten.

Na verloop van tijd worden deze werkmappen verzamelingen van bijna identieke rekenmachines die moeilijk te controleren zijn en bijna onmogelijk consistent te onderhouden.

Ik heb deze toolkit gebouwd om gedupliceerde rekenbladen te vervangen door een herbruikbaar toewijningsraamwerk.

In plaats van aparte rekenmachines voor elke entiteit, stromen facturen door één toewijningsengine, aangedreven door activa-stamdata en configureerbare toewijningsregels.

Bijvoorbeeld:

**Voor**

Een onderhoudsfactuur voor een portefeuillebedrijf komt binnen.

Financiële medewerkers beslissen handmatig welke rekenmachine ze openen, kopiëren formules, passen bereiken aan, controleren percentages, vernieuwen samenvattingen en controleren of elk toegedeeld bedrag nog steeds overeenkomt met de originele factuur.

Elke extra entiteit verhoogt zowel werklast als controlerisico.

**Na**

De factuur wordt één keer geplakt.

Het toewijningsdoel identificeert de relevante activagroep.

De engine verdeelt de factuur automatisch volgens de geselecteerde toewijningsbasis, valideert ontbrekende mappings, genereert gedetailleerde boekingsrecords en werkt direct Fonds- en Geografie-samenvattingen bij.

De werkmap wordt een herbruikbaar analytisch proces in plaats van nog een aangepaste spreadsheet.
## Veelvoorkomende factuurtoewijningsproblemen die dit oplost

| Probleem | Zonder deze tool | Met deze tool |
|----------|-------------------|----------------|
| Entiteit-specifieke toewijningswerkmappen | Elke rechtspersoon vereist zijn eigen rekenmachine, wat gedupliceerde logica en inconsistente onderhoud creëert. | Één toewijningsengine routeert facturen automatisch naar de juiste activa via de geselecteerde facturerende entiteit. |
| Toewijningsregels veranderen in de tijd | Formule-updates moeten over vele werkbladen worden herhaald, wat het risico op inconsistente berekeningen verhoogt. | De toewijningsmethodologie wordt vanaf één Settings-blad aangestuurd en consistent op elke factuur toegepast. |
| Activa-portefeuilles veranderen frequent | Nieuwe activa vereisen handmatige formule-uitbreiding en samenvattingsupdates. Ontbrekende referenties blijven vaak onopgemerkt. | Nieuwe activa worden aan de activa-stamtabel toegevoegd, en toewijningsbereiken breiden automatisch uit. |
| Toewijningsafstemming is moeilijk | Financeteams vergelijken handmatig factuurtotalen met verdeelde bedragen over meerdere werkbladen. | Elke toegedeelde regel blijft traceerbaar naar de originele factuur, terwijl Net-, btw- en Bruto-waarden volledig afgestemd blijven. |
| Managementrapportage vereist handmatige pivottabellen | Fonds- en geografische samenvattingen moeten na elke rapportagecyclus worden herbouwd of vernieuwd. | Samenvattingsweergaven werken automatisch bij naarmate nieuwe facturen en activa worden geïmporteerd. |
| Onjuiste toewijningsdoelen blijven onopgemerkt | Verkeerd gespelde of onbekende facturerende entiteiten produceren vaak onvolledige toewijningen zonder duidelijke waarschuwingen. | Niet-gemapte toewijningsdoelen worden direct gemarkeerd, zodat fouten vóór boeking kunnen worden gecorrigeerd. |

---

## Voor wie dit is

Deze werkmap is ontworpen voor organisaties die gedeelde operationele kosten verdelen over meerdere activa, rechtspersonen, beleggingsvoertuigen of geografische regio's, terwijl ze een transparante audittrail vereisen.

Typische gebruikers zijn:

- Financiële teams in bedrijven die gedeelde operationele kosten beheren.
- Beheerders van investeringen in infrastructuur en hernieuwbare energie.
- Beheerders van vastgoed-, infrastructuur- en private-equityfondsen.
- Family offices die structuren met meerdere entiteiten beheren.
- Boekhoudteams die toewijningsjournals voorbereiden vóór ERP-import.
- Financiële analisten verantwoordelijk voor terugkerende kostentoewijning en managementrapportage.

Deze werkmap is **niet** bedoeld om ERP-systemen of ondernemingsbrede boekhoudplatforms te vervangen. Het standaardiseert in plaats daarvan een van de meest foutgevoelige analytische processen voordat data deze systemen binnenkomt.

Geen spreadsheet-expertise vereist. Open de browserversie of Excel-werkmap, importeer bestaande data en begin direct met het toewijzen van facturen.

---

## Over

Ik bouw lichtgewicht Excel- en browsergebaseerde beslissingsondersteunende tools voor operationele problemen met te veel bewegende delen om betrouwbaar uit het hoofd te managen.

In plaats van grote ondernemingssystemen te bouw, focus ik op herbruikbare analytische raamwerken die één praktische vraag beantwoorden:

**"Welke informatie moet op één plek zichtbaar zijn om de volgende beslissing met vertrouwen te nemen?"**

De Dynamic Invoice Allocation & Multi-Entity Cost Distribution Excel Toolkit is één voorbeeld van deze aanpak—een repetitief financieel toewijningsproces omzetten in een herhaalbare analytische workflow in plaats van nog een collectie gekopieerde spreadsheets.

---

## Technische details

<details>
<summary><strong>Voor technische reviewers, Excel-beoefenaars en medewerkers</strong></summary>

---

## Werkmaparchitectuur

De werkmap volgt een strikte scheiding tussen invoer, berekeningslogica, validatie en rapportage.

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

| Laag | Werkblad | Primaire verantwoordelijkheid |
|--------|-----------|------------------------|
| Begeleiding | Instructions | Bedrijfsprocedures en probleemoplossing |
| Configuratie | Settings | Btw, valuta, toewijningsmethodologie |
| Stamdata | Asset Import | Single source of truth voor activa-metadata |
| Transactie-invoer | Invoice Input | Invoer van leveranciersfacturen |
| Berekening | Allocation Engine | Dynamische factuurverdelingsengine |
| Gedetailleerde uitvoer | Allocation Detail | Controleerbare toewijningsrecords |
| Beslissingsondersteuning | Allocation Summary | Fonds- en Geografie-rapportage |

### Gegevensstroom

```
Settings
        \
Asset Import ---> Allocation Engine ---> Allocation Detail
        /                           \
Invoice Input -----------------------> Allocation Summary
```

Validatie vindt plaats vóór rapportage.

Facturen kunnen alleen succesvol worden toegedeeld als de facturerende entiteit in de activa-stamtabel bestaat.

---

## Drie valkuilen die zelfs ervaren financeteams vangen

### Valkuil 1 — Entiteit-specifieke toewijningswerkbladen kopiëren

**Beslissing**

Een nieuwe bedrijfsvennootschap wordt toegevoegd.

Een kopie van een bestaand toewijningswerkblad wordt gemaakt.

| Traditionele aanpak | Toewijningsraamwerk |
|----------------------|----------------------|
| Gedupliceerd werkblad | Eén toewijningsengine hergebruiken |
| Gedupliceerde formules | Dynamische arrays breiden automatisch uit |
| Meerdere logiekekopieën onderhouden | Eén berekeningsmodel onderhouden |

De gekopieerde werkmap produceert in eerste instantie de juiste cijfers.

Enkele maanden later veranderen de toewijningsregels.

Alleen sommige werkbladen ontvangen de bijgewerkte formules.

De organisatie draait nu meerdere versies van dezelfde toewijningsmethodologie.

### Waarom de redenering faalt

Het analytische model is ingebed in gedupliceerde werkbladen in plaats van gecentraliseerde bedrijfsregels.

### Juiste aanpak

Eén toewijningsengine onderhouden.

Alleen activa-stamdata en toewijningsparameters veranderen.

Berekeningslogica hoeft nooit te worden gedupliceerd.

<details>
<summary>Formuleprincipes</summary>

- LET()
- FILTER()
- REDUCE()
- LAMBDA()
- Dynamic Spill Arrays

Eén formule genereert de volledige toewijningstabel.

</details>

---

### Valkuil 2 — Ervan uitgaan dat gelijke toewijning altijd eerlijk is

**Beslissing**

Elk actief ontvangt een gelijk percentage van de operationele kosten.

| Gelijke verdeling | Capaciteitsgebaseerde toewijning |
|--------------|--------------------------|
| 25% | Capaciteitsaandeel |
| Negeert activa-omvang | Weerspiegelt operationele blootstelling |

Voorbeeld:

Vier activa ontvangen identieke onderhoudskosten.

Eén actief vertegenwoordigt 60 MW.

Drie activa vertegenwoordigen slechts 10 MW elk.

Gelijke toewijning onderschat het grootste operationele actief terwijl kleinere activa worden overschat.

### Juiste aanpak

De toewijningsmethodologie moet de operationele economie weerspiegelen.

De werkmap ondersteunt:

- Activa aantal
- Capaciteit
- Eigendomscapaciteit

zonder downstream-rapporten te wijzigen.

<details>
<summary>Formuleprincipes</summary>

Toewijningsverhoudingen worden dynamisch geselecteerd via een SWITCH-statement die verwijst naar het Settings-blad.

</details>

---

### Valkuil 3 — Geloven dat geïmporteerde data altijd compleet is

**Beslissing**

Facturen worden direct na import toegedeeld.

De facturerende entiteit bevat een spellinginconsistentie.

In plaats van het proces te stoppen, produceren vele spreadsheets gewoon lege lookups.

Managementrapporten lijken compleet terwijl een deel van de factuur niet-toegedeeld blijft.

### Waarom de redenering faalt

Ontbrekende stamdata-relaties worden verborgen boekhoudfouten.

### Juiste aanpak

Onbekende facturerende entiteiten worden direct gemarkeerd als **Unmapped Target** vóór financiële boeking.

Toewijning gaat alleen verder nadat de stamdata is gecorrigeerd.

<details>
<summary>Formuleprincipes</summary>

FILTER() valideert het entiteitslidmaatschap.

Als er geen overeenkomende activa bestaan, genereert de engine een expliciet waarschuwingsrecord in plaats van stille berekeningsfouten.

</details>

---

## Voorbeeldscenario

Een beheerder van investeringen in hernieuwbare energie ontvangt een leveranciersfactuur voor jaarlijks onderhoud ter waarde van **£240,000** exclusief btw.

De factuur wordt toegewezen aan de bedrijfsvennootschap die verantwoordelijk is voor vier zonne-activa.

De in **Settings** geselecteerde toewijningsmethodologie is **Eigendomscapaciteit**.

De activa-stamtabel bevat de volgende eigendomscapaciteiten:

| Activa | Eigendomscapaciteit (MW) |
|-------|-------------------------:|
| Activa A | 60 |
| Activa B | 30 |
| Activa C | 20 |
| Activa D | 10 |

De totale eigendomscapaciteit bedraagt **120 MW**.

De toewijningsengine berekent automatisch proportionele toewijningsverhoudingen van **50%**, **25%**, **16.67%** en **8.33%**.

In plaats van £60,000 gelijkelijk over elk actief te verdelen, verdeelt de werkmap de kosten volgens werkelijke economische eigendom:

| Activa | Toegedeeld netto |
|-------|--------------:|
| Activa A | £120,000 |
| Activa B | £60,000 |
| Activa C | £40,000 |
| Activa D | £20,000 |

Btw wordt automatisch berekend met ofwel de factuuurspecifieke overschrijving of de globale btw-instelling.

De resulterende toewijningsabel werkt direct Fonds- en Geografie-samenvattingen bij met volledige traceerbaarheid naar de originele leveranciersfactuur.

Deze aanpak verbetert kostenattributie, vermindert handmatige afstemming en produceert toewijningsrecords die geschikt zijn voor boekhoudkundige review en ERP-import.

## Formulereferentie

<details>
<summary><strong>Instellingen & configuratie</strong></summary>

### Standaard btw-tarief

**Doel**

Levert het standaard btw-tarief wanneer een factuur geen factuuurspecifieke overschrijving specificeert.

**Waarnaar verwezen wordt**

- Invoice Input
- Allocation Engine

**Logica**

```excel
IF(VAT Override="", Default VAT Rate, VAT Override)
```

---

### Standaard toewijningsbasis

**Doel**

Definieert de toewijningsmethodologie die over de hele werkmap wordt toegepast.

Ondersteunde opties:

- Activa aantal
- Capaciteit
- Eigendomscapaciteit

De toewijningsengine verwijst dynamisch naar deze parameter, waardoor de toewijningsmethodologie kan wijzigen zonder formules aan te passen.

</details>

---

<details>
<summary><strong>Activa-import</strong></summary>

### Eigendomscapaciteit

**Doel**

Berekent de effectieve eigendomscapaciteit die door proportionele toewijning wordt gebruikt.

**Formule**

```excel
=IF(A2:A100000="","",G2:G100000*H2:H100000)
```

Waarbij:

- G = Eigendom %
- H = Capaciteit (MW)

De berekening breidt automatisch uit naarmate aanvullende activa worden geïmporteerd.

</details>

---

<details>
<summary><strong>Factuurinvoer</strong></summary>

### Belastbaar netto

```excel
=IF(A2:A100000="","",E2:E100000*F2:F100000)
```

Berekent de factuurwaarde vóór btw.

---

### Btw-bedrag

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

Gebruikt het factuuurspecifieke btw-tarief wanneer dat beschikbaar is.

Anders wordt de globale btw-parameter toegepast.

---

### Brutobedrag

```excel
=IF(A2:A100000="","",I2:I100000+J2:J100000)
```

Produceert het boekhoudklare brute factuurbedrag.

</details>

---

<details>
<summary><strong>Toewijningsengine</strong></summary>

De toewijningsengine is bewust geïmplementeerd als één dynamische-array-formule.

Belangrijke Excel-functies omvatten:

| Functie | Doel |
|----------|----------|
| LET | Variabeledefinitie en verbeterde leesbaarheid |
| FILTER | Activa matchen die bij de geselecteerde facturerende entiteit horen |
| REDUCE | Door elke geïmporteerde factuur itereren |
| LAMBDA | Herbruikbare rijniveau-toewijningslogica |
| SWITCH | Toewijningsmethodologie dynamisch selecteren |
| MAKEARRAY | Toewijningsrijen automatisch genereren |
| HSTACK | Uitvoerkolommen samenstellen |
| VSTACK | Factuur-toewijningsblokken toevoegen |

Toewijningsverhoudingen worden gegenereerd volgens de geconfigureerde methodologie:

### Activa aantal

```text
Allocation Ratio = 1 ÷ Number of Matching Assets
```

---

### Capaciteit

```text
Allocation Ratio

=

Asset Capacity

/

Total Capacity
```

---

### Eigendomscapaciteit

```text
Allocation Ratio

=

Ownership Capacity

/

Total Ownership Capacity
```

De resulterende toewijningsverhoudingen worden vermenigvuldigd met:

- Nettobedrag
- Btw
- Brutobedrag

om volledig afgestemde toewijningsrecords te genereren.

</details>

---

<details>
<summary><strong>Samenvattingsbladen</strong></summary>

### Dynamische fondslijst

Gebruikt:

```excel
UNIQUE()
SORT()
FILTER()
```

om de volledige Fonds-dimensie automatisch te genereren.

---

### Dynamische geografielijst

Gebruikt hetzelfde patroon om alle rapportageregio's automatisch te genereren.

---

### Samenvattingstotalen

Gegenereerd via:

```excel
SUMIFS()
```

voor

- Netto
- Btw
- Bruto

zonder pivottabellen.

</details>

---

## Validatieregels

| Veld | Validatieregel | Foutgedrag |
|--------|-----------------|----------------|
| Invoice Number | Mag niet leeg zijn voor actieve records | Rij genegeerd |
| Invoice Date | Moet een geldige Excel-datum zijn | Gebruikerscorrectie vereist |
| Quantity | Moet numeriek en ≥ 0 zijn | Berekening voorkomen |
| Unit Price | Moet numeriek zijn | Berekening voorkomen |
| Allocation Target | Moet overeenkomen met een bestaande Company to Invoice | Waarschuwingsrecord gegenereerd |
| VAT Override | Leeg of geldig percentage | Valt terug op standaard btw |
| Company to Invoice | Moet bestaan in Asset Import | Toewijning geblokkeerd |
| Ownership % | Tussen 0% en 100% | Ongeldige waarden uitgesloten |
| Capacity | Moet positief zijn | Capaciteitstoewijning niet beschikbaar |
| Ownership Capacity | Alleen formulegegenereerd | Beschermde kolom |
| Default VAT Rate | Tussen 0% en 100% | Configuratiewaarschuwing |
| Allocation Basis | Asset Count / Capacity / Ownership Capacity | Standaard activa aantal |

### Automatische bewakingsvoorwaarden

- Lege factuurrijen worden genegeerd.
- Lege activarijen worden genegeerd.
- Onbekende facturerende entiteiten genereren een **⚠ Unmapped Target**-record.
- Dynamische arrays breiden automatisch uit zonder gekopieerde formules.
- Samenvattingsrapporten vernieuwen automatisch na herberekening.
- Alle toegedeelde Net-, btw- en Bruto-totalen stemmen af op hun oorspronkelijke factuur.

</details>

---

## Andere tools in deze serie

Deze werkmappen volgen dezelfde ontwerpfilosofie: lichtgewicht analytische raamwerken die terugkerende operationele beslissingen vereenvoudigen zonder ondernemingssystemen te vervangen.

- **Demand-Adaptive Inventory Planning & Purchasing Decision Toolkit** — voorraadplanning, nabesteltiming en inkoopsimulatie.
- **Restaurant Menu Master Workbook** — gecentraliseerde menuconfiguratie, modifierbeheer en prijsgovernance.
- **Retail & Maquila Inventory Ledger** — voorraad volgen van bulkinkoop via contractmanufacturing tot verkoop van eind-SKU's.
- **Construction Estimate & Cost Tracking Toolkit** — hoeveelheidsopmetingen, kostenschatting en projectbudgetmonitoring.
- Meer tools zijn beschikbaar via de GitHub-repository en onze [Website](https://www.theseusworkshop.com/).

---

## Licentie

Dit project is gelicentieerd onder de **Apache License 2.0**.

Je bent vrij om deze werkmap te gebruiken, wijzigen en distribueren in overeenstemming met de voorwaarden van de Apache License 2.0.

Zie het bestand `LICENSE` voor de volledige licentietekst.
