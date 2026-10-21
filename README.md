# 🌴 Country Club El Bosque · Sede Chosica
### Planificador & Presupuesto Grupal en React + Vite

Aplicación web moderna desarrollada en **React 18 + Vite + Tailwind CSS** para calcular, sincronizar y repartir de manera transparente y en tiempo real todos los gastos del viaje campestre al **Country Club El Bosque (Chosica)** entre amigos.

**URL en vivo (GitHub Pages):** [https://nico1234556.github.io/presupuesto-el-bosque/](https://nico1234556.github.io/presupuesto-el-bosque/)

---

## 🚀 Inicio Rápido (Desarrollo Local)

Requisitos: **Node.js 18+** y **npm**.

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo local
npm run dev

# 3. Compilar para producción (genera /dist optimizado)
npm run build
```

---

## 🌟 Características Principales

1. **Selector de Días & Presets Rápidos:**
   - **Vie-Lun (3 Noches):** Viernes 18 al Lunes 21 Dic (2 noches fin de semana + 1 noche semana).
   - **Sáb-Lun (2 Noches ⚡ Más Barato):** Sábado 19 al Lunes 21 Dic. ¡Ahorran **S/ 480.00** en total como grupo y **S/ 60.00** cada amigo!
   - **Vie-Dom (2 Noches):** Viernes 18 al Domingo 20 Dic.
   - **Sáb-Dom (1 Noche):** Sábado 19 al Domingo 20 Dic.
   - Stepper interactivo para ajustar noches personalizadas (+ / -).

2. **Tarifario Oficial El Bosque (Chosica):**
   - **🏢 Departamento 1° Piso (Aforo 8 pers):** S/ 400 (2 noc fin sem), S/ 200 (1 noc fin sem), S/ 180 (noche semana).
   - **🏢 Departamento 2° Piso (Aforo 8 pers con Balcón):** S/ 450 (2 noc fin sem), S/ 230 (1 noc fin sem), S/ 200 (noche semana).
   - **🏡 2 Bungalows (4 pers en cada cabaña):** 2 x S/ 350 = S/ 700 fin sem, 2 x S/ 175 = S/ 350 (1 noc), 2 x S/ 150 = S/ 300 (semana).
   - **🏠 1 Bungalow (Aforo máx 6 pers):** S/ 350 fin sem, S/ 175 (1 noc), S/ 150 (semana).
   - Botón interactivo **"Ver Tarifario Oficial"** con visualizador Lightbox HD del afiche del club.

3. **Cobro de Pernocte Flexible:**
   - Tasa oficial de **S/ 35.00** por persona por noche.
   - Switch general ON/OFF y asignador masivo (3 noches = S/ 105, 2 noches = S/ 70, 1 noche = S/ 35, 0 noches = S/ 0).
   - Control individual por amigo con botones directos `+` y `-`.

4. **Fórmula Equitativa de Cuotas:**
   - **No bebedores:** Pagan **S/ 20.00 menos** de la cuota base de alcohol.
   - **Tú (Organizador):** Aportas **S/ 100.00 extra voluntario** para abaratar el viaje de todos.
   - Todos los 8 participantes (incluyendo organizador no socio) pagan sus noches de pernocte.

5. **Persistencia & Sincronización en Tiempo Real:**
   - **Nube Automática:** Sincronizado vía REST API (`api.restful-api.dev`) para que cualquier cambio hecho por un amigo se refleje en los demás.
   - **Local Storage (`el_bosque_v8`):** Guarda automáticamente el estado en el navegador.
   - **URL Hash (#s=...):** Enlace inteligente con todos los datos incrustados.
   - **Backup JSON:** Descarga e importación en 1 clic.

6. **Despliegue Automático en GitHub Pages:**
   - Configurado con GitHub Actions en `.github/workflows/deploy.yml`. Al hacer `git push origin main`, se compila y publica automáticamente.

---

## 📁 Estructura del Proyecto

```
presupuesto-el-bosque/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions para despliegue automático en Pages
├── public/
│   └── img/                # Fotos oficiales del club y afiche de tarifas
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── TripDurationCard.jsx
│   │   ├── PernocteCard.jsx
│   │   ├── MembersTable.jsx
│   │   ├── PurchasesAccordion.jsx
│   │   ├── PhotosGallery.jsx
│   │   ├── ClubRulesAccordion.jsx
│   │   ├── LightboxModal.jsx
│   │   ├── WhatsAppModal.jsx
│   │   └── Toast.jsx
│   ├── data/
│   │   └── defaultData.js
│   ├── utils/
│   │   └── calculations.js
│   ├── App.jsx
│   ├── index.css           # Tailwind + scroll containment
│   └── main.jsx
├── index.html              # Entry point HTML de Vite
├── package.json
├── tailwind.config.js
└── vite.config.js
```
