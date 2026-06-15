/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PawPrint, Menu, X } from 'lucide-react';

interface TopNavBarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onBookNow: () => void;
}

export default function TopNavBar({ currentTab, setTab, onBookNow }: TopNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'portal', label: 'Portal Cliente' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-100 backdrop-blur-md bg-white/90">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo and Brand */}
        <div 
          onClick={() => setTab('inicio')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
            <PawPrint className="w-6 h-6 fill-secondary text-secondary" />
          </div>
          <span className="font-sans font-bold text-2xl tracking-tight text-primary">
            Dog<span className="text-[#fed000]">Sitter</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setTab(link.id)}
                className={`font-sans font-medium text-[15px] px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-secondary rounded-b-none'
                    : 'text-[#444651] hover:text-primary hover:bg-gray-50'
                }`}
                id={`tab-${link.id}`}
              >
                {link.label}
              </button>
            );
          })}
          
          <button
            onClick={onBookNow}
            className="ml-4 bg-primary text-white hover:bg-[#002d72] font-semibold text-[14px] px-6 py-2.5 rounded-lg active:scale-95 transition-all shadow-sm duration-200"
            id="nav-book-now"
          >
            Reserva Ahora
          </button>
        </div>

        {/* Mobile Hamburger Menu icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary hover:bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4 shadow-inner animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setTab(link.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-left text-left font-sans font-medium text-[16px] p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-secondary-container text-primary font-bold'
                      : 'text-[#444651] hover:bg-gray-50'
                  }`}
                  id={`mobile-tab-${link.id}`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                onBookNow();
                setIsOpen(false);
              }}
              className="mt-3 w-full bg-primary text-white hover:bg-[#002d72] font-semibold text-[15px] p-3 rounded-lg text-center active:scale-95 transition-all shadow-sm duration-200"
              id="mobile-nav-book-now"
            >
              Reserva Ahora
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
