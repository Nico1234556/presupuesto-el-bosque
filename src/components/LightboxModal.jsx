import React, { useEffect, useRef } from 'react';

export default function LightboxModal({ isOpen, image, title, desc, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        // Light dismiss on backdrop click
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      className="p-0 bg-transparent backdrop:bg-black/85 backdrop:backdrop-blur-sm max-w-4xl w-[92vw] rounded-3xl outline-none shadow-2xl m-auto"
    >
      <div className="bg-card border border-hairline rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="p-3.5 sm:p-4 border-b border-hairlinesoft flex items-center justify-between bg-surface/50">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-ink">
              {title || 'Fotografía de Country Club El Bosque'}
            </h3>
            {desc && (
              <p className="text-xs text-muted mt-0.5 max-w-xl">
                {desc}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-soft hover:bg-surface-strong text-ink flex items-center justify-center transition cursor-pointer shrink-0 ml-2"
            title="Cerrar (Esc)"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Image Content */}
        <div className="relative bg-black flex items-center justify-center max-h-[75vh] overflow-hidden">
          <img
            src={image}
            alt={title || 'Imagen El Bosque'}
            className="max-h-[75vh] w-auto max-w-full object-contain select-none"
          />
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-3.5 bg-surface-soft/60 border-t border-hairlinesoft flex items-center justify-between text-xs text-muted font-mono">
          <span>{image}</span>
          <span className="bg-ink text-white text-[10px] px-2.5 py-0.5 rounded-full font-semibold">
            Oficial El Bosque
          </span>
        </div>
      </div>
    </dialog>
  );
}
