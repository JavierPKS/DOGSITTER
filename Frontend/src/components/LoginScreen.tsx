import React, { useState } from 'react';
import { 
  PawPrint, 
  Shield, 
  Sparkles, 
  User, 
  Key, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  Heart
} from 'lucide-react';
import { UserSession } from '../types';

interface LoginScreenProps {
  onLogin: (session: UserSession) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'client' | null>(null);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Demo accounts data
  const handleQuickLogin = (role: 'admin' | 'client') => {
    if (role === 'admin') {
      onLogin({
        role: 'admin',
        name: 'Elena Gómez',
        email: 'elena.gomez@dogsitter.com',
        phone: '+56 9 8765 4321',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
      });
    } else {
      onLogin({
        role: 'client',
        name: 'Sarah Jenkins',
        email: 'sarah.j@example.com',
        phone: '(555) 123-4567',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
      });
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    if (selectedRole === 'admin') {
      // Allow any password for easier testing but show simulation
      onLogin({
        role: 'admin',
        name: 'Elena Gómez (Admin)',
        email: 'admin@dogsitter.com',
        phone: '+56 9 1000 0000',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Admin'
      });
    } else {
      onLogin({
        role: 'client',
        name: 'Sarah Jenkins',
        email: 'sarah.j@example.com',
        phone: '(555) 123-4567',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
      });
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Decorative blurry backgrounds */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-tertiary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 shadow-xl relative z-10">
        
        {/* Upper Brand Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <PawPrint className="w-9 h-9 text-primary rotate-12" />
          </div>
          <h1 className="text-3xl font-display font-black text-primary tracking-tight select-none">
            DogSitter Gastronómico
          </h1>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto mt-2">
            Inicia sesión o selecciona un rol para coordinar banquetes premium y administrar recursos operativos de alta cocina canina.
          </p>
        </div>

        {/* Roles Selection Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card: Admin role select */}
          <button
            type="button"
            onClick={() => setSelectedRole('admin')}
            className={`p-6 rounded-2xl border text-left transition-all ${
              selectedRole === 'admin' 
                ? 'border-primary bg-primary/5 shadow-md scale-[1.02]' 
                : 'border-outline-variant/45 bg-surface-container-low hover:bg-surface-container-high hover:border-outline-variant/70'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedRole === 'admin' ? 'bg-primary text-white' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                <Shield className="w-5 h-5" />
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${selectedRole === 'admin' ? 'bg-primary-container/20 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                Administración
              </span>
            </div>
            
            <h3 className="font-display font-extrabold text-lg text-on-surface">Administrador</h3>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              Planifica, aprueba reservas, diseña recetas caninas, gestiona el staff operativo y calendariza bloqueos de cocina.
            </p>
          </button>

          {/* Card: Client role select */}
          <button
            type="button"
            onClick={() => setSelectedRole('client')}
            className={`p-6 rounded-2xl border text-left transition-all ${
              selectedRole === 'client' 
                ? 'border-primary bg-primary/5 shadow-md scale-[1.02]' 
                : 'border-outline-variant/45 bg-surface-container-low hover:bg-surface-container-high hover:border-outline-variant/70'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedRole === 'client' ? 'bg-primary text-white' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                <Sparkles className="w-5 h-5" />
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${selectedRole === 'client' ? 'bg-tertiary-fixed text-on-tertiary-container' : 'bg-surface-container-high text-on-surface-variant'}`}>
                Invitado VIP
              </span>
            </div>
            
            <h3 className="font-display font-extrabold text-lg text-on-surface">Cliente VIP</h3>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              Solicita cotizaciones, configura menús y pasteles para tus canes, visualiza la dotación idónea y revisa el estado de tus eventos.
            </p>
          </button>

        </div>

        {/* Selected View Action Container */}
        {selectedRole ? (
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary-fixed">
                  <User className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs text-on-surface-variant block">Acceso preestablecido como:</span>
                  <span className="text-sm font-bold text-on-surface">
                    {selectedRole === 'admin' ? 'Elena Gómez (Líder Admin)' : 'Sarah Jenkins (Cliente Premium)'}
                  </span>
                </div>
              </div>

              {selectedRole === 'admin' && (
                <div className="space-y-3 pt-2 border-t border-outline-variant/10">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase">Clave Canina (Simulada)</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      placeholder="Cualquier contraseña es válida en modo demo"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline rounded-lg pl-9 pr-4 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="flex-1 py-3 text-sm font-bold hover:bg-surface-container rounded-xl text-on-surface transition-colors cursor-pointer"
              >
                Volver
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-primary hover:bg-on-primary-container text-white text-sm font-extrabold rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Ingresar al Portal <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        ) : (
          <div className="text-center pt-2 space-y-4">
            <span className="text-xs text-on-surface-variant block font-bold uppercase tracking-wider">¿Prueba Rápida de Roles?</span>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="px-6 py-2.5 bg-primary/10 text-primary font-bold text-xs rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                Ingreso Rápido Admin: Elena
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('client')}
                className="px-6 py-2.5 bg-tertiary-fixed text-on-tertiary-container font-semibold text-xs rounded-full hover:bg-tertiary hover:text-white transition-colors cursor-pointer"
              >
                Ingreso Rápido Cliente: Sarah
              </button>
            </div>
            
            <p className="text-[10px] text-on-surface-variant/40 flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5 text-primary shrink-0" /> DogSitter utiliza localStorage para recordar tu sesión activa.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
