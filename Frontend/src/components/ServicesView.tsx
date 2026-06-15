/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CATALOG_THEMES } from '../data';
import { Cake, Sun, Award, Sparkles, Check } from 'lucide-react';

interface ServicesViewProps {
  onSelectTheme: (themeId: string) => void;
}

export default function ServicesView({ onSelectTheme }: ServicesViewProps) {
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'cake':
        return <Cake className="w-10 h-10 text-primary" />;
      case 'sun':
        return <Sun className="w-10 h-10 text-primary" />;
      case 'award':
        return <Award className="w-10 h-10 text-primary" />;
      default:
        return <Sparkles className="w-10 h-10 text-primary" />;
    }
  };

  return (
    <div className="py-24 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-[1280px] mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="font-sans font-bold text-3xl sm:text-5xl text-primary tracking-tight">
            Nuestro Catálogo de Experiencias
          </h1>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full"></div>
          <p className="text-[#444651] font-sans text-base sm:text-lg leading-relaxed">
            Cada evento es una obra de hospitalidad canina diseñada con estrictos estándares de seguridad, nutrición óptima y mucha diversión garantizada.
          </p>
        </div>

        {/* Detailed Catalog List */}
        <div className="space-y-12">
          {CATALOG_THEMES.map((theme, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={theme.id}
                className={`flex flex-col lg:flex-row items-stretch gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual Image container */}
                <div className="w-full lg:w-1/2 min-h-[300px] rounded-2.5xl overflow-hidden relative">
                  <img
                    alt={theme.title}
                    src={theme.image}
                    className="w-full h-full object-cover min-h-[300px] max-h-[450px]"
                  />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md flex items-center gap-2">
                    {getIconComponent(theme.iconName)}
                    <div>
                      <h4 className="font-sans font-bold text-xs text-primary uppercase tracking-wider">Temática</h4>
                      <p className="font-sans text-xs text-gray-500 capitalize">{theme.id}</p>
                    </div>
                  </div>
                </div>

                {/* Content description list */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between py-2 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block bg-[#dae2ff] text-primary font-bold text-xs px-3 py-1 rounded-md">
                        {theme.price}
                      </span>
                      <h2 className="font-sans font-bold text-2xl sm:text-3xl text-primary">
                        {theme.title}
                      </h2>
                    </div>
                    <p className="text-[#444651] font-sans text-sm sm:text-base leading-relaxed">
                      {theme.description}
                    </p>

                    {/* Bullet elements check list */}
                    <div className="space-y-2 pt-2">
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wide text-[#444651]">
                        ¿Qué incluye este paquete premium?
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {theme.bulletPoints.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-[13.5px] text-gray-600">
                            <div className="w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-left w-full sm:w-auto">
                      <p className="font-sans text-[12px] text-gray-400">Cotización estimada basada en</p>
                      <p className="font-sans font-bold text-sm text-primary">Precios transparentes sin costos ocultos</p>
                    </div>
                    <button
                      onClick={() => onSelectTheme(theme.id)}
                      className="w-full sm:w-auto bg-primary text-white hover:bg-[#002d72] font-sans font-bold text-sm px-8 py-3.5 rounded-xl cursor-pointer shadow-sm hover:shadow transition-all"
                    >
                      Reservar esta temática
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
