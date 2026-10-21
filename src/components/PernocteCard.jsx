import React from 'react';

export default function PernocteCard({ 
  pernoctarActive, 
  nightRate, 
  calc, 
  onTogglePernocte, 
  onChangeNightRate, 
  onSetAllNights, 
  onSaveSection 
}) {
  return (
    <div className={`bg-card rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 flex flex-col justify-between transition-all ${
      pernoctarActive ? 'border-2 border-brand' : 'border border-hairline'
    }`}>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-ink flex items-center gap-1.5">
            <i className="fa-solid fa-bed text-amber-700"></i> Cobro de Pernocte
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold uppercase ${
            pernoctarActive 
              ? 'bg-brand text-white' 
              : 'bg-surface-soft text-muted border border-hairline'
          }`}>
            {pernoctarActive ? `Activo: S/ ${nightRate.toFixed(0)}/noche` : 'Desactivado (S/ 0)'}
          </span>
        </div>
        <p className="text-xs text-muted mt-1">
          Tasa oficial del club por invitado que pernocta. Modifica la tarifa diaria o las noches de cada amigo:
        </p>
      </div>

      <div className="space-y-2.5">
        {/* Rate input & Toggle switch */}
        <div className="flex items-center justify-between pt-1 border-t border-hairlinesoft gap-2">
          <div className="flex items-center text-xs font-mono text-muted gap-1.5 bg-surface-soft border border-hairline rounded-lg px-2.5 py-1">
            <span className="text-muted/70 text-[11px]">Tarifa:</span>
            <span className="text-ink font-semibold">S/</span>
            <input 
              type="number" 
              value={nightRate} 
              step="5" 
              min="0" 
              onChange={(e) => onChangeNightRate(parseFloat(e.target.value) || 0)} 
              className="w-12 bg-transparent text-ink font-semibold text-right focus:outline-none" 
              title="Precio en S/ por persona por cada noche de pernocte"
            />
            <span className="text-[10px] text-muted">/ noche</span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer select-none" title="Activar o desactivar cobro de pernocte en todo el grupo">
            <input 
              type="checkbox" 
              checked={pernoctarActive} 
              onChange={(e) => onTogglePernocte(e.target.checked)} 
              className="sr-only peer" 
            />
            <div className="w-12 h-6 bg-hairline peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ink shadow-inner"></div>
            <span className={`ml-2 text-xs font-semibold font-mono ${pernoctarActive ? 'text-ink' : 'text-muted'}`}>
              {pernoctarActive ? 'ON' : 'OFF'}
            </span>
          </label>
        </div>

        {/* Bulk assign buttons */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span>Asignar noches a los {calc.totalMembers} participantes:</span>
            <span className="font-mono text-ink font-medium">
              {pernoctarActive 
                ? `${calc.totalGuestNights} noches (S/ ${calc.pernocteTotal.toFixed(0)})` 
                : 'Desactivado (S/ 0)'}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-[11px] font-mono">
            <button 
              onClick={() => onSetAllNights(3)} 
              className="py-1 px-1 bg-surface-soft hover:bg-surface-strong border border-hairlinesoft rounded text-center transition cursor-pointer" 
              title="Asignar 3 noches a todos (S/ 105 c/u)"
            >
              3 noc.<br /><span className="text-[10px] text-brand font-semibold">S/105</span>
            </button>
            <button 
              onClick={() => onSetAllNights(2)} 
              className="py-1 px-1 bg-surface-soft hover:bg-surface-strong border border-hairlinesoft rounded text-center transition cursor-pointer" 
              title="Asignar 2 noches a todos (S/ 70 c/u)"
            >
              2 noc.<br /><span className="text-[10px] text-brand font-semibold">S/70</span>
            </button>
            <button 
              onClick={() => onSetAllNights(1)} 
              className="py-1 px-1 bg-surface-soft hover:bg-surface-strong border border-hairlinesoft rounded text-center transition cursor-pointer" 
              title="Asignar 1 noche a todos (S/ 35 c/u)"
            >
              1 noc.<br /><span className="text-[10px] text-brand font-semibold">S/35</span>
            </button>
            <button 
              onClick={() => onSetAllNights(0)} 
              className="py-1 px-1 bg-surface-soft hover:bg-surface-strong border border-hairlinesoft rounded text-center transition cursor-pointer" 
              title="Asignar 0 noches a todos"
            >
              0 noc.<br /><span className="text-[10px] text-muted font-medium">S/0</span>
            </button>
          </div>
        </div>

        <button 
          onClick={() => onSaveSection('pernocte')} 
          className="w-full py-1.5 px-2 bg-surface-strong hover:bg-ink hover:text-white border border-hairline rounded-lg text-ink text-[11px] font-semibold transition flex items-center justify-center gap-1 shadow-xs cursor-pointer active:scale-98"
        >
          <i className="fa-solid fa-floppy-disk text-[10px]"></i> Guardar Pernocte
        </button>
      </div>
    </div>
  );
}
