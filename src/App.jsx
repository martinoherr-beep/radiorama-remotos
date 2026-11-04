import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Radio, 
  Plus, 
  Clock, 
  MapPin, 
  User, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Sparkles,
  List,
  Grid,
  Info
} from 'lucide-react';

const INITIAL_REMOTOS = [
  {
    id: 1,
    cliente: "Llantas San José",
    fecha: "2026-11-07",
    horaInicio: "11:00",
    horaFin: "12:00",
    locutor: "Por asignar",
    tecnico: "Por asignar",
    estacion: "La Rancherita",
    estado: "Confirmado",
    lugar: "Sucursal Principal",
    notas: "Control de 11:00 AM a 12:00 PM"
  },
  {
    id: 2,
    cliente: "Llantas San José (Tarde)",
    fecha: "2026-11-07",
    horaInicio: "12:30",
    horaFin: "13:30",
    locutor: "Por asignar",
    tecnico: "Por asignar",
    estacion: "La Rancherita",
    estado: "Confirmado",
    lugar: "Sucursal Principal",
    notas: "Segundo bloque 12:30 PM"
  },
  {
    id: 3,
    cliente: "Moto Refa",
    fecha: "2026-11-13",
    horaInicio: "11:00",
    horaFin: "12:00",
    locutor: "Por asignar",
    tecnico: "Por asignar",
    estacion: "EXA FM",
    estado: "Confirmado",
    lugar: "Local comercial",
    notas: "Transmisión en vivo"
  },
  {
    id: 4,
    cliente: "Llantas Chihuahua",
    fecha: "2026-11-14",
    horaInicio: "11:00",
    horaFin: "12:00",
    locutor: "Por asignar",
    tecnico: "Por asignar",
    estacion: "La Maxima",
    estado: "Confirmado",
    lugar: "Matriz",
    notas: "Remoto matutino"
  },
  {
    id: 5,
    cliente: "5030 (Gerardo)",
    fecha: "2026-11-14",
    horaInicio: "10:00",
    horaFin: "11:00",
    locutor: "Gerardo",
    tecnico: "Por asignar",
    estacion: "La Rancherita",
    estado: "Confirmado",
    lugar: "Instalaciones cliente",
    notas: "Atendido por Gerardo"
  },
  {
    id: 6,
    cliente: "Firestone",
    fecha: "2026-11-21",
    horaInicio: "10:00",
    horaFin: "12:00",
    locutor: "Por asignar",
    tecnico: "Por asignar",
    estacion: "EXA FM",
    estado: "Pendiente",
    lugar: "Centro de servicio",
    notas: "Pendiente confirmar horario"
  }
];

export default function App() {
  const [remotos, setRemotos] = useState(INITIAL_REMOTOS);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1));
  const [viewMode, setViewMode] = useState('calendar');
  const [filterEstacion, setFilterEstacion] = useState('Todas');
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [newRemoto, setNewRemoto] = useState({
    cliente: '',
    fecha: '2026-11-01',
    horaInicio: '10:00',
    horaFin: '11:00',
    locutor: '',
    tecnico: '',
    estacion: 'La Rancherita',
    estado: 'Confirmado',
    lugar: '',
    notas: ''
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const filteredRemotos = remotos.filter(r => {
    if (filterEstacion !== 'Todas' && r.estacion !== filterEstacion) return false;
    return true;
  });

  const getRemotosForDay = (dayNumber) => {
    const formattedDay = dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
    const formattedMonth = (month + 1) < 10 ? `0${month + 1}` : `${month + 1}`;
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

    return filteredRemotos.filter(r => r.fecha === dateStr);
  };

  const handleCreateRemoto = (e) => {
    e.preventDefault();
    if (!newRemoto.cliente || !newRemoto.fecha) return;

    const created = { ...newRemoto, id: Date.now() };
    setRemotos([...remotos, created]);
    setShowModal(false);
    setNewRemoto({
      cliente: '',
      fecha: '2026-11-01',
      horaInicio: '10:00',
      horaFin: '11:00',
      locutor: '',
      tecnico: '',
      estacion: 'La Rancherita',
      estado: 'Confirmado',
      lugar: '',
      notas: ''
    });
  };

  const selectedDayRemotos = selectedDay ? getRemotosForDay(selectedDay) : [];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col antialiased">
      {/* Navbar */}
      <header className="bg-slate-800/95 backdrop-blur border-b border-slate-700 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-red-600 to-amber-500 rounded-xl shadow-lg shrink-0">
              <Radio className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                RADIORAMA
                <span className="text-[10px] md:text-xs px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded-full border border-red-500/30 font-semibold">
                  Remotos
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">Control de eventos y agenda comercial</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-700/80 flex gap-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  viewMode === 'calendar' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Calendario
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  viewMode === 'list' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" /> Lista
              </button>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:from-red-500 hover:to-red-400 shadow-md transition active:scale-95"
            >
              <Plus className="w-4 h-4" /> Nuevo Control
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setShowModal(true)}
              className="p-2 bg-red-600 text-white rounded-lg active:scale-95 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button 
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-700/50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700 p-3 space-y-2 bg-slate-800 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setViewMode('calendar'); setMobileMenuOpen(false); }}
                className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 ${
                  viewMode === 'calendar' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Calendario
              </button>
              <button
                onClick={() => { setViewMode('list'); setMobileMenuOpen(false); }}
                className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 ${
                  viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                <List className="w-3.5 h-3.5" /> Lista
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 pb-28 md:pb-6">

        {/* Bar de Controles */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-slate-800/80 p-3 sm:p-4 rounded-xl border border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <button 
              onClick={handlePrevMonth}
              className="p-2 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base sm:text-lg font-bold text-white min-w-[140px] text-center">
              {monthNames[month]} {year}
            </h2>
            <button 
              onClick={handleNextMonth}
              className="p-2 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block shrink-0" />
            <select
              value={filterEstacion}
              onChange={(e) => setFilterEstacion(e.target.value)}
              className="w-full sm:w-auto bg-slate-900 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-red-500"
            >
              <option value="Todas">Todas las Estaciones</option>
              <option value="La Rancherita">La Rancherita</option>
              <option value="EXA FM">EXA FM</option>
              <option value="La Maxima">La Maxima</option>
            </select>
          </div>
        </div>

        {/* Vista Calendario de Dimensiones Rígidas y Perfectas */}
        {viewMode === 'calendar' ? (
          <div className="bg-slate-800/60 rounded-xl sm:rounded-2xl border border-slate-700/60 p-1.5 sm:p-4 md:p-6 shadow-xl overflow-hidden">
            {/* Cabecera Días */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, idx) => (
                <div key={d + idx} className={`text-[11px] sm:text-xs font-bold py-1 ${idx === 0 || idx === 6 ? 'text-red-400' : 'text-slate-400'}`}>
                  <span className="sm:hidden">{d}</span>
                  <span className="hidden sm:inline">{['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'][idx]}</span>
                </div>
              ))}
            </div>

            {/* Rejilla de Cuadros con Medida Exacta e Inflexible */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-20 sm:h-28 bg-slate-900/20 rounded-lg border border-slate-800/30 opacity-20" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dayRemotos = getRemotosForDay(dayNum);
                const hasRemotos = dayRemotos.length > 0;
                const isSelected = selectedDay === dayNum;

                return (
                  <div
                    key={`day-${dayNum}`}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`h-20 sm:h-28 p-1 sm:p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative ${
                      isSelected
                        ? 'bg-slate-700 border-red-500 ring-2 ring-red-500/50 shadow-lg'
                        : hasRemotos 
                          ? 'bg-slate-800 border-red-500/70 hover:border-red-400 shadow-sm' 
                          : 'bg-slate-800/40 border-slate-700/30 hover:bg-slate-700/30'
                    }`}
                  >
                    {/* Header del día */}
                    <div className="flex items-center justify-between w-full shrink-0">
                      <span className={`text-[11px] sm:text-sm font-bold ${hasRemotos ? 'text-white' : 'text-slate-400'}`}>
                        {dayNum}
                      </span>
                      {hasRemotos && (
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                      )}
                    </div>

                    {/* Contenido en Pantalla Completa/Tablet (Squeeze con Truncate) */}
                    <div className="hidden sm:flex flex-col gap-1 my-auto overflow-hidden">
                      {dayRemotos.slice(0, 2).map(r => (
                        <div key={r.id} className="bg-slate-900/90 border border-slate-700/80 rounded px-1.5 py-0.5 text-[10px] shrink-0">
                          <div className="font-semibold text-red-400 truncate">{r.cliente}</div>
                          <div className="text-[9px] text-slate-300 truncate">{r.horaInicio} hrs</div>
                        </div>
                      ))}
                      {dayRemotos.length > 2 && (
                        <div className="text-[8px] text-slate-400 font-bold text-center">
                          +{dayRemotos.length - 2} más
                        </div>
                      )}
                    </div>

                    {/* Contenido en Celular (Texto súper limpio con bordes protegidos) */}
                    <div className="sm:hidden flex flex-col justify-center items-center my-auto w-full overflow-hidden px-0.5">
                      {hasRemotos ? (
                        <div className="w-full text-center space-y-0.5">
                          <p className="text-[9px] font-bold text-red-400 leading-tight truncate w-full">
                            {dayRemotos[0].cliente}
                          </p>
                          <p className="text-[8px] text-slate-300 font-medium leading-none">
                            {dayRemotos[0].horaInicio} hrs
                          </p>
                          {dayRemotos.length > 1 && (
                            <span className="inline-block text-[8px] font-bold bg-red-500/20 text-red-300 px-1 rounded border border-red-500/30 leading-none mt-0.5">
                              +{dayRemotos.length - 1}
                            </span>
                          )}
                        </div>
                      ) : null}
                    </div>

                    {/* Pie de cuadro para desktop */}
                    {hasRemotos && (
                      <div className="hidden sm:block text-[9px] text-slate-400 font-medium text-right shrink-0 truncate">
                        {dayRemotos.length} evento{dayRemotos.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Vista Lista */
          <div className="space-y-3">
            {filteredRemotos.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/40 rounded-xl border border-slate-700">
                <Radio className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">No hay controles remotos agendados.</p>
              </div>
            ) : (
              filteredRemotos.map(r => (
                <div 
                  key={r.id} 
                  className="bg-slate-800 rounded-xl border border-slate-700/70 p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md hover:border-red-500/50 transition"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-[10px] sm:text-xs rounded-md">
                        {r.estacion}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3 text-slate-500" /> {r.fecha}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white">{r.cliente}</h3>

                    <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-4 text-xs text-slate-300">
                      <span className="flex items-center gap-1 text-amber-300 font-medium">
                        <Clock className="w-3.5 h-3.5 shrink-0" /> {r.horaInicio} - {r.horaFin} hrs
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 shrink-0" /> {r.lugar}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <User className="w-3.5 h-3.5 shrink-0" /> Locutor: {r.locutor}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-700/60">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                      r.estado === 'Confirmado' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {r.estado === 'Confirmado' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {r.estado}
                    </span>
                    <p className="text-[11px] text-slate-400">{r.notas}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Panel Inferior Flotante al Tocar Día */}
        {selectedDay && viewMode === 'calendar' && (
          <div className="fixed bottom-0 left-0 right-0 bg-slate-800/95 border-t border-red-500/40 backdrop-blur-md p-4 z-40 shadow-2xl rounded-t-2xl animate-in slide-in-from-bottom duration-200">
            <div className="max-w-7xl mx-auto space-y-3">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-red-500" />
                  <h3 className="text-sm font-bold text-white">
                    Eventos del día {selectedDay} de {monthNames[month]}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedDay(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg bg-slate-700/50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selectedDayRemotos.length === 0 ? (
                <p className="text-xs text-slate-400 py-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500" /> No hay remotos programados para este día.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {selectedDayRemotos.map(r => (
                    <div key={r.id} className="bg-slate-900/90 border border-slate-700 p-3 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-red-400">{r.cliente}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-red-500/20 text-red-300 rounded border border-red-500/30 font-semibold">
                          {r.estacion}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-400" /> {r.horaInicio} - {r.horaFin}</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-400" /> Loc: {r.locutor}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" /> {r.lugar}
                      </div>
                      {r.notas && <p className="text-[10px] text-slate-500 italic pt-1">{r.notas}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal Nuevo Control */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-t-2xl sm:rounded-2xl w-full max-w-lg p-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" /> Agendar Control Remoto
            </h3>

            <form onSubmit={handleCreateRemoto} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre del Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Llantas San José"
                  value={newRemoto.cliente}
                  onChange={(e) => setNewRemoto({ ...newRemoto, cliente: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={newRemoto.fecha}
                    onChange={(e) => setNewRemoto({ ...newRemoto, fecha: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estación</label>
                  <select
                    value={newRemoto.estacion}
                    onChange={(e) => setNewRemoto({ ...newRemoto, estacion: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="La Rancherita">La Rancherita</option>
                    <option value="EXA FM">EXA FM</option>
                    <option value="La Maxima">La Maxima</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hora Inicio</label>
                  <input
                    type="time"
                    value={newRemoto.horaInicio}
                    onChange={(e) => setNewRemoto({ ...newRemoto, horaInicio: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hora Fin</label>
                  <input
                    type="time"
                    value={newRemoto.horaFin}
                    onChange={(e) => setNewRemoto({ ...newRemoto, horaFin: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Locutor</label>
                  <input
                    type="text"
                    placeholder="Locutor asignado"
                    value={newRemoto.locutor}
                    onChange={(e) => setNewRemoto({ ...newRemoto, locutor: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Técnico</label>
                  <input
                    type="text"
                    placeholder="Técnico a cargo"
                    value={newRemoto.tecnico}
                    onChange={(e) => setNewRemoto({ ...newRemoto, tecnico: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Lugar / Ubicación</label>
                <input
                  type="text"
                  placeholder="Ej. Av. Tecnológico #123"
                  value={newRemoto.lugar}
                  onChange={(e) => setNewRemoto({ ...newRemoto, lugar: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-lg shadow-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}