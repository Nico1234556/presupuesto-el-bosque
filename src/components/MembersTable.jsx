import React from 'react';

export default function MembersTable({ 
  calc, 
  onUpdateName, 
  onToggleDrink, 
  onStepSleepNights, 
  onCycleSleepNights, 
  onUpdateExtra, 
  onTogglePaid, 
  onAddFriend, 
  onRemoveFriend, 
  onSaveSection 
}) {
  const pct = calc.totalTripBudget > 0 ? Math.round((calc.totalCollected / calc.totalTripBudget) * 100) : 0;

  return (
    <div className="bg-card border border-hairline rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Title & Progress Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairlinesoft pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-ink font-sans flex items-center gap-1.5">
              <i className="fa-solid fa-users text-brand"></i> Padrón de Participantes & Cuotas
            </h3>
            <span className="text-[10px] bg-brand-subtle text-brand font-semibold px-2 py-0.5 rounded-full border border-brand/20">
              {calc.totalMembers} Personas
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Fórmula equitativa: no bebedores pagan S/ {calc.discount.toFixed(0)} menos de alcohol. Tú aportas +S/ 100 extra.
          </p>
        </div>

        {/* Collection Bar */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-muted block uppercase tracking-wider font-semibold">Recaudado</span>
            <span className="font-mono text-xs font-bold text-ink">
              S/ {calc.totalCollected.toFixed(2)} ({pct}%)
            </span>
          </div>
          <div className="w-24 h-2 bg-surface-soft rounded-full overflow-hidden border border-hairlinesoft">
            <div 
              className="h-full bg-emerald-600 transition-all duration-300" 
              style={{ width: `${Math.min(100, pct)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-hairlinesoft text-muted text-[11px] font-medium">
              <th className="py-2 px-2">Participante</th>
              <th className="py-2 px-2 text-center">¿Toma?</th>
              <th className="py-2 px-2 text-center">Pernocte</th>
              <th className="py-2 px-2 text-right">Extra</th>
              <th className="py-2 px-2 text-right font-semibold text-ink">Total Cuota</th>
              <th className="py-2 px-2 text-center">Estado</th>
              <th className="py-2 px-1 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairlinesoft">
            {calc.memberCalcs.map(item => {
              const m = item.m;
              return (
                <tr key={m.id} className="hover:bg-surface-soft/60 transition">
                  {/* Name */}
                  <td className="py-2.5 px-2 min-w-[170px]">
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="text" 
                        value={m.name} 
                        onChange={(e) => onUpdateName(m.id, e.target.value)} 
                        className="bg-white border border-hairline hover:border-ink/40 focus:border-ink rounded-lg px-2 py-1 text-ink text-xs font-semibold focus:outline-none transition shadow-2xs w-full max-w-[170px]" 
                        placeholder="Nombre amigo..."
                      />
                      {m.isUser && (
                        <span className="text-[10px] bg-terracotta-subtle text-terracotta font-semibold px-2 py-0.5 rounded-full border border-terracotta/20 shrink-0">
                          Tú (+{(m.extra || 100).toFixed(0)})
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Drinks */}
                  <td className="py-2.5 px-2 text-center">
                    <button 
                      onClick={() => onToggleDrink(m.id)} 
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                        m.drinks 
                          ? 'bg-surface-soft text-ink border border-hairline' 
                          : 'bg-surface-strong text-muted line-through'
                      }`}
                    >
                      {m.drinks ? 'Sí' : `No (-${calc.discount.toFixed(0)})`}
                    </button>
                  </td>

                  {/* Sleep Nights Stepper */}
                  <td className="py-2 px-2 text-center">
                    <div className="inline-flex items-center bg-white border border-hairline rounded-lg p-0.5 shadow-2xs">
                      <button 
                        onClick={() => onStepSleepNights(m.id, -1)} 
                        className="w-6 h-6 rounded hover:bg-surface-soft text-muted hover:text-ink font-bold text-xs flex items-center justify-center transition active:scale-95 cursor-pointer" 
                        title="Quitar 1 noche de pernocte"
                      >
                        -
                      </button>
                      
                      <button 
                        onClick={() => onCycleSleepNights(m.id)} 
                        className="px-2 py-0.5 text-center transition cursor-pointer hover:bg-surface-soft/60 rounded" 
                        title="Clic para alternar noches"
                      >
                        <div className={`font-mono text-xs font-bold leading-tight ${item.pernocteCost > 0 ? 'text-brand' : 'text-muted'}`}>
                          {item.nights} noc
                        </div>
                        <div className={`text-[10px] font-mono leading-tight ${item.pernocteCost > 0 ? 'text-emerald-700 font-semibold' : 'text-muted/60'}`}>
                          {item.pernocteCost > 0 ? `+S/${item.pernocteCost.toFixed(0)}` : 'S/0'}
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => onStepSleepNights(m.id, 1)} 
                        className="w-6 h-6 rounded hover:bg-surface-soft text-muted hover:text-ink font-bold text-xs flex items-center justify-center transition active:scale-95 cursor-pointer" 
                        title="Añadir 1 noche de pernocte"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Extra */}
                  <td className="py-2.5 px-2 text-right">
                    <input 
                      type="number" 
                      step="5" 
                      value={m.extra} 
                      onChange={(e) => onUpdateExtra(m.id, parseFloat(e.target.value) || 0)} 
                      className="w-14 text-right font-mono text-ink bg-surface-soft border border-hairline rounded-md px-1.5 py-0.5 text-xs focus:outline-none focus:border-ink"
                    />
                  </td>

                  {/* Total Cell */}
                  <td className="py-2.5 px-2 text-right font-mono font-bold text-ink text-xs sm:text-sm">
                    S/ {item.total.toFixed(2)}
                  </td>

                  {/* Paid Status Toggle */}
                  <td className="py-2.5 px-2 text-center">
                    <button 
                      onClick={() => onTogglePaid(m.id)} 
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                        m.paid 
                          ? 'bg-brand-subtle text-brand border border-brand/20 font-semibold' 
                          : 'bg-surface-soft text-muted hover:text-ink border border-hairlinesoft'
                      }`}
                    >
                      {m.paid ? '✓ Pagó' : '○ Pendiente'}
                    </button>
                  </td>

                  {/* Remove Button */}
                  <td className="py-2.5 px-1 text-center">
                    {!m.isUser && (
                      <button 
                        onClick={() => onRemoveFriend(m.id)} 
                        className="text-muted hover:text-terracotta p-1 transition cursor-pointer" 
                        title="Eliminar amigo"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-hairlinesoft">
        <button 
          onClick={onAddFriend} 
          className="w-full sm:w-auto py-1.5 px-3 bg-card hover:bg-surface-soft border border-dashed border-hairline rounded-lg text-ink text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <i className="fa-solid fa-user-plus text-[11px] text-brand"></i> Añadir Amigo
        </button>

        <button 
          onClick={() => onSaveSection('amigos')} 
          className="w-full sm:w-auto py-1.5 px-4 bg-ink hover:bg-black text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
        >
          <i className="fa-solid fa-floppy-disk text-[11px]"></i> Guardar Padrón & Cuotas
        </button>
      </div>
    </div>
  );
}
