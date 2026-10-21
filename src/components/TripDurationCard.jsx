import React from 'react';
import { TRIP_PRESETS_EL_BOSQUE, TRIP_PRESETS_PUNTA_SAL } from '../data/defaultData';

export default function TripDurationCard({ 
  tripDates, 
  onSetPreset, 
  onStepNights, 
  onSaveSection,
  destination
}) {
  const isPuntaSal = destination === 'punta_sal';
  const currentPreset = tripDates?.preset;
  const currentNights = tripDates?.nights || 3;

  return (
    <div className="bg-card border border-hairline rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-ink flex items-center gap-1.5">
            <i className={`fa-regular fa-calendar-days ${isPuntaSal ? 'text-sky-600' : 'text-amber-600'}`}></i> Duración & Días
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold uppercase border ${
            isPuntaSal 
              ? 'bg-sky-50 text-sky-800 border-sky-200' 
              : 'bg-amber-500/10 text-amber-700 border-amber-500/20'
          }`}>
            {currentNights} Noche{currentNights > 1 ? 's' : ''}
          </span>
        </div>
        <p className="text-xs text-muted mt-1">
          {isPuntaSal
            ? 'Elige las fechas en Punta Sal. 3 noches (Vie a Lun S/ 1,600) o 2 noches (Vie a Dom S/ 1,100):'
            : 'Elige los días de viaje. Las cuotas, fechas y mensajes se recalculan al instante:'}
        </p>
      </div>

      <div className="space-y-2">
        {/* 4 Presets Grid */}
        <div className="grid grid-cols-2 gap-1.5">
          {/* Vie-Lun */}
          <button
            onClick={() => onSetPreset('vie-lun')}
            className={`px-2 py-1.5 rounded-lg text-center text-[11px] transition shadow-2xs cursor-pointer ${
              currentPreset === 'vie-lun'
                ? isPuntaSal
                  ? 'font-semibold border-2 border-sky-600 bg-sky-50 text-sky-950'
                  : 'font-semibold border-2 border-brand bg-brand-subtle text-brand'
                : 'font-medium border border-hairline bg-surface-soft text-ink hover:bg-surface-strong'
            }`}
          >
            Vie-Lun<br />
            <span className="text-[10px] font-semibold text-sky-800">
              {isPuntaSal ? '3 Noc · S/ 1,600 ★' : '3 Noches ★'}
            </span>
          </button>

          {/* Vie-Dom (o Sab-Lun) */}
          <button
            onClick={() => onSetPreset(isPuntaSal ? 'vie-dom' : 'sab-lun')}
            className={`px-2 py-1.5 rounded-lg text-center text-[11px] transition shadow-2xs cursor-pointer ${
              currentPreset === (isPuntaSal ? 'vie-dom' : 'sab-lun')
                ? 'font-semibold border-2 border-emerald-600 bg-emerald-50 text-emerald-950'
                : 'font-medium border border-hairline bg-surface-soft text-ink hover:bg-surface-strong'
            }`}
          >
            {isPuntaSal ? 'Vie-Dom' : 'Sáb-Lun'}<br />
            <span className="text-[10px] text-emerald-800 font-semibold">
              {isPuntaSal ? '2 Noc · S/ 1,100 ⚡' : '2 Noc ⚡ Más Barato'}
            </span>
          </button>

          {/* Sab-Lun (en Punta Sal) / Vie-Dom (en El Bosque) */}
          <button
            onClick={() => onSetPreset(isPuntaSal ? 'sab-lun' : 'vie-dom')}
            className={`px-2 py-1.5 rounded-lg text-center text-[11px] transition shadow-2xs cursor-pointer ${
              currentPreset === (isPuntaSal ? 'sab-lun' : 'vie-dom')
                ? isPuntaSal
                  ? 'font-semibold border-2 border-sky-600 bg-sky-50 text-sky-950'
                  : 'font-semibold border-2 border-brand bg-brand-subtle text-brand'
                : 'font-medium border border-hairline bg-surface-soft text-ink hover:bg-surface-strong'
            }`}
          >
            {isPuntaSal ? 'Sáb-Lun' : 'Vie-Dom'}<br />
            <span className="text-[10px] text-muted">
              {isPuntaSal ? '2 Noches · S/ 1,100' : '2 Noches'}
            </span>
          </button>

          {/* Sáb-Dom */}
          <button
            onClick={() => onSetPreset('sab-dom')}
            className={`px-2 py-1.5 rounded-lg text-center text-[11px] transition shadow-2xs cursor-pointer ${
              currentPreset === 'sab-dom'
                ? isPuntaSal
                  ? 'font-semibold border-2 border-sky-600 bg-sky-50 text-sky-950'
                  : 'font-semibold border-2 border-brand bg-brand-subtle text-brand'
                : 'font-medium border border-hairline bg-surface-soft text-ink hover:bg-surface-strong'
            }`}
          >
            Sáb-Dom<br />
            <span className="text-[10px] text-muted">
              {isPuntaSal ? '1 Noche · S/ 600' : '1 Noche'}
            </span>
          </button>
        </div>

        {/* Stepper manual */}
        <div className="flex items-center justify-between pt-1 border-t border-hairlinesoft text-xs">
          <span className="text-muted text-[11px]">Ajustar noches (+ / -):</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onStepNights(-1)}
              className="w-6 h-6 rounded-md bg-surface-soft hover:bg-surface-strong border border-hairline flex items-center justify-center text-ink text-xs font-bold transition cursor-pointer"
              title="Quitar 1 noche"
            >
              -
            </button>
            <span className="font-mono font-bold text-xs text-ink px-1.5">
              {currentNights}
            </span>
            <button
              onClick={() => onStepNights(1)}
              className="w-6 h-6 rounded-md bg-surface-soft hover:bg-surface-strong border border-hairline flex items-center justify-center text-ink text-xs font-bold transition cursor-pointer"
              title="Agregar 1 noche"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => onSaveSection('fechas')}
          className="w-full mt-2 py-1.5 px-2 bg-ink hover:bg-black text-white rounded-lg text-[11px] font-semibold transition flex items-center justify-center gap-1 shadow-xs cursor-pointer active:scale-98"
        >
          <i className="fa-solid fa-floppy-disk text-[10px]"></i> Guardar Días
        </button>
      </div>
    </div>
  );
}
