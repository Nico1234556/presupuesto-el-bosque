import React, { useEffect, useRef, useState } from 'react';

export default function WhatsAppModal({ 
  isOpen, 
  onClose, 
  state, 
  calc, 
  onUpdateYape, 
  onShowToast 
}) {
  const dialogRef = useRef(null);
  const [copied, setCopied] = useState(false);

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

  const yape = state.yapeNumber || '987 654 321';
  const tripDates = state.tripDates;
  const nightRate = state.pernoctarNightRate || 35.00;

  // Build Share URL with encoded state
  let shareUrl = '';
  try {
    const raw = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
    shareUrl = `${window.location.origin}${window.location.pathname}#s=${encodeURIComponent(raw)}`;
  } catch (e) {
    shareUrl = window.location.href;
  }

  const stayTotal = (state.alojamiento || []).filter(a => a.id === 'al1' || a.id === 'al2').reduce((acc, c) => acc + (parseFloat(c.total) || 0), 0);
  const vanTotal = (state.alojamiento || []).filter(a => a.id === 'al3' || a.name.includes('Movilidad') || a.name.includes('Van')).reduce((acc, c) => acc + (parseFloat(c.total) || 0), 0);

  let alojText = '';
  let alojCierre = '';
  let lugarEstadia = 'Sede Campestre Chosica';

  if (state.alojamientoMode === 'depa_1' || state.alojamientoMode === 'departamento') {
    alojText = `🏢 *Alojamiento:* Departamento 1° Piso (aforo oficial 8 pers) = S/ ${stayTotal.toFixed(0)} + Van S/ ${vanTotal.toFixed(0)} = S/ ${(stayTotal + vanTotal).toFixed(0)} (¡Tarifa Oficial Más Económica!)`;
    alojCierre = `¡Envíen captura al transferir para cerrar la reserva del Departamento 1° Piso! 🏊‍♂️🏢`;
    lugarEstadia = `Sede Campestre Chosica (Depa 1° Piso para 8 pers & Parrilla)`;
  } else if (state.alojamientoMode === 'depa_2') {
    alojText = `🏢 *Alojamiento:* Departamento 2° Piso con Balcón (aforo oficial 8 pers) = S/ ${stayTotal.toFixed(0)} + Van S/ ${vanTotal.toFixed(0)} = S/ ${(stayTotal + vanTotal).toFixed(0)}`;
    alojCierre = `¡Envíen captura al transferir para cerrar la reserva del Departamento 2° Piso! 🏊‍♂️🏢`;
    lugarEstadia = `Sede Campestre Chosica (Depa 2° Piso con Balcón para 8 pers & Parrilla)`;
  } else if (state.alojamientoMode === '1_bungalow') {
    alojText = `🏠 *Alojamiento:* 1 Bungalow (aforo máx 6 pers) = S/ ${stayTotal.toFixed(0)} + Van S/ ${vanTotal.toFixed(0)} = S/ ${(stayTotal + vanTotal).toFixed(0)}`;
    alojCierre = `¡Envíen captura al transferir para cerrar el bungalow! 🏊‍♂️🥩`;
    lugarEstadia = `Sede Campestre Chosica (1 Bungalow & Parrilla)`;
  } else {
    alojText = `🏡 *Alojamiento:* 2 Bungalows (aforo máx 6 pers c/u) = S/ ${stayTotal.toFixed(0)} + Van S/ ${vanTotal.toFixed(0)} = S/ ${(stayTotal + vanTotal).toFixed(0)}`;
    alojCierre = `¡Envíen captura al transferir para cerrar los 2 bungalows! 🏊‍♂️🥩`;
    lugarEstadia = `Sede Campestre Chosica (2 Bungalows & Parrilla)`;
  }

  let msg = `🌴 *COUNTRY CLUB EL BOSQUE (CHOSICA)* 🌴\n`;
  msg += `📅 *Fecha:* ${tripDates?.label}\n`;
  msg += `📍 *Lugar:* ${lugarEstadia}\n`;
  msg += `👥 *Participantes:* ${calc.totalMembers} personas (${calc.drinkersCount} beben / ${calc.nonDrinkersCount} no beben)\n`;
  msg += `${alojText}\n`;
  msg += `🌙 *Pernoctar:* ${state.pernoctarActive ? `S/ ${nightRate.toFixed(0)}/noche por invitado (${calc.totalGuestNights} noches-persona = S/ ${calc.pernocteTotal.toFixed(0)})` : 'S/ 0 (Desactivado / No aplica)'}\n`;
  msg += `------------------------------------\n`;
  msg += `💰 *Presupuesto total:* S/ ${calc.totalTripBudget.toFixed(2)}\n`;
  msg += `🍻 *Bebedores:* Cuota base (S/ ${(calc.X_drinkerBase).toFixed(2)})\n`;
  msg += `🥤 *No bebedores:* S/ ${calc.discount.toFixed(0)} MENOS (S/ ${(calc.X_drinkerBase - calc.discount).toFixed(2)})\n\n`;

  msg += `👥 *CUOTAS INDIVIDUALES:*\n`;
  calc.memberCalcs.forEach(item => {
    const m = item.m;
    const status = m.paid ? '✅ Pagó' : '⏳ Pendiente';
    const tags = [];
    if (!m.drinks) tags.push(`no toma -${calc.discount.toFixed(0)}`);
    if (item.pernocteCost > 0) tags.push(`pernocta ${item.nights} noc. +S/${item.pernocteCost.toFixed(0)}`);
    if (m.extra > 0) tags.push(`+S/${m.extra} extra`);
    const tagStr = tags.length > 0 ? ` (${tags.join(', ')})` : '';
    msg += `• *${m.name}:* S/ ${item.total.toFixed(2)}${tagStr} [${status}]\n`;
  });

  msg += `\n🔗 *Ver y editar presupuesto en vivo:*\n${shareUrl}\n`;
  msg += `\n💳 *Yape / Plin:* ${yape}\n`;
  msg += `${alojCierre}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(msg).then(() => {
      setCopied(true);
      onShowToast('¡Mensaje copiado para WhatsApp!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="p-0 bg-transparent backdrop:bg-black/75 backdrop:backdrop-blur-xs max-w-xl w-[92vw] rounded-3xl outline-none shadow-2xl m-auto"
    >
      <div className="bg-card border border-hairline rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-hairlinesoft flex items-center justify-between bg-emerald-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <i className="fa-brands fa-whatsapp text-lg"></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                Mensaje para el Grupo de WhatsApp
              </h3>
              <p className="text-[11px] text-emerald-800">
                Copia y pega directamente en el chat grupal con tus amigos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface-soft hover:bg-surface-strong text-muted hover:text-ink flex items-center justify-center transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3 overflow-y-auto">
          {/* Yape number input */}
          <div className="flex items-center gap-2 bg-surface-soft border border-hairline rounded-xl px-3 py-1.5 text-xs">
            <span className="font-semibold text-ink shrink-0">💳 Tu Yape/Plin:</span>
            <input
              type="text"
              value={state.yapeNumber || ''}
              onChange={(e) => onUpdateYape(e.target.value)}
              placeholder="Ej. 987 654 321 (Tú)"
              className="w-full bg-transparent font-mono text-ink text-xs focus:outline-none"
            />
          </div>

          {/* Textarea preview */}
          <textarea
            readOnly
            value={msg}
            rows="12"
            className="w-full bg-surface-soft border border-hairline rounded-xl p-3 text-ink font-mono text-[11px] leading-relaxed focus:outline-none resize-none"
          ></textarea>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-surface/50 border-t border-hairlinesoft flex items-center justify-between gap-2">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl border border-hairline bg-white hover:bg-surface-soft text-ink text-xs font-semibold transition cursor-pointer"
          >
            Cerrar
          </button>
          <button
            onClick={copyToClipboard}
            className="py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer active:scale-98"
          >
            <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
            {copied ? '¡Copiado!' : 'Copiar para WhatsApp'}
          </button>
        </div>
      </div>
    </dialog>
  );
}
