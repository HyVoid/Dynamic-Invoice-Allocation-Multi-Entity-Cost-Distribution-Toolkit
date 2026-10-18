[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Allocation dynamique de factures & distribution des coûts multi-entités — boîte à outils Excel

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-success)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange)

**Répartissez automatiquement les factures fournisseurs entre actifs, fonds, entreprises et zones géographiques à l'aide de règles d'allocation configurables—disponible en version navigateur gratuite et en classeur Excel, sans installation.**

**Aucune inscription. Aucune installation. Gratuit dans votre navigateur.**

Essayez gratuitement la version navigateur. Si vous avez besoin de la version Excel, vous pouvez l'acheter avec une garantie de remboursement de 30 jours sans questions.
>
> 🌐 **Ouvrir dans le navigateur (gratuit)** → [ici](https://hyvoid.github.io/Dynamic-Invoice-Allocation-Multi-Entity-Cost-Distribution-Toolkit/)
>
> 📥 **Télécharger Excel** → [lien d'achat](https://www.theseusworkshop.com/l/vooco?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=invoice-allocation-calculator)
> 

---

## Ce qu'il vous aide à suivre

- Les factures fournisseurs allouées de manière cohérente entre plusieurs entités juridiques et actifs d'exploitation.
- La distribution des coûts par Fonds, Géographie, SPV et société de facturation sans reconstruire les rapports.
- Les résultats d'allocation selon différentes méthodologies telles que Nombre d'actifs, Capacité ou Capacité de propriété.
- Les cibles d'allocation manquantes ou non mappées avant l'exportation des écritures comptables.
- Des pistes d'audit d'allocation complètes, de la facture d'origine jusqu'à chaque transaction allouée.
- Des résumés d'allocation prêts pour la finance qui restent synchronisés avec les données source importées.

---

## Flux de travail de démarrage rapide

### 1. Configurer les règles d'allocation une seule fois

Ouvrez la feuille **Settings** et définissez les quelques paramètres qui contrôlent le classeur.

Exemples typiques :

- Taux de TVA par défaut
- Symbole monétaire
- Base d'allocation
    - Nombre d'actifs
    - Capacité
    - Capacité de propriété

Ces paramètres deviennent la source de vérité unique utilisée dans chaque calcul.

---

### 2. Importer les données opérationnelles existantes

Collez la dernière liste maîtresse des actifs dans **Asset Import**.

Collez les factures fournisseurs dans **Invoice Input**.

Aucune restructuration n'est requise.

Les données peuvent provenir directement de :

- exports de logiciels comptables
- rapports ERP
- fichiers CSV
- tableurs copiés

Le classeur s'étend automatiquement à mesure que des lignes sont ajoutées.

---

### 3. Examiner les résultats d'allocation instantanément

Passez à **Allocation Detail** ou **Allocation Summary**.

Chaque facture est automatiquement distribuée selon la méthodologie d'allocation sélectionnée.

Aucune formule n'a besoin d'être copiée.

Aucun tableau croisé dynamique n'a besoin d'être actualisé.

Aucune feuille d'allocation manuelle n'a besoin d'être maintenue.

---

### 4. Actualiser à l'arrivée de nouvelles factures

Remplacez les données d'actifs importées chaque fois que les structures de portefeuille changent.

Ajoutez les nouvelles factures au fur et à mesure.

Le classeur recalcule automatiquement chaque allocation et résumé de gestion sans reconstruire les rapports.

**Définissez quelques paramètres clés. Déposez vos données existantes. Obtenez l'analyse. Actualisez quand vous voulez.**

---

## Pourquoi j'ai conçu ceci

Beaucoup d'équipes finance disposent déjà de classeurs d'allocation de factures.

Le problème est rarement le calcul lui-même.

Le vrai problème : chaque nouvelle société de facturation, véhicule d'investissement ou entité d'exploitation introduit généralement une autre feuille de calcul, un autre bloc de formules copié et une autre occasion d'erreurs d'allocation.

Avec le temps, ces classeurs deviennent des collections de calculateurs presque identiques, difficiles à auditer et presque impossibles à maintenir de manière cohérente.

J'ai conçu cette boîte à outils pour remplacer les feuilles de calcul dupliquées par un cadre d'allocation réutilisable.

Au lieu de maintenir des calculateurs séparés pour chaque entité, les factures traversent un unique moteur d'allocation piloté par les données maîtresses des actifs et des règles d'allocation configurables.

Par exemple :

**Avant**

Une facture de maintenance pour une société de portefeuille arrive.

Le personnel financier décide manuellement quel calculateur ouvrir, copie les formules, ajuste les plages, vérifie les pourcentages, actualise les résumés et vérifie si chaque montant alloué correspond encore à la facture d'origine.

Chaque entité supplémentaire augmente à la fois la charge de travail et le risque d'audit.

**Après**

La facture est collée une seule fois.

La cible d'allocation identifie le groupe d'actifs concerné.

Le moteur distribue automatiquement la facture selon la base d'allocation sélectionnée, valide les mappages manquants, génère des écritures comptables détaillées et met immédiatement à jour les résumés Fonds et Géographie.

Le classeur devient un processus analytique réutilisable plutôt qu'un autre tableur personnalisé.
## Problèmes courants d'allocation de factures résolus par cet outil

| Problème | Sans cet outil | Avec cet outil |
|----------|-------------------|----------------|
| Classeurs d'allocation spécifiques à chaque entité | Chaque entité juridique exige son propre calculateur, créant une logique dupliquée et une maintenance incohérente. | Un unique moteur d'allocation achemine automatiquement les factures vers les bons actifs via l'entité de facturation sélectionnée. |
| Les règles d'allocation évoluent dans le temps | Les mises à jour de formules doivent être répétées sur de nombreuses feuilles, augmentant le risque de calculs incohérents. | La méthodologie d'allocation est contrôlée depuis une seule feuille Settings et appliquée de manière cohérente à chaque facture. |
| Les portefeuilles d'actifs changent fréquemment | Les nouveaux actifs exigent une extension manuelle des formules et des mises à jour de résumés. Les références manquantes passent souvent inaperçues. | Les nouveaux actifs sont ajoutés à la table maîtresse des actifs, et les plages d'allocation s'étendent automatiquement. |
| Le rapprochement des allocations est difficile | Les équipes finance comparent manuellement les totaux de factures aux montants distribués sur plusieurs feuilles. | Chaque ligne allouée reste traçable jusqu'à la facture d'origine tandis que les valeurs Net, TVA et Brut restent pleinement rapprochées. |
| Les rapports de gestion exigent des tableaux croisés dynamiques manuels | Les résumés Fonds et géographiques doivent être reconstruits ou actualisés après chaque cycle de reporting. | Les vues de résumé se mettent à jour automatiquement à mesure que de nouvelles factures et actifs sont importés. |
| Les cibles d'allocation incorrectes passent inaperçues | Les entités de facturation mal orthographiées ou inconnues produisent souvent des allocations incomplètes sans avertissements évidents. | Les cibles d'allocation non mappées sont immédiatement signalées afin que les erreurs soient corrigées avant la comptabilisation. |

---

## À qui cela s'adresse

Ce classeur est conçu pour les organisations qui répartissent des coûts d'exploitation partagés entre plusieurs actifs, entités juridiques, véhicules d'investissement ou régions géographiques, tout en exigeant une piste d'audit transparente.

Les utilisateurs typiques incluent :

- Les équipes de finance d'entreprise gérant des dépenses d'exploitation partagées.
- Les gestionnaires d'investissements en infrastructures et énergies renouvelables.
- Les administrateurs de fonds immobiliers, d'infrastructures et de capital-investissement.
- Les family offices gérant des structures d'exploitation multi-entités.
- Les équipes comptables préparant les journaux d'allocation avant l'import ERP.
- Les analystes financiers responsables de l'allocation récurrente des coûts et du reporting de gestion.

Ce classeur n'est **pas** destiné à remplacer les systèmes ERP ou les plateformes comptables d'entreprise. Il standardise plutôt l'un des processus analytiques les plus sujets aux erreurs avant que les données n'entrent dans ces systèmes.

Aucune expertise en tableur n'est requise. Ouvrez la version navigateur ou le classeur Excel, importez vos données existantes et commencez immédiatement à allouer des factures.

---

## À propos

Je conçois des outils légers d'aide à la décision, en Excel et dans le navigateur, pour des problèmes opérationnels comportant trop de pièces mobiles pour être gérés de façon fiable par la seule mémoire.

Plutôt que de créer de grands systèmes d'entreprise, je me concentre sur des cadres analytiques réutilisables qui répondent à une question pratique :

**"Quelles informations doivent être visibles en un seul endroit pour prendre la prochaine décision avec confiance ?"**

La Dynamic Invoice Allocation & Multi-Entity Cost Distribution Excel Toolkit est un exemple de cette approche—transformer un processus d'allocation financière répétitif en un flux de travail analytique reproductible plutôt qu'en une autre collection de tableurs copiés.

---

## Détails techniques

<details>
<summary><strong>Pour les réviseurs techniques, les praticiens Excel et les collaborateurs</strong></summary>

---

## Architecture du classeur

Le classeur respecte une séparation stricte entre entrées, logique de calcul, validation et reporting.

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

| Couche | Feuille de calcul | Responsabilité principale |
|--------|-----------|------------------------|
| Guidance | Instructions | Procédures d'exploitation et dépannage |
| Configuration | Settings | TVA, devise, méthodologie d'allocation |
| Données maîtresses | Asset Import | Source de vérité unique pour les métadonnées d'actifs |
| Entrée de transactions | Invoice Input | Saisie des factures fournisseurs |
| Calcul | Allocation Engine | Moteur dynamique de distribution de factures |
| Sortie détaillée | Allocation Detail | Enregistrements d'allocation auditables |
| Aide à la décision | Allocation Summary | Reporting Fonds et Géographie |

### Flux de données

```
Settings
        \
Asset Import ---> Allocation Engine ---> Allocation Detail
        /                           \
Invoice Input -----------------------> Allocation Summary
```

La validation intervient avant le reporting.

Les factures ne peuvent être allouées avec succès que si l'entité de facturation existe dans la table maîtresse des actifs.

---

## Trois pièges qui piègent même les équipes finance expérimentées

### Piège 1 — Copier des feuilles d'allocation spécifiques à une entité

**Décision**

Une nouvelle société d'exploitation est ajoutée.

Une copie d'une feuille d'allocation existante est créée.

| Approche traditionnelle | Cadre d'allocation |
|----------------------|----------------------|
| Feuille dupliquée | Réutiliser un unique moteur d'allocation |
| Formules dupliquées | Les tableaux dynamiques s'étendent automatiquement |
| Maintenir plusieurs copies de logique | Maintenir un unique modèle de calcul |

Le classeur copié produit initialement les bons chiffres.

Plusieurs mois plus tard, les règles d'allocation changent.

Seules certaines feuilles reçoivent les formules mises à jour.

L'organisation fait désormais fonctionner plusieurs versions de la même méthodologie d'allocation.

### Pourquoi le raisonnement échoue

Le modèle analytique est intégré dans des feuilles dupliquées au lieu de règles métier centralisées.

### Approche correcte

Maintenir un unique moteur d'allocation.

Seules les données maîtresses des actifs et les paramètres d'allocation changent.

La logique de calcul n'a jamais besoin d'être dupliquée.

<details>
<summary>Principes de formule</summary>

- LET()
- FILTER()
- REDUCE()
- LAMBDA()
- Dynamic Spill Arrays

Une seule formule génère le tableau d'allocation complet.

</details>

---

### Piège 2 — Supposer qu'une allocation égale est toujours équitable

**Décision**

Chaque actif reçoit un pourcentage égal des coûts d'exploitation.

| Répartition égale | Allocation par capacité |
|--------------|--------------------------|
| 25% | Part de capacité |
| Ignore la taille de l'actif | Reflète l'exposition opérationnelle |

Exemple :

Quatre actifs reçoivent des frais de maintenance identiques.

Un actif représente 60 MW.

Trois actifs ne représentent que 10 MW chacun.

L'allocation égale sous-estime le plus grand actif d'exploitation tout en surestimant les actifs plus petits.

### Approche correcte

La méthodologie d'allocation devrait refléter l'économie opérationnelle.

Le classeur prend en charge :

- Nombre d'actifs
- Capacité
- Capacité de propriété

sans modifier les rapports en aval.

<details>
<summary>Principes de formule</summary>

Les ratios d'allocation sont sélectionnés dynamiquement via une instruction SWITCH référençant la feuille Settings.

</details>

---

### Piège 3 — Croire que les données importées sont toujours complètes

**Décision**

Les factures sont allouées immédiatement après l'import.

L'entité de facturation comporte une incohérence d'orthographe.

Au lieu d'arrêter le processus, de nombreux tableurs produisent simplement des recherches vides.

Les rapports de gestion semblent complets alors qu'une partie de la facture reste non allouée.

### Pourquoi le raisonnement échoue

Les relations de données maîtresses manquantes deviennent des erreurs comptables cachées.

### Approche correcte

Les entités de facturation inconnues sont immédiatement signalées comme **Unmapped Target** avant la comptabilisation.

L'allocation ne se poursuit qu'après correction des données maîtresses.

<details>
<summary>Principes de formule</summary>

FILTER() valide l'appartenance de l'entité.

Si aucun actif correspondant n'existe, le moteur génère un enregistrement d'avertissement explicite au lieu d'échecs de calcul silencieux.

</details>

---

## Scénario d'exemple

Un gestionnaire d'investissements en énergies renouvelables reçoit une facture fournisseur pour la maintenance annuelle d'un montant total de **£240,000** hors TVA.

La facture est attribuée à la société d'exploitation responsable de quatre actifs solaires.

La méthodologie d'allocation sélectionnée dans **Settings** est **Capacité de propriété**.

La table maîtresse des actifs contient les capacités de propriété suivantes :

| Actif | Capacité de propriété (MW) |
|-------|-------------------------:|
| Actif A | 60 |
| Actif B | 30 |
| Actif C | 20 |
| Actif D | 10 |

La capacité de propriété totale équivaut à **120 MW**.

Le moteur d'allocation calcule automatiquement des ratios d'allocation proportionnels de **50%**, **25%**, **16.67%** et **8.33%**.

Au lieu d'allouer £60,000 également à chaque actif, le classeur distribue les coûts selon la propriété économique réelle :

| Actif | Net alloué |
|-------|--------------:|
| Actif A | £120,000 |
| Actif B | £60,000 |
| Actif C | £40,000 |
| Actif D | £20,000 |

La TVA est calculée automatiquement à l'aide soit de la dérogation spécifique à la facture, soit du paramètre TVA global.

Le tableau d'allocation résultant met immédiatement à jour les résumés Fonds et Géographie tout en préservant une traçabilité complète jusqu'à la facture fournisseur d'origine.

Cette approche améliore l'attribution des coûts, réduit le rapprochement manuel et produit des enregistrements d'allocation adaptés à la revue comptable et à l'import ERP.

## Référence des formules

<details>
<summary><strong>Paramètres & configuration</strong></summary>

### Taux de TVA par défaut

**Objet**

Fournit le taux de TVA par défaut chaque fois qu'une facture ne spécifie pas de dérogation spécifique.

**Référencé par**

- Invoice Input
- Allocation Engine

**Logique**

```excel
IF(VAT Override="", Default VAT Rate, VAT Override)
```

---

### Base d'allocation par défaut

**Objet**

Définit la méthodologie d'allocation appliquée à l'ensemble du classeur.

Options prises en charge :

- Nombre d'actifs
- Capacité
- Capacité de propriété

Le moteur d'allocation référence ce paramètre dynamiquement, permettant de changer de méthodologie d'allocation sans modifier aucune formule.

</details>

---

<details>
<summary><strong>Import d'actifs</strong></summary>

### Capacité de propriété

**Objet**

Calcule la capacité de propriété effective utilisée par l'allocation proportionnelle.

**Formule**

```excel
=IF(A2:A100000="","",G2:G100000*H2:H100000)
```

Où :

- G = % de propriété
- H = Capacité (MW)

Le calcul s'étend automatiquement à mesure que des actifs supplémentaires sont importés.

</details>

---

<details>
<summary><strong>Entrée de factures</strong></summary>

### Net imposable

```excel
=IF(A2:A100000="","",E2:E100000*F2:F100000)
```

Calcule la valeur de la facture hors TVA.

---

### Montant de TVA

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

Utilise le taux de TVA spécifique à la facture chaque fois qu'il est disponible.

Sinon, le paramètre TVA global est appliqué.

---

### Montant brut

```excel
=IF(A2:A100000="","",I2:I100000+J2:J100000)
```

Produit le montant brut de la facture, prêt pour la comptabilité.

</details>

---

<details>
<summary><strong>Moteur d'allocation</strong></summary>

Le moteur d'allocation est volontairement implémenté comme une unique formule à tableau dynamique.

Les principales fonctions Excel incluent :

| Fonction | Objet |
|----------|----------|
| LET | Définition de variables et lisibilité améliorée |
| FILTER | Faire correspondre les actifs appartenant à l'entité de facturation sélectionnée |
| REDUCE | Parcourir chaque facture importée |
| LAMBDA | Logique d'allocation réutilisable au niveau de la ligne |
| SWITCH | Sélectionner dynamiquement la méthodologie d'allocation |
| MAKEARRAY | Générer automatiquement les lignes d'allocation |
| HSTACK | Assembler les colonnes de sortie |
| VSTACK | Ajouter les blocs d'allocation de factures |

Les ratios d'allocation sont générés selon la méthodologie configurée :

### Nombre d'actifs

```text
Allocation Ratio = 1 ÷ Number of Matching Assets
```

---

### Capacité

```text
Allocation Ratio

=

Asset Capacity

/

Total Capacity
```

---

### Capacité de propriété

```text
Allocation Ratio

=

Ownership Capacity

/

Total Ownership Capacity
```

Les ratios d'allocation résultants sont multipliés par :

- Montant net
- TVA
- Montant brut

pour générer des enregistrements d'allocation pleinement rapprochés.

</details>

---

<details>
<summary><strong>Feuilles de résumé</strong></summary>

### Liste de fonds dynamique

Utilise :

```excel
UNIQUE()
SORT()
FILTER()
```

pour générer automatiquement la dimension Fonds complète.

---

### Liste géographique dynamique

Utilise le même motif pour générer automatiquement toutes les régions de reporting.

---

### Totaux de résumé

Générés via :

```excel
SUMIFS()
```

pour

- Net
- TVA
- Brut

sans tableaux croisés dynamiques.

</details>

---

## Règles de validation

| Champ | Règle de validation | Comportement en cas d'erreur |
|--------|-----------------|----------------|
| Invoice Number | Ne peut pas être vide pour les enregistrements actifs | Ligne ignorée |
| Invoice Date | Doit être une date Excel valide | Correction par l'utilisateur requise |
| Quantity | Doit être numérique et ≥ 0 | Calcul empêché |
| Unit Price | Doit être numérique | Calcul empêché |
| Allocation Target | Doit correspondre à une Company to Invoice existante | Enregistrement d'avertissement généré |
| VAT Override | Vide ou pourcentage valide | Retombe sur la TVA par défaut |
| Company to Invoice | Doit exister dans Asset Import | Allocation bloquée |
| Ownership % | Entre 0 % et 100 % | Valeurs invalides exclues |
| Capacity | Doit être positive | Allocation par capacité indisponible |
| Ownership Capacity | Généré par formule uniquement | Colonne protégée |
| Default VAT Rate | Entre 0 % et 100 % | Avertissement de configuration |
| Allocation Basis | Asset Count / Capacity / Ownership Capacity | Nombre d'actifs par défaut |

### Conditions de garde automatiques

- Les lignes de facture vides sont ignorées.
- Les lignes d'actifs vides sont ignorées.
- Les entités de facturation inconnues génèrent un enregistrement **⚠ Unmapped Target**.
- Les tableaux dynamiques s'étendent automatiquement sans formules copiées.
- Les rapports de résumé s'actualisent automatiquement après recalcul.
- Tous les totaux Net, TVA et Brut alloués se rapprochent de leur facture d'origine.

</details>

---

## Autres outils de cette série

Ces classeurs suivent la même philosophie de conception : des cadres analytiques légers qui simplifient les décisions opérationnelles récurrentes sans remplacer les systèmes d'entreprise.

- **Demand-Adaptive Inventory Planning & Purchasing Decision Toolkit** — planification des stocks, moment de réapprovisionnement et simulation d'achat.
- **Restaurant Menu Master Workbook** — configuration centralisée des menus, gestion des modificateurs et gouvernance des prix.
- **Retail & Maquila Inventory Ledger** — suivre les stocks de l'achat en gros à la fabrication sous contrat jusqu'aux ventes de SKU finis.
- **Construction Estimate & Cost Tracking Toolkit** — métrés, estimation des coûts et suivi budgétaire de projet.
- D'autres outils sont disponibles via le dépôt GitHub et notre [Site web](https://www.theseusworkshop.com/).

---

## Licence

Ce projet est sous licence **Apache License 2.0**.

Vous êtes libre d'utiliser, de modifier et de distribuer ce classeur conformément aux termes de la licence Apache 2.0.

Voir le fichier `LICENSE` pour le texte complet de la licence.
