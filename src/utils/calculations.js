import { TRIP_PRESETS } from '../data/defaultData';

export function computeModeStayTotal(modeKey, tripDates, state) {
  const dates = tripDates || state?.tripDates || TRIP_PRESETS['vie-lun'];
  const preset = dates.preset;
  const nights = dates.nights || 3;

  let singleWeekend = 0;
  let doubleWeekend = 0;
  let weekdayRate = 0;
  let multiplier = 1;

  if (modeKey === 'depa_1' || modeKey === 'departamento') {
    singleWeekend = state?.depa1SingleWeekendRate ?? 200.00;
    doubleWeekend = state?.depa1WeekendRate ?? 400.00;
    weekdayRate = state?.depa1WeekdayRate ?? 180.00;
    multiplier = 1;
  } else if (modeKey === 'depa_2') {
    singleWeekend = state?.depa2SingleWeekendRate ?? 230.00;
    doubleWeekend = state?.depa2WeekendRate ?? 450.00;
    weekdayRate = state?.depa2WeekdayRate ?? 200.00;
    multiplier = 1;
  } else if (modeKey === '2_bungalows') {
    singleWeekend = state?.bungalowSingleWeekendRate ?? 175.00;
    doubleWeekend = state?.bungalowWeekendRate ?? 350.00;
    weekdayRate = state?.bungalowWeekdayRate ?? 150.00;
    multiplier = 2;
  } else { // '1_bungalow'
    singleWeekend = state?.bungalowSingleWeekendRate ?? 175.00;
    doubleWeekend = state?.bungalowWeekendRate ?? 350.00;
    weekdayRate = state?.bungalowWeekdayRate ?? 150.00;
    multiplier = 1;
  }

  if (preset === 'sab-lun') {
    // 1 noche fin de semana (Sáb-Dom) + 1 noche de semana (Dom-Lun)
    return multiplier * (singleWeekend + weekdayRate);
  } else if (preset === 'vie-lun') {
    // 2 noches fin de semana (Vie-Dom) + 1 noche de semana (Dom-Lun)
    return multiplier * (doubleWeekend + weekdayRate);
  } else if (preset === 'vie-dom') {
    // 2 noches fin de semana (Vie-Dom)
    return multiplier * doubleWeekend;
  } else if (preset === 'sab-dom') {
    // 1 noche fin de semana (Sáb-Dom)
    return multiplier * singleWeekend;
  } else {
    if (nights <= 1) {
      return multiplier * singleWeekend;
    } else if (nights === 2) {
      return multiplier * doubleWeekend;
    } else {
      const extraWeekdayNights = nights - 2;
      return multiplier * (doubleWeekend + (extraWeekdayNights * weekdayRate));
    }
  }
}

export function buildAlojamientoItems(mode, dates, state) {
  const preset = dates.preset;
  const nights = dates.nights || 3;

  const isSabLun = (preset === 'sab-lun');
  const isVieLun = (preset === 'vie-lun');
  const isSabDom = (preset === 'sab-dom');

  let weekendTotal = 0;
  let weekdayTotal = 0;
  let weekendName = '';
  let weekdayName = '';
  let weekendQty = '';
  let weekdayQty = '';
  let hasWeekdayItem = (isSabLun || isVieLun || (nights >= 3));

  if (mode === 'depa_1' || mode === 'departamento') {
    const rateWeekend = (isSabLun || isSabDom) ? (state.depa1SingleWeekendRate ?? 200.00) : (state.depa1WeekendRate ?? 400.00);
    const rateWeekday = state.depa1WeekdayRate ?? 180.00;
    const weekdayNights = isSabLun ? 1 : Math.max(0, nights - 2);

    weekendTotal = rateWeekend;
    weekdayTotal = rateWeekday * weekdayNights;

    weekendName = isSabLun 
      ? '1 Depa 1° Piso El Bosque - Noche Fin de Semana (Sáb 19 - Dom 20)'
      : (isSabDom ? '1 Depa 1° Piso El Bosque - Noche Fin de Semana (Sáb 19 - Dom 20)' : '1 Depa 1° Piso El Bosque - Paquete Fin de Semana (Vie 18 - Dom 20)');
    weekendQty = `1 depa (aforo 8 pers · S/${rateWeekend.toFixed(0)})`;

    weekdayName = isSabLun
      ? '1 Depa 1° Piso El Bosque - Noche de Semana (Dom 20 - Lun 21)'
      : '1 Depa 1° Piso El Bosque - Noche Extra (Dom 20 - Lun 21)';
    weekdayQty = `1 depa (${weekdayNights} noc: S/${rateWeekday.toFixed(0)})`;

  } else if (mode === 'depa_2') {
    const rateWeekend = (isSabLun || isSabDom) ? (state.depa2SingleWeekendRate ?? 230.00) : (state.depa2WeekendRate ?? 450.00);
    const rateWeekday = state.depa2WeekdayRate ?? 200.00;
    const weekdayNights = isSabLun ? 1 : Math.max(0, nights - 2);

    weekendTotal = rateWeekend;
    weekdayTotal = rateWeekday * weekdayNights;

    weekendName = isSabLun 
      ? '1 Depa 2° Piso El Bosque - Noche Fin de Semana (Sáb 19 - Dom 20)'
      : (isSabDom ? '1 Depa 2° Piso El Bosque - Noche Fin de Semana (Sáb 19 - Dom 20)' : '1 Depa 2° Piso El Bosque - Paquete Fin de Semana (Vie 18 - Dom 20)');
    weekendQty = `1 depa balcón (aforo 8 pers · S/${rateWeekend.toFixed(0)})`;

    weekdayName = isSabLun
      ? '1 Depa 2° Piso El Bosque - Noche de Semana (Dom 20 - Lun 21)'
      : '1 Depa 2° Piso El Bosque - Noche Extra (Dom 20 - Lun 21)';
    weekdayQty = `1 depa balcón (${weekdayNights} noc: S/${rateWeekday.toFixed(0)})`;

  } else if (mode === '2_bungalows') {
    const unitWeekend = (isSabLun || isSabDom) ? (state.bungalowSingleWeekendRate ?? 175.00) : (state.bungalowWeekendRate ?? 350.00);
    const unitWeekday = state.bungalowWeekdayRate ?? 150.00;
    const weekdayNights = isSabLun ? 1 : Math.max(0, nights - 2);

    weekendTotal = 2 * unitWeekend;
    weekdayTotal = 2 * unitWeekday * weekdayNights;

    weekendName = isSabLun
      ? '2 Bungalows El Bosque - Noche Fin de Semana (Sáb 19 - Dom 20)'
      : (isSabDom ? '2 Bungalows El Bosque - Noche Fin de Semana (Sáb 19 - Dom 20)' : '2 Bungalows El Bosque - Paquete Fin de Semana (Vie 18 - Dom 20)');
    weekendQty = `2 bungalows (S/${unitWeekend.toFixed(0)} c/u)`;

    weekdayName = isSabLun
      ? '2 Bungalows El Bosque - Noche de Semana (Dom 20 - Lun 21)'
      : '2 Bungalows El Bosque - Noche Extra (Dom 20 - Lun 21)';
    weekdayQty = `2 bungalows (${weekdayNights} noc: S/${unitWeekday.toFixed(0)} c/u)`;

  } else { // '1_bungalow'
    const unitWeekend = (isSabLun || isSabDom) ? (state.bungalowSingleWeekendRate ?? 175.00) : (state.bungalowWeekendRate ?? 350.00);
    const unitWeekday = state.bungalowWeekdayRate ?? 150.00;
    const weekdayNights = isSabLun ? 1 : Math.max(0, nights - 2);

    weekendTotal = unitWeekend;
    weekdayTotal = unitWeekday * weekdayNights;

    weekendName = isSabLun
      ? '1 Bungalow El Bosque - Noche Fin de Semana (Sáb 19 - Dom 20)'
      : (isSabDom ? '1 Bungalow El Bosque - Noche Fin de Semana (Sáb 19 - Dom 20)' : '1 Bungalow El Bosque - Paquete Fin de Semana (Vie 18 - Dom 20)');
    weekendQty = `1 bungalow (aforo máx 6 pers)`;

    weekdayName = isSabLun
      ? '1 Bungalow El Bosque - Noche de Semana (Dom 20 - Lun 21)'
      : '1 Bungalow El Bosque - Noche Extra (Dom 20 - Lun 21)';
    weekdayQty = `1 bungalow (${weekdayNights} noc: S/${unitWeekday.toFixed(0)})`;
  }

  const items = [];
  items.push({
    id: 'al1',
    name: weekendName,
    qty: weekendQty,
    total: weekendTotal
  });

  if (hasWeekdayItem && weekdayTotal > 0) {
    items.push({
      id: 'al2',
      name: weekdayName,
      qty: weekdayQty,
      total: weekdayTotal
    });
  }

  // Conservar movilidad si ya existía en state.alojamiento o agregarla
  const existingVan = (state.alojamiento || []).find(a => a.id === 'al3' || a.name.includes('Movilidad') || a.name.includes('Van'));
  items.push(existingVan ? { ...existingVan } : {
    id: 'al3',
    name: 'Movilidad ida y vuelta (Van para 8 pers)',
    qty: 'Ida y vuelta',
    total: 300.00
  });

  return items;
}

export function calculate(state) {
  const members = state.members || [];
  const totalMembers = members.length;
  
  const subtotalComida = (state.comida || []).reduce((acc, c) => acc + (parseFloat(c.total) || 0), 0);
  const subtotalCremas = (state.cremas || []).reduce((acc, c) => acc + (parseFloat(c.total) || 0), 0);
  const sumaComidaCremas = subtotalComida + subtotalCremas;
  const margen5Pct = Math.round(sumaComidaCremas * 0.05 * 100) / 100;

  const subtotalAlcohol = (state.alcohol || []).reduce((acc, c) => acc + (parseFloat(c.total) || 0), 0);
  const subtotalAlojamiento = (state.alojamiento || []).reduce((acc, c) => acc + (parseFloat(c.total) || 0), 0);

  const totalBaseBudget = sumaComidaCremas + margen5Pct + subtotalAlcohol + subtotalAlojamiento;

  const discount = (state.nonDrinkerDiscount !== undefined) ? state.nonDrinkerDiscount : 20.00;
  const nonDrinkers = members.filter(m => !m.drinks);
  const drinkers = members.filter(m => m.drinks);

  const totalManualExtras = members.reduce((acc, m) => acc + (parseFloat(m.extra) || 0), 0);

  const X_drinkerBase = totalMembers > 0 
    ? ((totalBaseBudget + (nonDrinkers.length * discount) - totalManualExtras) / totalMembers) 
    : 0;

  let pernocteTotal = 0;
  let sleepersCount = 0;
  let totalGuestNights = 0;
  const nightRate = (typeof state.pernoctarNightRate === 'number' && state.pernoctarNightRate >= 0) 
    ? state.pernoctarNightRate 
    : 35.00;

  members.forEach(m => {
    let nights = 0;
    if (state.pernoctarActive) {
      if (typeof m.sleepNights === 'number') {
        nights = m.sleepNights;
      } else if (m.sleeps) {
        nights = state.tripDates?.nights || 3;
      }
    }
    if (nights > 0) sleepersCount++;
    totalGuestNights += nights;
    pernocteTotal += (nights * nightRate);
  });

  const memberCalcs = members.map(m => {
    let nights = 0;
    if (state.pernoctarActive) {
      if (typeof m.sleepNights === 'number') {
        nights = m.sleepNights;
      } else if (m.sleeps) {
        nights = state.tripDates?.nights || 3;
      }
    }
    const pernocteCost = nights * nightRate;
    let baseQuota = m.drinks ? X_drinkerBase : (X_drinkerBase - discount);
    const total = baseQuota + (parseFloat(m.extra) || 0) + pernocteCost;
    return { m, baseQuota, pernocteCost, nights, total };
  });

  const totalTripBudget = totalBaseBudget + pernocteTotal;
  const totalCollected = memberCalcs.filter(x => x.m.paid).reduce((acc, c) => acc + c.total, 0);

  return {
    totalMembers,
    nonDrinkersCount: nonDrinkers.length,
    drinkersCount: drinkers.length,
    subtotalComida,
    subtotalCremas,
    sumaComidaCremas,
    margen5Pct,
    subtotalAlcohol,
    subtotalAlojamiento,
    totalBaseBudget,
    X_drinkerBase,
    discount,
    pernocteTotal,
    sleepersCount,
    totalGuestNights,
    nightRate,
    memberCalcs,
    totalTripBudget,
    totalCollected
  };
}
