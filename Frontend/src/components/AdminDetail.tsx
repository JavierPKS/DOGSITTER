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
import { EventRequest, Recipe } from '../types';

interface AdminDetailProps {
  request: EventRequest;
  recipes?: Recipe[];
  onGoBack: () => void;
  onApproveEvent: (id: string) => void;
  onRejectEvent: (id: string) => void;
}

const categorizeIngredient = (name: string): 'protein' | 'veg' | 'pantry' => {
  const lowercase = name.toLowerCase();
  if (
    lowercase.includes('res') || 
    lowercase.includes('carne') || 
    lowercase.includes('salmón') || 
    lowercase.includes('salmon') || 
    lowercase.includes('pescado') || 
    lowercase.includes('pollo') || 
    lowercase.includes('pavo') || 
    lowercase.includes('ternera') || 
    lowercase.includes('hígado') || 
    lowercase.includes('higado') || 
    lowercase.includes('protein') ||
    lowercase.includes('huevo')
  ) {
    return 'protein';
  }
  if (
    lowercase.includes('zanahoria') || 
    lowercase.includes('calabaza') || 
    lowercase.includes('camote') || 
    lowercase.includes('manzana') || 
    lowercase.includes('perejil') || 
    lowercase.includes('guisantes') || 
    lowercase.includes('fruta') || 
    lowercase.includes('vegetal') || 
    lowercase.includes('arándano') || 
    lowercase.includes('arandano') || 
    lowercase.includes('plátano') || 
    lowercase.includes('platano') ||
    lowercase.includes('espinaca')
  ) {
    return 'veg';
  }
  return 'pantry';
};

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
  if (!type) return 'Ninguno';
  const parts = type.split(',').map(p => p.trim());
  const labels = parts.map(part => {
    switch (part) {
      case 'finger_food': return 'Finger Food Ligero';
      case 'sliders': return 'Mini Hamburguesas (Sliders)';
      case 'sweets': return 'Mesa de Postres Dulces';
      case 'brews': return 'Estación de Café & Té';
      default: return part;
    }
  });
  return labels.join(', ');
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'Approved': return 'Evento Aprobado';
    case 'Declined': return 'Solicitud Rechazada';
    case 'Pending': return 'Aprobación Pendiente';
    default: return status;
  }
};

export default function AdminDetail({ 
  request, 
  recipes,
  onGoBack, 
  onApproveEvent, 
  onRejectEvent 
}: AdminDetailProps) {
  const [showConfirmReject, setShowConfirmReject] = React.useState(false);
  
  // Math formulation for dynamic Bill Of Materials (BOM) based on request guest counts!
  const sDogs = request.smallDogs ?? 0;
  const mDogs = request.mediumDogs ?? 0;
  const lDogs = request.largeDogs ?? 0;
  const hasDetailedSizes = (sDogs + mDogs + lDogs) > 0;

  const dogs = request.dogs || (hasDetailedSizes ? (sDogs + mDogs + lDogs) : 5);
  const humans = request.humans || 10;
  const pupcakes = request.pupcakes || 12;

  // Size Multiplier based on dogSize: small = 1, medium = 2, large = 3, or weighted mix
  let sizeMultiplier = 1;
  let sizeMultiplierLabel = '';

  if (hasDetailedSizes) {
    const totalDogsBreakdown = sDogs + mDogs + lDogs;
    sizeMultiplier = (sDogs * 1 + mDogs * 2 + lDogs * 3) / totalDogsBreakdown;
    sizeMultiplierLabel = `Distribución [${sDogs} Chicos (*1), ${mDogs} Medianos (*2), ${lDogs} Grandes (*3)] (Promedio: x${sizeMultiplier.toFixed(2)})`;
  } else {
    sizeMultiplier = request.dogSize === 'medium' ? 2 : request.dogSize === 'large' ? 3 : 1;
    sizeMultiplierLabel = request.dogSize === 'medium' ? 'Mediano (x2)' : request.dogSize === 'large' ? 'Grande (x3)' : 'Pequeño (x1)';
  }

  // Baseline Fallback Proteins
  const salmonFiletKg = Number((humans * 0.1 + dogs * 0.05 * sizeMultiplier).toFixed(1));
  const beefLiverKg = Number((dogs * 0.06 * sizeMultiplier).toFixed(1));
  const turkeyBreastKg = Number((humans * 0.08).toFixed(1));

  // Baseline Fallback Fruits
  const pumpkinPureeCans = Math.ceil(dogs * 0.5 * sizeMultiplier);
  const babyCarrotsKg = Number((dogs * 0.15 * sizeMultiplier).toFixed(1));
  const blueberriesKg = Number((dogs * 0.08 * sizeMultiplier).toFixed(1));

  // Baseline Fallback Pantry
  const oatFlourKg = Number((pupcakes * 0.05 * sizeMultiplier + dogs * 0.03 * sizeMultiplier).toFixed(1));
  const peanutButterJars = Math.ceil(pupcakes * 0.05 * sizeMultiplier + 1);

  // Beverages (Not scaled from culinary recipes, directly calculated)
  const sparklingWaterCans = Math.max(24, Math.ceil(humans * 1.1 + 8));
  const goatMilkGallons = Math.max(1, Number((dogs * 0.1 * sizeMultiplier + 1).toFixed(1)));

  // Dynamic Recipe Calculation with Error Detection
  const dynamicIngredients = (() => {
    const list: Array<{
      name: string;
      quantity: string;
      unit: string;
      category: 'protein' | 'veg' | 'pantry';
      recipeName: string;
      hasError: boolean;
      errorMessage?: string;
    }> = [];

    if (!recipes || recipes.length === 0) {
      list.push(
        { name: 'Carne de Res Molida Orgánica (Fallback)', quantity: String(salmonFiletKg), unit: 'kg', category: 'protein', recipeName: 'Albóndigas de Res (Base)', hasError: false },
        { name: 'Hígado Deshidratado de Res (Fallback)', quantity: String(beefLiverKg), unit: 'kg', category: 'protein', recipeName: 'Premios Directos', hasError: false },
        { name: 'Pavo Desmenuzado Hipoalergénico (Fallback)', quantity: String(turkeyBreastKg), unit: 'kg', category: 'protein', recipeName: 'Reemplazo de Pollo', hasError: false },
        { name: 'Puré de Calabaza Orgánica (Fallback)', quantity: String(pumpkinPureeCans), unit: 'latas (15oz)', category: 'veg', recipeName: 'Cupcake de Salmón (Base)', hasError: false },
        { name: 'Zanahorias Baby Frescas (Fallback)', quantity: String(babyCarrotsKg), unit: 'kg', category: 'veg', recipeName: 'Tazón de Pavo (Base)', hasError: false },
        { name: 'Arándanos Azules Libres de Pesticidas (Fallback)', quantity: String(blueberriesKg), unit: 'kg', category: 'veg', recipeName: 'Tazón de Pavo (Base)', hasError: false },
        { name: 'Harina de Avena Orgánica (Sin Gluten) (Fallback)', quantity: String(oatFlourKg), unit: 'kg', category: 'pantry', recipeName: 'Cupcake de Salmón (Base)', hasError: false },
        { name: 'Mantequilla de Maní Natural (Sin Xilitol) (Fallback)', quantity: String(peanutButterJars), unit: 'frascos (32oz)', category: 'pantry', recipeName: 'Premios adicionales', hasError: false }
      );
    } else {
      // Filter recipes to only include those requested/selected for the event, or fallback to active
      const targetRecipes = recipes.filter(recipe => {
        if (request.selectedRecipeIds && request.selectedRecipeIds.length > 0) {
          return request.selectedRecipeIds.includes(recipe.id);
        }
        return recipe.status === 'Active';
      });

      targetRecipes.forEach(recipe => {
        let scale = 1;
        let referenceName = '';
        const lowerName = recipe.name.toLowerCase();

        // Identify recipe scale targeting (Base is for 1 unit of product)
        if (recipe.id === 'REC-2049' || lowerName.includes('salmón') || lowerName.includes('salmon') || lowerName.includes('cupcake') || lowerName.includes('pupcake')) {
          const pupcakesCount = request.pupcakes || 12;
          scale = pupcakesCount * sizeMultiplier;
          referenceName = `Receta ${recipe.name} base 1 unidad, Escala total: ${pupcakesCount} uds. x ${sizeMultiplierLabel}`;
        } else if (recipe.id === 'REC-2050' || lowerName.includes('res') || lowerName.includes('albóndiga') || lowerName.includes('meatball')) {
          const meatballsCount = request.meatballs || 24;
          scale = meatballsCount * sizeMultiplier;
          referenceName = `Receta ${recipe.name} base 1 unidad, Escala total: ${meatballsCount} uds. x ${sizeMultiplierLabel}`;
        } else if (recipe.id === 'REC-2051' || lowerName.includes('pavo') || lowerName.includes('tazón') || lowerName.includes('quinoa')) {
          const dogsCount = dogs;
          scale = dogsCount * sizeMultiplier;
          referenceName = `Receta ${recipe.name} base 1 unidad, Escala total: ${dogsCount} porciones x ${sizeMultiplierLabel}`;
        } else {
          const dogsCount = dogs;
          scale = dogsCount * sizeMultiplier;
          referenceName = `Receta ${recipe.name} base 1 unidad, Escala total: ${dogsCount} porciones x ${sizeMultiplierLabel}`;
        }

        // Check if recipe has invalid data (NaN, negative quantities, empty fields)
        const hasRecipeError = !recipe.ingredients || recipe.ingredients.length === 0 || recipe.ingredients.some(ing => !ing.name || isNaN(ing.quantity) || ing.quantity <= 0);

        recipe.ingredients?.forEach(ing => {
          const hasIngError = hasRecipeError || !ing.name || isNaN(ing.quantity) || ing.quantity <= 0;
          const rawScaled = ing.quantity * scale;
          
          let displayQty = '';
          let displayUnit = ing.unit;

          if (!hasIngError) {
            if (ing.unit.toLowerCase() === 'g' && rawScaled >= 1000) {
              displayQty = String(Number((rawScaled / 1000).toFixed(2)));
              displayUnit = 'kg';
            } else {
              displayQty = String(Number(rawScaled.toFixed(1)));
            }
          }

          list.push({
            name: ing.name || 'Ingrediente Desconocido',
            quantity: hasIngError ? 'ERROR_PARM' : displayQty,
            unit: displayUnit,
            category: categorizeIngredient(ing.name || ''),
            recipeName: `${recipe.name} (${referenceName})`,
            hasError: hasIngError,
            errorMessage: hasIngError ? 'Parámetros erróneos o nulos' : undefined
          });
        });
      });
    }

    // Add ingredients for chosen cake
    if (request.cakeType && request.cakeType !== 'none') {
      const cakeName = getCakeName(request.cakeType);
      const cakeLabel = `Pastel de ${cakeName} (1 Unidad de Celebración)`;
      
      let cakeIngredientsList: Array<{ name: string; quantity: number | string; unit: string; category: 'protein' | 'veg' | 'pantry' }> = [];
      
      if (request.cakeType === 'peanut_butter') {
        cakeIngredientsList = [
          { name: 'Mantequilla de Maní Natural (Sin Xilitol)', quantity: 250, unit: 'g', category: 'pantry' },
          { name: 'Harina de Avena Orgánica (Sin Gluten)', quantity: 350, unit: 'g', category: 'pantry' },
          { name: 'Plátanos Maduros', quantity: 2, unit: 'unidades', category: 'veg' },
          { name: 'Aceite de Coco', quantity: 50, unit: 'g', category: 'pantry' }
        ];
      } else if (request.cakeType === 'beef_liver') {
        cakeIngredientsList = [
          { name: 'Hígado de Res Molido Orgánico', quantity: 450, unit: 'g', category: 'protein' },
          { name: 'Harina de Avena Orgánica (Sin Gluten)', quantity: 300, unit: 'g', category: 'pantry' },
          { name: 'Huevos de Campo Orgánicos', quantity: 2, unit: 'unidades', category: 'protein' },
          { name: 'Puré de Camote Hipoalergénico', quantity: 200, unit: 'g', category: 'veg' }
        ];
      } else if (request.cakeType === 'pumpkin_apple') {
        cakeIngredientsList = [
          { name: 'Puré de Calabaza Orgánica', quantity: 350, unit: 'g', category: 'veg' },
          { name: 'Manzanas Rojas Ralladas (Sin Semillas)', quantity: 2, unit: 'unidades', category: 'veg' },
          { name: 'Harina de Coco', quantity: 200, unit: 'g', category: 'pantry' },
          { name: 'Aceite de Coco Purificado', quantity: 60, unit: 'g', category: 'pantry' }
        ];
      }

      cakeIngredientsList.forEach(ing => {
        let displayQty = '';
        let displayUnit = ing.unit;
        
        if (typeof ing.quantity === 'number') {
          if (ing.unit.toLowerCase() === 'g' && ing.quantity >= 1000) {
            displayQty = String(Number((ing.quantity / 1000).toFixed(2)));
            displayUnit = 'kg';
          } else {
            displayQty = String(Number(ing.quantity.toFixed(1)));
          }
        } else {
          displayQty = ing.quantity;
        }

        list.push({
          name: ing.name,
          quantity: displayQty,
          unit: displayUnit,
          category: ing.category,
          recipeName: cakeLabel,
          hasError: false
        });
      });
    }

    return list;
  })();

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
                {humans} Invitados ({dogs} Perros{request.dogSize ? ` • Tamaño ${request.dogSize === 'small' ? 'Pequeño' : request.dogSize === 'medium' ? 'Mediano' : 'Grande'}` : ''})
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
                  onClick={() => setShowConfirmReject(true)}
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
                {/* Lugar del Evento Box */}
                <div className="bg-surface-container-low/40 rounded-xl p-4 border border-outline-variant/25 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">Lugar Seleccionado por el Cliente</span>
                    <div className="flex items-start gap-2 mt-1.5">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-on-surface font-semibold leading-relaxed">
                        {request.location || 'Sunset Meadow Park, NY'}
                      </p>
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed mt-3 border-t border-outline-variant/10 pt-2 font-medium">
                      Establecido formalmente por el cliente como el recinto de despacho del catering canino.
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
              Consolidación dinámica de ingredientes y escala necesaria para cubrir el tamaño del banquete ({humans} Humanos, {dogs} Perros{request.dogSize ? ` • Tamaño ${request.dogSize === 'small' ? 'Pequeño' : request.dogSize === 'medium' ? 'Mediano' : 'Grande'}` : ''}) con reemplazos seguros de alergénicos y consumo real de recetas.
            </p>
          </div>

          {/* Error notice banner for erroneous parameters */}
          {dynamicIngredients?.some(ing => ing.hasError) && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start gap-3 text-red-800 animate-pulse">
              <AlertTriangle className="w-5 h-5 mt-0.5 text-red-600 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Error en Parámetros de Recetas</h4>
                <p className="text-xs mt-0.5 text-red-700">
                  ⚠️ Se han detectado ingredientes en las recetas activas con cantidades inválidas, vacías o numéricamente erróneas (por ejemplo, cantidades menores o iguales a cero). Por favor, revisa el panel de <strong>Parámetros de Recetas</strong>.
                </p>
              </div>
            </div>
          )}

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
                      <th className="px-4 py-2.5">Origen / Protocolo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15 text-on-surface font-medium">
                    {dynamicIngredients.filter(i => i.category === 'protein').map((ing, k) => (
                      <tr key={k} className={`hover:bg-surface-container-low/30 transition-colors ${ing.hasError ? 'bg-red-50 text-red-900' : ''}`}>
                        <td className="px-4 py-2.5 font-bold">
                          {ing.name}
                        </td>
                        <td className="px-4 py-2.5">
                          {ing.hasError ? (
                            <span className="text-red-600 font-extrabold flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" /> ERROR
                            </span>
                          ) : (
                            ing.quantity
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-on-surface-variant">
                          {!ing.hasError ? ing.unit : <span className="text-red-500 font-semibold">[Cero / Inválido]</span>}
                        </td>
                        <td className="px-4 py-2.5 text-on-surface-variant text-[11px]">
                          {ing.recipeName}
                        </td>
                      </tr>
                    ))}
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
                      <th className="px-4 py-2.5">Origen / Protocolo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15 text-on-surface font-medium">
                    {dynamicIngredients.filter(i => i.category === 'veg').map((ing, k) => (
                      <tr key={k} className={`hover:bg-surface-container-low/30 transition-colors ${ing.hasError ? 'bg-red-50 text-red-900' : ''}`}>
                        <td className="px-4 py-2.5 font-bold">
                          {ing.name}
                        </td>
                        <td className="px-4 py-2.5">
                          {ing.hasError ? (
                            <span className="text-red-600 font-extrabold flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" /> ERROR
                            </span>
                          ) : (
                            ing.quantity
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-on-surface-variant">
                          {!ing.hasError ? ing.unit : <span className="text-red-500 font-semibold">[Cero / Inválido]</span>}
                        </td>
                        <td className="px-4 py-2.5 text-on-surface-variant text-[11px]">
                          {ing.recipeName}
                        </td>
                      </tr>
                    ))}
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
                      <th className="px-4 py-2.5">Origen / Protocolo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15 text-on-surface font-medium">
                    {dynamicIngredients.filter(i => i.category === 'pantry').map((ing, k) => (
                      <tr key={k} className={`hover:bg-surface-container-low/30 transition-colors ${ing.hasError ? 'bg-red-50 text-red-900' : ''}`}>
                        <td className="px-4 py-2.5 font-bold">
                          {ing.name}
                        </td>
                        <td className="px-4 py-2.5">
                          {ing.hasError ? (
                            <span className="text-red-600 font-extrabold flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" /> ERROR
                            </span>
                          ) : (
                            ing.quantity
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-on-surface-variant">
                          {!ing.hasError ? ing.unit : <span className="text-red-500 font-semibold">[Cero / Inválido]</span>}
                        </td>
                        <td className="px-4 py-2.5 text-on-surface-variant text-[11px]">
                          {ing.recipeName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 4: Bebidas */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20">
              <div className="bg-surface-variant/40 px-4 py-3.5 border-b border-outline-variant/30 flex justify-between items-center">
                <h3 className="font-display font-bold text-sm text-on-surface flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-outline" /> Bebidas y Refrescos (Calculado)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/20 text-on-surface-variant font-bold">
                      <th className="px-4 py-2.5">Ingrediente</th>
                      <th className="px-4 py-2.5">Cantidad</th>
                      <th className="px-4 py-2.5">Unidad</th>
                      <th className="px-4 py-2.5">Fórmula de Servicio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15 text-on-surface font-medium">
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold">Agua Gasificada Saborizada</td>
                      <td className="px-4 py-2.5">{sparklingWaterCans}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">latas</td>
                      <td className="px-4 py-2.5 text-on-surface-variant text-[11px]">Catering base para {humans} Humanos</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="px-4 py-2.5 font-bold">Leche de Cabra Orgánica (para Puppuccinos)</td>
                      <td className="px-4 py-2.5">{goatMilkGallons}</td>
                      <td className="px-4 py-2.5 text-on-surface-variant">galones</td>
                      <td className="px-4 py-2.5 text-on-surface-variant text-[11px]">Servicio de cuencos para {dogs} Perros</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Confirmation Modal for Rejecting Request */}
      {showConfirmReject && (
        <div id="confirm-reject-modal" className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-3xl max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-outline-variant/25 pb-3">
              <span className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-error" />
              </span>
              <div>
                <h3 className="font-display font-black text-on-surface text-lg">¿Confirmar Rechazo?</h3>
                <p className="text-xs text-on-surface-variant">Solicitud del cliente: {request.requesterName}</p>
              </div>
            </div>
            
            <p className="text-sm text-on-surface-variant leading-relaxed">
              ¿Estás seguro de que deseas rechazar la solicitud de evento de catering <strong className="text-on-surface font-semibold">"{request.title}"</strong>? Esta acción no se puede deshacer y marcará el estado de la reservación de forma definitiva.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmReject(false)}
                className="px-4 py-2 border border-outline rounded-full text-xs font-bold text-on-surface hover:bg-surface-container transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  onRejectEvent(request.id);
                  setShowConfirmReject(false);
                }}
                className="px-5 py-2.5 bg-error text-white rounded-full text-xs font-bold shadow hover:bg-error/90 transition-all cursor-pointer"
              >
                Sí, Rechazar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
