import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  PawPrint, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Minus 
} from 'lucide-react';
import { EventRequest, Recipe } from '../types';

interface ClientFormProps {
  onSubmit: (request: Omit<EventRequest, 'id' | 'status' | 'requesterAvatar' | 'requesterTier'>) => void;
  onNavigateToAdmin: () => void;
  recipes?: Recipe[];
}

export default function ClientForm({ onSubmit, onNavigateToAdmin, recipes = [] }: ClientFormProps) {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Selected canine recipes state
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>(() => {
    return recipes.filter(r => r.status === 'Active').map(r => r.id);
  });

  // Helper to calculate minimum allowed date (3 days from now, blocking today & 2 following days)
  const getMinDateString = () => {
    const today = new Date();
    // 3 days from now blocks today, tomorrow, and the next day
    const minDateObj = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    const yyyy = minDateObj.getFullYear();
    const mm = String(minDateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(minDateObj.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Form Fields State
  const [eventDate, setEventDate] = useState(getMinDateString());
  const [startTime, setStartTime] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [smallDogsCount, setSmallDogsCount] = useState<number>(2);
  const [mediumDogsCount, setMediumDogsCount] = useState<number>(2);
  const [largeDogsCount, setLargeDogsCount] = useState<number>(1);
  const numDogs = smallDogsCount + mediumDogsCount + largeDogsCount;
  const [numHumans, setNumHumans] = useState<number>(10);
  const [dogSize, setDogSize] = useState<'small' | 'medium' | 'large'>('small');

  // Menu Configuration State
  const [cakeType, setCakeType] = useState('peanut_butter');
  const [pupcakesQty, setPupcakesQty] = useState<number>(12);
  const [meatballsQty, setMeatballsQty] = useState<number>(24);
  const [selectedHumanFoods, setSelectedHumanFoods] = useState<string[]>(['finger_food']);
  const [includeAlcohol, setIncludeAlcohol] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('Deseamos disfrutar de una hermosa celebración personalizada de catering gourmet.');
  const [dietaryAlerts, setDietaryAlerts] = useState('Libre de granos, sin sal añadida, intolerancias comunes cubiertas.');
  const [venueRequirements, setVenueRequirements] = useState('Espacio con sombra y acceso a agua potable para hidratación canina.');

  // Personal Info for mockup sake
  const [clientName, setClientName] = useState('Sarah Jenkins');
  const [clientEmail, setClientEmail] = useState('sarah.j@example.com');
  const [clientPhone, setClientPhone] = useState('(555) 123-4567');

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: locationDetails ? `Picnic de Puppaccinos en ${locationDetails.split(',')[0]}` : 'Picnic Acogedor de Puppaccinos',
      requesterName: clientName,
      requesterEmail: clientEmail,
      requesterPhone: clientPhone,
      date: eventDate || new Date().toISOString().split('T')[0],
      time: startTime || '14:00',
      location: locationDetails || 'Sunset Meadow Park, NY',
      dogs: numDogs,
      humans: numHumans,
      cakeType,
      pupcakes: pupcakesQty,
      meatballs: meatballsQty,
      humanFood: selectedHumanFoods.join(', '),
      includeAlcohol,
      dogSize: dogSize, // keep ref
      smallDogs: smallDogsCount,
      mediumDogs: mediumDogsCount,
      largeDogs: largeDogsCount,
      specialNotes: specialNotes,
      dietaryAlerts: dietaryAlerts,
      venueRequirements: venueRequirements,
      medicalStandby: false,
      selectedRecipeIds: selectedRecipeIds
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
    setEventDate(getMinDateString());
    setStartTime('');
    setLocationDetails('');
    setSmallDogsCount(2);
    setMediumDogsCount(2);
    setLargeDogsCount(1);
    setNumHumans(10);
    setDogSize('small');
    setCakeType('peanut_butter');
    setPupcakesQty(12);
    setMeatballsQty(24);
    setSelectedHumanFoods(['finger_food']);
    setIncludeAlcohol(false);
    setSpecialNotes('');
    setDietaryAlerts('');
    setVenueRequirements('');
    setSelectedRecipeIds(recipes.filter(r => r.status === 'Active').map(r => r.id));
  };

  // Helper labels for Review stage
  const getCakeLabel = (value: string) => {
    switch (value) {
      case 'peanut_butter': return 'Delicia de Mantequilla de Maní';
      case 'beef_liver': return 'Pastel de Res Salado';
      case 'pumpkin_apple': return 'Calabaza y Manzana (Estómago Sensible)';
      case 'none': return 'Sin Pastel';
      default: return value;
    }
  };

  const getHumanFoodLabel = (value: string) => {
    switch (value.trim()) {
      case 'finger_food': return 'Finger Food Ligero';
      case 'sliders': return 'Mini Hamburguesas (Sliders)';
      case 'sweets': return 'Planchas Dulces & Postres';
      case 'brews': return 'Estación de Café & Té';
      default: return value;
    }
  };

  const toggleHumanFood = (option: string) => {
    if (selectedHumanFoods.includes(option)) {
      if (selectedHumanFoods.length > 1) {
        setSelectedHumanFoods(selectedHumanFoods.filter(item => item !== option));
      }
    } else {
      setSelectedHumanFoods([...selectedHumanFoods, option]);
    }
  };

  return (
    <div id="booking-form-container" className="min-h-[calc(100vh-4rem)] bg-surface text-on-surface py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Banner Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Reservación de Invitado
            </div>
            <h1 className="text-4xl font-display font-extrabold text-on-surface tracking-tight">
              Reservar un Banquete
            </h1>
            <p className="text-on-surface-variant mt-1 text-lg">
              Planifiquemos la celebración perfecta para tu amigo peludo.
            </p>
          </div>
        </div>

        {/* Step Indicator Progress Bar */}
        {!submitted && (
          <div className="mb-10 bg-surface-container-low rounded-2xl p-4 border border-outline-variant/30">
            <div className="flex justify-between items-center text-sm font-semibold mb-3">
              <span className={`${step >= 1 ? 'text-primary' : 'text-on-surface-variant/40'} flex items-center gap-1.5 transition-colors`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-primary text-white' : 'bg-surface-container-high'}`}>1</span>
                Información General
              </span>
              <span className={`${step >= 2 ? 'text-primary' : 'text-on-surface-variant/40'} flex items-center gap-1.5 transition-colors`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-primary text-white' : 'bg-surface-container-high'}`}>2</span>
                Configuración del Menú
              </span>
              <span className={`${step >= 3 ? 'text-primary' : 'text-on-surface-variant/40'} flex items-center gap-1.5 transition-colors`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-primary text-white' : 'bg-surface-container-high'}`}>3</span>
                Resumen
              </span>
            </div>
            <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: '33.3%' }}
                animate={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div 
              key="success"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel rounded-2xl p-8 text-center shadow-xl border border-primary/20"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-on-surface mb-2">
                ¡Solicitud de Banquete Enviada!
              </h2>
              <p className="text-on-surface-variant max-w-lg mx-auto text-base mb-8">
                Tu solicitud ha sido guardada con el ID <strong className="text-primary font-bold">EVT-{Math.floor(1000 + Math.random() * 9000)}</strong>. Los coordinadores de eventos en <strong className="text-on-surface font-semibold">DogSitter</strong> han sido notificados para su revisión inmediata.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={onNavigateToAdmin}
                  className="w-full sm:w-auto bg-primary text-on-primary font-bold px-8 py-3 rounded-full hover:bg-on-primary-container transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Users className="w-5 h-5" />
                  Ver Solicitudes en Bandeja de Entrada
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto bg-surface-container-lowest border border-outline rounded-full font-bold text-on-surface px-8 py-3 hover:bg-surface-container transition-all cursor-pointer"
                >
                  Reservar Otro Banquete
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl"
            >
              <form onSubmit={handleSubmit}>
                
                {/* STEP 1: General Info */}
                {step === 1 && (
                  <div id="form-step-1" className="space-y-6">
                    <div className="border-b border-outline-variant/30 pb-4 mb-4">
                      <h2 className="text-2xl font-display font-semibold text-on-surface">
                        Información General
                      </h2>
                      <p className="text-sm text-on-surface-variant">
                        Proporciona detalles sobre el día, hora, ubicación y cantidad de invitados para tu celebración especial.
                      </p>
                    </div>

                    {/* Requester Profile Information (Mockup purposes) */}
                    <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Tu Nombre</label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Correo Electrónico</label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Número de Teléfono</label>
                        <input
                          type="text"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Event Date */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="eventDate" className="text-sm font-semibold text-on-surface flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary" /> Fecha del Evento
                        </label>
                        <div className="relative">
                          <input
                            id="eventDate"
                            type="date"
                            required
                            min={getMinDateString()}
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          />
                          <p className="text-[10px] text-primary/80 mt-1 leading-snug font-medium">
                            * Reserva requerida con mínimo 3 días de anticipación para la preparación artesanal de los platillos.
                          </p>
                        </div>
                      </div>

                      {/* Event Time */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="eventTime" className="text-sm font-semibold text-on-surface flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-primary" /> Hora de Inicio
                        </label>
                        <div className="relative">
                          <input
                            id="eventTime"
                            type="time"
                            required
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      {/* Location Details */}
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="locationDetails" className="text-sm font-semibold text-on-surface flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-primary" /> Detalles de la Ubicación
                        </label>
                        <div className="relative">
                          <textarea
                            id="locationDetails"
                            rows={3}
                            required
                            placeholder="Ingresa la dirección o el parque (ej. Central Park Sheeps Meadow)"
                            value={locationDetails}
                            onChange={(e) => setLocationDetails(e.target.value)}
                            className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Guest Count Estimate */}
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-semibold text-on-surface">
                          Asistencia Estimada (Distribución de Tamaños y Huéspedes)
                        </label>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          
                          {/* Small Dogs Counter */}
                          <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <PawPrint className="w-4 h-4 text-primary" />
                              </span>
                              <div>
                                <span className="font-semibold text-xs text-on-surface block">Chicos/Pequeños</span>
                                <span className="text-[10px] text-primary font-bold block">Peso: Hasta 10 kg</span>
                                <span className="text-[10px] text-on-surface-variant font-mono">Factor: *1</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <button
                                type="button"
                                onClick={() => smallDogsCount > 0 && setSmallDogsCount(smallDogsCount - 1)}
                                className="w-8 h-8 rounded-full border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-bold text-base w-6 text-center">{smallDogsCount}</span>
                              <button
                                type="button"
                                onClick={() => setSmallDogsCount(smallDogsCount + 1)}
                                className="w-8 h-8 rounded-full border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Medium Dogs Counter */}
                          <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <PawPrint className="w-4 h-4 text-primary" />
                              </span>
                              <div>
                                <span className="font-semibold text-xs text-on-surface block">Medianos</span>
                                <span className="text-[10px] text-primary font-bold block">Peso: 11 - 25 kg</span>
                                <span className="text-[10px] text-on-surface-variant font-mono">Factor: *2</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <button
                                type="button"
                                onClick={() => mediumDogsCount > 0 && setMediumDogsCount(mediumDogsCount - 1)}
                                className="w-8 h-8 rounded-full border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-bold text-base w-6 text-center">{mediumDogsCount}</span>
                              <button
                                type="button"
                                onClick={() => setMediumDogsCount(mediumDogsCount + 1)}
                                className="w-8 h-8 rounded-full border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Large Dogs Counter */}
                          <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <PawPrint className="w-4 h-4 text-primary" />
                              </span>
                              <div>
                                <span className="font-semibold text-xs text-on-surface block">Grandes</span>
                                <span className="text-[10px] text-primary font-bold block">Peso: Más de 25 kg</span>
                                <span className="text-[10px] text-on-surface-variant font-mono">Factor: *3</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <button
                                type="button"
                                onClick={() => largeDogsCount > 0 && setLargeDogsCount(largeDogsCount - 1)}
                                className="w-8 h-8 rounded-full border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-bold text-base w-6 text-center">{largeDogsCount}</span>
                              <button
                                type="button"
                                onClick={() => setLargeDogsCount(largeDogsCount + 1)}
                                className="w-8 h-8 rounded-full border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Humans Counter */}
                          <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                                <Users className="w-4 h-4 text-secondary" />
                              </span>
                              <div>
                                <span className="font-semibold text-xs text-on-surface block">Humanos</span>
                                <span className="text-[10px] text-on-surface-variant font-medium">Dueños y amigos</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <button
                                type="button"
                                onClick={() => numHumans > 1 && setNumHumans(numHumans - 1)}
                                className="w-8 h-8 rounded-full border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-bold text-base w-6 text-center">{numHumans}</span>
                              <button
                                type="button"
                                onClick={() => setNumHumans(numHumans + 1)}
                                className="w-8 h-8 rounded-full border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                        </div>

                        {/* Summary indicator */}
                        <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs mt-2">
                          <span className="font-medium text-on-surface-variant">Resumen de Huéspedes del Banquete:</span>
                          <span className="font-bold text-primary">
                            {numDogs} Perros Totales ({smallDogsCount} Chicos, {mediumDogsCount} Medianos, {largeDogsCount} Grandes) y {numHumans} Humanos
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* STEP 2: Menu Configuration */}
                {step === 2 && (
                  <div id="form-step-2" className="space-y-6">
                    <div className="border-b border-outline-variant/30 pb-4 mb-4">
                      <h2 className="text-2xl font-display font-semibold text-on-surface">
                        Configuración del Menú
                      </h2>
                      <p className="text-sm text-on-surface-variant">
                        Personaliza las preferencias gastronómicas para mascotas y humanos.
                      </p>
                    </div>

                     {/* Canine Menu Section */}
                    <div className="bg-surface-container-lowest p-5 rounded-xl border border-primary/15 shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/25 pb-3">
                        <h3 className="text-lg font-display font-bold text-primary flex items-center gap-2">
                          <PawPrint className="w-5 h-5" /> Menú Canino
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            setPupcakesQty(Math.max(6, numDogs * 2));
                            setMeatballsQty(Math.max(12, numDogs * 4));
                            // Auto select a good mix based on guest sizes
                            if (numHumans >= 15) {
                              setSelectedHumanFoods(['finger_food', 'sliders']);
                            } else {
                              setSelectedHumanFoods(['finger_food']);
                            }
                          }}
                          className="bg-primary hover:bg-on-primary-container text-white text-xs font-extrabold px-4 py-2 rounded-full shadow hover:scale-[1.02] transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Generar Cantidad Recomendada
                        </button>
                      </div>

                      {/* Recommend notification context */}
                      <p className="text-xs text-on-surface-variant font-medium">
                        Basado en <strong className="text-primary font-bold">{numDogs} perros</strong> y <strong className="text-secondary font-bold">{numHumans} humanos</strong> ingresados, la recolección automática sugerirá la dotación óptima de premios y selecciones para tu banquete.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Celebration Cake Selection */}
                        <div className="flex flex-col gap-2">
                          <label htmlFor="cakeType" className="text-sm font-semibold text-on-surface">
                            Tipo de Pastel de Celebración
                          </label>
                          <select
                            id="cakeType"
                            value={cakeType}
                            onChange={(e) => setCakeType(e.target.value)}
                            className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-3 py-2.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          >
                            <option value="peanut_butter">Delicia de Mantequilla de Maní</option>
                            <option value="beef_liver">Pastel de Res Salado</option>
                            <option value="pumpkin_apple">Calabaza y Manzana (Estómago Sensible)</option>
                            <option value="none">Sin Pastel</option>
                          </select>
                        </div>

                        {/* Additional Treats Quantities */}
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-on-surface text-left">
                            Premios Adicionales
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <span className="text-xs text-on-surface-variant block mb-1">Pupcakes (Cant.)</span>
                              <input
                                type="number"
                                min={0}
                                value={pupcakesQty}
                                onChange={(e) => setPupcakesQty(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            </div>
                            <div>
                              <span className="text-xs text-on-surface-variant block mb-1">Albóndigas (Cant.)</span>
                              <input
                                type="number"
                                min={0}
                                value={meatballsQty}
                                onChange={(e) => setMeatballsQty(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Selection of Active Canine Recipes / Dishes */}
                      <div className="bg-surface-container-low/40 p-4 rounded-xl border border-outline-variant/30 space-y-3">
                        <label className="text-sm font-bold text-on-surface flex items-center gap-2">
                          <PawPrint className="w-4 h-4 text-primary animate-pulse" /> Platillos y Recetas Culinarias Activas en Menú Canino
                        </label>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          Selecciona cuáles recetas y banquetes se prepararán para los caninos invitados. La escala y materiales requeridos se computarán dinámicamente:
                        </p>

                        {recipes && recipes.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
                            {recipes.map((recipe) => (
                              <label 
                                key={recipe.id}
                                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                                  selectedRecipeIds.includes(recipe.id)
                                    ? 'bg-primary/5 border-primary shadow-sm ring-1 ring-primary'
                                    : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container-high'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedRecipeIds.includes(recipe.id)}
                                  onChange={() => {
                                    if (selectedRecipeIds.includes(recipe.id)) {
                                      setSelectedRecipeIds(selectedRecipeIds.filter(id => id !== recipe.id));
                                    } else {
                                      setSelectedRecipeIds([...selectedRecipeIds, recipe.id]);
                                    }
                                  }}
                                  className="mt-0.5 rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                                />
                                <div className="text-left font-medium flex-1">
                                  <span className="text-xs text-on-surface font-semibold block">{recipe.name}</span>
                                  <span className="text-[10px] text-on-surface-variant line-clamp-1">{recipe.description}</span>
                                  <div className="flex items-center justify-between mt-1.5">
                                    <span className="bg-tertiary-container text-on-tertiary-container font-semibold text-[8px] px-1.5 py-0.5 rounded uppercase">
                                      {recipe.type}
                                    </span>
                                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${recipe.status === 'Active' ? 'bg-green-150 text-green-800' : 'bg-red-150 text-red-00'}`}>
                                      {recipe.status === 'Active' ? 'Activo' : 'Inactivo'}
                                    </span>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-on-surface-variant italic">No hay recetas registradas en el sistema.</p>
                        )}
                      </div>
                    </div>

                    {/* Human Menu Section */}
                    <div className="bg-surface-container-lowest p-5 rounded-xl border border-secondary/15 shadow-sm space-y-4">
                      <h3 className="text-lg font-display font-bold text-secondary flex items-center gap-2">
                        <Users className="w-5 h-5" /> Menú Humano
                      </h3>

                      {/* Catering Style selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-on-surface mb-1">Estilo de Catering (Selecciona una o más opciones)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div 
                            onClick={() => toggleHumanFood('finger_food')}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${selectedHumanFoods.includes('finger_food') ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high'}`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedHumanFoods.includes('finger_food')}
                              readOnly
                              className="w-4 h-4 text-primary rounded focus:ring-primary border-outline mt-0.5 cursor-pointer"
                            />
                            <div>
                              <span className="font-semibold text-sm text-on-surface block">Finger Food Ligero</span>
                              <span className="text-xs text-on-surface-variant">Sándwiches pequeños y bocadillos variados</span>
                            </div>
                          </div>

                          <div 
                            onClick={() => toggleHumanFood('sliders')}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${selectedHumanFoods.includes('sliders') ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high'}`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedHumanFoods.includes('sliders')}
                              readOnly
                              className="w-4 h-4 text-primary rounded focus:ring-primary border-outline mt-0.5 cursor-pointer"
                            />
                            <div>
                              <span className="font-semibold text-sm text-on-surface block">Mini Hamburguesas (Sliders)</span>
                              <span className="text-xs text-on-surface-variant">Bocados medianos de carne y vegetarianos</span>
                            </div>
                          </div>

                          <div 
                            onClick={() => toggleHumanFood('sweets')}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${selectedHumanFoods.includes('sweets') ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high'}`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedHumanFoods.includes('sweets')}
                              readOnly
                              className="w-4 h-4 text-primary rounded focus:ring-primary border-outline mt-0.5 cursor-pointer"
                            />
                            <div>
                              <span className="font-semibold text-sm text-on-surface block">Mesa de Postres Dulces</span>
                              <span className="text-xs text-on-surface-variant">Mini Cupcakes de fruta, alfajores y brownies</span>
                            </div>
                          </div>

                          <div 
                            onClick={() => toggleHumanFood('brews')}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${selectedHumanFoods.includes('brews') ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high'}`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedHumanFoods.includes('brews')}
                              readOnly
                              className="w-4 h-4 text-primary rounded focus:ring-primary border-outline mt-0.5 cursor-pointer"
                            />
                            <div>
                              <span className="font-semibold text-sm text-on-surface block">Estación de Café & Té</span>
                              <span className="text-xs text-on-surface-variant">Café de grano orgánico filtrado y té de hierbas</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Drink Service Toggle Switch */}
                      <div className="pt-2 border-t border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="font-semibold text-sm text-on-surface block">Incluir Bebidas Alcohólicas</span>
                          <span className="text-xs text-on-surface-variant">Nota: requiere permisos específicos del lugar</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={includeAlcohol}
                            onChange={(e) => setIncludeAlcohol(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>

                     {/* Required Event Details Section */}
                    <div className="space-y-4 pt-4 border-t border-outline-variant/20">
                      <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5 select-none">
                        <span>Detalles Obligatorios Adicionales del Evento</span>
                      </h3>

                      {/* Special Notes - Required */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <label htmlFor="specialNotes" className="text-xs font-bold text-on-surface-variant uppercase flex items-center gap-1">
                          📋 Notas Especiales / Observaciones Generales <span className="text-error font-bold">*</span>
                        </label>
                        <textarea
                          id="specialNotes"
                          rows={2}
                          required
                          placeholder="Escribe observaciones o solicitudes generales para la celebración (por ejemplo, actividades deseadas, preferencias de decoración)..."
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        />
                      </div>

                      {/* Dietary Alerts - Required */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <label htmlFor="dietaryAlerts" className="text-xs font-bold text-on-surface-variant uppercase flex items-center gap-1">
                          🥩 Restricciones Alimentarias / Alergias Caninas <span className="text-error font-bold">*</span>
                        </label>
                        <textarea
                          id="dietaryAlerts"
                          required
                          rows={2}
                          placeholder="Especifica restricciones alimentarias obligatorias caninas (por ejemplo, libre de granos, alergia al pollo o res)..."
                          value={dietaryAlerts}
                          onChange={(e) => setDietaryAlerts(e.target.value)}
                          className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        />
                      </div>

                      {/* Venue Requirements - Required */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <label htmlFor="venueRequirements" className="text-xs font-bold text-on-surface-variant uppercase flex items-center gap-1">
                          🏡 Requerimientos de la Locación / Espacio <span className="text-error font-bold">*</span>
                        </label>
                        <textarea
                          id="venueRequirements"
                          required
                          rows={2}
                          placeholder="Requerimientos logísticos de la locación (por ejemplo, tomas de agua potable, áreas cercadas deseadas, espacio techado)..."
                          value={venueRequirements}
                          onChange={(e) => setVenueRequirements(e.target.value)}
                          className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Summary & Reviews */}
                {step === 3 && (
                  <div id="form-step-3" className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-on-surface">
                        Revisa tu Solicitud
                      </h2>
                      <p className="text-xs text-on-surface-variant">
                        Verifica todas tus especificaciones. Retrocede si deseas modificar algo.
                      </p>
                    </div>

                    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
                      
                      {/* Event Details panel */}
                      <div className="p-4 border-b border-outline-variant/30">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Detalles del Evento</span>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                          <span className="text-on-surface-variant">Fecha y Hora de Inicio:</span>
                          <span className="text-on-surface font-semibold text-right">{eventDate || 'No especificada'} a las {startTime || 'No especificada'}</span>
                          
                          <span className="text-on-surface-variant">Lugar de Celebración:</span>
                          <span className="text-on-surface font-semibold text-right line-clamp-1">{locationDetails || 'No especificado'}</span>
                          
                          <span className="text-on-surface-variant">Invitados Estimados:</span>
                          <span className="text-on-surface font-semibold text-right">{numDogs} Perros ({smallDogsCount} Chicos, {mediumDogsCount} Medianos, {largeDogsCount} Grandes), {numHumans} Humanos</span>

                          <span className="text-on-surface-variant">Cliente Solicitante:</span>
                          <span className="text-on-surface font-semibold text-right">{clientName}</span>
                        </div>
                      </div>

                      {/* Menu Configuration panel */}
                      <div className="p-4 bg-surface-container-low/50">
                        <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2">Selección de Catering</span>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                          <span className="text-on-surface-variant">Pastel de Celebración:</span>
                          <span className="text-on-surface font-semibold text-right">{getCakeLabel(cakeType)}</span>

                          <span className="text-on-surface-variant">Premios Adicionales:</span>
                          <span className="text-on-surface font-semibold text-right">{pupcakesQty} Pupcakes, {meatballsQty} Albóndigas</span>

                          <span className="text-on-surface-variant">Catering para Humanos:</span>
                          <span className="text-on-surface font-semibold text-right">
                            {selectedHumanFoods.map(getHumanFoodLabel).join(', ')}
                          </span>

                          <span className="text-on-surface-variant">Servicio de Bebidas:</span>
                          <span className="text-on-surface font-semibold text-right">{includeAlcohol ? 'Incluye opción con Alcohol (pendiente de permisos)' : 'Únicamente Bebidas sin Alcohol'}</span>
                        </div>
                      </div>

                      {/* Special requirements panel */}
                      <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest space-y-3">
                        {specialNotes && (
                          <div>
                            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-0.5">📋 Notas Especiales / Observaciones</span>
                            <p className="text-xs text-on-surface italic bg-surface-container-low/30 p-2 rounded-lg border border-outline-variant/20">{specialNotes}</p>
                          </div>
                        )}
                        {dietaryAlerts && (
                          <div>
                            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-0.5">🥩 Restricciones Alimentarias</span>
                            <p className="text-xs text-on-surface italic bg-surface-container-low/30 p-2 rounded-lg border border-outline-variant/20">{dietaryAlerts}</p>
                          </div>
                        )}
                        {venueRequirements && (
                          <div>
                            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-0.5 font-sans">🏡 Requerimientos de la Locación</span>
                            <p className="text-xs text-on-surface italic bg-surface-container-low/30 p-2 rounded-lg border border-outline-variant/20">{venueRequirements}</p>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}

                {/* Footer Action Buttons */}
                <div className="mt-8 pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="rounded-full px-6 py-2.5 border border-outline text-on-surface font-bold text-sm hover:bg-surface-container transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Atrás
                    </button>
                  ) : (
                    <div className="w-10 h-10" /> /* Placeholder to justify right always */
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-primary text-on-primary font-bold px-8 py-3 rounded-full hover:bg-on-primary-container hover:scale-[1.02] shadow-md transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {step === 1 ? 'Continuar al Menú' : 'Revisar Solicitud'} <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-primary text-on-primary font-extrabold px-10 py-3.5 rounded-full hover:bg-on-primary-container hover:scale-[1.02] shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Enviar Solicitud
                    </button>
                  )}
                </div>

              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
