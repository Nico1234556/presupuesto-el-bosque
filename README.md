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
- **Capa de Nubes Flotantes Realistas (*Cloud Transition*):** Nubes volumétricas animadas con suave balanceo que disuelven gradualmente el hero en la sección de contenido claro.
- **Sellos Postales Vintage:** Sellos ilustrados en las esquinas que flotan e inclinan suavemente al interactuar.
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
- **Galería Oficial de Fotos:** 11 fotos reales del Country Club El Bosque con visor Lightbox.
- **Reglamento para Invitados:** Requisitos de DNI en garita Km 33.5, gorro para piscina, canchas de arcilla, parrillas y horario de silencio a las 11:00 PM.
- **Copia a WhatsApp en 1 Clic:** Modal preformateado listo para enviar al grupo con número de Yape/Plin.
- **Componente React de Clima & Satélite (al pie de página):** Widget dinámico programado en **React 18** ubicado al final de la página. Se conecta en tiempo real a la API meteorológica satelital de Open-Meteo para Chosica (860 m s. n. m.), con botón de actualización en vivo, desglose de los 4 días de viaje (Vie 18 - Lun 21 Dic), radiación UV 11+, y checklist interactivo de equipaje con persistencia en `localStorage`.
