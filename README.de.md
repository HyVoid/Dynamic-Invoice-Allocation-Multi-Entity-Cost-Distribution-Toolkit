[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Dynamische Rechnungszuteilung & Kostenverteilung über mehrere Einheiten — Excel-Toolkit

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-success)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange)

**Verteilen Sie Lieferantenrechnungen automatisch auf Anlagen, Fonds, Unternehmen und Geografien mit konfigurierbaren Zuteilungsregeln—verfügbar als kostenlose Browserversion und als Excel-Arbeitsmappe ohne Installation.**

**Keine Registrierung. Keine Installation. Kostenlos in Ihrem Browser.**

Testen Sie die Browserversion kostenlos. Wenn Sie die Excel-Version benötigen, können Sie sie mit einer 30-tägigen Geld-zurück-Garantie ohne Fragen erwerben.
>
> 🌐 **Im Browser öffnen (kostenlos)** → [hier](https://hyvoid.github.io/Dynamic-Invoice-Allocation-Multi-Entity-Cost-Distribution-Toolkit/)
>
> 📥 **Excel herunterladen** → [Kauflink](https://www.theseusworkshop.com/l/vooco?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=invoice-allocation-calculator)
> 

---

## Was es Ihnen zu verfolgen hilft

- Lieferantenrechnungen, konsistent über mehrere rechtliche Einheiten und Betriebsanlagen zugeteilt.
- Kostenverteilung nach Fonds, Geografie, SPV und Abrechnungsgesellschaft ohne Neuerstellung von Berichten.
- Zuteilungsergebnisse unter verschiedenen Methodiken wie Anlagenanzahl, Kapazität oder Eigentumskapazität.
- Fehlende oder nicht zugeordnete Zuteilungsziele vor dem Export von Buchungssätzen.
- Vollständige Zuteilungs-Audit-Trails von der Originalrechnung bis zur jeder zugeteilten Transaktion.
- Finanzfertige Zuteilungsübersichten, die mit importierten Quelldaten synchronisiert bleiben.

---

## Schnellstart-Arbeitsablauf

### 1. Zuteilungsregeln einmal konfigurieren

Öffnen Sie das Blatt **Settings** und definieren Sie die wenigen Parameter, die die Arbeitsmappe steuern.

Typische Beispiele:

- Standard-Mehrwertsteuersatz
- Währungssymbol
- Zuteilungsbasis
    - Anlagenanzahl
    - Kapazität
    - Eigentumskapazität

Diese Einstellungen werden zur einzigen Wahrheitsquelle für jede Berechnung.

---

### 2. Bestehende Betriebsdaten importieren

Fügen Sie die aktuelle Anlagen-Stammliste in **Asset Import** ein.

Fügen Sie Lieferantenrechnungen in **Invoice Input** ein.

Keine Umstrukturierung erforderlich.

Daten können direkt stammen aus:

- Exporten aus Buchhaltungssoftware
- ERP-Berichten
- CSV-Dateien
- kopierten Tabellenkalkulationstabellen

Die Arbeitsmappe erweitert sich automatisch, wenn weitere Zeilen hinzugefügt werden.

---

### 3. Zuteilungsergebnisse sofort prüfen

Wechseln Sie zu **Allocation Detail** oder **Allocation Summary**.

Jede Rechnung wird automatisch nach der gewählten Zuteilungsmethodik verteilt.

Keine Formeln müssen kopiert werden.

Keine Pivot-Tabellen müssen aktualisiert werden.

Keine manuellen Zuteilungsarbeitsblätter müssen gewartet werden.

---

### 4. Aktualisieren, wenn neue Rechnungen eintreffen

Ersetzen Sie importierte Anlagendaten, wenn sich Portfoliostrukturen ändern.

Hängen Sie neue Rechnungen an, wenn sie eintreffen.

Die Arbeitsmappe berechnet automatisch jede Zuteilung und Managementübersicht neu, ohne Berichte neu zu erstellen.

**Ein paar Schlüsselparameter festlegen. Bestehende Daten einwerfen. Analyse erhalten. Bei Bedarf aktualisieren.**

---

## Warum ich dies entwickelt habe

Viele Finanzteams haben bereits Rechnungszuteilungs-Arbeitsmappen.

Das Problem ist selten die Berechnung selbst.

Das eigentliche Problem: Jede neue Abrechnungsgesellschaft, jedes neue Anlagevehikel oder jede neue Betriebseinheit führt meist ein weiteres Arbeitsblatt, einen weiteren kopierten Formelblock und eine weitere Gelegenheit für Zuteilungsfehler ein.

Mit der Zeit werden diese Arbeitsmappen zu Sammlungen nahezu identischer Rechner, die schwer zu prüfen und fast unmöglich konsistent zu warten sind.

Ich habe dieses Toolkit entwickelt, um duplizierte Berechnungsblätter durch ein wiederverwendbares Zuteilungs-Framework zu ersetzen.

Statt separater Rechner für jede Einheit fließen Rechnungen durch eine einzige Zuteilungs-Engine, gesteuert durch Anlagen-Stammdaten und konfigurierbare Zuteilungsregeln.

Zum Beispiel:

**Vorher**

Eine Wartungsrechnung für eine Portfoliogesellschaft trifft ein.

Finanzmitarbeiter entscheiden manuell, welchen Rechner sie öffnen, kopieren Formeln, passen Bereiche an, prüfen Prozentsätze, aktualisieren Übersichten und prüfen, ob jeder zugeteilte Betrag noch mit der Originalrechnung übereinstimmt.

Jede zusätzliche Einheit erhöht sowohl Arbeitsaufwand als auch Prüfrisiko.

**Nachher**

Die Rechnung wird einmal eingefügt.

Das Zuteilungsziel identifiziert die relevante Anlagengruppe.

Die Engine verteilt die Rechnung automatisch nach der gewählten Zuteilungsbasis, validiert fehlende Zuordnungen, erzeugt detaillierte Buchungssätze und aktualisiert sofort Fonds- und Geografie-Übersichten.

Die Arbeitsmappe wird zu einem wiederverwendbaren Analyseprozess statt zu einer weiteren angepassten Tabellenkalkulation.
## Häufige Rechnungszuteilungsprobleme, die dies löst

| Problem | Ohne dieses Tool | Mit diesem Tool |
|----------|-------------------|----------------|
| Einheitenspezifische Zuteilungs-Arbeitsmappen | Jede rechtliche Einheit erfordert ihren eigenen Rechner, was duplizierte Logik und inkonsistente Wartung erzeugt. | Eine Zuteilungs-Engine leitet Rechnungen automatisch über die gewählte Abrechnungseinheit an die richtigen Anlagen. |
| Zuteilungsregeln ändern sich mit der Zeit | Formelaktualisierungen müssen über viele Arbeitsblätter wiederholt werden, was das Risiko inkonsistenter Berechnungen erhöht. | Die Zuteilungsmethodik wird über ein einziges Settings-Blatt gesteuert und konsistent auf jede Rechnung angewendet. |
| Anlagenportfolios ändern sich häufig | Neue Anlagen erfordern manuelle Formelerweiterung und Übersichtsaktualisierungen. Fehlende Bezüge bleiben oft unbemerkt. | Neue Anlagen werden der Anlagen-Stammtabelle hinzugefügt, und Zuteilungsbereiche erweitern sich automatisch. |
| Zuteilungsabstimmung ist schwierig | Finanzteams vergleichen manuell Rechnungsgesamtsummen mit verteilten Beträgen über mehrere Arbeitsblätter. | Jede zugeteilte Zeile bleibt bis zur Originalrechnung zurückverfolgbar, während Net-, VAT- und Gross-Werte vollständig abgestimmt bleiben. |
| Managementberichte erfordern manuelle Pivot-Tabellen | Fonds- und Geografie-Übersichten müssen nach jedem Berichtszyklus neu erstellt oder aktualisiert werden. | Übersichtsansichten aktualisieren sich automatisch, wenn neue Rechnungen und Anlagen importiert werden. |
| Falsche Zuteilungsziele bleiben unbemerkt | Falsch geschriebene oder unbekannte Abrechnungseinheiten erzeugen oft unvollständige Zuteilungen ohne offensichtliche Warnungen. | Nicht zugeordnete Zuteilungsziele werden sofort markiert, damit Fehler vor der Buchung korrigiert werden können. |

---

## Für wen dies geeignet ist

Diese Arbeitsmappe ist für Organisationen konzipiert, die gemeinsame Betriebskosten über mehrere Anlagen, rechtliche Einheiten, Anlagevehikel oder geografische Regionen verteilen und dabei einen transparenten Audit-Trail benötigen.

Typische Nutzer:

- Finanzteams in Unternehmen, die gemeinsame Betriebsausgaben verwalten.
- Manager von Infrastruktur- und Renewable-Energy-Investitionen.
- Verwalter von Immobilien-, Infrastruktur- und Private-Equity-Fonds.
- Family Offices, die mehrgliedrige Betriebsstrukturen verwalten.
- Buchhaltungsteams, die Zuteilungsjournale vor dem ERP-Import vorbereiten.
- Finanzanalysten, verantwortlich für wiederkehrende Kostenzuteilung und Managementberichte.

Diese Arbeitsmappe soll **keine** ERP-Systeme oder unternehmensweite Buchhaltungsplattformen ersetzen. Stattdessen standardisiert sie einen der fehleranfälligsten Analyseprozesse, bevor Daten in diese Systeme gelangen.

Keine Tabellenkalkulations-Expertise erforderlich. Öffnen Sie die Browserversion oder die Excel-Arbeitsmappe, importieren Sie bestehende Daten und beginnen Sie sofort mit der Zuteilung von Rechnungen.

---

## Über

Ich entwickle leichtgewichtige Excel- und browserbasierte Entscheidungsunterstützungs-Tools für betriebliche Probleme mit zu vielen beweglichen Teilen, um sie zuverlässig allein im Kopf zu verwalten.

Statt großer Unternehmenssystemen konzentriere ich mich auf wiederverwendbare Analyse-Frameworks, die eine praktische Frage beantworten:

**"Welche Informationen müssen an einem Ort sichtbar sein, um die nächste Entscheidung sicher zu treffen?"**

Das Dynamic Invoice Allocation & Multi-Entity Cost Distribution Excel Toolkit ist ein Beispiel für diesen Ansatz—einen wiederholten finanziellen Zuteilungsprozess in einen wiederholbaren Analyse-Workflow zu verwandeln statt in eine weitere Sammlung kopierter Tabellenkalkulationen.

---

## Technische Details

<details>
<summary><strong>Für technische Prüfer, Excel-Praktiker und Mitarbeiter</strong></summary>

---

## Arbeitsmappenarchitektur

Die Arbeitsmappe folgt einer strengen Trennung zwischen Eingaben, Berechnungslogik, Validierung und Berichterstattung.

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

| Ebene | Arbeitsblatt | Hauptverantwortung |
|--------|-----------|------------------------|
| Anleitung | Instructions | Betriebsverfahren und Fehlerbehebung |
| Konfiguration | Settings | Mehrwertsteuer, Währung, Zuteilungsmethodik |
| Stammdaten | Asset Import | Einzige Wahrheitsquelle für Anlagenmetadaten |
| Transaktionseingabe | Invoice Input | Erfassung von Lieferantenrechnungen |
| Berechnung | Allocation Engine | Dynamische Rechnungsverteilungs-Engine |
| Detaillierte Ausgabe | Allocation Detail | Prüffähige Zuteilungsdatensätze |
| Entscheidungsunterstützung | Allocation Summary | Fonds- und Geografie-Berichterstattung |

### Datenfluss

```
Settings
        \
Asset Import ---> Allocation Engine ---> Allocation Detail
        /                           \
Invoice Input -----------------------> Allocation Summary
```

Validierung erfolgt vor der Berichterstattung.

Rechnungen können nur erfolgreich zugeteilt werden, wenn die Abrechnungseinheit in der Anlagen-Stammtabelle existiert.

---

## Drei Fallen, die selbst erfahrene Finanzteams fangen

### Falle 1 — Einheitenspezifische Zuteilungsarbeitsblätter kopieren

**Entscheidung**

Eine neue Betriebsgesellschaft wird hinzugefügt.

Eine Kopie eines bestehenden Zuteilungsarbeitsblatts wird erstellt.

| Traditioneller Ansatz | Zuteilungs-Framework |
|----------------------|----------------------|
| Dupliziertes Arbeitsblatt | Eine Zuteilungs-Engine wiederverwenden |
| Duplizierte Formeln | Dynamische Arrays erweitern sich automatisch |
| Mehrere Logikkopien warten | Ein Berechnungsmodell warten |

Die kopierte Arbeitsmappe produziert zunächst die richtigen Zahlen.

Einige Monate später ändern sich die Zuteilungsregeln.

Nur einige Arbeitsblätter erhalten die aktualisierten Formeln.

Die Organisation betreibt jetzt mehrere Versionen derselben Zuteilungsmethodik.

### Warum die Begründung scheitert

Das analytische Modell ist in duplizierten Arbeitsblättern eingebettet statt in zentralisierten Geschäftsregeln.

### Korrekter Ansatz

Eine Zuteilungs-Engine warten.

Nur Anlagen-Stammdaten und Zuteilungsparameter ändern sich.

Berechnungslogik muss nie dupliziert werden.

<details>
<summary>Formelprinzipien</summary>

- LET()
- FILTER()
- REDUCE()
- LAMBDA()
- Dynamic Spill Arrays

Eine Formel erzeugt die vollständige Zuteilungstabelle.

</details>

---

### Falle 2 — Annehmen, dass gleiche Zuteilung immer fair ist

**Entscheidung**

Jede Anlage erhält einen gleichen Prozentsatz der Betriebskosten.

| Gleiche Aufteilung | Kapazitätsbasierte Zuteilung |
|--------------|--------------------------|
| 25% | Kapazitätsanteil |
| Ignoriert die Anlagengröße | Spiegelt die betriebliche Exposure wider |

Beispiel:

Vier Anlagen erhalten identische Wartungsgebühren.

Eine Anlage repräsentiert 60 MW.

Drei Anlagen repräsentieren nur je 10 MW.

Gleiche Zuteilung untertreibt die größte Betriebsanlage und übertreibt kleinere Anlagen.

### Korrekter Ansatz

Die Zuteilungsmethodik sollte die Betriebsökonomie widerspiegeln.

Die Arbeitsmappe unterstützt:

- Anlagenanzahl
- Kapazität
- Eigentumskapazität

ohne Änderung der nachgelagerten Berichte.

<details>
<summary>Formelprinzipien</summary>

Zuteilungsverhältnisse werden dynamisch über eine SWITCH-Anweisung ausgewählt, die auf das Settings-Blatt verweist.

</details>

---

### Falle 3 — Glauben, dass importierte Daten immer vollständig sind

**Entscheidung**

Rechnungen werden sofort nach dem Import zugeteilt.

Die Abrechnungseinheit enthält eine Schreibweise-Inkonsistenz.

Statt den Prozess zu stoppen, erzeugen viele Tabellenkalkulationen einfach leere Lookups.

Managementberichte erscheinen vollständig, während ein Teil der Rechnung nicht zugeteilt bleibt.

### Warum die Begründung scheitert

Fehlende Stammdatenbeziehungen werden zu versteckten Buchhaltungsfehlern.

### Korrekter Ansatz

Unbekannte Abrechnungseinheiten werden sofort als **Unmapped Target** markiert, bevor gebucht wird.

Die Zuteilung wird nur fortgesetzt, nachdem die Stammdaten korrigiert wurden.

<details>
<summary>Formelprinzipien</summary>

FILTER() validiert die Einheitenmitgliedschaft.

Wenn keine passenden Anlagen existieren, erzeugt die Engine einen expliziten Warndatensatz statt stiller Berechnungsfehler.

</details>

---

## Beispielszenario

Ein Manager für Renewable-Energy-Investitionen erhält eine Lieferantenrechnung für jährliche Wartung über insgesamt **£240,000** vor Mehrwertsteuer.

Die Rechnung wird der Betriebsgesellschaft zugewiesen, die für vier Solaranlagen verantwortlich ist.

Die in **Settings** gewählte Zuteilungsmethodik ist **Eigentumskapazität**.

Die Anlagen-Stammtabelle enthält die folgenden Eigentumskapazitäten:

| Anlage | Eigentumskapazität (MW) |
|-------|-------------------------:|
| Anlage A | 60 |
| Anlage B | 30 |
| Anlage C | 20 |
| Anlage D | 10 |

Die Gesamteigentumskapazität beträgt **120 MW**.

Die Zuteilungs-Engine berechnet automatisch proportionale Zuteilungsverhältnisse von **50%**, **25%**, **16.67%** und **8.33%**.

Statt £60,000 gleichmäßig auf jede Anlage zu verteilen, verteilt die Arbeitsmappe die Kosten nach tatsächlicher wirtschaftlicher Eigentümerschaft:

| Anlage | Zugewiesenes Netto |
|-------|--------------:|
| Anlage A | £120,000 |
| Anlage B | £60,000 |
| Anlage C | £40,000 |
| Anlage D | £20,000 |

Die Mehrwertsteuer wird automatisch mit entweder dem rechnungsspezifischen Override oder der globalen Mehrwertsteuereinstellung berechnet.

Die resultierende Zuteilungstabelle aktualisiert sofort Fonds- und Geografie-Übersichten unter Wahrung vollständiger Rückverfolgbarkeit bis zur Original-Lieferantenrechnung.

Dieser Ansatz verbessert die Kostenattribution, reduziert manuelle Abstimmung und erzeugt Zuteilungsdatensätze, die für Buchhaltungsprüfung und ERP-Import geeignet sind.

## Formelreferenz

<details>
<summary><strong>Einstellungen & Konfiguration</strong></summary>

### Standard-Mehrwertsteuersatz

**Zweck**

Liefert den Standard-Mehrwertsteuersatz, wenn eine Rechnung keinen rechnungsspezifischen Override angibt.

**Verwendet von**

- Invoice Input
- Allocation Engine

**Logik**

```excel
IF(VAT Override="", Default VAT Rate, VAT Override)
```

---

### Standard-Zuteilungsbasis

**Zweck**

Definiert die Zuteilungsmethodik, die über die gesamte Arbeitsmappe angewendet wird.

Unterstützte Optionen:

- Anlagenanzahl
- Kapazität
- Eigentumskapazität

Die Zuteilungs-Engine verweist dynamisch auf diesen Parameter, wodurch die Zuteilungsmethodik ohne Änderung von Formeln geändert werden kann.

</details>

---

<details>
<summary><strong>Anlagenimport</strong></summary>

### Eigentumskapazität

**Zweck**

Berechnet die effektive Eigentumskapazität für proportionale Zuteilung.

**Formel**

```excel
=IF(A2:A100000="","",G2:G100000*H2:H100000)
```

Wobei:

- G = Eigentum %
- H = Kapazität (MW)

Die Berechnung erweitert sich automatisch, wenn weitere Anlagen importiert werden.

</details>

---

<details>
<summary><strong>Rechnungseingabe</strong></summary>

### Steuerpflichtiges Netto

```excel
=IF(A2:A100000="","",E2:E100000*F2:F100000)
```

Berechnet den Rechnungswert vor Mehrwertsteuer.

---

### Mehrwertsteuerbetrag

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

Verwendet den rechnungsspezifischen Mehrwertsteuersatz, wann immer verfügbar.

Andernfalls wird der globale Mehrwertsteuerparameter angewendet.

---

### Bruttobetrag

```excel
=IF(A2:A100000="","",I2:I100000+J2:J100000)
```

Erzeugt den buchhaltungsfertigen Bruttorechnungsbetrag.

</details>

---

<details>
<summary><strong>Zuteilungs-Engine</strong></summary>

Die Zuteilungs-Engine ist absichtlich als einzelne Dynamic-Array-Formel implementiert.

Wichtige Excel-Funktionen umfassen:

| Funktion | Zweck |
|----------|----------|
| LET | Variablendefinition und verbesserte Lesbarkeit |
| FILTER | Anlagen der gewählten Abrechnungseinheit zuordnen |
| REDUCE | Jede importierte Rechnung durchlaufen |
| LAMBDA | Wiederverwendbare zeilenweise Zuteilungslogik |
| SWITCH | Zuteilungsmethodik dynamisch auswählen |
| MAKEARRAY | Zuteilungszeilen automatisch erzeugen |
| HSTACK | Ausgabespalten zusammenfügen |
| VSTACK | Rechnungs-Zuteilungsblöcke anhängen |

Zuteilungsverhältnisse werden nach der konfigurierten Methodik erzeugt:

### Anlagenanzahl

```text
Allocation Ratio = 1 ÷ Number of Matching Assets
```

---

### Kapazität

```text
Allocation Ratio

=

Asset Capacity

/

Total Capacity
```

---

### Eigentumskapazität

```text
Allocation Ratio

=

Ownership Capacity

/

Total Ownership Capacity
```

Die resultierenden Zuteilungsverhältnisse werden multipliziert mit:

- Nettobetrag
- Mehrwertsteuer
- Bruttobetrag

um vollständig abgestimmte Zuteilungsdatensätze zu erzeugen.

</details>

---

<details>
<summary><strong>Übersichtsblätter</strong></summary>

### Dynamische Fondsliste

Verwendet:

```excel
UNIQUE()
SORT()
FILTER()
```

um die vollständige Fondsdimension automatisch zu erzeugen.

---

### Dynamische Geografieliste

Verwendet dasselbe Muster, um alle Berichtsregionen automatisch zu erzeugen.

---

### Übersichtsgesamtsummen

Erzeugt durch:

```excel
SUMIFS()
```

für

- Netto
- Mehrwertsteuer
- Brutto

ohne Pivot-Tabellen.

</details>

---

## Validierungsregeln

| Feld | Validierungsregel | Fehlerverhalten |
|--------|-----------------|----------------|
| Invoice Number | Darf für aktive Datensätze nicht leer sein | Zeile ignoriert |
| Invoice Date | Muss ein gültiges Excel-Datum sein | Benutzerkorrektur erforderlich |
| Quantity | Muss numerisch und ≥ 0 sein | Berechnung verhindert |
| Unit Price | Muss numerisch sein | Berechnung verhindert |
| Allocation Target | Muss einer existierenden Company to Invoice entsprechen | Warndatensatz erzeugt |
| VAT Override | Leer oder gültiger Prozentsatz | Fällt auf Standard-Mehrwertsteuer zurück |
| Company to Invoice | Muss in Asset Import existieren | Zuteilung blockiert |
| Ownership % | Zwischen 0% und 100% | Ungültige Werte ausgeschlossen |
| Capacity | Muss positiv sein | Kapazitätszuteilung nicht verfügbar |
| Ownership Capacity | Nur formelerzeugt | Geschützte Spalte |
| Default VAT Rate | Zwischen 0% und 100% | Konfigurationswarnung |
| Allocation Basis | Asset Count / Capacity / Ownership Capacity | Standard ist Anlagenanzahl |

### Automatische Schutzbedingungen

- Leere Rechnungszeilen werden ignoriert.
- Leere Anlagenzeilen werden ignoriert.
- Unbekannte Abrechnungseinheiten erzeugen einen **⚠ Unmapped Target**-Datensatz.
- Dynamische Arrays erweitern sich automatisch ohne kopierte Formeln.
- Übersichtsberichte aktualisieren sich automatisch nach Neuberechnung.
- Alle zugeteilten Net-, Mehrwertsteuer- und Bruttogesamtsummen stimmen auf ihre Ursprungsrechnung zurück.

</details>

---

## Weitere Tools dieser Reihe

Diese Arbeitsmappen folgen derselben Designphilosophie: leichtgewichtige Analyse-Frameworks, die wiederkehrende betriebliche Entscheidungen vereinfachen, ohne Unternehmenssysteme zu ersetzen.

- **Demand-Adaptive Inventory Planning & Purchasing Decision Toolkit** — Bestandsplanung, Nachbestellungszeitpunkt und Einkaufssimulation.
- **Restaurant Menu Master Workbook** — Zentrale Menükonfiguration, Modifier-Verwaltung und Preisgovernance.
- **Retail & Maquila Inventory Ledger** — Bestand vom Großeinkauf über Auftragsfertigung bis zum Fertig-SKU-Verkauf verfolgen.
- **Construction Estimate & Cost Tracking Toolkit** — Mengenermittlung, Kostenschätzung und Projektbudgetüberwachung.
- Weitere Tools sind über das GitHub-Repository und unsere [Website](https://www.theseusworkshop.com/) verfügbar.

---

## Lizenz

Dieses Projekt ist unter der **Apache License 2.0** lizenziert.

Sie dürfen diese Arbeitsmappe gemäß den Bedingungen der Apache License 2.0 verwenden, modifizieren und verteilen.

Siehe die Datei `LICENSE` für den vollständigen Lizenztext.
