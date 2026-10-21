import React, { useState } from 'react';
import { REAL_PHOTOS } from '../data/defaultData';

export default function PhotosGallery({ onOpenLightbox }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-hairline rounded-2xl overflow-hidden bg-card shadow-xs transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-ink hover:bg-surface-soft transition cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-camera text-muted"></i>
          <span>Fotos de la Sede Chosica (Bungalows, Piscinas, Parrillas, Laguna, Canchas)</span>
          <span className="text-[11px] font-semibold text-brand bg-brand-subtle px-2.5 py-0.5 rounded-full border border-brand/20">
            11 Fotos Reales
          </span>
        </span>
        <i className={`fa-solid fa-chevron-up text-muted text-xs transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}></i>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-hairlinesoft bg-surface/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REAL_PHOTOS.map(p => (
              <div 
                key={p.id}
                onClick={() => onOpenLightbox(p.file, p.title, p.desc)}
                className="bg-card border border-hairline rounded-3xl p-3.5 sm:p-4 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-surface-soft shadow-2xs">
                    <img 
                      src={p.file} 
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy" 
                    />
                    <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-ink text-[11px] font-semibold px-3 py-1 rounded-full shadow-2xs">
                      {p.tag || 'Sede Chosica'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-ink mt-3.5 group-hover:text-brand transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed mt-1 line-clamp-2">
                    {p.desc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-dashed border-hairlinesoft flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-muted flex items-center gap-1.5">
                    <i className="fa-solid fa-tree text-brand text-[10px]"></i> El Bosque
                  </span>
                  <span className="bg-ink text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold">
                    HD Oficial
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
