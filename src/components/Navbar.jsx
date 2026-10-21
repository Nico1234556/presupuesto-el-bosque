import React, { useRef } from 'react';

export default function Navbar({ 
  cloudStatus, 
  onForceCloudSync, 
  onDownloadJSON, 
  onImportJSON, 
  onResetDefaults, 
  onCopyShareLink,
  tripDates
}) {
  const fileInputRef = useRef(null);

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
    <nav className="border-b border-hairline bg-paper/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-sm shadow-xs border border-brand/20">
            🌳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-ink font-sans">
                Country Club El Bosque
              </span>
              <span className="text-[10px] bg-brand-subtle text-brand font-semibold px-2 py-0.5 rounded-full border border-brand/20 hidden sm:inline-block">
                Chosica 2026
              </span>
            </div>
            <p className="text-[11px] text-muted hidden sm:block">
              Presupuesto Colaborativo {tripDates?.shortLabel ? `· ${tripDates.shortLabel}` : ''}
            </p>
          </div>
        </div>

        {/* Sync & Actions */}
        <div className="flex items-center gap-2">
          {/* Cloud Status Pill */}
          <button 
            onClick={onForceCloudSync}
            title="Clic para forzar guardado y sincronizar con todos los amigos"
            className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 sm:px-3 py-1 rounded-full border transition cursor-pointer ${badge.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
            <span className="font-medium font-sans">{badge.text}</span>
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
              className="w-8 h-8 rounded-lg bg-surface-soft hover:bg-surface-strong border border-hairline text-ink flex items-center justify-center text-xs transition"
              title="Descargar copia de seguridad en JSON"
            >
              <i className="fa-solid fa-download"></i>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-8 h-8 rounded-lg bg-surface-soft hover:bg-surface-strong border border-hairline text-ink flex items-center justify-center text-xs transition"
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
              className="w-8 h-8 rounded-lg bg-surface-soft hover:bg-surface-strong border border-hairline text-muted hover:text-terracotta flex items-center justify-center text-xs transition"
              title="Restablecer presupuesto a valores por defecto"
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
