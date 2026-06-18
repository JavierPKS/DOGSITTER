import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  PawPrint, 
  Clock, 
  ChevronRight, 
  Award,
  Eye,
  CheckCircle,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { EventRequest } from '../types';

interface ApprovedEventsProps {
  requests: EventRequest[];
  onSelectRequest: (request: EventRequest) => void;
  onGoBack: () => void;
}

export default function ApprovedEvents({ requests, onSelectRequest, onGoBack }: ApprovedEventsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Get only approved events
  const approvedRequests = requests.filter(req => req.status === 'Approved');

  // Filter approved events dynamically by search term
  const filteredRequests = approvedRequests.filter(req => {
    return (
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface text-on-surface p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-1">
              <CheckCircle className="w-4 h-4 text-primary animate-pulse" /> Panel de Eventos Aprobados
            </div>
            <h1 className="text-3xl font-display font-black tracking-tight text-on-surface">
              Eventos Aprobados
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">
              Lista oficial de reservaciones de banquetes aprobadas para preparar logística y dotación.
            </p>
          </div>
          
          <button
            type="button"
            onClick={onGoBack}
            className="px-5 py-2 rounded-full border border-outline text-on-surface hover:bg-surface-container-high transition-all font-semibold text-xs cursor-pointer select-none"
          >
            Regresar a la Bandeja
          </button>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 border border-primary/25 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-primary" />
            </span>
            <div>
              <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider block">Total Aprobados</span>
              <strong className="text-2xl font-display font-black text-primary block leading-none mt-1">
                {approvedRequests.length}
              </strong>
            </div>
          </div>

          <div className="bg-tertiary-fixed-dim/20 border border-tertiary/20 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <span className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
              <PawPrint className="w-6 h-6 text-tertiary" />
            </span>
            <div>
              <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider block">Mascotas Totales</span>
              <strong className="text-2xl font-display font-black text-on-surface block leading-none mt-1">
                {approvedRequests.reduce((sum, r) => sum + (r.dogs || 0), 0)} Perros
              </strong>
            </div>
          </div>

          <div className="bg-secondary-fixed-dim/20 border border-secondary/20 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <span className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-secondary" />
            </span>
            <div>
              <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider block">Asistencia Humana</span>
              <strong className="text-2xl font-display font-black text-on-surface block leading-none mt-1">
                {approvedRequests.reduce((sum, r) => sum + (r.humans || 0), 0)} Invitados
              </strong>
            </div>
          </div>
        </div>

        {/* Search controls */}
        <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 shadow-inner">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar por cliente, título o locación..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>

        {/* Listing Block */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((req) => (
              <div 
                key={req.id}
                onClick={() => onSelectRequest(req)}
                className="glass-panel hover:shadow-md cursor-pointer transition-all duration-200 border border-outline-variant/30 rounded-3xl p-5 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Visual strip indicator representing Approved */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-container group-hover:w-1.5 transition-all" />

                <div className="space-y-4">
                  
                  {/* Top line request identifier and status badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-primary font-bold px-2 py-0.5 rounded bg-primary/10 select-none">
                      {req.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-tertiary-fixed text-on-tertiary-container select-none">
                      Aprobado
                    </span>
                  </div>

                  {/* Title and Client Avatar information */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20 bg-surface-container-high shrink-0 shadow-inner">
                      <img 
                        src={req.requesterAvatar} 
                        alt={req.requesterName} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${req.requesterName}`;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                        {req.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1 mt-0.5">
                        <Award className="w-3.5 h-3.5 text-primary" /> {req.requesterName}
                      </p>
                    </div>
                  </div>

                  {/* Event key configurations list layout */}
                  <div className="space-y-2 border-t border-b border-outline-variant/15 py-3 text-xs font-semibold text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <span>{req.date} a las {req.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span className="truncate">{req.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PawPrint className="w-4 h-4 text-primary shrink-0" />
                      <span>{req.dogs} Perros ({req.humans} Humanos)</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Trigger Action button */}
                <div className="flex items-center justify-between pt-4 mt-2">
                  <span className="text-[10px] text-on-surface-variant font-mono">
                    Pastel: {req.cakeType === 'none' ? 'Sin pastel' : 'Saborizado'}
                  </span>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRequest(req);
                    }}
                    className="text-xs font-extrabold text-primary group-hover:text-primary/85 transition-all flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> Ver Detalles <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-3xl border border-dashed border-outline-variant/30 space-y-3">
            <Calendar className="w-14 h-14 text-outline mx-auto opacity-50 animate-pulse" />
            <h3 className="font-display font-bold text-on-surface text-lg">No hay eventos aprobados</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
              No se han encontrado eventos aprobados en esta vista. Dirígete a la Bandeja de Entrada, selecciona un requerimiento pendiente y apruébalo.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
