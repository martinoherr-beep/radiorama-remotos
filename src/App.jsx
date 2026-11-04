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
  XCircle,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

// Datos iniciales extraídos de tu calendario de Noviembre 2026
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
    notas: "Atendido por Gerardo a las 10:00 AM"
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
    notas: "Pendiente confirmar horario exacto"
  }
];

export default function App() {
  const [remotos, setRemotos] = useState(INITIAL_REMOTOS);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1)); // Noviembre 2026
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' o 'list'
  const [filterEstacion, setFilterEstacion] = useState('Todas');
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Formulario nuevo remoto
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

    const created = {
      ...newRemoto,
      id: Date.now()
    };

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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-red-600 to-amber-500 rounded-xl shadow-lg">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                RADIORAMA
                <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                  Remotos
                </span>
              </h1>
              <p className="text-xs text-slate-400">Control de eventos y agenda comercial</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                viewMode === 'calendar' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Calendario
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Lista
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:from-red-500 hover:to-red-400 shadow-md transition"
            >
              <Plus className="w-4 h-4" /> Nuevo Control
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Movil Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700 p-4 space-y-3 bg-slate-800">
            <div className="flex gap-2">
              <button
                onClick={() => { setViewMode('calendar'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-sm text-center font-medium ${
                  viewMode === 'calendar' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                Calendario
              </button>
              <button
                onClick={() => { setViewMode('list'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-lg text-sm text-center font-medium ${
                  viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                Lista
              </button>
            </div>
            <button
              onClick={() => { setShowModal(true); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg text-sm font-semibold"
            >
              <Plus className="w-4 h-4" /> Agregar Control Remoto
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">

        {/* Controls / Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/80 backdrop-blur p-4 rounded-2xl border border-slate-700/60 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrevMonth}
              className="p-2 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white min-w-[180px] text-center">
              {monthNames[month]} {year}
            </h2>
            <button 
              onClick={handleNextMonth}
              className="p-2 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={filterEstacion}
              onChange={(e) => setFilterEstacion(e.target.value)}
              className="w-full sm:w-auto bg-slate-900 text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-red-500"
            >
              <option value="Todas">Todas las Estaciones</option>
              <option value="La Rancherita">La Rancherita</option>
              <option value="EXA FM">EXA FM</option>
              <option value="La Maxima">La Maxima</option>
            </select>
          </div>
        </div>

       {/* Vista Calendario */}
{viewMode === 'calendar' ? (
  <div className="bg-slate-800/60 rounded-xl sm:rounded-2xl border border-slate-700/60 p-2 sm:p-4 md:p-6 shadow-xl overflow-hidden">
    {/* Cabecera Días */}
    <div className="grid grid-cols-7 gap-1 text-center mb-1">
      {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, idx) => (
        <div key={d + idx} className={`text-[10px] sm:text-xs font-bold py-1 rounded ${idx === 0 || idx === 6 ? 'text-red-400' : 'text-slate-400'}`}>
          <span className="sm:hidden">{d}</span>
          <span className="hidden sm:inline">{['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'][idx]}</span>
        </div>
      ))}
    </div>

    {/* Rejilla de Días con altura/aspecto uniforme */}
    <div className="grid grid-cols-7 gap-1 sm:gap-2">
      {Array.from({ length: firstDayIndex }).map((_, i) => (
        <div key={`empty-${i}`} className="h-12 sm:h-24 bg-slate-900/30 rounded-lg border border-slate-800/40 opacity-20" />
      ))}

      {Array.from({ length: daysInMonth }).map((_, i) => {
        const dayNum = i + 1;
        const dayRemotos = getRemotosForDay(dayNum);
        const hasRemotos = dayRemotos.length > 0;

        return (
          <div
            key={`day-${dayNum}`}
            onClick={() => setSelectedDay(dayNum)}
            className={`h-12 sm:h-auto sm:min-h-[100px] p-1 sm:p-2 rounded-lg border transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
              hasRemotos 
                ? 'bg-slate-800 border-red-500/60 hover:border-red-400 shadow-sm' 
                : 'bg-slate-800/40 border-slate-700/30 hover:bg-slate-700/30'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className={`text-[11px] sm:text-sm font-bold ${hasRemotos ? 'text-white' : 'text-slate-400'}`}>
                {dayNum}
              </span>
              {hasRemotos && (
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </div>

            {/* Vista Desktop / Tablet */}
            <div className="hidden sm:block space-y-1 my-1 overflow-y-auto max-h-[60px] scrollbar-none">
              {dayRemotos.map(r => (
                <div key={r.id} className="bg-slate-900/90 border border-slate-700/80 rounded px-1.5 py-0.5 text-[10px]">
                  <div className="font-semibold text-red-400 truncate">{r.cliente}</div>
                  <div className="text-[9px] text-slate-400 flex items-center justify-between">
                    <span>{r.horaInicio}</span>
                    <span className="text-[8px] bg-slate-800 px-1 rounded text-slate-300">{r.estacion}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Vista Compacta Móvil (Muestra un indicador/badge fijo sin deformar el cuadro) */}
            {hasRemotos && (
              <div className="sm:hidden flex items-center justify-center pb-0.5">
                <span className="text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 px-1 rounded-md leading-none py-0.5">
                  {dayRemotos.length} {dayRemotos.length === 1 ? 'remoto' : 'remotos'}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
) : (
          /* List View */
          <div className="space-y-4">
            {filteredRemotos.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700">
                <Radio className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No hay controles remotos agendados para este criterio.</p>
              </div>
            ) : (
              filteredRemotos.map(r => (
                <div 
                  key={r.id} 
                  className="bg-slate-800 rounded-2xl border border-slate-700/70 p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg hover:border-red-500/50 transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs rounded-full">
                        {r.estacion}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-slate-500" /> {r.fecha}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">{r.cliente}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> {r.horaInicio} - {r.horaFin} hrs
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {r.lugar}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" /> Locutor: {r.locutor}
                      </span>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-700/60">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                      r.estado === 'Confirmado' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {r.estado === 'Confirmado' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      {r.estado}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{r.notas}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Modal Nuevo Control */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" /> Nuevo Control Remoto
            </h3>

            <form onSubmit={handleCreateRemoto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre del Cliente / Negocio</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Llantas San José"
                  value={newRemoto.cliente}
                  onChange={(e) => setNewRemoto({ ...newRemoto, cliente: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={newRemoto.fecha}
                    onChange={(e) => setNewRemoto({ ...newRemoto, fecha: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estación</label>
                  <select
                    value={newRemoto.estacion}
                    onChange={(e) => setNewRemoto({ ...newRemoto, estacion: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="La Rancherita">La Rancherita</option>
                    <option value="EXA FM">EXA FM</option>
                    <option value="La Maxima">La Maxima</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hora Inicio</label>
                  <input
                    type="time"
                    value={newRemoto.horaInicio}
                    onChange={(e) => setNewRemoto({ ...newRemoto, horaInicio: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hora Fin</label>
                  <input
                    type="time"
                    value={newRemoto.horaFin}
                    onChange={(e) => setNewRemoto({ ...newRemoto, horaFin: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Locutor Asignado</label>
                  <input
                    type="text"
                    placeholder="Nombre del locutor"
                    value={newRemoto.locutor}
                    onChange={(e) => setNewRemoto({ ...newRemoto, locutor: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Técnico a Cargo</label>
                  <input
                    type="text"
                    placeholder="Nombre del técnico"
                    value={newRemoto.tecnico}
                    onChange={(e) => setNewRemoto({ ...newRemoto, tecnico: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Lugar / Ubicación</label>
                <input
                  type="text"
                  placeholder="Ej. Av. Principal #123"
                  value={newRemoto.lugar}
                  onChange={(e) => setNewRemoto({ ...newRemoto, lugar: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-lg shadow-md"
                >
                  Guardar Control
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}