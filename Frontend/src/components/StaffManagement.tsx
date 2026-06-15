import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Mail, 
  Phone, 
  UserPlus, 
  Briefcase, 
  AlertCircle, 
  ShieldCheck, 
  Search, 
  Sparkles,
  Award,
  Clock,
  HeartPulse,
  ChefHat,
  UserCheck
} from 'lucide-react';
import { StaffMember, EventRequest } from '../types';
import { INITIAL_STAFF, calculateStaffNeeds } from '../utils/staffHelper';

interface StaffManagementProps {
  requests: EventRequest[];
  onGoBack: () => void;
}

export default function StaffManagement({ requests, onGoBack }: StaffManagementProps) {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Create member state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<StaffMember['role']>('Auxiliar Canino');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('dogsitter_staff');
    if (saved) {
      setStaff(JSON.parse(saved));
    } else {
      setStaff(INITIAL_STAFF);
      localStorage.setItem('dogsitter_staff', JSON.stringify(INITIAL_STAFF));
    }
  }, []);

  const saveStaff = (updated: StaffMember[]) => {
    setStaff(updated);
    localStorage.setItem('dogsitter_staff', JSON.stringify(updated));
  };

  const handleRegisterStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPhone) return;

    const newMember: StaffMember = {
      id: `STF-${Math.floor(510 + Math.random() * 90)}`,
      name: newName,
      role: newRole,
      status: 'Disponible',
      email: newEmail,
      phone: newPhone,
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${newName}`
    };

    const updated = [...staff, newMember];
    saveStaff(updated);

    // Reset fields
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewRole('Auxiliar Canino');
    setShowAddForm(false);

    setSuccessMsg(`¡${newMember.name} registrado exitosamente como ${newMember.role}!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleDeleteMember = (id: string) => {
    const updated = staff.filter(m => m.id !== id);
    saveStaff(updated);
  };

  const handleToggleStatus = (id: string) => {
    const updated = staff.map(m => {
      if (m.id === id) {
        const nextStatus: StaffMember['status'] = 
          m.status === 'Disponible' ? 'En Evento' : 
          m.status === 'En Evento' ? 'De Licencia' : 'Disponible';
        return { ...m, status: nextStatus };
      }
      return m;
    });
    saveStaff(updated);
  };

  const filteredStaff = staff.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.phone.includes(searchTerm);
    
    const matchesRole = roleFilter === 'All' ? true : m.role === roleFilter;
    const matchesStatus = statusFilter === 'All' ? true : m.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate overall metrics
  const totalCount = staff.length;
  const availableCount = staff.filter(m => m.status === 'Disponible').length;
  const busyCount = staff.filter(m => m.status === 'En Evento').length;

  return (
    <div id="staff-management-portal" className="min-h-[calc(100vh-4rem)] bg-surface text-on-surface py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" /> Gestión de Colaboradores
            </div>
            <h1 className="text-3xl font-display font-extrabold text-on-surface tracking-tight">
              Administración de Staff & Personal
            </h1>
            <p className="text-sm text-on-surface-variant">
              Gestiona el equipo de cuidadores, reposteros caninos y veterinarios que hacen posibles los banquetes de DogSitter.
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
              <UserPlus className="w-4 h-4" /> Registrar Colaborador
            </button>
          </div>
        </header>

        {successMsg && (
          <div className="mb-6 p-4 bg-tertiary-fixed text-on-tertiary-container rounded-xl border border-tertiary/10 text-xs font-bold flex items-center gap-2 shadow-sm animate-pulse">
            <CheckCircle className="w-4 h-4 text-tertiary shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Dynamic Staff Metrics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Total de Personal</span>
              <span className="text-3xl font-extrabold text-on-surface mt-1 block">{totalCount}</span>
            </div>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Disponibles Ahora</span>
              <span className="text-3xl font-extrabold text-tertiary mt-1 block">{availableCount}</span>
            </div>
            <div className="w-12 h-12 bg-tertiary-fixed text-tertiary rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">En Eventos</span>
              <span className="text-3xl font-extrabold text-amber-600 mt-1 block">{busyCount}</span>
            </div>
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Add Staff Member Form */}
        {showAddForm && (
          <div className="bg-surface-container-low border border-primary/20 rounded-2xl p-6 mb-8 shadow-md">
            <h2 className="text-xl font-display font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2">
              <Sparkles className="w-5 h-5 text-primary" /> Registrar Ficha de Colaborador
            </h2>
            
            <form onSubmit={handleRegisterStaff} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Valeria Sotomayor"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Rol / Especialidad *</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Coordinador">Coordinador Principal</option>
                  <option value="Chef Repostero">Chef de Repostería Canina</option>
                  <option value="Auxiliar Canino">Auxiliar Canino / Guardián</option>
                  <option value="Soporte Veterinario">Soporte Veterinario</option>
                  <option value="Líder Operativo">Líder Operativo General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Teléfono Móvil *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. +56 9 1234 5678"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Correo Electrónico Institucional *</label>
                <input
                  type="email"
                  required
                  placeholder="Ej. valeria.s@dogsitter.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
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
                  Dar de Alta
                </button>
              </div>
            </form>
          </div>
        )}

        {/* INTERACTIVE AUTOMATED MATRIX SECTION */}
        <section className="mb-10 bg-primary/5 rounded-3xl p-6 border border-primary/10">
          <h2 className="text-lg font-display font-bold text-primary flex items-center gap-2 mb-2">
            <Award className="w-5 h-5" /> Matriz Operativa & Dotación Automática Sugerida (IA-Calculated)
          </h2>
          <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
            DogSitter evalúa cada banquete aprobado de acuerdo a la escala física (Perros y Personas) y opcionalidad de soporte de primeros auxilios. La IA distribuye automáticamente cuántos profesionales mínimos son sugeribles por seguridad y rendimiento culinario.
          </p>

          <div className="space-y-4">
            {requests.filter(r => r.status === 'Approved' || r.status === 'Pending').map(req => {
              const needs = calculateStaffNeeds(req.dogs, req.humans, !!req.medicalStandby);
              return (
                <div 
                  key={req.id} 
                  className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-primary-container/20 text-primary text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                        {req.id}
                      </span>
                      <span className="text-on-surface font-bold text-sm">
                        {req.title}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-medium">
                      Escala del Banquete: <strong className="text-on-surface font-bold">{req.dogs} Perros</strong> y <strong className="text-on-surface font-semibold">{req.humans} Humanos</strong> • Fecha: {req.date}
                    </p>
                  </div>

                  {/* Dynamic allocation checklist */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <div className="bg-surface-container-low px-3 py-2 rounded-xl text-center border border-outline-variant/10">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase block">Coordinadores</span>
                      <span className="text-xs font-bold text-primary">{needs.coordinators} {needs.coordinators > 1 ? 'Reqs' : 'Req'}</span>
                    </div>
                    
                    <div className="bg-surface-container-low px-3 py-2 rounded-xl text-center border border-outline-variant/10">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase block">Chef Repostero</span>
                      <span className="text-xs font-bold text-secondary">{needs.chefs} {needs.chefs > 1 ? 'Reqs' : 'Req'}</span>
                    </div>

                    <div className="bg-surface-container-low px-3 py-2 rounded-xl text-center border border-outline-variant/10">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase block">Auxiliares</span>
                      <span className="text-xs font-bold text-tertiary">{needs.helpers} {needs.helpers > 1 ? 'Reqs' : 'Req'}</span>
                    </div>

                    <div className="bg-surface-container-low px-3 py-2 rounded-xl text-center border border-outline-variant/10">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase block">Veterinario</span>
                      <span className={`text-xs font-bold ${needs.vets > 0 ? 'text-error font-extrabold' : 'text-on-surface-variant/40'}`}>
                        {needs.vets > 0 ? '1 ALTA PRIO' : 'No requir.'}
                      </span>
                    </div>

                    <div className="bg-primary text-white px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 text-center shadow-sm">
                      <span className="text-[9px] text-white/70 block uppercase">Total Personal</span>
                      <span>{needs.total} Profesionales</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Filter Toolbar for Active Staff List */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 shadow-sm">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar colaborador por nombre, correo o móvil..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-surface-container border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-2 shrink-0">
            <div className="relative">
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-3 pr-8 py-2 text-xs bg-surface-container border border-outline-variant rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">Especialidades</option>
                <option value="Coordinador">Coordinadores</option>
                <option value="Chef Repostero">Chefs Reposteros</option>
                <option value="Auxiliar Canino">Auxiliares Caninos</option>
                <option value="Soporte Veterinario">Soporte Veterinario</option>
                <option value="Líder Operativo">Líderes Operativos</option>
              </select>
            </div>

            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-3 pr-8 py-2 text-xs bg-surface-container border border-outline-variant rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">Estados</option>
                <option value="Disponible">Disponible</option>
                <option value="En Evento">En Evento</option>
                <option value="De Licencia">De Licencia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Staff Cards Grid */}
        {filteredStaff.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member) => (
              <article 
                key={member.id} 
                className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Brand sidebar accent */}
                <span className={`absolute left-0 top-0 bottom-0 w-1 ${
                  member.status === 'Disponible' ? 'bg-tertiary' : 
                  member.status === 'En Evento' ? 'bg-amber-500' : 'bg-red-400'
                }`} />

                <div>
                  {/* Portrait and basics */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/30 shrink-0 shadow-inner">
                      <img 
                        src={member.avatarUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${member.name}`;
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-sm text-on-surface truncate pr-2">{member.name}</h4>
                        <span 
                          onClick={() => handleToggleStatus(member.id)}
                          className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold cursor-pointer uppercase transition-all select-none hover:opacity-80 shrink-0 ${
                            member.status === 'Disponible' ? 'bg-tertiary-fixed text-on-tertiary-container' :
                            member.status === 'En Evento' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-50 text-red-700'
                          }`}
                        >
                          {member.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-primary">
                        {member.role === 'Chef Repostero' && <ChefHat className="w-3.5 h-3.5 text-primary" />}
                        {member.role === 'Soporte Veterinario' && <HeartPulse className="w-3.5 h-3.5 text-primary" />}
                        {member.role !== 'Chef Repostero' && member.role !== 'Soporte Veterinario' && <Briefcase className="w-3.5 h-3.5 text-primary" />}
                        <span>{member.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Methods */}
                  <div className="space-y-1.5 pt-3 border-t border-outline-variant/20 text-xs font-medium text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-outline shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-outline shrink-0" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-outline-variant/20 flex justify-between items-center text-xs text-on-surface-variant">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-outline">ID: {member.id}</span>
                  <button 
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-on-surface-variant/40 hover:text-error hover:scale-110 p-1.5 rounded transition-all cursor-pointer"
                    aria-label={`Desvincular a ${member.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-panel rounded-2xl border border-dashed border-outline-variant/30">
            <Users className="w-12 h-12 text-outline mx-auto mb-3 opacity-60" />
            <h3 className="font-semibold text-on-surface">No se encontraron colaboradores</h3>
            <p className="text-xs text-on-surface-variant mt-1">Refina los filtros de búsqueda o registra un nuevo colaborador.</p>
          </div>
        )}

      </div>
    </div>
  );
}
