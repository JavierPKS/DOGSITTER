import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  TrendingUp,
  Inbox,
  LayoutDashboard,
  Calendar,
  PawPrint,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
  Users,
  Plus
} from 'lucide-react';
import { EventRequest } from '../types';

interface AdminInboxProps {
  requests: EventRequest[];
  onSelectRequest: (request: EventRequest) => void;
  onDeclineRequest: (id: string) => void;
  onOpenBooking: () => void;
  onSelectRecipes: () => void;
  onSelectSchedules: () => void;
  onSelectStaff?: () => void;
}

export default function AdminInbox({ 
  requests, 
  onSelectRequest, 
  onDeclineRequest,
  onOpenBooking,
  onSelectRecipes,
  onSelectSchedules,
  onSelectStaff
}: AdminInboxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Declined'>('Pending');

  // Filter requests dynamically
  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' ? true : req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Simple statistics
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const approvedCount = requests.filter(r => r.status === 'Approved').length + 42; // Preloaded mock baseline

  // Find urgent corporate meeting request if available
  const urgentRequest = requests.find(r => r.id === 'EVT-4832');

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Approved': return 'Aprobado';
      case 'Declined': return 'Rechazado';
      case 'Pending': return 'Pendiente';
      default: return status;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-surface text-on-surface">
      
      {/* SideNavBar Column - Persistent on desktop, matching brand requirements */}
      <aside className="w-[280px] bg-inverse-surface text-white p-6 shrink-0 hidden lg:flex flex-col justify-between">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center gap-3 border-b border-outline/20 pb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold leading-tight">Admin</h2>
              <p className="text-xs text-outline-variant">Coordinador de Eventos</p>
            </div>
          </div>

          <button 
            onClick={onOpenBooking}
            className="w-full bg-primary hover:bg-primary-container text-white py-3 px-4 rounded-xl font-bold text-sm shadow transition-all flex items-center justify-center gap-2 active:scale-95 duration-100 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Registrar Evento
          </button>

          {/* Nav Items */}
          <nav className="space-y-1.5 pt-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-surface-container-highest hover:bg-white/5 hover:text-white transition-colors text-left text-sm font-semibold cursor-pointer">
              <LayoutDashboard className="w-4 h-4 text-outline-variant" />
              Panel de Control
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border-l-4 border-primary bg-primary-container/10 text-primary font-bold text-left text-sm cursor-pointer">
              <span className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-primary" />
                Eventos
              </span>
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingCount}</span>
            </button>
            <button 
              onClick={onSelectSchedules}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-surface-container-highest hover:bg-white/5 hover:text-white transition-colors text-left text-sm font-semibold cursor-pointer"
            >
              <Clock className="w-4 h-4 text-outline-variant" />
              Horarios
            </button>
            <button 
              onClick={onSelectRecipes}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-surface-container-highest hover:bg-white/5 hover:text-white transition-colors text-left text-sm font-semibold cursor-pointer"
            >
              <Settings className="w-4 h-4 text-outline-variant" />
              Parámetros de Recetas
            </button>
            {onSelectStaff && (
              <button 
                onClick={onSelectStaff}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-surface-container-highest hover:bg-white/5 hover:text-white transition-colors text-left text-sm font-semibold cursor-pointer"
              >
                <Users className="w-4 h-4 text-outline-variant" />
                Administración de Staff
              </button>
            )}
          </nav>
        </div>

        {/* Footer items */}
        <div className="border-t border-outline/20 pt-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-surface-container-highest hover:bg-white/5 hover:text-white transition-all text-left text-xs font-bold cursor-pointer">
            <HelpCircle className="w-4 h-4 text-outline-variant" />
            Soporte Técnico
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-surface-container-highest hover:bg-white/5 hover:text-white transition-all text-left text-xs font-bold cursor-pointer">
            <LogOut className="w-4 h-4 text-outline-variant" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight text-on-surface">Bandeja de Entrada</h1>
            <p className="text-sm text-on-surface-variant">Revisa y precalcula los materiales para solicitudes pendientes de tus clientes.</p>
          </div>

          {/* Search and Filters bar */}
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar solicitud..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm shadow-black/5"
              />
            </div>
            <div className="relative w-full sm:w-48">
              <Filter className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full pl-9 pr-8 py-2 text-sm bg-surface-container-lowest border border-outline-variant rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              >
                <option value="All">Todos los Estados</option>
                <option value="Pending">Pendientes</option>
                <option value="Approved">Aprobados</option>
                <option value="Declined">Rechazados</option>
              </select>
            </div>
          </div>
        </header>

        {/* Requests Bento Grid layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Column: Inbox request items list (Take up 2 columns on XL devices) */}
          <div className="xl:col-span-2 space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <article 
                  key={req.id}
                  onClick={() => onSelectRequest(req)}
                  className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-all duration-150 cursor-pointer relative overflow-hidden group border border-outline-variant/30"
                >
                  {/* Active brand strip color based on status */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${req.status === 'Approved' ? 'bg-tertiary-container' : req.status === 'Declined' ? 'bg-error' : 'bg-primary'}`} />

                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high shrink-0 border border-outline-variant/20 shadow-inner">
                      <img 
                        src={req.requesterAvatar} 
                        alt={req.requesterName} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to random placeholder if load fails
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${req.requesterName}`;
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-lg text-on-surface hover:text-primary transition-colors">
                          {req.title}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          req.status === 'Approved' ? 'bg-tertiary-fixed text-on-tertiary-container' :
                          req.status === 'Declined' ? 'bg-error-container text-on-error-container' :
                          'bg-primary-container/20 text-primary'
                        }`}>
                          {getStatusLabel(req.status)}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-primary" /> {req.requesterName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" /> {req.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <PawPrint className="w-3.5 h-3.5 text-primary" /> {req.dogs} Perros ({req.humans} Humanos)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Context actions shown on hover on desktop or consistently on mobile */}
                  <div className="flex gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeclineRequest(req.id);
                      }}
                      disabled={req.status === 'Declined'}
                      className="flex-1 sm:flex-none px-4 py-2 border border-outline/50 hover:bg-surface-container hover:text-error hover:border-error text-on-surface text-xs font-bold rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Rechazar
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRequest(req);
                      }}
                      className="flex-1 sm:flex-none px-4 py-2 bg-primary hover:bg-on-primary-container text-on-primary text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      Revisar
                    </button>
                  </div>

                </article>
              ))
            ) : (
              <div className="text-center py-12 glass-panel rounded-2xl border border-dashed border-outline-variant/30">
                <Inbox className="w-12 h-12 text-outline mx-auto mb-3 opacity-60" />
                <h3 className="font-semibold text-on-surface">No se encontraron solicitudes</h3>
                <p className="text-xs text-on-surface-variant mt-1">Ajusta los filtros o ingresa palabras clave de búsqueda.</p>
              </div>
            )}

            {/* Pagination Layout */}
            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20 text-xs font-semibold text-on-surface-variant">
              <span>Mostrando 1-{Math.min(filteredRequests.length, 3)} de {filteredRequests.length} solicitudes</span>
              <div className="flex gap-1">
                <button className="p-2 rounded hover:bg-surface-container transition-colors disabled:opacity-30" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded bg-primary-fixed text-on-primary-fixed font-bold flex items-center justify-center">1</button>
                <button className="w-8 h-8 rounded hover:bg-surface-container font-semibold flex items-center justify-center transition-all">2</button>
                <button className="w-8 h-8 rounded hover:bg-surface-container font-semibold flex items-center justify-center transition-all">3</button>
                <button className="p-2 rounded hover:bg-surface-container transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Context Information and Quick Stats */}
          <aside className="space-y-6">
            
            {/* Stats Card */}
            <div className="glass-card rounded-2xl p-5 border border-outline-variant/30">
              <h4 className="font-display font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Resumen de Bandeja
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30 shadow-inner">
                  <span className="text-3xl font-display font-extrabold text-primary block mb-1">{pendingCount}</span>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Pendientes</span>
                </div>
                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30 shadow-inner">
                  <span className="text-3xl font-display font-extrabold text-tertiary block mb-1">{approvedCount}</span>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Aprobadas (30d)</span>
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant/20 text-xs font-medium text-on-surface-variant flex items-start gap-2">
                <Info className="w-4 h-4 text-tertiary mt-0.5 shrink-0" />
                <span>El promedio de respuesta es de 4 horas para mantener la excelencia comercial.</span>
              </div>
            </div>

            {/* Priority Alert card for Urgent tasks (Corporate Event EVT-4832) */}
            {urgentRequest && (
              <div className="bg-error-container text-on-error-container rounded-2xl p-5 shadow-sm border border-error/15 relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-full bg-error/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-error" />
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-base text-on-error-container mb-1">Requerimiento Urgente</h4>
                    <p className="text-xs opacity-90 leading-relaxed mb-4">
                      "{urgentRequest.title}" ha sido solicitado por {urgentRequest.requesterName} y requiere respuesta inmediata para trámites de locación corporativa.
                    </p>
                    <button 
                      onClick={() => onSelectRequest(urgentRequest)}
                      className="font-bold text-xs text-error hover:text-on-error-container underline flex items-center gap-1 cursor-pointer"
                    >
                      Revisar ahora <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </aside>

        </div>
      </main>

    </div>
  );
}
