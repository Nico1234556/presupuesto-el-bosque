import React from 'react';

export default function Hero({ calc, tripDates, onOpenWhatsAppModal, destination }) {
  const isPuntaSal = destination === 'punta_sal';

  const userItem = calc.memberCalcs.find(x => x.m.isUser) || calc.memberCalcs[0];
  const drinkerFriend = calc.memberCalcs.find(x => x.m.drinks && !x.m.isUser);
  const nonDrinkerFriend = calc.memberCalcs.find(x => !x.m.drinks);

  const drinkerTotal = drinkerFriend ? drinkerFriend.total : calc.X_drinkerBase;
  const nonDrinkerTotal = nonDrinkerFriend ? nonDrinkerFriend.total : (calc.X_drinkerBase - calc.discount);
  const userTotal = userItem ? userItem.total : 0;
  const userExtra = userItem?.m?.extra ?? 100;

  return (
    <section className="space-y-4">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border mb-2 ${
            isPuntaSal 
              ? 'bg-sky-50 text-sky-800 border-sky-200' 
              : 'bg-brand-subtle text-brand border-brand/20'
          }`}>
            <span>{isPuntaSal ? '🏖️' : '✨'}</span>
            <span>
              {isPuntaSal 
                ? 'Casa de Playa Frente al Mar · Primera Línea en Punta Sal (Tumbes)' 
                : 'Fin de Semana Campestre · Sede Chosica'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight font-serif">
            {isPuntaSal ? 'Presupuesto & Cuotas Punta Sal' : 'Presupuesto & Cuotas El Bosque'}
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl font-sans">
            {isPuntaSal 
              ? 'Planificador de casa de playa en Airbnb (Beto Superanfitrión · 9 huéspedes). Configura días, comida para parrilla/brasero, bebidas y cuotas exactas.' 
              : 'Planificador grupal en tiempo real. Configura días, hospedaje oficial del club, comidas y reparto exacto entre amigos.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenWhatsAppModal}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i> Enviar a WhatsApp
          </button>
        </div>
      </div>

      {/* Date & Group Status Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="bg-surface-soft border border-hairline text-ink font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
          <i className={`fa-regular fa-calendar-days ${isPuntaSal ? 'text-sky-600' : 'text-brand'}`}></i> {tripDates?.label}
        </span>
        <span className="bg-surface-soft border border-hairline text-ink font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
          <i className={`fa-solid fa-users ${isPuntaSal ? 'text-sky-600' : 'text-brand'}`}></i> {calc.totalMembers} Participantes
        </span>
        <span className={`${isPuntaSal ? 'bg-sky-700' : 'bg-brand'} text-white font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs`}>
          <i className="fa-solid fa-coins text-amber-300"></i> Total S/ {calc.totalTripBudget.toFixed(2)}
        </span>
      </div>

      {/* 4 KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Viaje */}
        <div className="bg-card border border-hairline rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-muted text-xs">
              <span className="font-medium">Total Viaje</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                isPuntaSal ? 'bg-sky-50 text-sky-800' : 'bg-brand-subtle text-brand'
              }`}>
                {calc.totalMembers} pers
              </span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-extrabold text-ink mt-2">
              S/ {calc.totalTripBudget.toFixed(2)}
            </div>
          </div>
          <div className="text-[11px] text-muted mt-2 pt-2 border-t border-hairlinesoft flex items-center justify-between">
            <span>{isPuntaSal ? 'Casa + Van:' : 'Estadía + Van:'}</span>
            <span className="font-mono font-semibold text-ink">S/ {calc.subtotalAlojamiento.toFixed(0)}</span>
          </div>
        </div>

        {/* Amigo Bebedor */}
        <div className="bg-card border border-hairline rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-muted text-xs">
              <span className="font-medium">Amigo Bebedor</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                {calc.drinkersCount} pers
              </span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-extrabold text-emerald-800 mt-2">
              S/ {drinkerTotal.toFixed(2)}
            </div>
          </div>
          <div className="text-[11px] text-muted mt-2 pt-2 border-t border-hairlinesoft flex items-center justify-between">
            <span>Cuota con alcohol:</span>
            <span className="font-mono font-semibold text-emerald-800">100% consumo</span>
          </div>
        </div>

        {/* Amigo No Bebedor */}
        <div className="bg-card border border-hairline rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-muted text-xs">
              <span className="font-medium">No Bebedor</span>
              <span className="text-[10px] bg-amber-500/10 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                {calc.nonDrinkersCount} pers
              </span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-extrabold text-amber-800 mt-2">
              S/ {nonDrinkerTotal.toFixed(2)}
            </div>
          </div>
          <div className="text-[11px] text-muted mt-2 pt-2 border-t border-hairlinesoft flex items-center justify-between">
            <span>Descuento alcohol:</span>
            <span className="font-mono font-semibold text-amber-800">-S/ {calc.discount.toFixed(0)}</span>
          </div>
        </div>

        {/* Tú Organizador */}
        <div className="bg-card border-2 border-terracotta/40 rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between bg-terracotta-subtle/20">
          <div>
            <div className="flex items-center justify-between text-muted text-xs">
              <span className="font-medium text-terracotta font-semibold">Tú (Organizador)</span>
              <span className="text-[10px] bg-terracotta-subtle text-terracotta font-semibold px-2 py-0.5 rounded-full border border-terracotta/20">
                +S/ {userExtra.toFixed(0)}
              </span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-extrabold text-terracotta mt-2">
              S/ {userTotal.toFixed(2)}
            </div>
          </div>
          <div className="text-[11px] text-muted mt-2 pt-2 border-t border-hairlinesoft flex items-center justify-between">
            <span>Aporte voluntario:</span>
            <span className="font-mono font-semibold text-terracotta">+S/ {userExtra.toFixed(0)} más</span>
          </div>
        </div>
      </div>
    </section>
  );
}
