/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PawPrint } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  return (
    <footer className="bg-surface-container-highest dark:bg-tertiary-container w-full py-12 px-6 md:px-12 border-t border-outline-variant mt-auto">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Information */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div onClick={() => setTab('inicio')} className="flex items-center gap-2 cursor-pointer group w-fit">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <PawPrint className="w-5 h-5 fill-secondary text-secondary" />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-primary">
              Dog<span className="text-[#fed000]">Sitter</span>
            </span>
          </div>
          <p className="font-sans text-[13px] text-gray-500 max-w-sm leading-relaxed">
            Premium Pet Catering & Events. Creamos experiencias culinarias y festividades seguras para tus mejores amigos desde 2024.
          </p>
          <span className="font-sans text-[12px] text-gray-400 mt-2">
            &copy; {new Date().getFullYear()} DogSitter. Todos los derechos reservados.
          </span>
        </div>

        {/* Links Navigation */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 md:justify-items-end">
          <div className="flex flex-col gap-2.5">
            <h4 className="font-sans font-bold text-[13px] text-primary uppercase tracking-wider mb-1">Empresa</h4>
            <button onClick={() => setTab('inicio')} className="text-left font-sans text-sm text-gray-600 hover:text-primary transition-colors">Inicio</button>
            <button onClick={() => setTab('servicios')} className="text-left font-sans text-sm text-gray-600 hover:text-primary transition-colors">Servicios & Catálogo</button>
            <button onClick={() => setTab('portal')} className="text-left font-sans text-sm text-gray-600 hover:text-primary transition-colors">Mi Cuenta</button>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="font-sans font-bold text-[13px] text-primary uppercase tracking-wider mb-1">Recursos</h4>
            <a href="#" className="font-sans text-sm text-gray-600 hover:text-primary transition-colors">Preguntas Frecuentes</a>
            <a href="#" className="font-sans text-sm text-gray-600 hover:text-primary transition-colors">Guías de Nutrición</a>
            <a href="#" className="font-sans text-sm text-gray-600 hover:text-primary transition-colors">Blog canino</a>
          </div>

          <div className="flex flex-col gap-2.5 col-span-2 sm:col-span-1">
            <h4 className="font-sans font-bold text-[13px] text-primary uppercase tracking-wider mb-1">Legal & Soporte</h4>
            <a href="#" className="font-sans text-sm text-gray-600 hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="font-sans text-sm text-gray-600 hover:text-primary transition-colors">Términos</a>
            <a href="#" className="font-sans text-sm text-gray-600 hover:text-primary transition-colors">Contacto</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
