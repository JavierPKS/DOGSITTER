/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PawPrint, Calendar, MapPin, Check, Plus, 
  Send, ChevronRight, ChevronLeft, Salad, Wine, Clock, RefreshCw 
} from 'lucide-react';
import { EventRequest } from '../types';
import { CATALOG_THEMES } from '../data';

interface MyRequestsProps {
  requests: EventRequest[];
  onSubmitRequest: (newRequest: Omit<EventRequest, 'id' | 'status' | 'createdAt'>) => void;
  selectedThemeId?: string;
  clearSelectedTheme?: () => void;
}

export default function MyRequests({ 
  requests, 
  onSubmitRequest, 
  selectedThemeId, 
  clearSelectedTheme 
}: MyRequestsProps) {
  
  // Create state for current step form wizard
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states matching layout image 1
  const [petName, setPetName] = useState('');
  const [petSize, setPetSize] = useState('peq');
  const [petBreed, setPetBreed] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTheme, setEventTheme] = useState('cumpleanos');
  const [eventLocation, setEventLocation] = useState('');
  const [dogsSmall, setDogsSmall] = useState(0);
  const [dogsMedium, setDogsMedium] = useState(0);
  const [dogsLarge, setDogsLarge] = useState(0);
  const [humansTotal, setHumansTotal] = useState(0);

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Trigger preset theme selection if passed from catalogue clicks
  useEffect(() => {
    if (selectedThemeId) {
      setEventTheme(selectedThemeId);
      setCurrentStep(2); // Jump to step 2 for event configurations
      if (clearSelectedTheme) clearSelectedTheme();
    }
  }, [selectedThemeId, clearSelectedTheme]);

  // LIVE CALCULATIONS
  const totalAlbondigas = (dogsSmall * 2) + (dogsMedium * 3) + (dogsLarge * 4);
  const proteinaBase = (totalAlbondigas / 10) * 0.25; // in kg
  const fingerFoods = humansTotal * 3;
  const carneSliders = fingerFoods * 0.04; // in kg
  const tablasPicoteo = Math.max(0, Math.floor(humansTotal / 10));
  const liquidosSinAlcohol = humansTotal * 1; // in L
  const liquidosConAlcohol = humansTotal * 3; // in units

  const validateStep = (step: number) => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!petName.trim()) errs.petName = 'El nombre es obligatorio';
      if (!petSize) errs.petSize = 'Seleccione un tamaño';
    } else if (step === 2) {
      if (!eventDate) errs.eventDate = 'La fecha es obligatoria';
      if (!eventTheme) errs.eventTheme = 'La temática es obligatoria';
      if (!eventLocation.trim()) errs.eventLocation = 'La ubicación es obligatoria';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    // Simulate real database request posting delay
    setTimeout(() => {
      onSubmitRequest({
        clientName: 'María Gómez', // Simulated standard logged-in client profile
        initials: 'MG',
        petName,
        petSize,
        petBreed,
        eventDate,
        eventTheme,
        eventLocation,
        dogsSmall,
        dogsMedium,
        dogsLarge,
        humansTotal,
      });

      // Show success popup/form reset
      setIsSubmitting(false);
      setCurrentStep(1);
      
      // Reset input fields
      setPetName('');
      setPetSize('peq');
      setPetBreed('');
      setEventDate('');
      setEventTheme('cumpleanos');
      setEventLocation('');
      setDogsSmall(0);
      setDogsMedium(0);
      setDogsLarge(0);
      setHumansTotal(0);
    }, 1200);
  };

  return (
    <div className="py-24 px-4 md:px-8 bg-[#fbf9f8] min-h-screen">
      <div className="max-w-[1280px] mx-auto space-y-12">
        
        {/* Header Title Section */}
        <div className="space-y-2">
          <h1 className="font-sans font-bold text-3xl sm:text-5xl text-primary tracking-tight">
            Nueva Solicitud de Evento
          </h1>
          <p className="text-[#444651] font-sans text-base sm:text-lg max-w-3xl">
            Complete los detalles a continuación para recibir una cotización instantánea para el evento exclusivo de su mascota.
          </p>
        </div>

        {/* Form + Cotización Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Form wizard logic (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Progress indicator card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="relative flex justify-between items-center w-full max-w-lg mx-auto">
                
                {/* Horizontal progress bar line background */}
                <div className="absolute left-0 top-4 w-full h-[2px] bg-gray-100 -z-0"></div>
                <div 
                  className="absolute left-0 top-4 h-[2px] bg-primary -z-0 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                ></div>

                {/* Steps markers */}
                {[
                  { step: 1, label: 'Mascota' },
                  { step: 2, label: 'Evento' },
                  { step: 3, label: 'Catering' }
                ].map((s) => {
                  const isCompleted = s.step < currentStep;
                  const isActive = s.step === currentStep;
                  
                  return (
                    <div key={s.step} className="flex flex-col items-center gap-2 relative z-10">
                      <div 
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-[14px] transition-colors duration-300 ${
                          isCompleted 
                            ? 'bg-secondary-container text-primary shadow-sm'
                            : isActive 
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-gray-100 text-[#444651]'
                        }`}
                      >
                        {isCompleted ? <Check className="w-5 h-5 font-extrabold text-primary" /> : s.step}
                      </div>
                      <span className={`font-sans font-semibold text-[12px] tracking-wide ${isActive ? 'text-primary font-bold' : 'text-gray-400'}`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Canvas container */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: PET DETAILS */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <PawPrint className="w-6 h-6 text-secondary fill-secondary" />
                      <h2 className="font-sans font-bold text-xl sm:text-2xl text-primary">Detalles de la Mascota</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans font-semibold text-sm text-primary">Nombre del Festejado</label>
                        <input
                          type="text"
                          required
                          value={petName}
                          onChange={(e) => setPetName(e.target.value)}
                          placeholder="Ej. Max"
                          className="w-full bg-[#fbf9f8] border border-gray-200 rounded-xl px-4 py-3 text-sm font-sans text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                        {errors.petName && <span className="text-red-500 text-xs">{errors.petName}</span>}
                      </div>

                      {/* Size Select */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans font-semibold text-sm text-primary">Tamaño</label>
                        <select
                          value={petSize}
                          onChange={(e) => setPetSize(e.target.value)}
                          className="w-full bg-[#fbf9f8] border border-gray-200 rounded-xl px-4 py-3 text-sm font-sans text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                        >
                          <option value="peq">Pequeño (Hasta 10kg)</option>
                          <option value="med">Mediano (10kg - 25kg)</option>
                          <option value="gde">Grande (Más de 25kg)</option>
                        </select>
                      </div>

                      {/* Breed input */}
                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="font-sans font-semibold text-sm text-primary">Raza (Opcional)</label>
                        <input
                          type="text"
                          value={petBreed}
                          onChange={(e) => setPetBreed(e.target.value)}
                          placeholder="Ej. Golden Retriever"
                          className="w-full bg-[#fbf9f8] border border-gray-200 rounded-xl px-4 py-3 text-sm font-sans text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: EVENT DETAILS */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <Calendar className="w-6 h-6 text-secondary" />
                      <h2 className="font-sans font-bold text-xl sm:text-2xl text-primary">Detalles del Evento</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Date Field */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans font-semibold text-sm text-primary">Fecha del Evento</label>
                        <input
                          type="date"
                          required
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full bg-[#fbf9f8] border border-gray-200 rounded-xl px-4 py-3 text-sm font-sans text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                        {errors.eventDate && <span className="text-red-500 text-xs">{errors.eventDate}</span>}
                      </div>

                      {/* Theme selection dropdown */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans font-semibold text-sm text-primary">Temática</label>
                        <select
                          value={eventTheme}
                          onChange={(e) => setEventTheme(e.target.value)}
                          className="w-full bg-[#fbf9f8] border border-gray-200 rounded-xl px-4 py-3 text-sm font-sans text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        >
                          {CATALOG_THEMES.map((theme) => (
                            <option key={theme.id} value={theme.id}>
                              {theme.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Location address */}
                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="font-sans font-semibold text-sm text-primary">Ubicación</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            placeholder="Ej. Calle Sotomayor #1245, Las Condes"
                            className="w-full bg-[#fbf9f8] border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm font-sans text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                          />
                          <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                        {errors.eventLocation && <span className="text-red-500 text-xs">{errors.eventLocation}</span>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: CATERING SELECTION */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <Check className="w-6 h-6 text-secondary" />
                      <h2 className="font-sans font-bold text-xl sm:text-2xl text-primary">Selección de Catering</h2>
                    </div>
                    <p className="font-sans text-[#444651] text-sm">
                      Indique la cantidad de invitados para calcular las porciones y platos exactos de la cotización.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Invitados Perrunos Card */}
                      <div className="border border-gray-100 bg-[#fbf9f8] p-5 rounded-2xl flex flex-col gap-4">
                        <h3 className="font-sans font-bold text-sm text-primary border-b border-gray-200 pb-2">
                          🐾 Invitados Caninos
                        </h3>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-sans text-xs text-gray-600">Perros Pequeños</span>
                            <input
                              type="number"
                              min="0"
                              value={dogsSmall}
                              onChange={(e) => setDogsSmall(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-20 text-center bg-white border border-gray-200 rounded-lg py-1.5 text-xs text-primary font-bold outline-none"
                            />
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="font-sans text-xs text-gray-600">Perros Medianos</span>
                            <input
                              type="number"
                              min="0"
                              value={dogsMedium}
                              onChange={(e) => setDogsMedium(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-20 text-center bg-white border border-gray-200 rounded-lg py-1.5 text-xs text-primary font-bold outline-none"
                            />
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="font-sans text-xs text-gray-600">Perros Grandes</span>
                            <input
                              type="number"
                              min="0"
                              value={dogsLarge}
                              onChange={(e) => setDogsLarge(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-20 text-center bg-white border border-gray-200 rounded-lg py-1.5 text-xs text-primary font-bold outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Invitados Humanos Card */}
                      <div className="border border-gray-100 bg-[#fbf9f8] p-5 rounded-2xl flex flex-col gap-4">
                        <h3 className="font-sans font-bold text-sm text-primary border-b border-gray-200 pb-2">
                          👥 Invitados Humanos
                        </h3>
                        
                        <div className="flex justify-between items-center py-4">
                          <div className="space-y-0.5">
                            <span className="font-sans text-xs text-gray-600 block">Total Humanos</span>
                            <span className="font-sans text-[11px] text-gray-400 block max-w-[150px]">Platos adaptados y bebidas</span>
                          </div>
                          <input
                            type="number"
                            min="0"
                            value={humansTotal}
                            onChange={(e) => setHumansTotal(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-20 text-center bg-white border border-gray-200 rounded-lg py-1.5 text-xs text-primary font-bold outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Form Navigation Actions line */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="font-sans font-bold text-xs text-primary border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-1 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="font-sans font-bold text-xs text-white bg-primary hover:bg-[#002d72] rounded-lg px-6 py-3.5 flex items-center gap-1 shadow transition-all cursor-pointer"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-sans font-bold text-xs text-primary bg-[#fed000] hover:bg-[#ffe07f] disabled:opacity-50 rounded-lg px-6 py-3.5 flex items-center gap-1 shadow transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <Send className="w-4 h-4 text-primary fill-none ml-1" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* 'Mis Solicitudes' Section block embedded below form just like mockup 1 */}
            <section className="space-y-6 pt-6">
              <div className="border-b border-gray-100 pb-2 flex justify-between items-center">
                <h2 className="font-sans font-bold text-2xl text-primary tracking-tight">Mis Solicitudes</h2>
                <span className="bg-primary/5 text-primary font-sans font-bold text-xs px-2.5 py-1 rounded-full">
                  {requests.length} Solicitud(es)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requests.map((req) => {
                  const matchingTheme = CATALOG_THEMES.find(t => t.id === req.eventTheme);
                  const themeTitle = matchingTheme ? matchingTheme.title : req.eventTheme;
                  
                  // Status coloration configs
                  let statusBg = 'bg-gray-100 text-gray-500';
                  let sidebarColor = 'bg-gray-300';
                  if (req.status === 'Finalizado') {
                    statusBg = 'bg-gray-100 text-gray-600';
                    sidebarColor = 'bg-gray-400';
                  } else if (req.status === 'En Revisión') {
                    statusBg = 'bg-[#ffe07f] text-[#564500] font-bold';
                    sidebarColor = 'bg-[#fed000]';
                  } else if (req.status === 'Aprobado') {
                    statusBg = 'bg-[#d1e7dd] text-[#0f5132] font-bold';
                    sidebarColor = 'bg-[#198754]';
                  } else if (req.status === 'Rechazado') {
                    statusBg = 'bg-red-100 text-red-700 font-bold';
                    sidebarColor = 'bg-red-500';
                  }

                  return (
                    <motion.div
                      layoutId={req.id}
                      key={req.id}
                      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
                    >
                      {/* Left accent color bar indicator */}
                      <div className={`absolute top-0 right-0 w-2 h-full ${sidebarColor} transition-all duration-300`}></div>
                      
                      <div className="pr-4 space-y-4">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-sans font-bold text-[#1b1c1c] text-lg group-hover:text-primary transition-colors">
                            {themeTitle} ({req.petName})
                          </h3>
                          <span className={`font-sans text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap ${statusBg}`}>
                            {req.status}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs text-gray-500 font-sans">
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{req.eventDate}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{req.eventLocation}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Plus className="w-4 h-4 text-gray-400" />
                            <span>Invitados: 🐾 {req.dogsSmall + req.dogsMedium + req.dogsLarge} perros / 👥 {req.humansTotal} humanos</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* Right Column: Cotización en Vivo Card (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-primary text-white rounded-2xl p-6 shadow-lg border border-[#002d72] space-y-6 relative overflow-hidden">
              
              {/* Header inside summary card */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Wine className="w-5 h-5 text-secondary" />
                <h3 className="font-sans font-bold text-lg">Cotización en Vivo</h3>
              </div>
              
              <p className="font-sans text-[11px] text-blue-200">
                El cálculo se actualiza automáticamente según las porciones y el conteo de invitados en el catering.
              </p>

              {/* Menú Canino section */}
              <div className="space-y-2">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wide text-secondary border-b border-white/5 pb-1 flex items-center justify-between">
                  <span>Menú Canino</span>
                  <span className="text-[10px] text-blue-300 lowercase">{dogsSmall + dogsMedium + dogsLarge} can(es)</span>
                </h4>
                <div className="space-y-1.5 font-sans text-xs">
                  <div className="flex justify-between">
                    <span className="text-blue-100">Albóndigas Premium:</span>
                    <span className="font-bold text-white">{totalAlbondigas} unid.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Proteína Base:</span>
                    <span className="font-bold text-white">{proteinaBase.toFixed(2)} kg</span>
                  </div>
                </div>
              </div>

              {/* Menú Humano section */}
              <div className="space-y-2">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wide text-secondary border-b border-white/5 pb-1 flex items-center justify-between">
                  <span>Menú Humano</span>
                  <span className="text-[10px] text-blue-300 lowercase">{humansTotal} invitado(s)</span>
                </h4>
                <div className="space-y-1.5 font-sans text-xs">
                  <div className="flex justify-between">
                    <span className="text-blue-100">Finger Foods:</span>
                    <span className="font-bold text-white">{fingerFoods} unid.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Carne para Sliders:</span>
                    <span className="font-bold text-white">{carneSliders.toFixed(2)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Tablas de Picoteo:</span>
                    <span className="font-bold text-white">{tablasPicoteo}</span>
                  </div>
                </div>
              </div>

              {/* Bebidas section */}
              <div className="space-y-2">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wide text-secondary border-b border-white/5 pb-1">
                  Bebidas
                </h4>
                <div className="space-y-1.5 font-sans text-xs">
                  <div className="flex justify-between">
                    <span className="text-blue-100 font-sans">Líquidos (Sin Alcohol):</span>
                    <span className="font-bold text-white">{liquidosSinAlcohol} L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100 font-sans">Líquidos (Con Alcohol):</span>
                    <span className="font-bold text-white">{liquidosConAlcohol} unid.</span>
                  </div>
                </div>
              </div>

              {/* Final notice line */}
              <div className="pt-4 border-t border-white/10 text-center font-sans text-[11px] text-blue-200">
                Cotización estimada sujeta a confirmación final.
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
