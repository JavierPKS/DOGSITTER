import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  AlertTriangle, 
  Compass, 
  ShieldCheck, 
  Award,
  Apple,
  Cookie,
  Coffee,
  ChevronRight,
  Sparkles,
  UtensilsCrossed,
  Bone
} from 'lucide-react';
import { EventRequest } from '../types';

interface AdminDetailProps {
  request: EventRequest;
  onGoBack: () => void;
  onApproveEvent: (id: string) => void;
  onRejectEvent: (id: string) => void;
}

export default function AdminDetail({ 
  request, 
  onGoBack, 
  onApproveEvent, 
  onRejectEvent 
}: AdminDetailProps) {
  
  // Math formulation for dynamic Bill Of Materials (BOM) based on request guest counts!
  const dogs = request.dogs || 5;
  const humans = request.humans || 10;
  const pupcakes = request.pupcakes || 12;

  // Proteins
  const salmonFiletKg = Number((humans * 0.1 + dogs * 0.05).toFixed(1));
  const beefLiverKg = Number((dogs * 0.06).toFixed(1));
  const turkeyBreastKg = Number((humans * 0.08).toFixed(1));

  // Fruits
  const pumpkinPureeCans = Math.ceil(dogs * 0.5);
  const babyCarrotsKg = Number((dogs * 0.15).toFixed(1));
  const blueberriesKg = Number((dogs * 0.08).toFixed(1));

  // Pantry
  const oatFlourKg = Number((pupcakes * 0.05 + dogs * 0.03).toFixed(1));
  const peanutButterJars = Math.ceil(pupcakes * 0.05 + 1);

  // Beverages
  const sparklingWaterCans = Math.max(24, Math.ceil(humans * 1.1 + 8));
  const goatMilkGallons = Math.max(1, Number((dogs * 0.1 + 1).toFixed(1)));

  const getCakeName = (type: string) => {
    switch (type) {
      case 'peanut_butter': return 'Mantequilla de Maní';
      case 'beef_liver': return 'Hígado de Res';
      case 'pumpkin_apple': return 'Calabaza y Manzana';
      case 'none': return 'Ninguno';
      default: return type;
    }
  };

  const getHumanFoodName = (type: string) => {
    switch (type) {
      case 'finger_food': return 'Finger Food Ligero';
      case 'sliders': return 'Mini Hamburguesas (Sliders)';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Approved': return 'Evento Aprobado';
      case 'Declined': return 'Solicitud Rechazada';
      case 'Pending': return 'Aprobación Pendiente';
      default: return status;
    }
  };

  return (
    <div id="event-detail-portal" className="min-h-[calc(100vh-4rem)] bg-surface text-on-surface py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center text-xs font-semibold text-on-surface-variant space-x-2">
            <button 
              onClick={onGoBack}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              Eventos
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-outline-variant" />
            <span className="text-primary font-bold">Solicitud #{request.id}</span>
          </div>
          
          <button 
            onClick={onGoBack}
            className="text-xs font-bold text-on-surface-variant bg-surface-container hover:bg-surface-container-high px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a Bandeja
          </button>
        </div>

        {/* Header Block */}
        <div className="border-b border-outline-variant/30 pb-6 mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-on-surface tracking-tight leading-tight">
              {request.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-on-surface-variant font-medium">
              <span className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-lg">
                <Calendar className="w-4 h-4 text-primary" />
                {request.date} • {request.time} AM
              </span>
              <span className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-lg">
                <MapPin className="w-4 h-4 text-primary" />
                {request.location}
              </span>
              <span className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-lg">
                <Users className="w-4 h-4 text-primary" />
                {humans} Invitados ({dogs} Perros)
              </span>
            </div>
          </div>

          {/* Action Trigger Handles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status indicators */}
            <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold ${
              request.status === 'Approved' ? 'bg-tertiary-fixed text-on-tertiary-container' :
              request.status === 'Declined' ? 'bg-error-container text-on-error-container' :
              'bg-secondary-fixed text-on-secondary-fixed'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                request.status === 'Approved' ? 'bg-tertiary shadow' :
                request.status === 'Declined' ? 'bg-error' :
                'bg-secondary'
              }`} />
              {getStatusLabel(request.status)}
            </span>

            {request.status === 'Pending' && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onRejectEvent(request.id)}
                  className="px-5 py-2 rounded-full border border-outline text-on-surface hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer"
                >
                  Rechazar
                </button>
                <button 
                  onClick={() => onApproveEvent(request.id)}
                  className="px-5 py-2.5 bg-primary hover:bg-on-primary-container text-white rounded-full shadow transition-all text-xs font-extrabold flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" /> Aprobar Evento
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bento Grid Layout matching screen 3 bento blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Box 1: Requester Profile Card (Span 4) */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 lg:col-span-4 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 text-base">
                <User className="w-5 h-5 text-primary" /> Datos del Cliente
              </h3>

              <div className="flex items-center gap-3 mb-5 p-3.5 bg-surface-container-low/40 rounded-xl border border-outline-variant/20">
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-outline-variant/20 shadow-inner">
                  <img 
                    src={request.requesterAvatar} 
                    alt={request.requesterName} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${request.requesterName}`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-on-surface text-base">{request.requesterName}</h4>
                  <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1 mt-0.5">
                    <Award className="w-3.5 h-3.5 text-primary" /> {request.requesterTier}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs font-medium">
                <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                  <span className="text-on-surface-variant">Correo electrónico</span>
                  <span className="text-on-surface font-semibold flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-outline" /> {request.requesterEmail}
                  </span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                  <span className="text-on-surface-variant">Teléfono móvil</span>
                  <span className="text-on-surface font-semibold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-outline" /> {request.requesterPhone}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-on-surface-variant">Historial</span>
                  <span className="text-primary font-bold">12 Eventos Exitosos</span>
                </div>
              </div>
            </div>
            
            <button className="mt-6 w-full py-2.5 border border-outline-variant hover:bg-surface-container text-primary font-bold text-xs rounded-xl transition-all cursor-pointer">
              Ver Perfil de Reservación
            </button>
          </div>

          {/* Box 2: Special Notes & Requirements Card (Span 8) */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 lg:col-span-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2 text-base">
                <FileText className="w-5 h-5 text-primary" /> Notas del Evento y Restricciones
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                {/* Description Quote Box */}
                <div className="bg-surface-container-low/40 rounded-xl p-4 border border-outline-variant/25 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">Descripción del Cliente</span>
                    <p className="text-xs text-on-surface italic leading-relaxed">
                      "{request.specialNotes || 'Buscamos disfrutar de una hermosa celebración personalizada con comida orgánica para cachorros.'}"
                    </p>
                  </div>
                </div>

                {/* Requirements Warning list with icons */}
                <div className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-on-surface block">Restricciones Dietarias (Perros)</span>
                      <p className="text-[11px] text-on-surface-variant leading-tight mt-0.5">
                        {request.dietaryAlerts || 'Sin alergias reportadas.'} Los ingredientes de alerta han sido sustituidos por proteínas saludables de pavo desmenuzado.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Compass className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-on-surface block">Especificación de Seguridad de Locación</span>
                      <p className="text-[11px] text-on-surface-variant leading-tight mt-0.5">
                        {request.venueRequirements || 'Perímetro cercado necesario.'} Puntos de hidratación canina activa y acceso a agua.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-on-surface block">Soporte Veterinario Primario/Médico</span>
                      <p className="text-[11px] text-on-surface-variant leading-tight mt-0.5">
                        {request.medicalStandby ? 'Equipos de primeros auxilios caninos disponibles en el sitio a todos momentos.' : 'Soporte de botiquín canino regular preinstalado.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-outline-variant/20 pt-4 mt-4 grid grid-cols-2 gap-4 text-xs font-medium text-on-surface-variant">
              <span>Sabor de Pastel: <strong className="text-on-surface font-semibold">{getCakeName(request.cakeType)}</strong></span>
              <span>Catering para Dueños: <strong className="text-on-surface font-semibold">{getHumanFoodName(request.humanFood)}</strong></span>
            </div>
          </div>

        </div>

        {/* Section: Minuta Gastronómica (BOM) */}
        <section id="gastronomic-minutes" className="space-y-4">
          <div className="border-b border-outline-variant/30 pb-3">
            <h2 className="text-2xl font-display font-bold text-on-surface flex items-center gap-2">
              <UtensilsCrossed className="w-6 h-6 text-primary" /> Minuta Gastronómica (BOM - Autocalculada)
            </h2>
            <p className="text-xs text-on-surface-variant mt-1 max-w-3xl">
              Consolidación dinámica de ingredientes y escala necesaria para cubrir el tamaño del banquete ({humans} Humanos, {dogs} Perros) con reemplazos seguros de alergénicos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Table 1: Proteínas */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20">
              <div className="bg-primary-fixed/40 px-4 py-3.5 border-b border-outline-variant/30 flex justify-between items-center">
                <h3 className="font-display font-bold text-sm text-on-primary-fixed flex items-center gap-1.5">
                  <Bone className="w-4 h-4 text-primary" /> Proteínas (Mascotas y Humanos)
                </h3>
                <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Abastecimiento</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/20 text-on-surface-variant font-bold">
                      <th className="px-4 py-2.5">Ingrediente</th>
                      <th className="px-4 py-2.5">Cantidad</th>
                      <th className="px-4 py-2.5">Unidad</th>
                      <th className="px-4 py-2.5">Rendimiento / Protocolo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15 text-on-surface font-medium">
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold">Carne de Res Molida Orgánica</td>
                      <td className="px-4 py-2.5">{salmonFiletKg}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">kg</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">Albóndigas y Mini Hamburguesas</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold">Hígado Deshidratado de Res</td>
                      <td className="px-4 py-2.5">{beefLiverKg}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">kg</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">Premios de obediencia directos</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-primary">Pavo Desmenuzado Hipoalergénico</td>
                      <td className="px-4 py-2.5">{turkeyBreastKg}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">kg</td>
                      <td className="px-4 py-2.5"><span className="bg-error-container text-on-error-container text-[9px] px-1.5 py-0.5 rounded">Remplazo de Pollo</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Frutas y Verduras */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20">
              <div className="bg-tertiary-fixed/40 px-4 py-3.5 border-b border-outline-variant/30 flex justify-between items-center">
                <h3 className="font-display font-bold text-sm text-on-tertiary-fixed flex items-center gap-1.5">
                  <Apple className="w-4 h-4 text-tertiary" /> Frutas y Vegetales
                </h3>
                <span className="bg-tertiary-container text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Origen Local</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/20 text-on-surface-variant font-bold">
                      <th className="px-4 py-2.5">Ingrediente</th>
                      <th className="px-4 py-2.5">Cantidad</th>
                      <th className="px-4 py-2.5">Unidad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15 text-on-surface font-medium">
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold">Puré de Calabaza Orgánica</td>
                      <td className="px-4 py-2.5">{pumpkinPureeCans}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">latas (15oz)</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold">Zanahorias Baby Frescas</td>
                      <td className="px-4 py-2.5">{babyCarrotsKg}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">kg</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold">Arándanos Azules Libres de Pesticidas</td>
                      <td className="px-4 py-2.5">{blueberriesKg}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 3: Despensa y Abarrotes */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20">
              <div className="bg-secondary-fixed/40 px-4 py-3.5 border-b border-outline-variant/30 flex justify-between items-center">
                <h3 className="font-display font-bold text-sm text-on-secondary-fixed flex items-center gap-1.5">
                  <Cookie className="w-4 h-4 text-secondary" /> Despensa y Harinas
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/20 text-on-surface-variant font-bold">
                      <th className="px-4 py-2.5">Ingrediente</th>
                      <th className="px-4 py-2.5">Cantidad</th>
                      <th className="px-4 py-2.5">Unidad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15 text-on-surface font-medium">
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold">Harina de Avena Orgánica (Sin Gluten)</td>
                      <td className="px-4 py-2.5">{oatFlourKg}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">kg</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold">Mantequilla de Maní Natural (Sin Xilitol)</td>
                      <td className="px-4 py-2.5">{peanutButterJars}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">frascos (32oz)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 4: Bebidas */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20">
              <div className="bg-surface-variant/40 px-4 py-3.5 border-b border-outline-variant/30 flex justify-between items-center">
                <h3 className="font-display font-bold text-sm text-on-surface flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-outline" /> Bebidas y Refrescos
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/20 text-on-surface-variant font-bold">
                      <th className="px-4 py-2.5">Ingrediente</th>
                      <th className="px-4 py-2.5">Cantidad</th>
                      <th className="px-4 py-2.5">Unidad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15 text-on-surface font-medium">
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold">Agua Gasificada Saborizada</td>
                      <td className="px-4 py-2.5">{sparklingWaterCans}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">latas</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold">Leche de Cabra Orgánica (para Puppuccinos)</td>
                      <td className="px-4 py-2.5">{goatMilkGallons}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">galones</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
