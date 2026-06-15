/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CalendarRange, ChefHat, Sparkles, ArrowRight, Award, Trash, Edit, Star, Cake, Sun } from 'lucide-react';
import { CATALOG_THEMES } from '../data';
import { ThemePackage } from '../types';

interface HomeLandingProps {
  setTab: (tab: string) => void;
  onSelectTheme: (themeId: string) => void;
}

export default function HomeLanding({ setTab, onSelectTheme }: HomeLandingProps) {
  
  // Maps icon string to actual Lucide component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'cake':
        return <Cake className="w-8 h-8 text-primary" />;
      case 'sun':
        return <Sun className="w-8 h-8 text-primary" />;
      case 'award':
        return <Award className="w-8 h-8 text-primary" />;
      default:
        return <Sparkles className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[700px] md:min-h-[780px] flex items-center justify-center text-center text-white overflow-hidden px-4 md:px-8 mt-[72px]">
        {/* Background Image with Ambient Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="DogSitter Premium Set" 
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1600"
          />
          {/* Brand-heavy Navy Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary/98"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 md:space-y-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-secondary text-primary font-bold text-[12px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              ★ Servicio Concierge de Alta Gama para Mascotas
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans font-bold text-3xl sm:text-5xl md:text-6.5xl leading-tight tracking-tight text-white"
          >
            Eventos Inolvidables para tus <br className="hidden sm:inline" />
            <span className="text-[#fed000] drop-shadow-sm font-extrabold relative inline-block">
              Mejores Amigos
              <span className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-secondary rounded-full"></span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-sans text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed"
          >
            Transformamos ocasiones especiales en experiencias premium de catering y entretenimiento diseñadas exclusivamente para mascotas exigentes y sus dueños.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-6 flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={() => setTab('portal')}
              className="bg-[#fed000] text-primary hover:bg-[#ffe07f] font-sans font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-[#fed000]/20 transition-all flex items-center justify-center gap-2 group cursor-pointer duration-200"
            >
              Crea tu Evento
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={() => setTab('servicios')}
              className="bg-transparent border border-white/30 text-white hover:bg-white/10 font-sans font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200"
            >
              Ver Catálogo
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Cómo Funciona Section */}
      <section className="py-20 px-6 md:px-12 bg-[#fbf9f8]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-primary tracking-tight">
              Cómo Funciona
            </h2>
            <div className="w-12 h-1 bg-secondary mx-auto rounded-full"></div>
            <p className="text-[#444651] font-sans text-base sm:text-lg">
              Organizar el evento perfecto es simple con nuestro servicio concierge de principio a fin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative group hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-md shadow-primary/10 group-hover:scale-105 transition-transform duration-300">
                <CalendarRange className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-sans font-semibold text-xl text-primary mb-3">
                1. Selecciona la Temática
              </h3>
              <p className="text-[#444651] font-sans text-[14px] leading-relaxed">
                Explora nuestro catálogo exclusivo y elige la temática que mejor se adapte a la personalidad de tu festejado peludo.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative group hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-md shadow-primary/10 group-hover:scale-105 transition-transform duration-300">
                <ChefHat className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-sans font-semibold text-xl text-primary mb-3">
                2. Personaliza el Menú
              </h3>
              <p className="text-[#444651] font-sans text-[14px] leading-relaxed">
                Trabaja con nutricionistas caninos para diseñar un menú sabroso, biológicamente apropiado y adaptado a las alergias del grupo.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative group hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#fed000] text-primary rounded-full flex items-center justify-center mb-6 shadow-md shadow-secondary/20 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-8 h-8 fill-primary" />
              </div>
              <h3 className="font-sans font-semibold text-xl text-primary mb-3">
                3. Disfruta el Evento
              </h3>
              <p className="text-[#444651] font-sans text-[14px] leading-relaxed">
                Nosotros nos encargamos del montaje, la seguridad, el servicio de catering y la limpieza posterior. Tú solo sé el mejor anfitrión.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Nuestras Temáticas Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-100 pb-6">
            <div className="space-y-2">
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-primary tracking-tight">
                Nuestras Temáticas
              </h2>
              <p className="text-[#444651] font-sans text-base">
                Experiencias temáticas diseñadas meticulosamente con amor y elegancia.
              </p>
            </div>
            <button
              onClick={() => setTab('servicios')}
              className="text-primary hover:text-secondary-container font-sans font-bold text-[14px] flex items-center gap-1 group border-b-2 border-secondary pb-1 tracking-wide"
            >
              Ver todas las opciones
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATALOG_THEMES.slice(0, 3).map((theme) => (
              <div 
                key={theme.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Image Wrap */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={theme.image} 
                    alt={theme.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full text-primary shadow-md">
                    {getIconComponent(theme.iconName)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-xl text-primary">
                      {theme.title}
                    </h3>
                    <p className="text-primary font-bold text-sm tracking-wide bg-primary/5 px-2.5 py-1 rounded-md w-fit">
                      {theme.price}
                    </p>
                    <p className="text-[#444651] font-sans text-[13.5px] leading-relaxed pt-2">
                      {theme.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onSelectTheme(theme.id)}
                      className="w-full py-3 bg-gradient-to-r from-primary to-[#002d72] text-white hover:from-[#002d72] hover:to-primary rounded-xl font-sans font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Reservación Instantánea
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
