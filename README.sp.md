[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Asignación dinámica de facturas & distribución de costos multi-entidad — kit de herramientas Excel

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-success)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange)

**Asigne facturas de proveedores automáticamente entre activos, fondos, empresas y geografías usando reglas de asignación configurables—disponible como versión gratuita en navegador y como libro de Excel, sin necesidad de instalación.**

**Sin registro. Sin instalación. Gratis en su navegador.**

Pruebe la versión de navegador gratis. Si necesita la versión de Excel, puede comprarla con una garantía de devolución de 30 días sin preguntas.
>
> 🌐 **Abrir en el navegador (gratis)** → [aquí](https://hyvoid.github.io/Dynamic-Invoice-Allocation-Multi-Entity-Cost-Distribution-Toolkit/)
>
> 📥 **Descargar Excel** → [enlace de compra](https://www.theseusworkshop.com/l/vooco?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=invoice-allocation-calculator)
> 

---

## Lo que le ayuda a rastrear

- Facturas de proveedores asignadas de forma consistente entre múltiples entidades legales y activos operativos.
- Distribución de costos por Fondo, Geografía, SPV y empresa de facturación sin reconstruir informes.
- Resultados de asignación bajo diferentes metodologías como Recuento de activos, Capacidad o Capacidad de propiedad.
- Destinos de asignación faltantes o no mapeados antes de exportar asientos contables.
- Pistas de auditoría de asignación completas, desde la factura original hasta cada transacción asignada.
- Resúmenes de asignación listos para finanzas que permanecen sincronizados con los datos fuente importados.

---

## Flujo de trabajo de inicio rápido

### 1. Configure las reglas de asignación una sola vez

Abra la hoja **Settings** y defina los pocos parámetros que controlan el libro.

Ejemplos típicos:

- Tasa de IVA predeterminada
- Símbolo de moneda
- Base de asignación
    - Recuento de activos
    - Capacidad
    - Capacidad de propiedad

Esta configuración se convierte en la fuente de verdad única utilizada en cada cálculo.

---

### 2. Importe los datos operativos existentes

Pegue la lista maestra de activos más reciente en **Asset Import**.

Pegue las facturas de proveedores en **Invoice Input**.

No se requiere ninguna reestructuración.

Los datos pueden provenir directamente de:

- exportaciones de software contable
- informes de ERP
- archivos CSV
- tablas de hojas de cálculo copiadas

El libro se expande automáticamente a medida que se agregan filas.

---

### 3. Revise los resultados de asignación al instante

Cambie a **Allocation Detail** o **Allocation Summary**.

Cada factura se distribuye automáticamente según la metodología de asignación seleccionada.

No es necesario copiar fórmulas.

No es necesario actualizar tablas dinámicas.

No es necesario mantener hojas de asignación manuales.

---

### 4. Actualice cuando lleguen nuevas facturas

Reemplace los datos de activos importados cuando cambien las estructuras de la cartera.

Agregue nuevas facturas a medida que lleguen.

El libro recalcula automáticamente cada asignación y resumen de gestión sin reconstruir informes.

**Defina unos pocos parámetros clave. Ingrese sus datos existentes. Obtenga el análisis. Actualice cuando lo necesite.**

---

## Por qué construí esto

Muchos equipos de finanzas ya tienen libros de asignación de facturas.

El problema rara vez es el cálculo en sí.

El verdadero problema: cada nueva empresa de facturación, vehículo de inversión o entidad operativa suele introducir otra hoja de trabajo, otro bloque de fórmulas copiadas y otra oportunidad para errores de asignación.

Con el tiempo, estos libros se convierten en colecciones de calculadoras casi idénticas, difíciles de auditar y casi imposibles de mantener de forma consistente.

Construí este kit de herramientas para reemplazar las hojas de cálculo duplicadas por un marco de asignación reutilizable.

En lugar de mantener calculadoras separadas para cada entidad, las facturas fluyen por un único motor de asignación impulsado por datos maestros de activos y reglas de asignación configurables.

Por ejemplo:

**Antes**

Llega una factura de mantenimiento para una empresa de cartera.

El personal financiero decide manualmente qué calculadora abrir, copia fórmulas, ajusta rangos, verifica porcentajes, actualiza resúmenes y comprueba si cada monto asignado sigue conciliando con la factura original.

Cada entidad adicional aumenta tanto la carga de trabajo como el riesgo de auditoría.

**Después**

La factura se pega una sola vez.

El destino de asignación identifica el grupo de activos relevante.

El motor distribuye la factura automáticamente según la base de asignación seleccionada, valida los mapeos faltantes, genera registros contables detallados y actualiza inmediatamente los resúmenes de Fondo y Geografía.

El libro se convierte en un proceso analítico reutilizable en lugar de otra hoja de cálculo personalizada.
## Problemas comunes de asignación de facturas que esto resuelve

| Problema | Sin esta herramienta | Con esta herramienta |
|----------|-------------------|----------------|
| Libros de asignación específicos por entidad | Cada entidad legal requiere su propia calculadora, lo que crea lógica duplicada y mantenimiento inconsistente. | Un único motor de asignación enruta las facturas automáticamente a los activos correctos usando la entidad de facturación seleccionada. |
| Las reglas de asignación cambian con el tiempo | Las actualizaciones de fórmulas deben repetirse en muchas hojas de trabajo, aumentando el riesgo de cálculos inconsistentes. | La metodología de asignación se controla desde una sola hoja Settings y se aplica de forma consistente a cada factura. |
| Las carteras de activos cambian con frecuencia | Los activos nuevos requieren expansión manual de fórmulas y actualizaciones de resúmenes. Las referencias faltantes a menudo pasan desapercibidas. | Los activos nuevos se agregan a la tabla maestra de activos, y los rangos de asignación se expanden automáticamente. |
| La conciliación de asignaciones es difícil | Los equipos de finanzas comparan manualmente los totales de facturas con los montos distribuidos en varias hojas de trabajo. | Cada línea asignada sigue siendo rastreable hasta la factura original, mientras que los valores Neto, IVA y Bruto permanecen totalmente conciliados. |
| Los informes de gestión requieren tablas dinámicas manuales | Los resúmenes de Fondo y geográficos deben reconstruirse o actualizarse después de cada ciclo de informes. | Las vistas de resumen se actualizan automáticamente a medida que se importan nuevas facturas y activos. |
| Los destinos de asignación incorrectos pasan desapercibidos | Las entidades de facturación mal escritas o desconocidas a menudo producen asignaciones incompletas sin advertencias obvias. | Los destinos de asignación no mapeados se marcan inmediatamente para que los errores puedan corregirse antes de contabilizar. |

---

## Para quién es esto

Este libro está diseñado para organizaciones que distribuyen costos operativos compartidos entre múltiples activos, entidades legales, vehículos de inversión o regiones geográficas, exigiendo al mismo tiempo una pista de auditoría transparente.

Los usuarios típicos incluyen:

- Equipos de finanzas corporativas que gestionan gastos operativos compartidos.
- Gestores de inversiones en infraestructura y energías renovables.
- Administradores de fondos inmobiliarios, de infraestructura y de capital privado.
- Family offices que gestionan estructuras operativas multi-entidad.
- Equipos contables que preparan diarios de asignación antes de la importación al ERP.
- Analistas financieros responsables de la asignación recurrente de costos y los informes de gestión.

Este libro **no** está destinado a reemplazar sistemas ERP ni plataformas contables empresariales. En cambio, estandariza uno de los procesos analíticos más propensos a errores antes de que los datos entren en esos sistemas.

No se requiere experiencia en hojas de cálculo. Abra la versión de navegador o el libro de Excel, importe sus datos existentes y comience a asignar facturas de inmediato.

---

## Acerca de

Construyo herramientas ligeras de apoyo a la decisión, en Excel y en el navegador, para problemas operativos con demasiadas piezas en movimiento para gestionarlos de forma fiable solo con la memoria.

En lugar de crear grandes sistemas empresariales, me enfoco en marcos analíticos reutilizables que responden una pregunta práctica:

**"¿Qué información debe estar visible en un solo lugar para tomar la próxima decisión con confianza?"**

La Dynamic Invoice Allocation & Multi-Entity Cost Distribution Excel Toolkit es un ejemplo de ese enfoque—convertir un proceso de asignación financiera repetitivo en un flujo de trabajo analítico reproducible en lugar de otra colección de hojas de cálculo copiadas.

---

## Detalles técnicos

<details>
<summary><strong>Para revisores técnicos, practicantes de Excel y colaboradores</strong></summary>

---

## Arquitectura del libro

El libro sigue una separación estricta entre entradas, lógica de cálculo, validación e informes.

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

| Capa | Hoja de cálculo | Responsabilidad principal |
|--------|-----------|------------------------|
| Orientación | Instructions | Procedimientos operativos y resolución de problemas |
| Configuración | Settings | IVA, moneda, metodología de asignación |
| Datos maestros | Asset Import | Fuente de verdad única para metadatos de activos |
| Entrada de transacciones | Invoice Input | Ingreso de facturas de proveedores |
| Cálculo | Allocation Engine | Motor dinámico de distribución de facturas |
| Salida detallada | Allocation Detail | Registros de asignación auditables |
| Apoyo a la decisión | Allocation Summary | Informes de Fondo y Geografía |

### Flujo de datos

```
Settings
        \
Asset Import ---> Allocation Engine ---> Allocation Detail
        /                           \
Invoice Input -----------------------> Allocation Summary
```

La validación ocurre antes de los informes.

Las facturas no pueden asignarse con éxito a menos que la entidad de facturación exista dentro de la tabla maestra de activos.

---

## Tres trampas que atrapan incluso a equipos de finanzas experimentados

### Trampa 1 — Copiar hojas de asignación específicas por entidad

**Decisión**

Se agrega una nueva empresa operativa.

Se crea una copia de una hoja de asignación existente.

| Enfoque tradicional | Marco de asignación |
|----------------------|----------------------|
| Hoja duplicada | Reutilizar un único motor de asignación |
| Fórmulas duplicadas | Las matrices dinámicas se expanden automáticamente |
| Mantener múltiples copias de lógica | Mantener un único modelo de cálculo |

El libro copiado produce inicialmente los números correctos.

Varios meses después, cambian las reglas de asignación.

Solo algunas hojas de trabajo reciben las fórmulas actualizadas.

La organización ahora opera múltiples versiones de la misma metodología de asignación.

### Por qué falla el razonamiento

El modelo analítico está incrustado dentro de hojas duplicadas en lugar de reglas de negocio centralizadas.

### Enfoque correcto

Mantener un único motor de asignación.

Solo cambian los datos maestros de activos y los parámetros de asignación.

La lógica de cálculo nunca necesita duplicarse.

<details>
<summary>Principios de fórmula</summary>

- LET()
- FILTER()
- REDUCE()
- LAMBDA()
- Dynamic Spill Arrays

Una sola fórmula genera la tabla de asignación completa.

</details>

---

### Trampa 2 — Suponer que la asignación igualitaria siempre es justa

**Decisión**

Cada activo recibe un porcentaje igualitario de los costos operativos.

| Reparto igualitario | Asignación por capacidad |
|--------------|--------------------------|
| 25% | Parte de capacidad |
| Ignora la escala del activo | Refleja la exposición operativa |

Ejemplo:

Cuatro activos reciben cargos de mantenimiento idénticos.

Un activo representa 60 MW.

Tres activos representan solo 10 MW cada uno.

La asignación igualitaria subestima el activo operativo más grande mientras sobreestima los activos más pequeños.

### Enfoque correcto

La metodología de asignación debe reflejar la economía operativa.

El libro admite:

- Recuento de activos
- Capacidad
- Capacidad de propiedad

sin cambiar los informes posteriores.

<details>
<summary>Principios de fórmula</summary>

Los ratios de asignación se seleccionan dinámicamente mediante una instrucción SWITCH que hace referencia a la hoja Settings.

</details>

---

### Trampa 3 — Creer que los datos importados siempre están completos

**Decisión**

Las facturas se asignan inmediatamente después de la importación.

La entidad de facturación contiene una inconsistencia ortográfica.

En lugar de detener el proceso, muchas hojas de cálculo simplemente producen búsquedas vacías.

Los informes de gestión parecen completos mientras parte de la factura permanece sin asignar.

### Por qué falla el razonamiento

Las relaciones de datos maestros faltantes se convierten en errores contables ocultos.

### Enfoque correcto

Las entidades de facturación desconocidas se marcan inmediatamente como **Unmapped Target** antes de la contabilización.

La asignación solo continúa después de corregir los datos maestros.

<details>
<summary>Principios de fórmula</summary>

FILTER() valida la pertenencia de la entidad.

Si no existen activos coincidentes, el motor genera un registro de advertencia explícito en lugar de fallos de cálculo silenciosos.

</details>

---

## Escenario de ejemplo

Un gestor de inversiones en energías renovables recibe una factura de proveedor por mantenimiento anual por un total de **£240,000** antes de IVA.

La factura se asigna a la empresa operativa responsable de cuatro activos solares.

La metodología de asignación seleccionada en **Settings** es **Capacidad de propiedad**.

La tabla maestra de activos contiene las siguientes capacidades de propiedad:

| Activo | Capacidad de propiedad (MW) |
|-------|-------------------------:|
| Activo A | 60 |
| Activo B | 30 |
| Activo C | 20 |
| Activo D | 10 |

La capacidad de propiedad total equivale a **120 MW**.

El motor de asignación calcula automáticamente ratios de asignación proporcionales de **50%**, **25%**, **16.67%** y **8.33%**.

En lugar de asignar £60,000 por igual a cada activo, el libro distribuye los costos según la propiedad económica real:

| Activo | Neto asignado |
|-------|--------------:|
| Activo A | £120,000 |
| Activo B | £60,000 |
| Activo C | £40,000 |
| Activo D | £20,000 |

El IVA se calcula automáticamente usando ya sea la excepción específica de la factura o el parámetro de IVA global.

La tabla de asignación resultante actualiza inmediatamente los resúmenes de Fondo y Geografía preservando la trazabilidad completa hasta la factura original del proveedor.

Este enfoque mejora la atribución de costos, reduce la conciliación manual y produce registros de asignación adecuados para la revisión contable y la importación al ERP.

## Referencia de fórmulas

<details>
<summary><strong>Configuración & ajustes</strong></summary>

### Tasa de IVA predeterminada

**Propósito**

Proporciona la tasa de IVA predeterminada cuando una factura no especifica una excepción específica.

**Referenciada por**

- Invoice Input
- Allocation Engine

**Lógica**

```excel
IF(VAT Override="", Default VAT Rate, VAT Override)
```

---

### Base de asignación predeterminada

**Propósito**

Define la metodología de asignación aplicada en todo el libro.

Opciones admitidas:

- Recuento de activos
- Capacidad
- Capacidad de propiedad

El motor de asignación referencia este parámetro dinámicamente, permitiendo cambiar la metodología de asignación sin modificar ninguna fórmula.

</details>

---

<details>
<summary><strong>Importación de activos</strong></summary>

### Capacidad de propiedad

**Propósito**

Calcula la capacidad de propiedad efectiva usada por la asignación proporcional.

**Fórmula**

```excel
=IF(A2:A100000="","",G2:G100000*H2:H100000)
```

Donde:

- G = % de propiedad
- H = Capacidad (MW)

El cálculo se expande automáticamente a medida que se importan activos adicionales.

</details>

---

<details>
<summary><strong>Entrada de facturas</strong></summary>

### Neto imponible

```excel
=IF(A2:A100000="","",E2:E100000*F2:F100000)
```

Calcula el valor de la factura antes de IVA.

---

### Monto de IVA

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

Usa la tasa de IVA específica de la factura siempre que esté disponible.

De lo contrario, se aplica el parámetro de IVA global.

---

### Monto bruto

```excel
=IF(A2:A100000="","",I2:I100000+J2:J100000)
```

Produce el monto bruto de la factura listo para contabilidad.

</details>

---

<details>
<summary><strong>Motor de asignación</strong></summary>

El motor de asignación está implementado intencionalmente como una única fórmula de matriz dinámica.

Las principales funciones de Excel incluyen:

| Función | Propósito |
|----------|----------|
| LET | Definición de variables y legibilidad mejorada |
| FILTER | Hacer coincidir activos pertenecientes a la entidad de facturación seleccionada |
| REDUCE | Iterar por cada factura importada |
| LAMBDA | Lógica de asignación reutilizable a nivel de fila |
| SWITCH | Seleccionar la metodología de asignación dinámicamente |
| MAKEARRAY | Generar filas de asignación automáticamente |
| HSTACK | Ensamblar columnas de salida |
| VSTACK | Anexar bloques de asignación de facturas |

Los ratios de asignación se generan según la metodología configurada:

### Recuento de activos

```text
Allocation Ratio = 1 ÷ Number of Matching Assets
```

---

### Capacidad

```text
Allocation Ratio

=

Asset Capacity

/

Total Capacity
```

---

### Capacidad de propiedad

```text
Allocation Ratio

=

Ownership Capacity

/

Total Ownership Capacity
```

Los ratios de asignación resultantes se multiplican por:

- Monto neto
- IVA
- Monto bruto

para generar registros de asignación totalmente conciliados.

</details>

---

<details>
<summary><strong>Hojas de resumen</strong></summary>

### Lista dinámica de fondos

Usa:

```excel
UNIQUE()
SORT()
FILTER()
```

para generar la dimensión de Fondo completa automáticamente.

---

### Lista geográfica dinámica

Usa el mismo patrón para generar todas las regiones de informes automáticamente.

---

### Totales de resumen

Generados mediante:

```excel
SUMIFS()
```

para

- Neto
- IVA
- Bruto

sin tablas dinámicas.

</details>

---

## Reglas de validación

| Campo | Regla de validación | Comportamiento ante errores |
|--------|-----------------|----------------|
| Invoice Number | No puede estar vacío para registros activos | Fila ignorada |
| Invoice Date | Debe ser una fecha de Excel válida | Se requiere corrección del usuario |
| Quantity | Debe ser numérico y ≥ 0 | Cálculo impedido |
| Unit Price | Debe ser numérico | Cálculo impedido |
| Allocation Target | Debe coincidir con una Company to Invoice existente | Registro de advertencia generado |
| VAT Override | Vacío o porcentaje válido | Vuelve al IVA predeterminado |
| Company to Invoice | Debe existir en Asset Import | Asignación bloqueada |
| Ownership % | Entre 0 % y 100 % | Valores inválidos excluidos |
| Capacity | Debe ser positiva | Asignación por capacidad no disponible |
| Ownership Capacity | Solo generado por fórmula | Columna protegida |
| Default VAT Rate | Entre 0 % y 100 % | Advertencia de configuración |
| Allocation Basis | Asset Count / Capacity / Ownership Capacity | Predeterminado: recuento de activos |

### Condiciones de protección automáticas

- Las filas de factura vacías se ignoran.
- Las filas de activos vacías se ignoran.
- Las entidades de facturación desconocidas generan un registro **⚠ Unmapped Target**.
- Las matrices dinámicas se expanden automáticamente sin fórmulas copiadas.
- Los informes de resumen se actualizan automáticamente después del recálculo.
- Todos los totales Neto, IVA y Bruto asignados concilian con su factura de origen.

</details>

---

## Otras herramientas de esta serie

Estos libros siguen la misma filosofía de diseño: marcos analíticos ligeros que simplifican decisiones operativas recurrentes sin reemplazar sistemas empresariales.

- **Demand-Adaptive Inventory Planning & Purchasing Decision Toolkit** — planificación de inventario, momento de reposición y simulación de compras.
- **Restaurant Menu Master Workbook** — configuración centralizada de menús, gestión de modificadores y gobernanza de precios.
- **Retail & Maquila Inventory Ledger** — rastrear el inventario desde la compra a granel hasta la fabricación por contrato y las ventas de SKU terminados.
- **Construction Estimate & Cost Tracking Toolkit** — mediciones de cantidades, estimación de costos y monitoreo del presupuesto del proyecto.
- Hay más herramientas disponibles a través del repositorio de GitHub y nuestro [Sitio web](https://www.theseusworkshop.com/).

---

## Licencia

Este proyecto está licenciado bajo la **Apache License 2.0**.

Usted es libre de usar, modificar y distribuir este libro de acuerdo con los términos de la Apache License 2.0.

Consulte el archivo `LICENSE` para ver el texto completo de la licencia.
