# 🌴 Country Club El Bosque · Sede Chosica
### Presupuesto Inteligente & Guía Interactiva de Instalaciones

Aplicación web interactiva desarrollada para planificar una estadía de fin de semana en bungaló en el **Country Club El Bosque (Sede Chosica)**, con calculadora divisora de gastos, control de tarifa de pernocte y catálogo visual en alta resolución de las instalaciones del club.

![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-En_Vivo-brightgreen?logo=github)
![Licencia](https://img.shields.io/badge/License-MIT-blue.svg)
![Diseño](https://img.shields.io/badge/Diseño-UI%2FUX_Editorial_Club-1b3b22)

---

## 🏛️ Instalaciones Incluidas en la Guía Visual (7 Áreas)

La aplicación incluye una sección dedicada a explorar las **40 hectáreas** de la sede Chosica con visor de fotos en pantalla completa (Lightbox HD):

1. **🏡 El Bungaló (Fotos del Interior & Terrazas):**
   * Sala de estar rústica con acabados de madera campestre.
   * Dormitorios confortables con camarotes y camas dobles (capacidad 6 a 8 personas).
   * Kitchenette equipada y comedor.
   * Terraza privada con zona de parrilla empotrada y vista a los jardines.
2. **🏊‍♂️ Las Piscinas & Zona de Solárium:**
   * Piscina semi-olímpica de nado y piscinas recreativas familiares.
   * Patera para niños pequeños, reposeras y sombrillas bajo el sol seco de Chosica.
3. **🌄 El Mirador Panorámico:**
   * Vista 360° a toda la quebrada del río Rímac, los cerros andinos y el valle. Ideal para caminatas y fotos al atardecer (Golden Hour).
4. **🐴 Los Caballos & Zona Ecuestre:**
   * Caballerizas, picadero y paseos guiados a caballo por senderos de tierra rodeados de vegetación centenaria.
5. **🎱 Salón de Billar & Juegos de Salón:**
   * Mesas reglamentarias de billar y billas con paño verde e iluminación focal, fulbito de mano y ping-pong.
6. **⚪ Canchas Tradicionales de Bochas:**
   * Canchas oficiales con piso de tierra y conchuela compactada, graderías sombreadas y tableros de puntaje (el deporte tradicional de los socios).
7. **⚽ Complejo Polideportivo (Fútbol, Básquet, Tenis & Frontón):**
   * Canchas de fútbol 11 y fútbol 7 de césped natural y sintético.
   * Losas multideportivas con aros de básquetbol y tableros reglamentarios.
   * Canchas de tenis de arcilla roja y canchas de frontón oficial.

---

## 💰 Calculadora & Presupuesto con Botón de Pernoctar

* **🏨 Switch Maestro de Pernoctar (S/ 70):** Prende o apaga el cobro de pernocte con un solo clic. El monto es 100% editable (por si el club cobra S/ 50 o S/ 80) y permite elegir a quién se le cobra (solo invitados, todos, división grupal o selección manual).
* **🍻 Reparto Justo de Alcohol:** El fondo de tragos y licores (S/ 321.70) se divide **únicamente** entre los que beben (S/ 53.62 c/u). Quienes no beben pagan **S/ 0** de alcohol.
* **👥 100% Modificable en Vivo:** Cambia los nombres de tus patas, añade nuevos amigos o gastos, registra quién ya pagó por Yape/Plin y realiza ajustes de cuota personalizados.
* **📲 Mensaje para WhatsApp:** Genera un mensaje formateado con emojis listo para copiar al grupo con un solo botón.
* **💾 Persistencia en LocalStorage:** Tus ediciones no se pierden al recargar la página.

---

## 🎨 10 Skills de Diseño UI/UX Aplicadas
1. **Art Direction & Editorial Hierarchy:** Paleta temática privada de club campestre (*Evergreen #0f2414*, arena cálida y acentos oro bruñido) alejándose del aspecto genérico de plantillas IA.
2. **Tipografía Dual Editorial:** Combinación de *Playfair Display* (elegancia de club tradicional) con *Plus Jakarta Sans* (claridad en lectura de datos).
3. **Asymmetric & Bento-Grid Layouts:** Composición visual balanceada que da protagonismo fotográfico al bungaló y las áreas deportivas.
4. **Micro-interacciones Físicas:** El interruptor de pernoctar responde con spring physics, aura luminosa y feedback sonoro/visual.
5. **Contextual Storytelling:** Diseñado con lenguaje y contexto peruano real (Chosica Km 29.5, Yape/Plin, parrillas, sol de invierno y verano).
6. **Progressive Disclosure:** Separación sin fricción entre cálculo financiero e inspección de instalaciones con pestañas suaves.
7. **Accessible Dual-State Contrast:** Contraste WCAG AAA en todos los elementos interactivos y badges de estado.
8. **Mobile-First Ergonomics:** Barra inferior flotante fija en dispositivos móviles para cambiar de vista con el pulgar.
9. **Inline Data Manipulation:** Edición inmediata de nombres y gastos en el mismo renglón sin molestos modales.
10. **Print & Invoice Optimization:** Hoja de estilo `@media print` para exportar a PDF o imprimir con formato de recibo limpio.

---

## 💻 10 Skills de Creación Web Aplicadas
1. **Arquitectura de Estado Reactivo en Vanilla JS:** Cero dependencias pesadas, carga instantánea y recálculo matemático en tiempo real.
2. **Interactive Photo Lightbox:** Modal de pantalla completa para ver cualquier foto del interior del bungaló o las instalaciones en HD con tecla `Escape`.
3. **Motor de Filtrado Dinámico:** Filtro instantáneo por categoría (Bungaló, Piscinas, Deportes, Relax) con transiciones suaves.
4. **Motor de Reparto Matemático Multicriterio:** Manejo de 4 modos de asignación de pernocte y balance de fondos segregados.
5. **Separación de Fondos Duales:** Segregación matemática automática entre bebedores y no bebedores.
6. **Integración con Clipboard API:** Copiado al portapapeles con fallback seguro y toast notification.
7. **Optimización de Carga de Recursos:** Carga diferida (`loading="lazy"`) y fallbacks en imágenes.
8. **Transiciones Aceleradas por GPU:** Animaciones fluidas mediante `transform` y `opacity` sin saltos de renderizado.
9. **LocalStorage con Migración de Versiones:** Guardado automático que preserva las modificaciones locales de forma segura.
10. **Semántica HTML5 & Accesibilidad:** Uso de `<header>`, `<article>`, `<section>`, atributos `aria-expanded` y selectores semánticos.

---

## 🚀 Publicación en GitHub Pages

1. Sube los cambios a tu repositorio:
   ```bash
   git add .
   git commit -m "feat: showcase instalaciones el bosque chosica y mejoras ui/ux"
   git push origin main
   ```
2. En GitHub, entra a **Settings > Pages**.
3. Selecciona la rama `main` y la carpeta `/ (root)`.
4. Tu sitio web quedará disponible públicamente para compartir con todos tus amigos.
