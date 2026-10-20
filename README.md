# 🌴 Country Club El Bosque · Sede Chosica
### Presupuesto & Gestor de Gastos de Viaje

Aplicación web rápida, interactiva y con persistencia en tiempo real para calcular las cuotas exactas del fin de semana en el **Country Club El Bosque (Chosica)**.

**Fechas:** Viernes 18 al Lunes 21 de Diciembre (3 Noches)  
**Total Base:** S/ 1,702.76  
**Enlace en Vivo:** [https://nico1234556.github.io/presupuesto-el-bosque/](https://nico1234556.github.io/presupuesto-el-bosque/)

---

## 💰 Cuadre Oficial de Cuotas

| Participante | Cuota Base (Sin Pernocte) | Con Pernocte (+S/ 70) | Detalle de Reparto |
| :--- | :---: | :---: | :--- |
| **Los 2 que NO toman** | **S/ 190.35** | **S/ 260.35** | Pagan exactamente **S/ 20.00 menos** que los bebedores. |
| **Los 5 que TOMAN** | **S/ 210.35** | **S/ 280.35** | Cuota estándar de bebedores (comida + alcohol + bungalow + movilidad). |
| **Tú (Organizador)** | **S/ 270.35** | **S/ 340.35** | Asume **S/ 60.00 extra** voluntario para aliviar cuotas del grupo. |
| **TOTAL VIAJE** | **S/ 1,702.76** | **S/ 2,262.76** | Cuadre exacto al céntimo (incluye S/ 150 más por noche extra en bungalow). |

---

## ☁️ Diseño Inspirado en Travelio (Framer Template)

Se ha integrado la estética cinematográfica de **Travelio (Framer)**, destacando:
- **Hero de Aventura & Paisaje:** Fondo panorámico con van de viaje y pinos campestres, con textos de alto impacto.
- **Capa de Nubes Flotantes Realistas (*Cloud Transition*):** Nubes volumétricas animadas con suave balanceo que disuelven gradualmente el hero en el lienzo cálido (`#faf9f5`) sin cortes abruptos ni líneas horizontales artificiales.
- **Tarjetas y Transiciones Travelio:** Tarjetas con esquinas curvas amplias (`rounded-3xl`), división punteada, etiquetas pill flotantes, elevación suave al pasar el cursor (`hover:-translate-y-1.5 hover:shadow-xl`) y zoom progresivo en fotos.
- **Nuevo Footer Dedicado con Borde Festoneado (*Scalloped Edge*):** Sección inferior con división estilo ticket postal donde se consolidan el clima en React, el reglamento de ingreso al club y la información institucional.
- **Tipografía Editorial:** Combinación de **Geist** (sans moderno y legible), **Source Serif 4** (cursiva editorial elegante para destacar palabras clave) y **JetBrains Mono** (números financieros).
- **Paleta Travelio:** Lienzo suave y descansado (`#faf9f5`), tarjetas limpias (`#ffffff`), tinta de carbón cálido (`#1a1a17`), verde bosque campestre (`#1b5e32`) y acento cálido ámbar (`#d97706`).

---

## 📁 Skills Guardadas en el Repositorio

En [`/skills`](./skills) se encuentran documentadas las referencias de diseño:
1. **[`skills/airbnb-design-system.md`](./skills/airbnb-design-system.md)**: Estructura de paneles, tipografía jerárquica y espaciados funcionales.
2. **[`skills/avoid-ai-design.md`](./skills/avoid-ai-design.md)**: Eliminación de clichés de IA (cero *card soup*, sin cajitas de colores flotantes para iconos y sin tipografías mono en mayúsculas decorativas).

---

## 🛠️ Características Principales

- **Switch de Pernocte (+S/ 70):** Desactivado por defecto. Se activa individualmente o en bloque.
- **Padrón de Amigos Interactivo:** Agrega participantes, marca si beben o duermen, ajusta extras y registra confirmación de Yape.
- **Detalle de Compras Desplegable:** Carnes Otto Kunz, Frigon, carbón, cremas Alacena, licores y logística con margen de seguridad del 5%.
- **Galería Oficial de Fotos en Tarjetas Travelio:** 11 fotos reales del Country Club El Bosque con etiquetas temáticas flotantes y visor Lightbox.
- **Footer Integrado (Reglamento + Clima React):**
  - **Componente React de Clima & Satélite Chosica:** Conexión en vivo con Open-Meteo API (860 m s. n. m.), botón de actualización, desglose de los 4 días de viaje (Vie 18 - Lun 21 Dic), UV 11+ y checklist interactivo de equipaje con persistencia en `localStorage`.
  - **Reglamento para Invitados:** 6 normas clave (DNI físico en garita Km 33.5, gorro para piscina, canchas de arcilla, salón de billar, horario de silencio a las 11:00 PM y cuidado de parrillas).
- **Copia a WhatsApp en 1 Clic:** Modal preformateado listo para enviar al grupo con número de Yape/Plin.
