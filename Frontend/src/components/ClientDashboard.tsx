import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  PawPrint, 
  FileText, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Hourglass, 
  UserPlus2,
  Briefcase,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { EventRequest, UserSession } from '../types';
import { calculateStaffNeeds } from '../utils/staffHelper';

interface ClientDashboardProps {
  requests: EventRequest[];
  userSession: UserSession;
  onOpenBooking: () => void;
}

export default function ClientDashboard({ requests, userSession, onOpenBooking }: ClientDashboardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter requests belonging to this client (by email matching)
  const clientEmailFilter = userSession.email.toLowerCase();
  const myRequests = requests.filter(r => 
    r.requesterEmail.toLowerCase() === clientEmailFilter || 
    r.requesterName.toLowerCase() === userSession.name.toLowerCase()
  );

  const getStatusBadge = (status: EventRequest['status']) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-container text-xs font-bold rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-tertiary" /> Aprobado • Confirmado
          </span>
        );
      case 'Declined':
        return (
          <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Rechazado
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-xs font-bold rounded-full flex items-center gap-1">
            <Hourglass className="w-3.5 h-3.5 text-secondary animate-spin" /> En Revisión Técnica
          </span>
        );
    }
  };

  const getCakeName = (type: string) => {
    switch (type) {
      case 'peanut_butter': return 'Mantequilla de Maní Premium';
      case 'beef_liver': return 'Hígado de Res Premium';
      case 'pumpkin_apple': return 'Especial de Calabaza y Manzana';
      case 'none': return 'Sin Pastel';
      default: return type;
    }
  };

  return (
    <div id="client-dashboard-panel" className="min-h-[calc(100vh-4rem)] bg-surface text-on-surface py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Welcome Section */}
        <section className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Gabinete de Miembro VIP
            </div>
            <h1 className="text-3xl font-display font-extrabold tracking-tight text-on-surface">
              ¡Hola de nuevo, {userSession.name}!
            </h1>
            <p className="text-sm text-on-surface-variant">
              Administra tus solicitudes gastronómicas caninas y visualiza la dotación idónea recomendada en tiempo real.
            </p>
          </div>

          <button 
            type="button"
            onClick={onOpenBooking}
            className="self-start md:self-center bg-primary hover:bg-on-primary-container text-white font-extrabold text-xs px-6 py-3 rounded-full flex items-center gap-1.5 shadow transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Reservar Nuevo Banquete
          </button>
        </section>

        {/* Dynamic Client Order History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main List Column */}
          <section className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-bold text-on-surface flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Historial de Mis Banquetes
              </h2>
              <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
                {myRequests.length} {myRequests.length === 1 ? 'Solicitud' : 'Solicitudes'}
              </span>
            </div>

            {myRequests.length > 0 ? (
              <div className="space-y-4">
                {myRequests.map((req) => {
                  const isExpanded = expandedId === req.id;
                  const needs = calculateStaffNeeds(req.dogs, req.humans, !!req.medicalStandby);

                  return (
                    <article 
                      key={req.id} 
                      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 shadow-sm hover:shadow-md transition-all space-y-4"
                    >
                      {/* Top Header Row */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/15 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-primary-container/20 text-primary text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              {req.id}
                            </span>
                            <h3 className="font-display font-extrabold text-base text-on-surface tracking-tight">
                              {req.title}
                            </h3>
                          </div>
                          
                          <p className="text-xs text-on-surface-variant font-medium mt-1 flex flex-wrap gap-x-4">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" /> {req.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {req.time} AM</span>
                          </p>
                        </div>

                        {getStatusBadge(req.status)}
                      </div>

                      {/* Middle basics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
                        <div>
                          <p className="text-on-surface-variant text-[10px] font-bold uppercase">Mascotas invitadas</p>
                          <p className="text-on-surface font-semibold mt-0.5">{req.dogs} Perros</p>
                        </div>
                        <div>
                          <p className="text-on-surface-variant text-[10px] font-bold uppercase">Acompañantes</p>
                          <p className="text-on-surface font-semibold mt-0.5">{req.humans} Humanos</p>
                        </div>
                        <div>
                          <p className="text-on-surface-variant text-[10px] font-bold uppercase">Pastel Canino</p>
                          <p className="text-on-surface font-semibold mt-0.5 text-primary">{getCakeName(req.cakeType)}</p>
                        </div>
                        <div>
                          <p className="text-on-surface-variant text-[10px] font-bold uppercase">Catering Humano</p>
                          <p className="text-on-surface font-semibold mt-0.5">
                            {req.humanFood === 'finger_food' ? 'Finger Food' : 'Hamburguesas (Sliders)'}
                          </p>
                        </div>
                      </div>

                      {/* Expander detail section */}
                      {isExpanded ? (
                        <div className="pt-4 border-t border-outline-variant/15 space-y-4 animate-fadeIn">
                          
                          {/* AUTOMATIC STAFFING EXPLANATION */}
                          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 mb-2">
                              <Sparkles className="w-4 h-4" strokeWidth={2.5} /> Equipo Requerido de Cuidado Culinario (Autocalculado)
                            </h4>
                            <p className="text-[11px] text-on-surface-variant leading-relaxed mb-3">
                              Por seguridad y apego absoluto a los protocolos de salubridad canina, cada evento cuenta con un equipo calculado dinámicamente de acuerdo a la cantidad de huéspedes:
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-semibold">
                              <div className="bg-surface-container-low p-2 rounded-lg py-3">
                                <span className="text-[9px] text-on-surface-variant uppercase block">Coordinadores</span>
                                <span className="font-bold text-primary mt-0.5 block">{needs.coordinators}</span>
                              </div>
                              <div className="bg-surface-container-low p-2 rounded-lg py-3">
                                <span className="text-[9px] text-on-surface-variant uppercase block">Chef Repostero</span>
                                <span className="font-bold text-secondary mt-0.5 block">{needs.chefs}</span>
                              </div>
                              <div className="bg-surface-container-low p-2 rounded-lg py-3">
                                <span className="text-[9px] text-on-surface-variant uppercase block">Auxiliares</span>
                                <span className="font-bold text-tertiary mt-0.5 block">{needs.helpers}</span>
                              </div>
                              <div className="bg-surface-container-low p-2 rounded-lg py-3">
                                <span className="text-[9px] text-on-surface-variant uppercase block">Soporte Médico</span>
                                <span className="font-bold text-red-500 mt-0.5 block">{needs.vets}</span>
                              </div>
                            </div>

                            <p className="text-[10px] text-on-surface-variant italic mt-3 text-center border-t border-outline-variant/15 pt-2">
                              Total sugerido: <strong>{needs.total} profesionales</strong> asignados para garantizar el éxito total del evento.
                            </p>
                          </div>

                          {/* Order Details / Notes */}
                          <div className="space-y-1 bg-surface-container-low/40 p-3 rounded-xl border border-outline-variant/10 text-xs">
                            <span className="text-[10px] font-bold text-on-surface-variant uppercase">Ubicación física:</span>
                            <p className="text-on-surface font-semibold flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-primary" /> {req.location}
                            </p>
                          </div>

                          {req.specialNotes && (
                            <div className="space-y-1 bg-surface-container-low/40 p-3 rounded-xl border border-outline-variant/10 text-xs">
                              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Notas adicionales registradas:</span>
                              <p className="text-on-surface italic">"{req.specialNotes}"</p>
                            </div>
                          )}

                        </div>
                      ) : null}

                      {/* Expander Trigger to reveal calculated staff and full notes */}
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : req.id)}
                          className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {isExpanded ? (
                            <>Ocultar Ficha Técnica <ChevronUp className="w-3.5 h-3.5" /></>
                          ) : (
                            <>Ver Cuidado de Staff Autocalculado <ChevronDown className="w-3.5 h-3.5" /></>
                          )}
                        </button>
                      </div>

                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 glass-panel rounded-2xl border border-dashed border-outline-variant/30">
                <PawPrint className="w-12 h-12 text-outline mx-auto mb-3 opacity-60" />
                <h3 className="font-semibold text-on-surface">Aún no has solicitado banquetes</h3>
                <p className="text-xs text-on-surface-variant mt-1">Presiona "Reservar Nuevo Banquete" para iniciar tu primer evento.</p>
              </div>
            )}
          </section>

          {/* Sidebar Info Panel */}
          <aside className="lg:col-span-4 space-y-6">
            
            <div className="glass-card rounded-2xl p-5 border border-outline-variant/30 bg-surface-container-lowest space-y-4">
              <h3 className="font-display font-bold text-on-surface border-b border-outline-variant/20 pb-2 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> Membresía VIP Premium
              </h3>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 border border-primary/20 shrink-0">
                  <img src={userSession.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=VIP'} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface">{userSession.name}</h4>
                  <span className="text-[10px] text-primary font-extrabold uppercase">Miembro VIP Elite</span>
                </div>
              </div>

              <div className="bg-surface-container/30 border border-outline-variant/20 rounded-xl p-3 space-y-2 text-xs">
                <p className="text-on-surface-variant font-medium leading-relaxed">
                  Como miembro de nivel corporativo/VIP de DogSitter, gozas de acompañamiento veterinario preferente libre de costo adicional en eventos con más de 20 canes.
                </p>
                <p className="text-primary font-bold">
                  Soporte Telefónico VIP 24/7 disponible.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-surface-container-high/40 to-surface-container/20 rounded-2xl p-5 border border-outline-variant/30 text-xs font-bold space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="w-4 h-4" />
                <span>¿Cómo funciona el staff autocalculado?</span>
              </div>
              <p className="text-on-surface-variant text-xs leading-relaxed font-medium">
                Al solicitar un evento, nuestra cocina central y los coordinadores operativos computan los requerimientos de cuidado óptimos de tus mascotas de forma transparente. Puedes revisarlos presionando "Ver Cuidado de Staff Autocalculado".
              </p>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}
