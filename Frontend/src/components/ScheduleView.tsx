import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Plus, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Compass, 
  Search, 
  Hourglass, 
  Trash2,
  Lock,
  Sparkles,
  Award
} from 'lucide-react';
import { EventRequest } from '../types';

export interface Shift {
  id: string;
  date: string;
  timeSlot: string; // 'Mañana (10:00 - 13:00)' | 'Tarde (13:00 - 16:00)' | 'Tarde/Noche (16:00 - 19:00)'
  assignedCoordinator: string;
  notes: string;
  type: 'Servicio de Evento' | 'Bloqueo Cocina' | 'Mantenimiento';
  status: 'Iniciado' | 'Confirmado' | 'Reservado';
}

const INITIAL_SHIFTS: Shift[] = [
  {
    id: 'SH-201',
    date: '2024-10-15',
    timeSlot: 'Mañana (10:00 - 13:00)',
    assignedCoordinator: 'Elena Gomez',
    notes: 'Preparación de pan de avena e higos para el picnic de Sarah Carroll.',
    type: 'Servicio de Evento',
    status: 'Confirmado'
  },
  {
    id: 'SH-202',
    date: '2024-11-02',
    timeSlot: 'Tarde (13:00 - 16:00)',
    assignedCoordinator: 'Carlos Paz',
    notes: 'Entrega en la Terraza de Cervecería Local Brews. Soporte de 2 ayudantes por volumen alto.',
    type: 'Servicio de Evento',
    status: 'Confirmado'
  },
  {
    id: 'SH-203',
    date: '2025-06-22',
    timeSlot: 'Tarde (13:00 - 16:00)',
    assignedCoordinator: 'Elena Gomez',
    notes: 'Día de terapia corporativa con mascotas en Intercorp. Perímetro cercado necesario.',
    type: 'Servicio de Evento',
    status: 'Iniciado'
  },
  {
    id: 'SH-204',
    date: '2024-10-16',
    timeSlot: 'Mañana (10:00 - 13:00)',
    assignedCoordinator: 'Laboratorio Central de Pastelería',
    notes: 'Sanitización profunda trimestral del horno de convección de repostería canina.',
    type: 'Mantenimiento',
    status: 'Reservado'
  }
];

interface ScheduleViewProps {
  requests: EventRequest[];
  onGoBack: () => void;
}

export default function ScheduleView({ requests, onGoBack }: ScheduleViewProps) {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [searchDate, setSearchDate] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form fields state
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newSlot, setNewSlot] = useState('Mañana (10:00 - 13:00)');
  const [newCoord, setNewCoord] = useState('Elena Gomez');
  const [newNotes, setNewNotes] = useState('');
  const [newType, setNewType] = useState<'Servicio de Evento' | 'Bloqueo Cocina' | 'Mantenimiento'>('Servicio de Evento');

  useEffect(() => {
    const saved = localStorage.getItem('dogsitter_shifts');
    if (saved) {
      setShifts(JSON.parse(saved));
    } else {
      // Synthesize event requests as confirmed shifts too
      const initialWithEvents = [...INITIAL_SHIFTS];
      setShifts(initialWithEvents);
      localStorage.setItem('dogsitter_shifts', JSON.stringify(initialWithEvents));
    }
  }, []);

  const saveUpdatedShifts = (updated: Shift[]) => {
    setShifts(updated);
    localStorage.setItem('dogsitter_shifts', JSON.stringify(updated));
  };

  const handleCreateShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotes) return;

    const newShift: Shift = {
      id: `SH-${Math.floor(200 + Math.random() * 800)}`,
      date: newDate,
      timeSlot: newSlot,
      assignedCoordinator: newCoord,
      notes: newNotes,
      type: newType,
      status: 'Confirmado'
    };

    const updated = [newShift, ...shifts];
    saveUpdatedShifts(updated);

    // Reset Fields
    setNewNotes('');
    setShowAddForm(false);
    showNotice(`¡Horario bloqueado con éxito para el día ${newDate}!`);
  };

  const handleDeleteShift = (id: string) => {
    const updated = shifts.filter(s => s.id !== id);
    saveUpdatedShifts(updated);
    showNotice('Horario retirado del cronograma operativo.');
  };

  const showNotice = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Quick action: Assign coordinator to approved events from current requests
  const handleAssignToRequest = (req: EventRequest, coordinator: string) => {
    // Check if shift already exists for this request
    const exists = shifts.some(s => s.date === req.date && s.notes.includes(req.title));
    if (exists) {
      showNotice(`Ya existe un itinerario para el evento del ${req.date}.`);
      return;
    }

    const synthesizedShift: Shift = {
      id: `SH-${Math.floor(200 + Math.random() * 800)}`,
      date: req.date,
      timeSlot: req.time > '13:00' ? 'Tarde (13:00 - 16:00)' : 'Mañana (10:00 - 13:00)',
      assignedCoordinator: coordinator,
      notes: `Asignación automática desde solicitudes. Evento: "${req.title}". Ubicación: ${req.location}. ${req.dogs} Perros.`,
      type: 'Servicio de Evento',
      status: 'Confirmado'
    };

    const updated = [synthesizedShift, ...shifts];
    saveUpdatedShifts(updated);
    showNotice(`¡${coordinator} asignado exitosamente como líder para "${req.title}"!`);
  };

  // Filter shifts
  const filteredShifts = shifts.filter(s => {
    const matchesDate = searchDate ? s.date === searchDate : true;
    const matchesType = typeFilter === 'All' ? true : s.type === typeFilter;
    return matchesDate && matchesType;
  });

  // Approved and empty coordinator slots from current requests
  const allocableRequests = requests.filter(r => r.status === 'Approved');

  return (
    <div id="schedule-management-portal" className="min-h-[calc(100vh-4rem)] bg-surface text-on-surface py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header bar */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" /> Centro de Itinerarios
            </div>
            <h1 className="text-3xl font-display font-extrabold text-on-surface tracking-tight">
              Control de Horarios y Turnos
            </h1>
            <p className="text-sm text-on-surface-variant">
              Administra reservas horarias de cocina, mantenimiento preventivo y líderes del personal de servicio en terreno.
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={onGoBack}
              className="flex-1 md:flex-none px-4 py-2 bg-surface-container border border-outline hover:bg-surface-container-high text-on-surface font-semibold text-xs rounded-full transition-all cursor-pointer"
            >
              Volver a la Bandeja
            </button>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex-1 md:flex-none bg-primary hover:bg-on-primary-container text-white font-semibold text-xs px-5 py-2 rounded-full flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Bloquear Horas
            </button>
          </div>
        </header>

        {toastMessage && (
          <div className="mb-6 p-4 bg-tertiary-fixed text-on-tertiary-container rounded-xl border border-tertiary/10 text-xs font-bold flex items-center gap-2 shadow-sm animate-pulse">
            <CheckCircle className="w-4 h-4 text-tertiary shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Collapsible Blockout Schedule Form */}
        {showAddForm && (
          <div className="bg-surface-container-low border border-primary/20 rounded-2xl p-6 mb-8 shadow-md">
            <h2 className="text-xl font-display font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2">
              <Lock className="w-4 h-4 text-primary" /> Crear Evento de Bloqueo Horario u Oficio
            </h2>

            <form onSubmit={handleCreateShift} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Fecha</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Segmento Horario</label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Mañana (10:00 - 13:00)">Mañana (10:00 - 13:00)</option>
                  <option value="Tarde (13:00 - 16:00)">Tarde (13:00 - 16:00)</option>
                  <option value="Tarde/Noche (16:00 - 19:00)">Tarde/Noche (16:00 - 19:00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Líder Asignado / Recurso</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Elena Gomez, Carlos Paz o Horno Principal"
                  value={newCoord}
                  onChange={(e) => setNewCoord(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Tipo de Bloqueo</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Servicio de Evento">Servicio de Evento</option>
                  <option value="Bloqueo Cocina">Bloqueo de Cocina</option>
                  <option value="Mantenimiento">Mantenimiento de Cocina</option>
                </select>
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Propósito / Descripción del Itinerario *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Escribe el objetivo de este horario..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="md:col-span-4 flex justify-end gap-2 pt-2 border-t border-outline-variant/10">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-xs font-bold hover:bg-surface-container rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white text-xs font-extrabold rounded-lg hover:bg-on-primary-container"
                >
                  Confirmar Reserva Horaria
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Dynamic Interactive Panel: Assign coordinators to newly approved banquets */}
        {allocableRequests.length > 0 && (
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 shadow-sm mb-8 space-y-4">
            <h2 className="text-base font-display font-bold text-primary flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Acción Rápida: Asignar Turno a Banquete Guardado
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Los siguientes banquetes han sido pre-calculados y aprobados pero aún no tienen un supervisor asignado en cocina de producción o entrega física. Asigna uno rápidamente:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allocableRequests.map(req => (
                <div 
                  key={req.id}
                  className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 flex justify-between items-center text-xs"
                >
                  <div>
                    <h3 className="font-bold text-on-surface mb-0.5 line-clamp-1">{req.title}</h3>
                    <p className="text-[10px] text-on-surface-variant font-medium">Fecha: {req.date} • {req.dogs} Perros • {req.humans} Humanos</p>
                  </div>

                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleAssignToRequest(req, 'Elena Gomez')}
                      className="px-2.5 py-1 bg-primary/10 text-primary font-bold rounded hover:bg-primary hover:text-white transition-all scale-95"
                    >
                      Elena G.
                    </button>
                    <button 
                      onClick={() => handleAssignToRequest(req, 'Carlos Paz')}
                      className="px-2.5 py-1 bg-secondary/10 text-secondary font-bold rounded hover:bg-secondary hover:text-white transition-all scale-95"
                    >
                      Carlos P.
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule layout sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Calendar Toolbar & Shift list */}
          <section className="lg:col-span-8 space-y-4">
            
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-1">
                <Compass className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-on-surface">Agenda Operativa del Mes</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {/* Search by exact Date */}
                <input 
                  type="date" 
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-surface-container border border-outline-variant rounded-xl text-on-surface focus:outline-none"
                />
                {searchDate && (
                  <button 
                    onClick={() => setSearchDate('')}
                    className="text-[10px] text-primary font-extrabold hover:underline"
                  >
                    Ver Todos
                  </button>
                )}

                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-surface-container border border-outline-variant rounded-xl text-on-surface appearance-none pr-8 cursor-pointer"
                >
                  <option value="All">Todos los Tipos</option>
                  <option value="Servicio de Evento">Servicio de Evento</option>
                  <option value="Bloqueo Cocina">Bloqueo Cocina</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                </select>
              </div>
            </div>

            {/* Shift cards */}
            <div className="space-y-4">
              {filteredShifts.length > 0 ? (
                filteredShifts.map((sh) => (
                  <article 
                    key={sh.id}
                    className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-4">
                      
                      {/* Left visual date badge */}
                      <div className="px-3 py-2 bg-primary/10 rounded-xl flex flex-col items-center justify-center shrink-0 min-w-16 text-center border border-primary/10">
                        <span className="text-xs font-bold text-primary tracking-wider uppercase">Día</span>
                        <span className="text-lg font-display font-extrabold text-primary">{sh.date.split('-')[2] || sh.date}</span>
                        <span className="text-[9px] font-bold text-on-surface-variant leading-none">{sh.date.split('-')[1] || '---'}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                            sh.type === 'Servicio de Evento' ? 'bg-primary/10 text-primary' :
                            sh.type === 'Bloqueo Cocina' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {sh.type}
                          </span>
                          <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-primary" /> {sh.timeSlot}
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-on-surface">
                          {sh.notes}
                        </p>

                        <p className="text-xs text-on-surface-variant font-semibold flex items-center gap-1 pt-1.5">
                          <User className="w-3.5 h-3.5 text-primary" /> Supervisor: <strong className="text-on-surface font-bold">{sh.assignedCoordinator}</strong>
                        </p>
                      </div>

                    </div>

                    {/* Controls alignment */}
                    <div className="flex items-center justify-between border-t border-outline-variant/10 sm:border-0 pt-3 sm:pt-0 w-full sm:w-auto gap-4">
                      <span className="text-[10px] text-on-surface-variant/50 font-bold tracking-wider uppercase">ID: {sh.id}</span>
                      <button 
                        onClick={() => handleDeleteShift(sh.id)}
                        className="text-on-surface-variant/40 hover:text-error hover:scale-110 p-2 rounded bg-surface-container-low transition-all cursor-pointer"
                        aria-label={`Eliminar turno ${sh.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </article>
                ))
              ) : (
                <div className="text-center py-12 glass-panel rounded-2xl border border-dashed border-outline-variant/30">
                  <Calendar className="w-12 h-12 text-outline mx-auto mb-3 opacity-60" />
                  <h3 className="font-semibold text-on-surface">No se encontraron turnos agendados</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Refina el filtro de fecha o de tipo de bloqueo.</p>
                </div>
              )}
            </div>

          </section>

          {/* Sidebar right stats panel inside Control de Horarios */}
          <aside className="lg:col-span-4 space-y-6">
            
            <div className="glass-card rounded-2xl p-5 border border-outline-variant/30 bg-surface-container-lowest">
              <h4 className="font-display font-bold text-on-surface mb-3 flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                <Users className="w-4 h-4 text-primary" /> Coordinadores Líderes
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">EG</div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">Elena Gomez</p>
                      <p className="text-[9px] text-on-surface-variant font-medium">Supervisor de Eventos Senior</p>
                    </div>
                  </div>
                  <span className="bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full">2 Asignaciones</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs shrink-0">CP</div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">Carlos Paz</p>
                      <p className="text-[9px] text-on-surface-variant font-medium">Coordinador de Logística</p>
                    </div>
                  </div>
                  <span className="bg-secondary/10 text-secondary text-[9px] font-bold px-2 py-0.5 rounded-full">1 Asignación</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-surface-container-high/40 to-surface-container/20 rounded-2xl p-5 border border-outline-variant/30 text-xs font-semibold space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Hourglass className="w-4 h-4" />
                <span>Tiempo Promedio de Coche</span>
              </div>
              <p className="text-on-surface-variant text-xs leading-relaxed font-medium">
                La cocina operativa inicia preparación de banquetes gourmet <strong className="text-primary">3 horas antes</strong> del despacho. El bloqueo preventivo garantiza cero retrasos para coordinadores de DogSitter.
              </p>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}
