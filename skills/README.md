# Skills de Diseño del Proyecto

Este directorio contiene las dos especificaciones de diseño y directrices de UI aplicadas en la web del presupuesto:

## 1. [`airbnb-design-system.md`](./airbnb-design-system.md)
Guía de estilo y diseño extraída del sistema de diseño de **Airbnb**:
- **Paleta de Color:**
  - Lienzo blanco puro (`#ffffff`) y superficie suave (`#f7f7f7`).
  - Tinta de texto (`#222222`), cuerpo legible (`#3f3f3f`), neutro secundario (`#717171`).
  - Bordes de un píxel (*hairlines*): `#ebebeb` y `#dddddd`.
  - Acento Airbnb Rausch: `#ff385c` (hover `#e00b41`).
- **Tipografía:**
  - Inter / Circular / Sans-serif neutro con pesos equilibrados (400, 500, 600, 700). Monospace reservado exclusivamente para números, precios y montos.
- **Elevación:**
  - Un único nivel de sombra sutil (`rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px`).

---

## 2. [`avoid-ai-design.md`](./avoid-ai-design.md)
Directrices de **"Avoid AI Design Slop"** (por ungspirit):
- **Cero "Card Soup":** No encerrar cada título o texto en una tarjeta flotante o caja con gradiente.
- **Sin Iconos en Cajitas de Colores:** Los iconos son sutiles, monocromáticos y acompañan la información sin fondos de colores decorativos ni bordes artificiales.
- **Tipografía Intencional:** Evitar etiquetas en mayúsculas `font-mono uppercase` que gritan "generado por IA". Monospace únicamente para datos tabulares y cifras financieras.
- **Contraste Real y Bordes Nítidos:** Bordes de 1px precisos en lugar de sombras borrosas y fondos con gradientes pasteles genéricos.
