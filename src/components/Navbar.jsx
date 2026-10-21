import React, { useRef } from 'react';

export default function Navbar({ 
  cloudStatus, 
  onForceCloudSync, 
  onDownloadJSON, 
  onImportJSON, 
  onResetDefaults, 
  onCopyShareLink,
  tripDates,
  activeDestination,
  onSelectDestination
}) {
  const fileInputRef = useRef(null);

  const isPuntaSal = activeDestination === 'punta_sal';

  const getBadgeStyle = () => {
    switch (cloudStatus) {
      case 'saving':
        return {
          bg: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
          text: 'Guardando...',
          dot: 'bg-amber-500 animate-pulse'
        };
      case 'loading':
        return {
          bg: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
          text: 'Conectando...',
          dot: 'bg-blue-500 animate-pulse'
        };
      case 'synced':
        return {
          bg: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20',
          text: 'Nube activa',
          dot: 'bg-emerald-500'
        };
      default:
        return {
          bg: 'bg-surface-soft text-muted border-hairline',
          text: 'Modo local',
          dot: 'bg-muted'
        };
    }
  };

  const badge = getBadgeStyle();

  return (
    <header className="border-b border-hairline bg-paper/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 transition-colors ${
            isPuntaSal ? 'bg-sky-600 border border-sky-400/30' : 'bg-brand border border-brand/20'
          }`}>
            {isPuntaSal ? '🏖️' : '🌳'}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold text-xs sm:text-sm tracking-tight text-ink font-sans truncate">
                {isPuntaSal ? 'Punta Sal Beach House' : 'Country Club El Bosque'}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border hidden lg:inline-block ${
                isPuntaSal 
                  ? 'bg-sky-50 text-sky-800 border-sky-200' 
                  : 'bg-brand-subtle text-brand border-brand/20'
              }`}>
                {isPuntaSal ? 'Tumbes · Primera Línea' : 'Chosica 2026'}
              </span>
            </div>
            <p className="text-[10.5px] sm:text-[11px] text-muted truncate hidden sm:block">
              Presupuesto Colaborativo {tripDates?.shortLabel ? `· ${tripDates.shortLabel}` : ''}
            </p>
          </div>
        </div>

        {/* Destination Switcher Center / Pills */}
        <div className="flex items-center bg-surface-strong/90 p-0.5 sm:p-1 rounded-xl border border-hairline shadow-inner shrink-0">
          <button
            onClick={() => onSelectDestination('el_bosque')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              !isPuntaSal
                ? 'bg-paper text-ink shadow-xs border border-hairline'
                : 'text-muted hover:text-ink'
            }`}
            title="Ver presupuesto Country Club El Bosque (Chosica)"
          >
            <span>🌳</span>
            <span className="hidden sm:inline">El Bosque</span>
            <span className="sm:hidden">Bosque</span>
          </button>
          
          <button
            onClick={() => onSelectDestination('punta_sal')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              isPuntaSal
                ? 'bg-paper text-sky-700 shadow-xs border border-sky-300'
                : 'text-muted hover:text-ink'
            }`}
            title="Ver presupuesto Casa de Playa en Punta Sal (Airbnb)"
          >
            <span>🏖️</span>
            <span className="hidden sm:inline">Punta Sal</span>
            <span className="sm:hidden">Punta Sal</span>
          </button>
        </div>

        {/* Sync & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Cloud Status Pill */}
          <button 
            onClick={onForceCloudSync}
            title="Clic para forzar guardado y sincronizar con todos los amigos"
            className={`inline-flex items-center gap-1.5 text-[11px] px-2 sm:px-3 py-1 rounded-full border transition cursor-pointer ${badge.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
            <span className="font-medium font-sans hidden sm:inline">{badge.text}</span>
          </button>

          {/* Copy Share Link */}
          <button
            onClick={onCopyShareLink}
            className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand bg-brand-subtle hover:bg-brand hover:text-white border border-brand/25 px-2.5 py-1 rounded-lg transition shadow-2xs cursor-pointer"
            title="Copiar enlace con todo el presupuesto para abrir en el celular de tus amigos"
          >
            <i className="fa-solid fa-share-nodes text-[10px]"></i> Compartir Link
          </button>

          {/* Backup dropdown / buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={onDownloadJSON}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-soft hover:bg-surface-strong border border-hairline text-ink flex items-center justify-center text-xs transition cursor-pointer"
              title="Descargar copia de seguridad en JSON"
            >
              <i className="fa-solid fa-download"></i>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-soft hover:bg-surface-strong border border-hairline text-ink flex items-center justify-center text-xs transition cursor-pointer"
              title="Subir archivo JSON de respaldo"
            >
              <i className="fa-solid fa-upload"></i>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={onImportJSON} 
              accept=".json" 
              className="hidden" 
            />

            <button
              onClick={onResetDefaults}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-soft hover:bg-surface-strong border border-hairline text-muted hover:text-terracotta flex items-center justify-center text-xs transition cursor-pointer"
              title="Restablecer presupuesto de este destino a valores originales"
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
