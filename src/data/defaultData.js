export const CLOUD_OBJECT_ID = 'ff808181a09d98f701a15a82699c32cf';
export const CLOUD_API_URL = 'https://api.restful-api.dev/objects/' + CLOUD_OBJECT_ID;

export const TRIP_PRESETS = {
  'vie-lun': {
    preset: 'vie-lun',
    startDate: '2026-12-18',
    endDate: '2026-12-21',
    startDay: 'Viernes',
    endDay: 'Lunes',
    nights: 3,
    label: 'Viernes 18 al Lunes 21 Dic (3 Noches)',
    shortLabel: 'Vie 18 — Lun 21 Dic'
  },
  'sab-lun': {
    preset: 'sab-lun',
    startDate: '2026-12-19',
    endDate: '2026-12-21',
    startDay: 'Sábado',
    endDay: 'Lunes',
    nights: 2,
    label: 'Sábado 19 al Lunes 21 Dic (2 Noches)',
    shortLabel: 'Sáb 19 — Lun 21 Dic'
  },
  'vie-dom': {
    preset: 'vie-dom',
    startDate: '2026-12-18',
    endDate: '2026-12-20',
    startDay: 'Viernes',
    endDay: 'Domingo',
    nights: 2,
    label: 'Viernes 18 al Domingo 20 Dic (2 Noches)',
    shortLabel: 'Vie 18 — Dom 20 Dic'
  },
  'sab-dom': {
    preset: 'sab-dom',
    startDate: '2026-12-19',
    endDate: '2026-12-20',
    startDay: 'Sábado',
    endDay: 'Domingo',
    nights: 1,
    label: 'Sábado 19 al Domingo 20 Dic (1 Noche)',
    shortLabel: 'Sáb 19 — Dom 20 Dic'
  }
};

export const DEFAULT_DATA = {
  tripDates: {
    preset: 'vie-lun',
    startDate: '2026-12-18',
    endDate: '2026-12-21',
    startDay: 'Viernes',
    endDay: 'Lunes',
    nights: 3,
    label: 'Viernes 18 al Lunes 21 Dic (3 Noches)',
    shortLabel: 'Vie 18 — Lun 21 Dic'
  },
  pernoctarActive: true,
  pernoctarNightRate: 35.00,
  alojamientoMode: 'depa_1', // 'depa_1' | 'depa_2' | '2_bungalows' | '1_bungalow'
  bungalowsCount: 2,
  // Tarifas Oficiales Afiche El Bosque Chosica
  depa1WeekendRate: 400.00,
  depa1SingleWeekendRate: 200.00,
  depa1WeekdayRate: 180.00,
  depa2WeekendRate: 450.00,
  depa2SingleWeekendRate: 230.00,
  depa2WeekdayRate: 200.00,
  bungalowWeekendRate: 350.00,
  bungalowSingleWeekendRate: 175.00,
  bungalowWeekdayRate: 150.00,
  yapeNumber: '987 654 321 (Tú)',
  nonDrinkerDiscount: 20.00,
  userExtra: 100.00,
  _clientTimestamp: 0,
  comida: [
    { id: 'c1', name: 'Chorizo parrillero Otto Kunz 400 g', qty: '5 paq.', total: 69.50 },
    { id: 'c2', name: 'Hot dog Suiza ahumado (pack 15)', qty: '2 paq.', total: 23.00 },
    { id: 'c3', name: 'Bife angosto Frigon (4 kg)', qty: '4 kg', total: 182.00 },
    { id: 'c4', name: 'Alitas de pollo (3 kg)', qty: '3 kg', total: 54.00 },
    { id: 'c5', name: 'Papa cóctel (4 kg)', qty: '4 kg', total: 24.00 },
    { id: 'c6', name: 'Pan de hot dog (30 unid.)', qty: '30 unid.', total: 18.00 },
    { id: 'c7', name: 'Pan francés (10 unid.)', qty: '10 unid.', total: 8.50 },
    { id: 'c8', name: 'Choclo (6 unid.)', qty: '6 unid.', total: 9.00 },
    { id: 'c9', name: 'Aceite 1 L', qty: '1 unid.', total: 10.00 },
  ],
  cremas: [
    { id: 'cr1', name: 'Salsas Alacena (mayonesa, tártara, etc.)', qty: '6 sachets', total: 47.90 },
    { id: 'cr2', name: 'Carbón vegetal 5 kg', qty: '5 kg', total: 27.50 },
    { id: 'cr3', name: 'Hielo en bolsa (3 bolsas)', qty: '3 bolsas', total: 15.00 },
    { id: 'cr4', name: 'Agua San Luis 7 L', qty: '1 bidón', total: 11.00 },
    { id: 'cr5', name: 'Gaseosas Coca-Cola / Sprite 3 L (2 bot.)', qty: '2 botellas', total: 24.00 },
    { id: 'cr6', name: 'Snacks Pringles y papas Lays', qty: '4 paq.', total: 29.99 },
  ],
  alcohol: [
    { id: 'a1', name: '5 botellas 750 ml Bar Express (Cuervo, Jäger, etc.)', qty: '5 botellas', total: 250.00 },
    { id: 'a2', name: 'Cerveza Flying Fish lima limón (18 latas)', qty: '18 latas', total: 71.70 },
  ],
  alojamiento: [
    { id: 'al1', name: '1 Depa 1° Piso El Bosque - Paquete Fin de Semana (Vie 18 - Dom 20)', qty: '1 depa (2 noc: aforo 8 pers)', total: 400.00 },
    { id: 'al2', name: '1 Depa 1° Piso El Bosque - Noche Extra (Dom 20 - Lun 21)', qty: '1 depa (1 noc de semana)', total: 180.00 },
    { id: 'al3', name: 'Movilidad ida viernes y vuelta lunes (Van para 8 pers)', qty: 'Ida y vuelta', total: 300.00 },
  ],
  members: [
    { id: 'm1', name: 'Tú (Organizador)', drinks: true, sleeps: true, sleepNights: 3, extra: 100.00, paid: false, isUser: true },
    { id: 'm2', name: 'Invitado 1 (Amigo)', drinks: true, sleeps: true, sleepNights: 3, extra: 0.00, paid: false },
    { id: 'm3', name: 'Invitado 2 (Amigo)', drinks: true, sleeps: true, sleepNights: 3, extra: 0.00, paid: false },
    { id: 'm4', name: 'Invitado 3 (Amigo)', drinks: true, sleeps: true, sleepNights: 3, extra: 0.00, paid: false },
    { id: 'm5', name: 'Invitado 4 (Amigo)', drinks: true, sleeps: true, sleepNights: 3, extra: 0.00, paid: false },
    { id: 'm6', name: 'Invitado 5 (Amigo)', drinks: true, sleeps: true, sleepNights: 3, extra: 0.00, paid: false },
    { id: 'm7', name: 'Invitado 6 (No toma)', drinks: false, sleeps: true, sleepNights: 3, extra: 0.00, paid: false },
    { id: 'm8', name: 'Invitado 7 (No toma)', drinks: false, sleeps: true, sleepNights: 3, extra: 0.00, paid: false },
  ]
};

export const REAL_PHOTOS = [
  { id: 'rf1', tag: 'Bungalows', title: 'Bungalows de Chosica', desc: 'Casas de campo de ladrillo con techos a dos aguas y mesas campestres frente al jardín.', file: './img/elbosque-bungalows.jpg' },
  { id: 'rf2', tag: 'Piscinas', title: 'Piscina Olímpica de Nado', desc: 'Piscina reglamentaria con carriles, sombrillas y sol constante.', file: './img/elbosque-piscina.jpg' },
  { id: 'rf3', tag: 'Parrillas', title: 'Zona de Parrillas & Picnic', desc: 'Parrillas de ladrillo y mesas de madera en el pasto bajo los árboles.', file: './img/elbosque-parrillas.jpg' },
  { id: 'rf4', tag: 'Panorámica', title: 'Vista Panorámica de la Sede', desc: 'Vista aérea: piscinas, laguna, canchas deportivas y los cerros de Chosica.', file: './img/elbosque-panoramica.jpg' },
  { id: 'rf5', tag: 'Laguna', title: 'Laguna & Paseo en Botes', desc: 'Botes a remo en la laguna artificial con islotes de vegetación.', file: './img/elbosque-laguna-botes.webp' },
  { id: 'rf6', tag: 'Salón Social', title: 'Mesas & Tacos de Billar', desc: 'Salón social oficial de El Bosque Chosica con nuevas mesas y tacos reglamentarios.', file: './img/elbosque-billar.jpg' },
  { id: 'rf7', tag: 'Deportes', title: 'Polideportivo & Básquet', desc: 'Losa deportiva oficial de Country Club El Bosque con tableros y partidos.', file: './img/elbosque-basket.jpg' },
  { id: 'rf8', tag: 'Tenis Arcilla', title: 'Canchas de Tenis de Arcilla', desc: 'Canchas reglamentarias de arcilla roja con vista a los cerros de Chosica.', file: './img/elbosque-tenis.jpg' },
  { id: 'rf9', tag: 'Bochas', title: 'Cancha de Bochas Oficial', desc: 'Cancha techada con piso oficial para torneos y partidos de bochas del Club.', file: './img/elbosque-bochas.jpg' },
  { id: 'rf10', tag: 'Ecuestre', title: 'Zona Ecuestre & Caballos', desc: 'Caballerizas y escuela ecuestre con paseos a caballo en la sede Chosica.', file: './img/elbosque-caballos.jpg' },
  { id: 'rf11', tag: 'Estadio', title: 'Cancha Oficial de Fútbol', desc: 'Estadio de césped natural con tribunas y el escudo de El Bosque en el círculo central.', file: './img/elbosque-futbol.jpg' },
];

export const CLUB_RULES = [
  {
    title: 'Ingreso & Garita',
    icon: 'fa-id-card',
    desc: 'Todos los invitados deben presentar DNI físico vigente en control de garita y estar registrados bajo el número de socio del anfitrión.'
  },
  {
    title: 'Cobro de Pernocte',
    icon: 'fa-bed',
    desc: 'Tasa oficial de S/ 35 por noche por cada persona no socia que duerma en las instalaciones del club. Se abona en recepción al registrar el hospedaje.'
  },
  {
    title: 'Aforo de Hospedaje',
    icon: 'fa-people-roof',
    desc: 'El Departamento acepta oficialmente hasta 8 personas juntas. Los bungalows tienen aforo máximo de 6 personas por cabaña (para 8 personas se requieren 2 bungalows).'
  },
  {
    title: 'Uso de Piscinas',
    icon: 'fa-person-swimming',
    desc: 'Uso obligatorio de ropa de baño adecuada y gorro de natación en piscina olímpica. Duchas previas antes de ingresar al agua.'
  },
  {
    title: 'Silencio en Hospedajes',
    icon: 'fa-volume-low',
    desc: 'A partir de las 11:00 pm rige horario de descanso en bungalows y departamentos. Parlantes con volumen moderado para convivencia.'
  }
];
