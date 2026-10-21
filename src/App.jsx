import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TripDurationCard from './components/TripDurationCard';
import PernocteCard from './components/PernocteCard';
import MembersTable from './components/MembersTable';
import PurchasesAccordion from './components/PurchasesAccordion';
import PhotosGallery from './components/PhotosGallery';
import ClubRulesAccordion from './components/ClubRulesAccordion';
import LightboxModal from './components/LightboxModal';
import WhatsAppModal from './components/WhatsAppModal';
import Toast from './components/Toast';
import { 
  DEFAULT_DATA_EL_BOSQUE, 
  DEFAULT_DATA_PUNTA_SAL, 
  TRIP_PRESETS_EL_BOSQUE, 
  TRIP_PRESETS_PUNTA_SAL, 
  CLOUD_API_URL 
} from './data/defaultData';
import { calculate, buildAlojamientoItems } from './utils/calculations';

function sanitizeState(parsed, forcedDest = null) {
  const dest = forcedDest || (parsed && parsed.destination === 'punta_sal' ? 'punta_sal' : 'el_bosque');
  const baseDefaults = dest === 'punta_sal' ? DEFAULT_DATA_PUNTA_SAL : DEFAULT_DATA_EL_BOSQUE;
  if (!parsed || typeof parsed !== 'object') return JSON.parse(JSON.stringify(baseDefaults));

  const res = JSON.parse(JSON.stringify(baseDefaults));
  res.destination = dest;

  if (parsed.tripDates && typeof parsed.tripDates === 'object') res.tripDates = parsed.tripDates;
  if (typeof parsed.pernoctarActive === 'boolean') res.pernoctarActive = parsed.pernoctarActive;

  res.pernoctarNightRate = (typeof parsed.pernoctarNightRate === 'number' && parsed.pernoctarNightRate >= 0)
    ? parsed.pernoctarNightRate
    : (dest === 'punta_sal' ? 0.00 : 35.00);

  if (dest === 'punta_sal') {
    res.casa3NochesRate = typeof parsed.casa3NochesRate === 'number' ? parsed.casa3NochesRate : 1600.00;
    res.casa2NochesRate = typeof parsed.casa2NochesRate === 'number' ? parsed.casa2NochesRate : 1100.00;
    res.casa1NocheRate = typeof parsed.casa1NocheRate === 'number' ? parsed.casa1NocheRate : 600.00;
    res.alojamientoMode = 'casa_playa';
  } else {
    // Alojamiento mode El Bosque
    if (['depa_1', 'depa_2', '2_bungalows', '1_bungalow'].includes(parsed.alojamientoMode)) {
      res.alojamientoMode = parsed.alojamientoMode;
    } else if (parsed.alojamientoMode === 'departamento') {
      res.alojamientoMode = 'depa_1';
    } else if (parsed.alojamiento && parsed.alojamiento.some(a => a.name.includes('2 Bungalow'))) {
      res.alojamientoMode = '2_bungalows';
    } else {
      res.alojamientoMode = 'depa_1';
    }

    // Rates El Bosque
    res.depa1WeekendRate = typeof parsed.depa1WeekendRate === 'number' ? parsed.depa1WeekendRate : 400.00;
    res.depa1SingleWeekendRate = typeof parsed.depa1SingleWeekendRate === 'number' ? parsed.depa1SingleWeekendRate : 200.00;
    res.depa1WeekdayRate = typeof parsed.depa1WeekdayRate === 'number' ? parsed.depa1WeekdayRate : 180.00;

    res.depa2WeekendRate = typeof parsed.depa2WeekendRate === 'number' ? parsed.depa2WeekendRate : 450.00;
    res.depa2SingleWeekendRate = typeof parsed.depa2SingleWeekendRate === 'number' ? parsed.depa2SingleWeekendRate : 230.00;
    res.depa2WeekdayRate = typeof parsed.depa2WeekdayRate === 'number' ? parsed.depa2WeekdayRate : 200.00;

    res.bungalowWeekendRate = typeof parsed.bungalowWeekendRate === 'number' ? parsed.bungalowWeekendRate : 350.00;
    res.bungalowSingleWeekendRate = typeof parsed.bungalowSingleWeekendRate === 'number' ? parsed.bungalowSingleWeekendRate : 175.00;
    res.bungalowWeekdayRate = typeof parsed.bungalowWeekdayRate === 'number' ? parsed.bungalowWeekdayRate : 150.00;
  }

  if (parsed.yapeNumber) res.yapeNumber = parsed.yapeNumber;
  if (typeof parsed.nonDrinkerDiscount === 'number') res.nonDrinkerDiscount = parsed.nonDrinkerDiscount;
  res.userExtra = (typeof parsed.userExtra === 'number' && parsed.userExtra !== 60.00) ? parsed.userExtra : 100.00;

  if (Array.isArray(parsed.comida) && parsed.comida.length > 0) res.comida = parsed.comida;
  if (Array.isArray(parsed.cremas) && parsed.cremas.length > 0) res.cremas = parsed.cremas;
  if (Array.isArray(parsed.alcohol) && parsed.alcohol.length > 0) res.alcohol = parsed.alcohol;

  // Alojamiento items
  if (Array.isArray(parsed.alojamiento) && parsed.alojamiento.length > 0) {
    res.alojamiento = parsed.alojamiento;
  } else {
    res.alojamiento = buildAlojamientoItems(res.alojamientoMode, res.tripDates, res);
  }

  if (Array.isArray(parsed.members) && parsed.members.length > 0) {
    res.members = parsed.members.map(m => {
      let sleepNights = 3;
      if (typeof m.sleepNights === 'number') {
        sleepNights = m.sleepNights;
      } else if (typeof m.sleeps === 'boolean') {
        sleepNights = m.sleeps ? (res.tripDates?.nights || 3) : 0;
      } else {
        sleepNights = res.tripDates?.nights || 3;
      }
      let extra = typeof m.extra === 'number' ? m.extra : 0.00;
      if (m.isUser && (extra === 60.00 || extra === 0.00)) extra = 100.00;
      return {
        ...m,
        extra,
        sleeps: sleepNights > 0,
        sleepNights
      };
    });
  } else {
    res.members = JSON.parse(JSON.stringify(baseDefaults.members));
  }

  if (parsed._clientTimestamp) res._clientTimestamp = parsed._clientTimestamp;
  return res;
}

function loadInitialDestination() {
  if (typeof window !== 'undefined' && window.location.hash) {
    if (window.location.hash.includes('punta-sal')) return 'punta_sal';
    if (window.location.hash.includes('el-bosque')) return 'el_bosque';
  }
  try {
    const savedDest = localStorage.getItem('active_destination_v1');
    if (savedDest === 'punta_sal' || savedDest === 'el_bosque') return savedDest;
  } catch (e) {}
  return 'el_bosque';
}

function loadInitialState(destination) {
  // 1. From URL Hash
  if (typeof window !== 'undefined' && window.location.hash && window.location.hash.includes('s=')) {
    try {
      const parts = window.location.hash.split('s=');
      if (parts.length > 1) {
        const raw = decodeURIComponent(parts[1]);
        const parsed = JSON.parse(decodeURIComponent(escape(atob(raw))));
        if (parsed && parsed.members) {
          const dest = parsed.destination || destination;
          return sanitizeState(parsed, dest);
        }
      }
    } catch (e) {}
  }

  // 2. From LocalStorage
  try {
    const storageKey = destination === 'punta_sal' ? 'punta_sal_v1' : 'el_bosque_v8';
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.members) {
        return sanitizeState(parsed, destination);
      }
    }
  } catch (e) {}

  return JSON.parse(JSON.stringify(destination === 'punta_sal' ? DEFAULT_DATA_PUNTA_SAL : DEFAULT_DATA_EL_BOSQUE));
}

export default function App() {
  const [destination, setDestination] = useState(() => loadInitialDestination());
  const [state, setState] = useState(() => loadInitialState(loadInitialDestination()));
  const [cloudStatus, setCloudStatus] = useState('synced'); // 'synced' | 'saving' | 'loading' | 'local'
  const [toast, setToast] = useState({ message: '', visible: false });
  const [lightbox, setLightbox] = useState({ isOpen: false, image: '', title: '', desc: '' });
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const syncTimerRef = useRef(null);

  // Show Toast Helper
  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2800);
  };

  // Save State and Trigger Debounced Cloud Sync
  const saveState = (newState, syncToCloud = true) => {
    const currentDest = newState.destination || destination;
    const updated = {
      ...newState,
      destination: currentDest,
      _clientTimestamp: Date.now()
    };
    setState(updated);

    const storageKey = currentDest === 'punta_sal' ? 'punta_sal_v1' : 'el_bosque_v8';
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      localStorage.setItem('active_destination_v1', currentDest);
    } catch (e) {}

    if (syncToCloud) {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
      setCloudStatus('saving');
      syncTimerRef.current = setTimeout(async () => {
        try {
          const res = await fetch(CLOUD_API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: `Presupuesto ${currentDest === 'punta_sal' ? 'Punta Sal (Playa)' : 'El Bosque (Chosica)'}`,
              data: updated
            })
          });
          if (res.ok) {
            setCloudStatus('synced');
          } else {
            setCloudStatus('local');
          }
        } catch (e) {
          setCloudStatus('local');
        }
      }, 1200);
    }
  };

  // Switch Destination
  const handleSelectDestination = (newDest) => {
    if (newDest === destination) return;

    // Save current destination before switching
    const currentStorageKey = destination === 'punta_sal' ? 'punta_sal_v1' : 'el_bosque_v8';
    try {
      localStorage.setItem(currentStorageKey, JSON.stringify(state));
      localStorage.setItem('active_destination_v1', newDest);
    } catch (e) {}

    // Load or initialize target destination state
    const nextState = loadInitialState(newDest);
    setDestination(newDest);
    setState(nextState);

    // Update URL hash without reloads
    try {
      window.history.replaceState(null, '', newDest === 'punta_sal' ? '#punta-sal' : '#el-bosque');
    } catch (e) {}

    showToast(newDest === 'punta_sal' 
      ? '🏖️ Cambiado a Casa de Playa en Punta Sal' 
      : '🌳 Cambiado a Country Club El Bosque');
  };

  // Initial Cloud Load
  useEffect(() => {
    async function fetchFromCloud() {
      if (window.location.hash && window.location.hash.includes('s=')) {
        setCloudStatus('synced');
        return;
      }
      try {
        setCloudStatus('loading');
        const res = await fetch(CLOUD_API_URL);
        if (res.ok) {
          const result = await res.json();
          if (result && result.data && result.data.members && result.data.members.length > 0) {
            const cloudDest = result.data.destination || 'el_bosque';
            if (cloudDest === destination) {
              const cloudTimestamp = result.data._clientTimestamp || 0;
              const localTimestamp = state._clientTimestamp || 0;
              const storageKey = destination === 'punta_sal' ? 'punta_sal_v1' : 'el_bosque_v8';
              if (cloudTimestamp > localTimestamp || !localStorage.getItem(storageKey)) {
                const sanitized = sanitizeState(result.data, destination);
                setState(sanitized);
                localStorage.setItem(storageKey, JSON.stringify(sanitized));
              }
            }
          }
        }
        setCloudStatus('synced');
      } catch (e) {
        setCloudStatus('local');
      }
    }
    fetchFromCloud();
  }, [destination]);

  // Compute calculated values
  const calc = calculate(state);

  // Presets table according to destination
  const activePresets = destination === 'punta_sal' ? TRIP_PRESETS_PUNTA_SAL : TRIP_PRESETS_EL_BOSQUE;

  // --- Handlers ---
  const handleSetPreset = (presetKey) => {
    const preset = activePresets[presetKey] || TRIP_PRESETS_EL_BOSQUE[presetKey];
    if (!preset) return;

    // Adjust friend pernocte nights
    const updatedMembers = state.members.map(m => {
      let nights = typeof m.sleepNights === 'number' ? m.sleepNights : (m.sleeps ? preset.nights : 0);
      if (nights > preset.nights) nights = preset.nights;
      else if (m.sleeps && nights === 2 && preset.nights === 3) nights = 3;
      return {
        ...m,
        sleeps: nights > 0,
        sleepNights: nights
      };
    });

    const newDates = { ...preset };
    const newAlojItems = buildAlojamientoItems(state.alojamientoMode || 'depa_1', newDates, {
      ...state,
      destination
    });

    saveState({
      ...state,
      tripDates: newDates,
      members: updatedMembers,
      alojamiento: newAlojItems
    });
    showToast(`Días actualizados: ${preset.label}`);
  };

  const handleStepNights = (delta) => {
    const current = state.tripDates?.nights || 3;
    const newNights = Math.max(1, Math.min(7, current + delta));
    if (destination === 'punta_sal') {
      if (newNights >= 3) handleSetPreset('vie-lun');
      else if (newNights === 2) handleSetPreset('vie-dom');
      else handleSetPreset('sab-dom');
    } else {
      if (newNights === 3) handleSetPreset('vie-lun');
      else if (newNights === 2) {
        if (state.tripDates?.preset === 'sab-lun') handleSetPreset('sab-lun');
        else handleSetPreset('vie-dom');
      } else if (newNights === 1) handleSetPreset('sab-dom');
    }
  };

  const handleTogglePernocte = (val) => {
    saveState({
      ...state,
      pernoctarActive: val
    });
    showToast(val ? 'Cobro de pernocte activado' : 'Cobro de pernocte desactivado');
  };

  const handleChangeNightRate = (rate) => {
    saveState({
      ...state,
      pernoctarNightRate: rate
    });
  };

  const handleSetAllNights = (nights) => {
    const updated = state.members.map(m => ({
      ...m,
      sleepNights: nights,
      sleeps: nights > 0
    }));
    saveState({
      ...state,
      members: updated,
      pernoctarActive: nights > 0 ? true : state.pernoctarActive
    });
    showToast(`Asignadas ${nights} noches a todos los participantes`);
  };

  const handleStepSleepNights = (id, delta) => {
    const maxNights = state.tripDates?.nights || 3;
    const updated = state.members.map(m => {
      if (m.id !== id) return m;
      const cur = typeof m.sleepNights === 'number' ? m.sleepNights : (m.sleeps ? maxNights : 0);
      const next = Math.max(0, Math.min(maxNights, cur + delta));
      return {
        ...m,
        sleepNights: next,
        sleeps: next > 0
      };
    });
    saveState({
      ...state,
      members: updated,
      pernoctarActive: true
    });
  };

  const handleCycleSleepNights = (id) => {
    const maxNights = state.tripDates?.nights || 3;
    const updated = state.members.map(m => {
      if (m.id !== id) return m;
      const cur = typeof m.sleepNights === 'number' ? m.sleepNights : (m.sleeps ? maxNights : 0);
      const next = (cur >= maxNights) ? 0 : (cur + 1);
      return {
        ...m,
        sleepNights: next,
        sleeps: next > 0
      };
    });
    saveState({
      ...state,
      members: updated,
      pernoctarActive: true
    });
  };

  const handleToggleDrink = (id) => {
    const updated = state.members.map(m => m.id === id ? { ...m, drinks: !m.drinks } : m);
    saveState({ ...state, members: updated });
  };

  const handleUpdateName = (id, name) => {
    const updated = state.members.map(m => m.id === id ? { ...m, name } : m);
    saveState({ ...state, members: updated }, false);
  };

  const handleUpdateExtra = (id, extra) => {
    const updated = state.members.map(m => m.id === id ? { ...m, extra } : m);
    saveState({ ...state, members: updated });
  };

  const handleTogglePaid = (id) => {
    const updated = state.members.map(m => m.id === id ? { ...m, paid: !m.paid } : m);
    saveState({ ...state, members: updated });
  };

  const handleAddFriend = () => {
    const num = state.members.length + 1;
    const tripNights = state.tripDates?.nights || 3;
    const newFriend = {
      id: 'm_' + Date.now(),
      name: `Invitado ${num}`,
      drinks: true,
      sleeps: state.pernoctarActive,
      sleepNights: state.pernoctarActive ? tripNights : 0,
      extra: 0.00,
      paid: false
    };
    saveState({
      ...state,
      members: [...state.members, newFriend]
    });
    showToast(`Amigo añadido: Invitado ${num}`);
  };

  const handleRemoveFriend = (id) => {
    if (state.members.length <= 1) return;
    saveState({
      ...state,
      members: state.members.filter(m => m.id !== id)
    });
    showToast('Participante eliminado');
  };

  // Products CRUD
  const handleUpdateItemName = (cat, id, name) => {
    const updated = (state[cat] || []).map(item => item.id === id ? { ...item, name } : item);
    saveState({ ...state, [cat]: updated }, false);
  };

  const handleUpdateItemQty = (cat, id, qty) => {
    const updated = (state[cat] || []).map(item => item.id === id ? { ...item, qty } : item);
    saveState({ ...state, [cat]: updated }, false);
  };

  const handleUpdateItemVal = (cat, id, total) => {
    const updated = (state[cat] || []).map(item => item.id === id ? { ...item, total } : item);
    saveState({ ...state, [cat]: updated }, false);
  };

  const handleAddItem = (cat) => {
    const newItem = {
      id: cat[0] + '_' + Date.now(),
      name: 'Nuevo producto',
      qty: '1 unid.',
      total: 0.00
    };
    saveState({
      ...state,
      [cat]: [...(state[cat] || []), newItem]
    });
    showToast('Producto añadido');
  };

  const handleRemoveItem = (cat, id) => {
    saveState({
      ...state,
      [cat]: (state[cat] || []).filter(item => item.id !== id)
    });
    showToast('Producto eliminado');
  };

  // Accommodation Mode & Rates
  const handleSwitchMode = (newMode) => {
    if (destination === 'punta_sal') {
      if (newMode === 'punta_sal_3noches') {
        handleSetPreset('vie-lun');
      } else if (newMode === 'punta_sal_2noches') {
        handleSetPreset('vie-dom');
      }
      return;
    }

    const newItems = buildAlojamientoItems(newMode, state.tripDates, state);
    saveState({
      ...state,
      alojamientoMode: newMode,
      alojamiento: newItems
    });
    const labels = {
      'depa_1': '🏢 Depa 1° Piso (8 pers)',
      'depa_2': '🏢 Depa 2° Piso (8 pers)',
      '2_bungalows': '🏡 2 Bungalows (8 pers)',
      '1_bungalow': '🏠 1 Bungalow (6 pers)'
    };
    showToast(`${labels[newMode] || newMode} seleccionado`);
  };

  const handleChangeAlojRate = (mode, field, val) => {
    const updated = { ...state, destination };
    const isSingleWeekend = (state.tripDates?.preset === 'sab-lun' || state.tripDates?.preset === 'sab-dom');

    if (destination === 'punta_sal') {
      if (field === '3noches') updated.casa3NochesRate = val;
      else if (field === '2noches') updated.casa2NochesRate = val;
      else if (field === '1noche') updated.casa1NocheRate = val;
    } else {
      if (mode === 'depa_1') {
        if (field === 'weekend') {
          if (isSingleWeekend) updated.depa1SingleWeekendRate = val;
          else updated.depa1WeekendRate = val;
        } else if (field === 'weekday') updated.depa1WeekdayRate = val;
      } else if (mode === 'depa_2') {
        if (field === 'weekend') {
          if (isSingleWeekend) updated.depa2SingleWeekendRate = val;
          else updated.depa2WeekendRate = val;
        } else if (field === 'weekday') updated.depa2WeekdayRate = val;
      } else if (mode === '2_bungalows') {
        if (field === 'weekend') {
          if (isSingleWeekend) updated.bungalowSingleWeekendRate = val / 2;
          else updated.bungalowWeekendRate = val / 2;
        } else if (field === 'weekday') updated.bungalowWeekdayRate = val / 2;
      } else if (mode === '1_bungalow') {
        if (field === 'weekend') {
          if (isSingleWeekend) updated.bungalowSingleWeekendRate = val;
          else updated.bungalowWeekendRate = val;
        } else if (field === 'weekday') updated.bungalowWeekdayRate = val;
      }
    }

    updated.alojamiento = buildAlojamientoItems(updated.alojamientoMode, state.tripDates, updated);
    saveState(updated);
  };

  const handleSaveSection = (sec) => {
    saveState(state, true);
    const labels = {
      fechas: 'Días y duración',
      pernocte: 'Cobro de pernocte',
      amigos: 'Padrón de amigos y cuotas',
      comida: 'Carnes y comida',
      cremas: 'Cremas y carbón',
      alcohol: 'Tragos y bebidas',
      alojamiento: destination === 'punta_sal' ? 'Casa de playa y movilidad' : 'Alojamiento y movilidad'
    };
    showToast(`💾 ¡${labels[sec] || 'Cambios'} guardado! Presupuesto actualizado`);
  };

  const handleForceCloudSync = async () => {
    setCloudStatus('saving');
    try {
      const res = await fetch(CLOUD_API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Presupuesto ${destination === 'punta_sal' ? 'Punta Sal (Playa)' : 'El Bosque (Chosica)'}`,
          data: { ...state, destination, _clientTimestamp: Date.now() }
        })
      });
      if (res.ok) {
        setCloudStatus('synced');
        showToast('¡Sincronizado con la nube exitosamente!');
      } else {
        setCloudStatus('local');
      }
    } catch (e) {
      setCloudStatus('local');
    }
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `presupuesto-${destination}-${state.tripDates?.preset || 'viaje'}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Copia JSON descargada');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (parsed && parsed.members) {
          const dest = parsed.destination || destination;
          const sanitized = sanitizeState(parsed, dest);
          setDestination(dest);
          saveState(sanitized);
          showToast('¡Datos cargados exitosamente desde JSON!');
        } else {
          alert('El archivo JSON no tiene el formato del presupuesto.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    const targetName = destination === 'punta_sal' ? 'Punta Sal (Playa)' : 'El Bosque (Chosica)';
    if (confirm(`¿Restablecer el presupuesto de ${targetName} a sus valores originales?`)) {
      const storageKey = destination === 'punta_sal' ? 'punta_sal_v1' : 'el_bosque_v8';
      localStorage.removeItem(storageKey);
      window.location.hash = destination === 'punta_sal' ? '#punta-sal' : '#el-bosque';
      const def = JSON.parse(JSON.stringify(destination === 'punta_sal' ? DEFAULT_DATA_PUNTA_SAL : DEFAULT_DATA_EL_BOSQUE));
      saveState(def);
      showToast(`Presupuesto de ${targetName} restablecido`);
    }
  };

  const handleCopyShareLink = () => {
    try {
      const raw = btoa(unescape(encodeURIComponent(JSON.stringify({ ...state, destination }))));
      const url = `${window.location.origin}${window.location.pathname}#${destination}&s=${encodeURIComponent(raw)}`;
      navigator.clipboard.writeText(url).then(() => {
        showToast('Enlace copiado con todos los cambios y productos');
      });
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col font-sans selection:bg-brand selection:text-white pb-16">
      {/* Navbar with Header Destination Switcher */}
      <Navbar
        cloudStatus={cloudStatus}
        onForceCloudSync={handleForceCloudSync}
        onDownloadJSON={handleDownloadJSON}
        onImportJSON={handleImportJSON}
        onResetDefaults={handleResetDefaults}
        onCopyShareLink={handleCopyShareLink}
        tripDates={state.tripDates}
        activeDestination={destination}
        onSelectDestination={handleSelectDestination}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 flex-1 w-full">
        {/* Hero & KPIs */}
        <Hero 
          calc={calc} 
          tripDates={state.tripDates} 
          onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
          destination={destination}
        />

        {/* Top Controls Row: 1. Duración del Viaje & 2. Cobro de Pernocte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TripDurationCard 
            tripDates={state.tripDates} 
            onSetPreset={handleSetPreset} 
            onStepNights={handleStepNights} 
            onSaveSection={handleSaveSection}
            destination={destination}
          />

          <PernocteCard 
            pernoctarActive={state.pernoctarActive} 
            nightRate={state.pernoctarNightRate || (destination === 'punta_sal' ? 0.00 : 35.00)} 
            calc={calc} 
            onTogglePernocte={handleTogglePernocte} 
            onChangeNightRate={handleChangeNightRate} 
            onSetAllNights={handleSetAllNights} 
            onSaveSection={handleSaveSection}
            destination={destination}
          />
        </div>

        {/* 3. Padrón de Amigos y Cuotas */}
        <MembersTable 
          calc={calc} 
          onUpdateName={handleUpdateName} 
          onToggleDrink={handleToggleDrink} 
          onStepSleepNights={handleStepSleepNights} 
          onCycleSleepNights={handleCycleSleepNights} 
          onUpdateExtra={handleUpdateExtra} 
          onTogglePaid={handleTogglePaid} 
          onAddFriend={handleAddFriend} 
          onRemoveFriend={handleRemoveFriend} 
          onSaveSection={handleSaveSection} 
        />

        {/* 4. Compras y Alojamiento */}
        <PurchasesAccordion 
          state={state} 
          calc={calc} 
          onUpdateName={handleUpdateItemName} 
          onUpdateQty={handleUpdateItemQty} 
          onUpdateVal={handleUpdateItemVal} 
          onAddItem={handleAddItem} 
          onRemoveItem={handleRemoveItem} 
          onSwitchMode={handleSwitchMode} 
          onChangeAlojRate={handleChangeAlojRate} 
          onOpenLightbox={(img, title, desc) => setLightbox({ isOpen: true, image: img, title, desc })} 
          onSaveSection={handleSaveSection} 
        />

        {/* 5. Galería de Fotos (El Bosque o Punta Sal) */}
        <PhotosGallery 
          onOpenLightbox={(img, title, desc) => setLightbox({ isOpen: true, image: img, title, desc })} 
          destination={destination}
        />

        {/* 6. Normas / Reglamento */}
        <ClubRulesAccordion destination={destination} />
      </main>

      {/* Footer */}
      <footer className="border-t border-hairline py-6 text-center text-xs text-muted max-w-6xl mx-auto px-4 w-full">
        <p>
          {destination === 'punta_sal' 
            ? 'Casa de Playa en Punta Sal · Tumbes · Planificador de Viaje 2027' 
            : 'Country Club El Bosque — Sede Campestre Chosica · Planificador de Viaje 2026'}
        </p>
        <p className="text-[11px] text-muted/70 mt-1">
          {state.tripDates?.label} · Todos los cambios se guardan localmente y en la nube en tiempo real.
        </p>
      </footer>

      {/* Modals & Popups */}
      <LightboxModal 
        isOpen={lightbox.isOpen} 
        image={lightbox.image} 
        title={lightbox.title} 
        desc={lightbox.desc} 
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))} 
      />

      <WhatsAppModal 
        isOpen={isWhatsAppOpen} 
        onClose={() => setIsWhatsAppOpen(false)} 
        state={state} 
        calc={calc} 
        onUpdateYape={(val) => setState(prev => ({ ...prev, yapeNumber: val }))} 
        onShowToast={showToast}
        destination={destination}
      />

      <Toast 
        message={toast.message} 
        visible={toast.visible} 
      />
    </div>
  );
}
