import React, { useState } from 'react';
import { CLUB_RULES } from '../data/defaultData';

export default function ClubRulesAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-hairline rounded-2xl overflow-hidden bg-card shadow-xs transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-ink hover:bg-surface-soft transition cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-circle-info text-brand"></i>
          <span>Reglamento Oficial de El Bosque (Garita, Pernocte & Convivencia)</span>
          <span className="text-[11px] font-semibold text-muted bg-surface-soft px-2.5 py-0.5 rounded-full border border-hairline">
            5 Normas Clave
          </span>
        </span>
        <i className={`fa-solid fa-chevron-up text-muted text-xs transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}></i>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-hairlinesoft bg-surface-soft/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CLUB_RULES.map((rule, idx) => (
            <div key={idx} className="bg-card border border-hairline rounded-xl p-3 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                <i className={`fa-solid ${rule.icon} text-brand text-[11px]`}></i>
                <span>{rule.title}</span>
              </div>
              <p className="text-[11px] text-muted leading-relaxed">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
