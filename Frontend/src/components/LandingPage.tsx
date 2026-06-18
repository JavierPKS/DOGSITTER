import React from 'react';
import { 
  PawPrint, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Heart, 
  CheckCircle2, 
  Award,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  // Unsplash Premium Dog Photos
  const images = {
    heroDog: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=800',
    patisserie: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
    celebration: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600',
    dogsGroup: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600'
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans selection:bg-primary-container selection:text-primary">
      
      {/* Decorative Blurs */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[30%] h-[45%] bg-tertiary/5 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Dynamic Header / Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-surface/80 border-b border-outline-variant/30 px-6 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
            <PawPrint className="w-5 h-5 text-primary rotate-12" />
          </div>
          <span className="font-display text-xl font-black text-primary tracking-tight select-none">DogSitter</span>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-primary-container text-primary px-2 py-0.5 rounded-full hidden sm:inline-block">
            Gourmet Premium
          </span>
        </div>

        {/* Desktop Anchor links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-on-surface-variant">
          <a href="#experiencia" className="hover:text-primary transition-colors">Nuestra Experiencia</a>
          <a href="#pasteleria" className="hover:text-primary transition-colors">Pastelería de Alta Gama</a>
          <a href="#stats" className="hover:text-primary transition-colors">Excelencia en Cifras</a>
          <a href="#garantia" className="hover:text-primary transition-colors">Garantía DogSitter</a>
        </div>

        {/* CTA "Ingresar" button */}
        <button 
          onClick={onEnter}
          className="bg-primary hover:bg-primary/95 text-on-primary font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <span>Ingresar Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative py-12 md:py-20 lg:py-24 px-6 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 z-10 flex-1">
        
        {/* Left Col: Captivating copy */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs rounded-full font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Redefiniendo el Festejo Canino</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-on-surface leading-[1.1]">
            Creamos los Cumpleaños <br />
            <span className="text-primary">Caninos Más Exclusivos</span> <br />
            y Deliciosos del País.
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto md:mx-0 leading-relaxed">
            DogSitter es la primera agencia dedicada 100% al diseño integral de banquetes de cumpleaños y picnics de Puppaccinos para perros. Fusionamos alta pastelería canina orgánica, factor estimativo por peso de mascotas y supervisión veterinaria libre de desvelos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <button
              onClick={onEnter}
              className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-on-primary font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              Organizar Cumpleaños de mi Perro
            </button>
            <a
              href="#experiencia"
              className="w-full sm:w-auto bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-sm px-6 py-3.5 rounded-2xl border border-outline-variant/30 text-center transition-all"
            >
              Conocer Experiencia
            </a>
          </div>

          {/* Testimonial highlight */}
          <div className="pt-6 flex items-center justify-center md:justify-start gap-3 border-t border-outline-variant/20">
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Client avatar" className="w-8 h-8 rounded-full border border-surface object-cover" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Client avatar" className="w-8 h-8 rounded-full border border-surface object-cover" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" alt="Client avatar" className="w-8 h-8 rounded-full border border-surface object-cover" referrerPolicy="no-referrer" />
            </div>
            <p className="text-xs text-on-surface-variant font-medium text-left">
              Calificado con <strong className="text-primary">4.9/5 estrellas</strong> por más de <span className="underline decoration-primary/50 decoration-2 transition-all">1,500 dueños satisfechos</span>.
            </p>
          </div>
        </div>

        {/* Right Col: Majestic dog photo with floating accents */}
        <div className="flex-1 relative w-full max-w-sm md:max-w-none">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-surface-container-lowest">
            <img 
              src={images.heroDog} 
              alt="Golden Retriever feliz celebrando cumpleaños" 
              className="w-full h-full object-cover select-none" 
              referrerPolicy="no-referrer"
            />
            {/* Absolute overlay elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <span className="text-[10px] font-bold bg-primary text-on-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1">
                Fundadores de la Alta Repostería Canina
              </span>
              <h3 className="font-display font-bold text-lg leading-tight">Oliver (Cachorro Satisfecho)</h3>
              <p className="text-xs opacity-90">Saborizante 100% natural libre de aditivos artificiales.</p>
            </div>
          </div>
          
          {/* Experience floating tags */}
          <div className="absolute top-4 -left-6 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-3 shadow-lg hidden sm:block">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-xs font-black text-on-surface leading-none">8+ Años</p>
                <p className="text-[9px] text-on-surface-variant font-medium mt-0.5">En el Mercado Premium</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 shadow-lg hidden sm:block">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              <div className="text-left">
                <p className="text-xs font-black text-on-surface leading-none">1,500+ Eventos</p>
                <p className="text-[9px] text-on-surface-variant font-medium mt-0.5">Exitosa Producción Gourmet</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Experience, Heritage & Excellence Stats Section */}
      <section id="stats" className="py-16 bg-surface-container-low px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
            Garantía de Maestría Operativa
          </span>
          <h2 className="text-3xl font-display font-black text-on-surface tracking-tight mb-2">
            La Excelencia No Es Casualidad, Se Cocina Con Amor
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto mb-12">
            Hemos construido la mayor infraestructura sanitaria, logística y repostera para que planificar el gran día de tu mascota tome solo un par de clics.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Stat 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 border border-primary/20">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-3xl font-display font-black text-primary leading-none">8 Años</h3>
                <p className="text-xs font-bold text-on-surface mt-2 mb-1">Trayectoria y Liderazgo</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Lanzados en 2018, definiendo los más exigentes estándares de inocuidad y disfrute de perros de todas las razas.
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 border border-primary/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-3xl font-display font-black text-primary leading-none">1,500+</h3>
                <p className="text-xs font-bold text-on-surface mt-2 mb-1">Festejos Producidos</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Desde pequeñas reuniones familiares hasta masivos picnics de Puppaccinos de nivel corporativo.
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 border border-primary/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-3xl font-display font-black text-primary leading-none">100%</h3>
                <p className="text-xs font-bold text-on-surface mt-2 mb-1">Grado Humano</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Ingredientes frescos, harinas de avena y coco libres de gluten, y sin saborizantes artificiales ni azúcar de caña.
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 border border-primary/20">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-3xl font-display font-black text-primary leading-none">3 Días</h3>
                <p className="text-xs font-bold text-on-surface mt-2 mb-1">Planificación Mínima</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Bajo un riguroso proceso de resguardo de calidad, bloqueamos la cocina 3 horas antes de los despachos para frescura total.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-End Bakery Section */}
      <section id="pasteleria" className="py-20 px-6 max-w-6xl mx-auto w-full z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left: Dog eating cake */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative aspect-video lg:aspect-square bg-surface-container rounded-3xl overflow-hidden shadow-xl border border-outline-variant/20">
              <img 
                src={images.patisserie} 
                alt="Repostería de pasteles de perro fina para ocasiones especiales" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl p-4 border border-outline-variant/20 text-left">
                <span className="text-[9px] font-bold text-primary uppercase inline-block mb-1 bg-primary/10 px-2 py-0.5 rounded-full">
                  Recetas de Confianza
                </span>
                <p className="text-xs font-bold text-on-surface">Cada pastel viene acompañado de su minuta de ingredientes desglosados en tiempo real para el organizador canino.</p>
              </div>
            </div>
          </div>

          {/* Right: Detailed list value proposal */}
          <div className="flex-1 space-y-6 text-left">
            <span className="text-xs font-extrabold text-primary uppercase tracking-widest">
              Gabinete Pastelero Artesanal
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-on-surface tracking-tight">
              Alta Pastelería Canina con Minuta Transparente de Ingredientes
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Sabemos que la salud de tu can es lo primero. Por eso, al planificar tu evento con DogSitter, tendrás acceso al desglose exhaustivo de insumos por cada receta. Ofrecemos tres exquisitas e icónicas combinaciones para el pastel de celebración:
            </p>

            <div className="space-y-4">
              {/* Flavor 1 */}
              <div className="flex gap-3 bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-all">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface uppercase">Mantequilla de Maní Natural (Sin Xilitol)</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                    Preparado artesanalmente con plátanos maduros, aceite de coco virgen y base de harina de avena orgánica sin gluten. Un clásico energético para cachorros.
                  </p>
                </div>
              </div>

              {/* Flavor 2 */}
              <div className="flex gap-3 bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-all">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface uppercase">Hígado de Res Orgánico</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                    Un manjar rico en hierro. Con base de hígado triturado fresco, huevos de campo, harina de avena y sutil cobertura de puré de camote hipoalergénico.
                  </p>
                </div>
              </div>

              {/* Flavor 3 */}
              <div className="flex gap-3 bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-all">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface uppercase">Calabaza & Manzana Fresca</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                    Bajo en calorías y rico en fibra digestible. Puré de calabaza natural, manzanas rojas ralladas sin pepas, harina de coco y una suave cobertura purificada.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Experience Showcase & Testimonials */}
      <section id="experiencia" className="py-20 bg-surface-container-low px-6 relative z-10 transition-all">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
            Galería del Amor
          </span>
          <h2 className="text-3xl font-display font-black text-on-surface tracking-tight mb-2">
            La Felicidad Hecha Evento
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto mb-12">
            Echa un vistazo a la alegría de nuestros invitados VIP disfrutando y compartiendo con la manada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* Pic card 1 */}
            <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 p-2 shadow-sm hover:shadow-md transition-all">
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img typeof="image" src={images.celebration} alt="Perro celebrando" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-350" referrerPolicy="no-referrer" />
              </div>
              <p className="text-xs font-bold text-on-surface mt-3 text-left px-2">Picnics de Puppaccinos</p>
              <p className="text-[10px] text-on-surface-variant text-left px-2 mb-1">Organización y cálculo idóneo por tamaño de canes.</p>
            </div>

            {/* Pic card 2 */}
            <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 p-2 shadow-sm hover:shadow-md transition-all">
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img typeof="image" src={images.dogsGroup} alt="Perros reunidos comiendo" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-350" referrerPolicy="no-referrer" />
              </div>
              <p className="text-xs font-bold text-on-surface mt-3 text-left px-2">Aniversarios Corporativos y de Masas</p>
              <p className="text-[10px] text-on-surface-variant text-left px-2 mb-1">Hasta más de 20 canes con acompañamiento médico.</p>
            </div>

            {/* Pic card 3 */}
            <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 p-2 shadow-sm hover:shadow-md transition-all">
              <div className="aspect-square rounded-xl overflow-hidden relative font-display">
                <div className="w-full h-full bg-primary/5 absolute inset-0 flex flex-col justify-between p-6 z-10 text-left">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star key={n} className="w-4 h-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm italic text-on-surface font-semibold leading-relaxed">
                      "DogSitter salvó literalmente el cumpleaños de mi Corgi. El pastel de hígado de res causó furor y me encantó saber exactamente qué contenía."
                    </p>
                    <p className="text-[10px] uppercase font-bold text-primary mt-3 tracking-wider">
                      — Amanda R., Dueña de Rocky
                    </p>
                  </div>
                </div>
                <img typeof="image" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600" alt="Corgi feliz" className="w-full h-full object-cover opacity-30 select-none grayscale" referrerPolicy="no-referrer" />
              </div>
            </div>

          </div>

          {/* Interactive footer card for instant access */}
          <div className="bg-primary/5 rounded-3xl p-8 border-2 border-dashed border-primary/20 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h4 className="font-display font-black text-xl text-primary leading-tight">¿Tienes un evento en mente?</h4>
              <p className="text-xs text-on-surface-variant mt-1">Conéctate al portal de inmediato para ingresar tus detalles o cotizar.</p>
            </div>
            <button
              onClick={onEnter}
              className="bg-primary hover:bg-primary/95 text-on-primary font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Iniciar mi Registro
            </button>
          </div>

        </div>
      </section>

      {/* Global Concierge / Guarantee block */}
      <section id="garantia" className="py-16 px-6 max-w-4xl mx-auto w-full text-center border-t border-outline-variant/20 z-10">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
          <Heart className="w-6 h-6 text-primary fill-primary" />
        </div>
        <h3 className="text-lg font-display font-black text-on-surface uppercase tracking-tight">Compromiso Sanitario de Grado Veterinario</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed max-w-xl mx-auto mt-2">
          La manipulación artesanal de la cocina DogSitter obedece a las pautas de control e inocuidad alimentaria más estrictas. Ningún pastel se elabora con colorantes ni aditivos industriales. Garantizamos el resguardo óptimo de tu mejor amigo.
        </p>
      </section>

      {/* Decorative footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/30 py-8 px-6 text-center text-on-surface-variant z-10">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <PawPrint className="w-4 h-4 text-primary" />
          <span className="font-display font-extrabold text-xs tracking-tight text-primary">DogSitter Gastronomía Canina Premium</span>
        </div>
        <p className="text-[10px] text-on-surface-variant leading-relaxed max-w-md mx-auto">
          © {new Date().getFullYear()} DogSitter Gourmet. Todos los derechos reservados. Redefiniendo el catering canino gourmet con ingredientes humanos reales y amor artesanal desde 2018.
        </p>
      </footer>

    </div>
  );
}
