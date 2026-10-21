import React from 'react';
import { computeModeStayTotal } from '../utils/calculations';

function ExpenseItemCard({ item, cat, onUpdateName, onUpdateQty, onUpdateVal, onRemoveItem }) {
  return (
    <div className="bg-white border border-hairline hover:border-ink/30 focus-within:border-ink/50 focus-within:shadow-xs rounded-xl p-2.5 transition shadow-2xs space-y-1.5">
      {/* Name and delete */}
      <div className="flex items-center gap-1.5">
        <input 
          type="text" 
          value={item.name} 
          onChange={(e) => onUpdateName(cat, item.id, e.target.value)} 
          className="flex-1 min-w-0 bg-transparent text-ink text-xs font-semibold hover:bg-surface-soft/60 focus:bg-surface-soft px-1.5 py-1 rounded-md border border-transparent focus:border-ink/30 focus:outline-none transition" 
          placeholder="Nombre del producto..."
        />
        <button 
          onClick={() => onRemoveItem(cat, item.id)} 
          className="w-6 h-6 rounded-md hover:bg-terracotta/10 text-muted/40 hover:text-terracotta transition flex items-center justify-center shrink-0 cursor-pointer" 
          title="Eliminar producto"
        >
          <i className="fa-solid fa-trash-can text-[11px]"></i>
        </button>
      </div>

      {/* Qty and Price */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-hairlinesoft/70">
        <div className="flex items-center gap-1 bg-surface-soft border border-hairlinesoft rounded-lg px-2 py-0.5 text-muted text-[11px] flex-1 max-w-[125px]">
          <span className="text-[10px] text-muted/60 select-none">📦</span>
          <input 
            type="text" 
            value={item.qty || ''} 
            onChange={(e) => onUpdateQty(cat, item.id, e.target.value)} 
            className="w-full bg-transparent text-muted focus:text-ink font-mono text-[11px] focus:outline-none" 
            placeholder="Cant."
          />
        </div>

        <div className="flex items-center bg-surface-soft border border-hairline hover:border-ink/40 focus-within:border-ink focus-within:bg-white rounded-lg px-2 py-0.5 shadow-2xs transition">
          <span className="text-[10px] text-muted font-normal mr-1 select-none">S/</span> 
          <input 
            type="number" 
            step="0.5" 
            min="0" 
            value={item.total} 
            onChange={(e) => onUpdateVal(cat, item.id, parseFloat(e.target.value) || 0)} 
            className="w-16 text-right bg-transparent focus:outline-none font-mono text-xs text-ink font-bold"
          />
        </div>
      </div>
    </div>
  );
}

export default function PurchasesAccordion({ 
  state, 
  calc, 
  onUpdateName, 
  onUpdateQty, 
  onUpdateVal, 
  onAddItem, 
  onRemoveItem, 
  onSwitchMode, 
  onChangeAlojRate, 
  onOpenLightbox, 
  onSaveSection 
}) {
  const isPuntaSal = state?.destination === 'punta_sal';
  const mode = state.alojamientoMode || (isPuntaSal ? 'casa_playa' : 'depa_1');
  const tripDates = state.tripDates;
  const isSabLun = (tripDates?.preset === 'sab-lun');
  const isVieLun = (tripDates?.preset === 'vie-lun');
  const isSabDom = (tripDates?.preset === 'sab-dom');

  // Compute stay costs for badges
  const costDepa1 = computeModeStayTotal('depa_1', tripDates, state);
  const costDepa2 = computeModeStayTotal('depa_2', tripDates, state);
  const cost2Bung = computeModeStayTotal('2_bungalows', tripDates, state);
  const cost1Bung = computeModeStayTotal('1_bungalow', tripDates, state);

  return (
    <div className="border border-hairline rounded-2xl overflow-hidden bg-card shadow-xs">
      {/* Section Header */}
      <div className="p-4 border-b border-hairline flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className={`fa-solid fa-cart-shopping ${isPuntaSal ? 'text-sky-600' : 'text-brand'}`}></i>
          <h3 className="text-sm font-bold text-ink font-sans">
            Detalle de Compras & Presupuesto Desglosado ({isPuntaSal ? 'Punta Sal' : 'El Bosque'})
          </h3>
        </div>
        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
          isPuntaSal ? 'text-sky-800 bg-sky-50 border-sky-200' : 'text-brand bg-brand-subtle border-brand/20'
        }`}>
          S/ {calc.totalBaseBudget.toFixed(2)}
        </span>
      </div>

      <div className="p-4 space-y-6">
        {/* 4 Category Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 1. Carnes y Comida */}
          <div className="bg-surface-soft/60 border border-hairlinesoft p-3.5 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2.5 font-semibold text-ink border-b border-hairlinesoft pb-1.5">
                <span>🥩 Parrilla, Brasero & Comida</span>
                <span className="font-mono text-ink text-xs font-semibold">S/ {calc.subtotalComida.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                {(state.comida || []).map(item => (
                  <ExpenseItemCard 
                    key={item.id} 
                    item={item} 
                    cat="comida" 
                    onUpdateName={onUpdateName}
                    onUpdateQty={onUpdateQty}
                    onUpdateVal={onUpdateVal}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
              </div>
            </div>
            <div className="pt-2.5 border-t border-hairlinesoft flex items-center gap-2">
              <button 
                onClick={() => onAddItem('comida')} 
                className="flex-1 py-1.5 px-2 bg-card hover:bg-surface-soft border border-dashed border-hairline rounded-lg text-ink text-[11px] font-medium transition flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
              >
                <i className="fa-solid fa-plus text-[10px]"></i> Añadir carne / comida
              </button>
              <button 
                onClick={() => onSaveSection('comida')} 
                className="py-1.5 px-3 bg-ink hover:bg-black text-white rounded-lg text-[11px] font-semibold transition flex items-center gap-1 shadow-xs cursor-pointer active:scale-98"
              >
                <i className="fa-solid fa-floppy-disk text-[10px]"></i> Guardar
              </button>
            </div>
          </div>

          {/* 2. Cremas, Carbón & Snacks */}
          <div className="bg-surface-soft/60 border border-hairlinesoft p-3.5 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2.5 font-semibold text-ink border-b border-hairlinesoft pb-1.5">
                <span>🥫 Salsas, Carbón & Snacks</span>
                <span className="font-mono text-ink text-xs font-semibold">S/ {calc.subtotalCremas.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                {(state.cremas || []).map(item => (
                  <ExpenseItemCard 
                    key={item.id} 
                    item={item} 
                    cat="cremas" 
                    onUpdateName={onUpdateName}
                    onUpdateQty={onUpdateQty}
                    onUpdateVal={onUpdateVal}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
              </div>
            </div>
            <div className="pt-2.5 border-t border-hairlinesoft flex items-center gap-2">
              <button 
                onClick={() => onAddItem('cremas')} 
                className="flex-1 py-1.5 px-2 bg-card hover:bg-surface-soft border border-dashed border-hairline rounded-lg text-ink text-[11px] font-medium transition flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
              >
                <i className="fa-solid fa-plus text-[10px]"></i> Añadir insumo
              </button>
              <button 
                onClick={() => onSaveSection('cremas')} 
                className="py-1.5 px-3 bg-ink hover:bg-black text-white rounded-lg text-[11px] font-semibold transition flex items-center gap-1 shadow-xs cursor-pointer active:scale-98"
              >
                <i className="fa-solid fa-floppy-disk text-[10px]"></i> Guardar
              </button>
            </div>
          </div>

          {/* 3. Alcohol y Bebidas */}
          <div className="bg-surface-soft/60 border border-hairlinesoft p-3.5 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2.5 font-semibold text-ink border-b border-hairlinesoft pb-1.5">
                <div className="flex items-center gap-1.5">
                  <span>🍻 Tragos & Bebidas</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                    No bebedor paga -S/ {calc.discount.toFixed(0)}
                  </span>
                </div>
                <span className="font-mono text-ink text-xs font-semibold">S/ {calc.subtotalAlcohol.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                {(state.alcohol || []).map(item => (
                  <ExpenseItemCard 
                    key={item.id} 
                    item={item} 
                    cat="alcohol" 
                    onUpdateName={onUpdateName}
                    onUpdateQty={onUpdateQty}
                    onUpdateVal={onUpdateVal}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
              </div>
            </div>
            <div className="pt-2.5 border-t border-hairlinesoft flex items-center gap-2">
              <button 
                onClick={() => onAddItem('alcohol')} 
                className="flex-1 py-1.5 px-2 bg-card hover:bg-surface-soft border border-dashed border-hairline rounded-lg text-ink text-[11px] font-medium transition flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
              >
                <i className="fa-solid fa-plus text-[10px]"></i> Añadir bebida
              </button>
              <button 
                onClick={() => onSaveSection('alcohol')} 
                className="py-1.5 px-3 bg-ink hover:bg-black text-white rounded-lg text-[11px] font-semibold transition flex items-center gap-1 shadow-xs cursor-pointer active:scale-98"
              >
                <i className="fa-solid fa-floppy-disk text-[10px]"></i> Guardar
              </button>
            </div>
          </div>

          {/* 4. Alojamiento & Movilidad */}
          <div className="bg-surface-soft/60 border border-hairlinesoft p-3.5 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2.5 font-semibold text-ink border-b border-hairlinesoft pb-1.5">
                <span>{isPuntaSal ? '🏖️ Casa de Playa & Van' : '🏡 Alojamiento & Van'}</span>
                <span className="font-mono text-ink text-xs font-semibold">S/ {calc.subtotalAlojamiento.toFixed(2)}</span>
              </div>

              {isPuntaSal ? (
                /* Card de Alojamiento Punta Sal */
                <div className="mb-3 p-2.5 bg-card border border-hairline rounded-xl space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-semibold text-ink">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-umbrella-beach text-sky-600"></i> Hospedaje en Punta Sal
                    </span>
                    <button 
                      onClick={() => onOpenLightbox('./img/puntasal-hero.png', 'Airbnb Beto (Superanfitrión) - Punta Sal', 'Alojamiento entero en primera línea de playa · 9 huéspedes · 3 habitaciones · 7 camas · 3 baños · S/ 1,594 (S/ 1,600)')}
                      className="text-[10.5px] text-sky-700 hover:underline font-semibold flex items-center gap-1 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200 transition cursor-pointer"
                      title="Ver ficha oficial de reserva en Airbnb"
                    >
                      <i className="fa-solid fa-file-invoice text-[9.5px]"></i> Ver Ficha Airbnb
                    </button>
                  </div>

                  {/* Highlights Banner */}
                  <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-950 text-[11px] leading-snug">
                    <div className="flex items-center justify-between font-semibold text-sky-900">
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-medal text-amber-500"></i> Beto Superanfitrión · ★ 4.8 (56 evaluaciones)
                      </span>
                      <span className="text-[10px] bg-sky-200/60 text-sky-900 px-1.5 py-0.5 rounded font-mono font-bold">
                        Primera línea
                      </span>
                    </div>
                    <p className="text-[10.5px] text-sky-800 mt-1">
                      Casa rústica frente al mar para 8-9 huéspedes (3 hab, 7 camas, 3 baños). Cocina al aire libre, brasero y salida directa a la arena.
                    </p>
                  </div>

                  {/* Quick Option Cards for Punta Sal */}
                  <div className="grid grid-cols-2 gap-1.5 text-[10.5px]">
                    <button
                      onClick={() => onSwitchMode('punta_sal_3noches')}
                      className={`p-2 rounded-lg text-left transition flex flex-col justify-between cursor-pointer ${
                        tripDates?.nights === 3 || tripDates?.preset === 'vie-lun'
                          ? 'border-2 border-sky-600 bg-sky-50 text-sky-950 shadow-2xs font-semibold'
                          : 'border border-hairline bg-surface-soft hover:bg-surface-strong text-ink font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold">Vie 8 - Lun 11 Ene</span>
                        <span className="text-[9.5px] bg-sky-200/70 text-sky-900 px-1 py-0.2 rounded font-bold">3 Noches</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-sky-700 mt-1">
                        S/ {(state.casa3NochesRate ?? 1600.00).toFixed(2)}
                      </span>
                    </button>

                    <button
                      onClick={() => onSwitchMode('punta_sal_2noches')}
                      className={`p-2 rounded-lg text-left transition flex flex-col justify-between cursor-pointer ${
                        tripDates?.nights === 2 || tripDates?.preset === 'vie-dom'
                          ? 'border-2 border-emerald-600 bg-emerald-50 text-emerald-950 shadow-2xs font-semibold'
                          : 'border border-hairline bg-surface-soft hover:bg-surface-strong text-ink font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold">Vie 8 - Dom 10 Ene</span>
                        <span className="text-[9.5px] bg-emerald-200/70 text-emerald-900 px-1 py-0.2 rounded font-bold">2 Noches</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-800 mt-1">
                        S/ {(state.casa2NochesRate ?? 1100.00).toFixed(2)}
                      </span>
                    </button>
                  </div>

                  {/* Editable Rate Inputs */}
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1 border-t border-hairlinesoft">
                    <div className="bg-white/95 p-1.5 rounded-lg border border-hairline">
                      <span className="text-muted text-[10px] block">Tarifa 3 Noches (Vie-Lun):</span>
                      <div className="flex items-center justify-between font-mono font-semibold text-ink mt-0.5">
                        <span className="text-muted text-[10px]">S/</span>
                        <input 
                          type="number" 
                          step="50" 
                          min="0" 
                          value={state.casa3NochesRate ?? 1600.00} 
                          onChange={(e) => onChangeAlojRate('casa_playa', '3noches', parseFloat(e.target.value) || 0)} 
                          className="w-16 text-right bg-transparent focus:outline-none font-mono font-bold text-ink"
                        />
                      </div>
                    </div>

                    <div className="bg-white/95 p-1.5 rounded-lg border border-hairline">
                      <span className="text-muted text-[10px] block">Tarifa 2 Noches (Vie-Dom):</span>
                      <div className="flex items-center justify-between font-mono font-semibold text-ink mt-0.5">
                        <span className="text-muted text-[10px]">S/</span>
                        <input 
                          type="number" 
                          step="50" 
                          min="0" 
                          value={state.casa2NochesRate ?? 1100.00} 
                          onChange={(e) => onChangeAlojRate('casa_playa', '2noches', parseFloat(e.target.value) || 0)} 
                          className="w-16 text-right bg-transparent focus:outline-none font-mono font-bold text-ink"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Selector de Modo con Tarifario Oficial El Bosque */
                <div className="mb-3 p-2.5 bg-card border border-hairline rounded-xl space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-semibold text-ink">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-hotel text-brand"></i> Tipo de Hospedaje
                    </span>
                    <button 
                      onClick={() => onOpenLightbox('./img/tarifario-oficial-elbosque.jpg', 'Tarifario Oficial El Bosque - Sede Chosica', 'Precios oficiales de Bungalows y Departamentos de 1° y 2° Piso')}
                      className="text-[10.5px] text-brand hover:underline font-semibold flex items-center gap-1 bg-brand-subtle px-2 py-0.5 rounded-full border border-brand/20 transition cursor-pointer"
                      title="Ver afiche oficial del club con tarifas exactas"
                    >
                      <i className="fa-solid fa-file-invoice text-[9.5px]"></i> Ver Tarifario Oficial
                    </button>
                  </div>

                  {/* 4 Mode Buttons with Dynamic Badges */}
                  <div className="grid grid-cols-2 gap-1.5 text-[10.5px]">
                    {/* Depa 1 */}
                    <button 
                      onClick={() => onSwitchMode('depa_1')} 
                      className={`p-1.5 rounded-lg text-center transition flex flex-col items-center justify-center cursor-pointer ${
                        mode === 'depa_1' 
                          ? 'border-2 border-emerald-600 bg-emerald-50 text-emerald-950 shadow-2xs font-semibold' 
                          : 'border border-hairline bg-surface-soft hover:bg-surface-strong text-ink font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-bold leading-tight flex items-center gap-1">🏢 Depa 1° Piso</span>
                      <span className="text-[10px] text-emerald-800 leading-tight font-semibold">8 pers · Más Barato</span>
                      <span className="text-[10.5px] font-bold font-mono text-emerald-700 leading-tight">S/ {costDepa1.toFixed(0)}</span>
                    </button>

                    {/* Depa 2 */}
                    <button 
                      onClick={() => onSwitchMode('depa_2')} 
                      className={`p-1.5 rounded-lg text-center transition flex flex-col items-center justify-center cursor-pointer ${
                        mode === 'depa_2' 
                          ? 'border-2 border-blue-600 bg-blue-50 text-blue-950 shadow-2xs font-semibold' 
                          : 'border border-hairline bg-surface-soft hover:bg-surface-strong text-ink font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-medium leading-tight flex items-center gap-1">🏢 Depa 2° Piso</span>
                      <span className="text-[10px] text-muted leading-tight font-mono">8 pers · Balcón</span>
                      <span className="text-[10.5px] font-bold font-mono text-ink leading-tight">S/ {costDepa2.toFixed(0)}</span>
                    </button>

                    {/* 2 Bungalows */}
                    <button 
                      onClick={() => onSwitchMode('2_bungalows')} 
                      className={`p-1.5 rounded-lg text-center transition flex flex-col items-center justify-center cursor-pointer ${
                        mode === '2_bungalows' 
                          ? 'border-2 border-amber-600 bg-amber-50 text-amber-950 shadow-2xs font-semibold' 
                          : 'border border-hairline bg-surface-soft hover:bg-surface-strong text-ink font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-medium leading-tight flex items-center gap-1">🏡 2 Bungalows</span>
                      <span className="text-[10px] text-muted leading-tight font-mono">8 pers (4 c/u)</span>
                      <span className="text-[10.5px] font-bold font-mono text-ink leading-tight">S/ {cost2Bung.toFixed(0)}</span>
                    </button>

                    {/* 1 Bungalow */}
                    <button 
                      onClick={() => onSwitchMode('1_bungalow')} 
                      className={`p-1.5 rounded-lg text-center transition flex flex-col items-center justify-center cursor-pointer ${
                        mode === '1_bungalow' 
                          ? 'border-2 border-ink bg-surface-strong text-ink shadow-2xs font-semibold' 
                          : 'border border-hairline bg-surface-soft hover:bg-surface-strong text-ink font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-medium leading-tight flex items-center gap-1">🏠 1 Bungalow</span>
                      <span className="text-[10px] text-muted leading-tight font-mono">Máx 6 pers</span>
                      <span className="text-[10.5px] font-bold font-mono text-ink leading-tight">S/ {cost1Bung.toFixed(0)}</span>
                    </button>
                  </div>

                  {/* Mode Explanation & Editable Inputs */}
                  <div className="space-y-2 pt-1 border-t border-hairlinesoft text-xs">
                    {mode === 'depa_1' && (
                      <>
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 text-[11px] leading-snug">
                          <div className="flex items-center gap-1 font-semibold text-emerald-900">
                            <i className="fa-solid fa-circle-check text-emerald-600"></i> Departamento 1° Piso (Aforo 8 pers · Más Barato)
                          </div>
                          <p className="text-[10.5px] text-emerald-800 mt-0.5">
                            Tarifa oficial: <strong>S/ 400</strong> (2 noc fin sem), <strong>S/ 200</strong> (1 noc fin sem), <strong>S/ 180</strong> (noche semana). ¡Ahorran S/ {(cost2Bung - costDepa1).toFixed(0)} vs alquilar 2 bungalows!
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                          <div className="bg-white/95 p-1.5 rounded-lg border border-hairline">
                            <span className="text-muted text-[10px] block">
                              {isSabLun || isSabDom ? 'Noche Fin Sem (Sáb-Dom):' : 'Paquete Fin Sem (2 noc Vie-Dom):'}
                            </span>
                            <div className="flex items-center justify-between font-mono font-semibold text-ink mt-0.5">
                              <span className="text-muted text-[10px]">S/</span>
                              <input 
                                type="number" 
                                step="10" 
                                min="0" 
                                value={isSabLun || isSabDom ? state.depa1SingleWeekendRate : state.depa1WeekendRate} 
                                onChange={(e) => onChangeAlojRate('depa_1', 'weekend', parseFloat(e.target.value) || 0)} 
                                className="w-16 text-right bg-transparent focus:outline-none font-mono font-bold text-ink"
                              />
                            </div>
                          </div>
                          {(isSabLun || isVieLun) && (
                            <div className="bg-white/95 p-1.5 rounded-lg border border-hairline">
                              <span className="text-muted text-[10px] block">Noche de semana (Dom-Lun):</span>
                              <div className="flex items-center justify-between font-mono font-semibold text-ink mt-0.5">
                                <span className="text-muted text-[10px]">S/</span>
                                <input 
                                  type="number" 
                                  step="10" 
                                  min="0" 
                                  value={state.depa1WeekdayRate} 
                                  onChange={(e) => onChangeAlojRate('depa_1', 'weekday', parseFloat(e.target.value) || 0)} 
                                  className="w-16 text-right bg-transparent focus:outline-none font-mono font-bold text-ink"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-hairlinesoft text-[11px]">
                          <span className="text-muted">Estadía Depa 1° Piso ({tripDates?.shortLabel}):</span>
                          <span className="font-mono font-bold text-emerald-800">S/ {costDepa1.toFixed(2)}</span>
                        </div>
                      </>
                    )}

                    {mode === 'depa_2' && (
                      <>
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-950 text-[11px] leading-snug">
                          <div className="flex items-center gap-1 font-semibold text-blue-900">
                            <i className="fa-solid fa-building text-blue-600"></i> Departamento 2° Piso (Aforo 8 pers con Balcón)
                          </div>
                          <p className="text-[10.5px] text-blue-800 mt-0.5">
                            Tarifa oficial: <strong>S/ 450</strong> (2 noc fin sem), <strong>S/ 230</strong> (1 noc fin sem), <strong>S/ 200</strong> (noche semana Lun-Jue).
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                          <div className="bg-white/95 p-1.5 rounded-lg border border-hairline">
                            <span className="text-muted text-[10px] block">
                              {isSabLun || isSabDom ? 'Noche Fin Sem (Sáb-Dom):' : 'Paquete Fin Sem (2 noc Vie-Dom):'}
                            </span>
                            <div className="flex items-center justify-between font-mono font-semibold text-ink mt-0.5">
                              <span className="text-muted text-[10px]">S/</span>
                              <input 
                                type="number" 
                                step="10" 
                                min="0" 
                                value={isSabLun || isSabDom ? state.depa2SingleWeekendRate : state.depa2WeekendRate} 
                                onChange={(e) => onChangeAlojRate('depa_2', 'weekend', parseFloat(e.target.value) || 0)} 
                                className="w-16 text-right bg-transparent focus:outline-none font-mono font-bold text-ink"
                              />
                            </div>
                          </div>
                          {(isSabLun || isVieLun) && (
                            <div className="bg-white/95 p-1.5 rounded-lg border border-hairline">
                              <span className="text-muted text-[10px] block">Noche de semana (Dom-Lun):</span>
                              <div className="flex items-center justify-between font-mono font-semibold text-ink mt-0.5">
                                <span className="text-muted text-[10px]">S/</span>
                                <input 
                                  type="number" 
                                  step="10" 
                                  min="0" 
                                  value={state.depa2WeekdayRate} 
                                  onChange={(e) => onChangeAlojRate('depa_2', 'weekday', parseFloat(e.target.value) || 0)} 
                                  className="w-16 text-right bg-transparent focus:outline-none font-mono font-bold text-ink"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-hairlinesoft text-[11px]">
                          <span className="text-muted">Estadía Depa 2° Piso ({tripDates?.shortLabel}):</span>
                          <span className="font-mono font-bold text-blue-900">S/ {costDepa2.toFixed(2)}</span>
                        </div>
                      </>
                    )}

                    {mode === '2_bungalows' && (
                      <>
                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-950 text-[11px] leading-snug">
                          <div className="flex items-center gap-1 font-semibold text-amber-900">
                            <i className="fa-solid fa-house-chimney text-amber-700"></i> Opción 2 Bungalows (4 personas en c/u)
                          </div>
                          <p className="text-[10.5px] text-amber-800 mt-0.5">
                            Tarifa por cabaña: <strong>S/ 350</strong> fin de sem, <strong>S/ 175</strong> una noche, <strong>S/ 150</strong> noche semana. Para 8 personas se alquilan 2 cabañas.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                          <div className="bg-white/95 p-1.5 rounded-lg border border-hairline">
                            <span className="text-muted text-[10px] block">2 x Fin de Sem:</span>
                            <div className="flex items-center justify-between font-mono font-semibold text-ink mt-0.5">
                              <span className="text-muted text-[10px]">S/</span>
                              <input 
                                type="number" 
                                step="10" 
                                min="0" 
                                value={2 * (isSabLun || isSabDom ? state.bungalowSingleWeekendRate : state.bungalowWeekendRate)} 
                                onChange={(e) => onChangeAlojRate('2_bungalows', 'weekend', parseFloat(e.target.value) || 0)} 
                                className="w-16 text-right bg-transparent focus:outline-none font-mono font-bold text-ink"
                              />
                            </div>
                          </div>
                          {(isSabLun || isVieLun) && (
                            <div className="bg-white/95 p-1.5 rounded-lg border border-hairline">
                              <span className="text-muted text-[10px] block">2 x Noche Semana:</span>
                              <div className="flex items-center justify-between font-mono font-semibold text-ink mt-0.5">
                                <span className="text-muted text-[10px]">S/</span>
                                <input 
                                  type="number" 
                                  step="10" 
                                  min="0" 
                                  value={2 * state.bungalowWeekdayRate} 
                                  onChange={(e) => onChangeAlojRate('2_bungalows', 'weekday', parseFloat(e.target.value) || 0)} 
                                  className="w-16 text-right bg-transparent focus:outline-none font-mono font-bold text-ink"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-hairlinesoft text-[11px]">
                          <span className="text-muted">Total 2 Bungalows ({tripDates?.shortLabel}):</span>
                          <span className="font-mono font-bold text-amber-900">S/ {cost2Bung.toFixed(2)}</span>
                        </div>
                      </>
                    )}

                    {mode === '1_bungalow' && (
                      <>
                        <div className="p-2 rounded-lg bg-surface-soft border border-hairline text-ink text-[11px] leading-snug">
                          <div className="flex items-center gap-1 font-semibold text-ink">
                            <i className="fa-solid fa-triangle-exclamation text-amber-600"></i> Opción 1 Bungalow (Aforo máx 6 pers)
                          </div>
                          <p className="text-[10.5px] text-muted mt-0.5">
                            Tarifa por cabaña: <strong>S/ 350</strong> fin de sem, <strong>S/ 175</strong> una noche, <strong>S/ 150</strong> noche semana. Para 8 personas excede aforo regular.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                          <div className="bg-white/95 p-1.5 rounded-lg border border-hairline">
                            <span className="text-muted text-[10px] block">1 x Fin de Sem:</span>
                            <div className="flex items-center justify-between font-mono font-semibold text-ink mt-0.5">
                              <span className="text-muted text-[10px]">S/</span>
                              <input 
                                type="number" 
                                step="10" 
                                min="0" 
                                value={isSabLun || isSabDom ? state.bungalowSingleWeekendRate : state.bungalowWeekendRate} 
                                onChange={(e) => onChangeAlojRate('1_bungalow', 'weekend', parseFloat(e.target.value) || 0)} 
                                className="w-16 text-right bg-transparent focus:outline-none font-mono font-bold text-ink"
                              />
                            </div>
                          </div>
                          {(isSabLun || isVieLun) && (
                            <div className="bg-white/95 p-1.5 rounded-lg border border-hairline">
                              <span className="text-muted text-[10px] block">1 x Noche Semana:</span>
                              <div className="flex items-center justify-between font-mono font-semibold text-ink mt-0.5">
                                <span className="text-muted text-[10px]">S/</span>
                                <input 
                                  type="number" 
                                  step="10" 
                                  min="0" 
                                  value={state.bungalowWeekdayRate} 
                                  onChange={(e) => onChangeAlojRate('1_bungalow', 'weekday', parseFloat(e.target.value) || 0)} 
                                  className="w-16 text-right bg-transparent focus:outline-none font-mono font-bold text-ink"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-hairlinesoft text-[11px]">
                          <span className="text-muted">Total 1 Bungalow ({tripDates?.shortLabel}):</span>
                          <span className="font-mono font-bold text-ink">S/ {cost1Bung.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Items de Alojamiento y Movilidad */}
              <div className="space-y-2">
                {(state.alojamiento || []).map(item => (
                  <ExpenseItemCard 
                    key={item.id} 
                    item={item} 
                    cat="alojamiento" 
                    onUpdateName={onUpdateName}
                    onUpdateQty={onUpdateQty}
                    onUpdateVal={onUpdateVal}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
              </div>
            </div>
            <div className="pt-2.5 border-t border-hairlinesoft flex items-center gap-2">
              <button 
                onClick={() => onAddItem('alojamiento')} 
                className="flex-1 py-1.5 px-2 bg-card hover:bg-surface-soft border border-dashed border-hairline rounded-lg text-ink text-[11px] font-medium transition flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
              >
                <i className="fa-solid fa-plus text-[10px]"></i> Añadir costo hospedaje/movilidad
              </button>
              <button 
                onClick={() => onSaveSection('alojamiento')} 
                className="py-1.5 px-3 bg-ink hover:bg-black text-white rounded-lg text-[11px] font-semibold transition flex items-center gap-1 shadow-xs cursor-pointer active:scale-98"
              >
                <i className="fa-solid fa-floppy-disk text-[10px]"></i> Guardar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
