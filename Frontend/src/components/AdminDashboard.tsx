/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, Calendar, Users, Utensils, 
  BarChart3, PlusCircle, Check, X, RotateCw, 
  TrendingUp, BellRing, Briefcase, ChevronRight 
} from 'lucide-react';
import { EventRequest, Staff } from '../types';
import { CATALOG_THEMES } from '../data';

interface AdminDashboardProps {
  requests: EventRequest[];
  staffList: Staff[];
  onUpdateRequestStatus: (id: string, newStatus: EventRequest['status']) => void;
  onUpdateStaffStatus: (id: number, newStatus: Staff['status']) => void;
  onNavigateToReservation: () => void;
}

export default function AdminDashboard({
  requests,
  staffList,
  onUpdateRequestStatus,
  onUpdateStaffStatus,
  onNavigateToReservation
}: AdminDashboardProps) {
  
  // Local state to track selected sidebar sections
  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'eventos' | 'clientes' | 'menus' | 'reportes'>('dashboard');
  
  // Track assigning worker to specific request
  const [assigningStaffId, setAssigningStaffId] = useState<number | null>(null);

  // Stats summaries calculations
  const totalEventsCount = requests.length + 121; // Mock historic counts accumulated
  const pendingApprovalsCount = requests.filter(r => r.status === 'En Revisión').length;
  const activeStaffCount = staffList.length + 38; // Mock active fields workers

  const handleUpdateStatus = (id: string, state: EventRequest['status']) => {
    onUpdateRequestStatus(id, state);
  };

  const handleAssignStaff = (staffId: number) => {
    onUpdateStaffStatus(staffId, 'Asignado');
    // Simulate auto revert assignment toggle or keep it bound
    setTimeout(() => {
      // Just showing success visual state
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex mt-[72px]">
      
      {/* LEFT SIDEBAR CONTROLS - Replicates Layout Image 3 */}
      <aside className="hidden lg:flex w-64 bg-primary text-white flex-col shrink-0 border-r border-[#002d72] py-8 px-4 justify-between min-h-[calc(100vh-72px)]">
        <div className="space-y-8">
          
          {/* Admin Profile Segment */}
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container border border-secondary shrink-0">
              <img 
                alt="Profile Headshot" 
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256"
              />
            </div>
            <div className="min-w-0">
              <h4 className="font-sans font-bold text-sm text-white truncate">Admin Panel</h4>
              <p className="font-sans text-[11px] text-blue-200 truncate">Servicio Concierge</p>
            </div>
          </div>

          {/* Navigation link widgets */}
          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'eventos', label: 'Eventos', icon: <Calendar className="w-4 h-4" /> },
              { id: 'clientes', label: 'Clientes', icon: <Users className="w-4 h-4" /> },
              { id: 'menus', label: 'Menús', icon: <Utensils className="w-4 h-4" /> },
              { id: 'reportes', label: 'Reportes', icon: <BarChart3 className="w-4 h-4" /> }
            ].map((item) => {
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveAdminTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-xs sm:text-[13px] font-semibold transition-all ${
                    isActive 
                      ? 'bg-secondary text-primary font-bold shadow-md shadow-secondary/15'
                      : 'text-blue-100 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Floating reservation quick link */}
        <div className="pt-4 border-t border-white/10">
          <button
            onClick={onNavigateToReservation}
            className="w-full bg-[#fed000] text-primary hover:bg-[#ffe07f] font-sans font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-secondary/20"
          >
            <PlusCircle className="w-4 h-4" />
            Nuevo Evento
          </button>
        </div>
      </aside>

      {/* RIGHT WORKSPACE WORKPLACE */}
      <main className="flex-grow p-6 sm:p-8 md:p-10 max-w-7xl mx-auto space-y-8 overflow-x-hidden">
        
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeAdminTab === 'dashboard' ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="font-sans font-bold text-3xl text-primary tracking-tight">Vista General</h1>
                <p className="text-[#444651] font-sans text-sm mt-0.5">Gestión de operaciones de DogSitter Catering & Events.</p>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="w-fit self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 rounded-lg text-xs font-bold transition-all"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Sincronizar Datos
              </button>
            </div>

            {/* Bento-style stats highlights grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Event stats */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-gray-400">Total Eventos</span>
                  <div className="p-2.5 rounded-xl bg-blue-50 text-primary">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="font-sans font-bold text-3.5xl text-[#001a48] tracking-tight">{totalEventsCount}</h2>
                  <p className="font-sans text-xs text-secondary-container font-bold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3.5 h-3.5 text-secondary" />
                    +12% <span className="text-gray-400 font-normal">vs mes anterior</span>
                  </p>
                </div>
                <div className="absolute right-[-24px] bottom-[-24px] w-24 h-24 bg-primary/2 rounded-full pointer-events-none group-hover:scale-110 transition-transform"></div>
              </div>

              {/* Approval stats */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-gray-400">Aprobaciones Pendientes</span>
                  <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                    <BellRing className="w-5 h-5 text-red-500 animate-pulse" />
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="font-sans font-bold text-3.5xl text-[#001a48] tracking-tight">{pendingApprovalsCount}</h2>
                  <p className="font-sans text-xs text-gray-400 mt-1">Requieren atención y facturación hoy</p>
                </div>
                <div className="absolute right-[-24px] bottom-[-24px] w-24 h-24 bg-red-500/2 rounded-full pointer-events-none"></div>
              </div>

              {/* Staff stats */}
              <div className="bg-primary text-white p-6 rounded-2xl shadow-md relative overflow-hidden group">
                <div className="flex justify-between items-start relative z-10">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-blue-200">Personal Activo</span>
                  <div className="p-2.5 rounded-xl bg-white/10 text-white">
                    <Briefcase className="w-5 h-5 text-secondary" />
                  </div>
                </div>
                <div className="mt-4 relative z-10">
                  <h2 className="font-sans font-bold text-3.5xl text-white tracking-tight">{activeStaffCount}</h2>
                  <p className="font-sans text-xs text-blue-200 mt-1">En servicio desplegado actualmente</p>
                </div>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
              </div>

            </section>

            {/* Split layout: incoming requests / available crew */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Left Side: Solicitudes Entrantes list (2 cols) */}
              <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="font-sans font-bold text-lg sm:text-xl text-primary">Solicitudes Entrantes</h2>
                  <span className="text-xs text-gray-400">Moderación en vivo</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-primary text-white font-sans font-bold text-xs uppercase tracking-wider">
                        <th className="p-4 pl-6">Cliente</th>
                        <th className="p-4">Mascota</th>
                        <th className="p-4">Tipo Evento</th>
                        <th className="p-4">Fecha</th>
                        <th className="p-4 pr-6 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs sm:text-[13px] font-sans text-gray-700">
                      {requests.map((req, idx) => {
                        const matchingTheme = CATALOG_THEMES.find(t => t.id === req.eventTheme);
                        const themeTitle = matchingTheme ? matchingTheme.title : req.eventTheme;
                        
                        return (
                          <tr key={req.id} className={`hover:bg-gray-50/50 transition-colors ${idx % 2 !== 0 ? 'bg-gray-50/30' : ''}`}>
                            {/* Client profile */}
                            <td className="p-4 pl-6">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center font-sans font-bold text-xs border border-primary/10">
                                  {req.initials}
                                </div>
                                <span className="font-semibold text-primary">{req.clientName}</span>
                              </div>
                            </td>
                            {/* Pet and details */}
                            <td className="p-4">
                              <div>
                                <p className="font-bold">{req.petName}</p>
                                <p className="font-sans text-[11px] text-gray-400 capitalize">{req.petBreed || `Tamaño: ${req.petSize}`}</p>
                              </div>
                            </td>
                            {/* Theme */}
                            <td className="p-4">
                              <span className="font-semibold text-[#444651] block">{themeTitle}</span>
                            </td>
                            {/* Date */}
                            <td className="p-4 text-gray-500 whitespace-nowrap">
                              {req.eventDate}
                            </td>
                            {/* Approve/Reject Controls inside rows */}
                            <td className="p-4 pr-6 text-center">
                              {req.status === 'En Revisión' ? (
                                <div className="flex justify-center gap-1.5">
                                  <button
                                    onClick={() => handleUpdateStatus(req.id, 'Rechazado')}
                                    className="p-1 px-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-[11px] font-bold flex items-center gap-0.5"
                                    title="Rechazar solicitud"
                                  >
                                    <X className="w-3 h-3" />
                                    Rechazar
                                  </button>
                                  <button
                                    onClick={() => handleUpdateStatus(req.id, 'Aprobado')}
                                    className="p-1 px-2.5 bg-primary text-white hover:bg-[#002d72] rounded-lg text-[11px] font-bold flex items-center gap-0.5 shadow-sm"
                                    title="Aprobar solicitud"
                                  >
                                    <Check className="w-3 h-3 text-secondary fill-secondary" />
                                    Aprobar
                                  </button>
                                </div>
                              ) : (
                                <div className="flex justify-center">
                                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    req.status === 'Aprobado' 
                                      ? 'bg-green-50 text-green-700' 
                                      : req.status === 'Rechazado' 
                                        ? 'bg-red-50 text-red-700' 
                                        : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {req.status}
                                  </span>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 text-right">
                  <span className="font-sans text-xs text-gray-400">Total Solicitudes Listadas: {requests.length}</span>
                </div>
              </div>

              {/* Right Side: Available Staff & Crew (1 col) */}
              <div className="xl:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="font-sans font-bold text-lg text-primary">Personal Disponible</h2>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>

                  <ul className="divide-y divide-gray-100 px-4 py-2">
                    {staffList.map((worker) => (
                      <li key={worker.id} className="py-4 px-2 flex justify-between items-center gap-2 group hover:bg-gray-50/50 rounded-xl transition-all">
                        <div className="flex items-center gap-3">
                          {/* Profile Avatar custom */}
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary shadow-sm relative shrink-0">
                            {worker.avatar ? (
                              <img src={worker.avatar} alt={worker.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-primary">
                                {worker.initials}
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-sans font-bold text-[13.5px] text-[#1b1c1c] truncate">{worker.name}</p>
                            <p className="font-sans text-[11px] text-gray-500 truncate">{worker.role}</p>
                          </div>
                        </div>

                        {/* Assignment buttons action */}
                        <div>
                          {worker.status === 'Disponible' ? (
                            <button
                              onClick={() => handleAssignStaff(worker.id)}
                              className="px-3 py-1.5 bg-[#fed000] text-primary hover:bg-[#ffe07f] font-sans font-bold text-xs rounded-lg transition-all"
                            >
                              Asignar
                            </button>
                          ) : (
                            <button
                              onClick={() => onUpdateStaffStatus(worker.id, 'Disponible')}
                              className="px-3 py-1.5 bg-[#dae2ff] text-primary font-sans font-bold text-xs rounded-lg tracking-wide animate-pulse"
                              title="Click para liberar"
                            >
                              Asignado ✓
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 border-t border-gray-100 text-center">
                  <p className="font-sans text-[11px] text-gray-400">Total tripulación de guardia: {staffList.length}</p>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="p-10 text-center space-y-4 animate-scaleUp">
            <LayoutDashboard className="w-12 h-12 text-[#fed000] mx-auto animate-bounce" />
            <h2 className="font-sans font-bold text-2xl text-primary capitalize">Sección de {activeAdminTab}</h2>
            <p className="text-[#444651] max-w-md mx-auto">
              Esta sección está protegida bajo protocolos de seguridad. Las bases de datos se sincronizan con {activeAdminTab} en tiempo real.
            </p>
            <button 
              onClick={() => setActiveAdminTab('dashboard')} 
              className="bg-primary text-white font-bold text-xs px-6 py-2.5 rounded-xl block mx-auto hover:bg-[#002d72]"
            >
              Regresar al Dashboard Principal
            </button>
          </div>
        )}

      </main>

    </div>
  );
}
