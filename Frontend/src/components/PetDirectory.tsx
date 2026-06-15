import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  PawPrint, 
  Filter, 
  Trash2, 
  CheckCircle, 
  User, 
  AlertCircle, 
  ShieldCheck, 
  Cake, 
  Tag,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  weight: string;
  ownerName: string;
  dietaryNotes: string;
  status: 'Activo' | 'En Evento' | 'De Vacaciones';
  avatar: string;
}

const INITIAL_PETS: Pet[] = [
  {
    id: 'PET-101',
    name: 'Bailey',
    breed: 'Golden Retriever',
    age: '3 años',
    weight: '28 kg',
    ownerName: 'Sarah Jenkins',
    dietaryNotes: 'Alergia al pollo, prefiere puré de calabaza.',
    status: 'Activo',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'PET-102',
    name: 'Barnaby',
    breed: 'Boyero de Berna',
    age: '4 años',
    weight: '44 kg',
    ownerName: 'Local Brews Co.',
    dietaryNotes: 'Dieta estrictamente libre de granos (Grain-free).',
    status: 'En Evento',
    avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'PET-103',
    name: 'Ziggy',
    breed: 'Border Collie',
    age: '8 meses',
    weight: '14 kg',
    ownerName: 'David Chen',
    dietaryNotes: 'Desea proteínas de un solo ingrediente para cachorros.',
    status: 'Activo',
    avatar: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'PET-104',
    name: 'Stella',
    breed: 'Labradoodle',
    age: '5 años',
    weight: '19 kg',
    ownerName: 'Recursos Humanos Intercorp',
    dietaryNotes: 'Hipoalergénico, golosinas a base de res.',
    status: 'Activo',
    avatar: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'PET-105',
    name: 'Luna',
    breed: 'French Bulldog',
    age: '2 años',
    weight: '11 s',
    ownerName: 'Claire Cooper',
    dietaryNotes: 'Estómago irritable. No lácteos, requiere porciones pesquetarianas.',
    status: 'De Vacaciones',
    avatar: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=200'
  }
];

interface PetDirectoryProps {
  onGoBack: () => void;
}

export default function PetDirectory({ onGoBack }: PetDirectoryProps) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState('');
  const [breedFilter, setBreedFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form Fields State
  const [newName, setNewName] = useState('');
  const [newBreed, setNewBreed] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newDietary, setNewDietary] = useState('');
  const [newStatus, setNewStatus] = useState<'Activo' | 'En Evento' | 'De Vacaciones'>('Activo');

  useEffect(() => {
    const saved = localStorage.getItem('dogsitter_pets');
    if (saved) {
      setPets(JSON.parse(saved));
    } else {
      setPets(INITIAL_PETS);
      localStorage.setItem('dogsitter_pets', JSON.stringify(INITIAL_PETS));
    }
  }, []);

  const saveUpdatedPets = (updated: Pet[]) => {
    setPets(updated);
    localStorage.setItem('dogsitter_pets', JSON.stringify(updated));
  };

  const handleCreatePet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newBreed || !newOwner) return;

    const newPet: Pet = {
      id: `PET-${Math.floor(100 + Math.random() * 900)}`,
      name: newName,
      breed: newBreed,
      age: newAge || '1 año',
      weight: newWeight || '15 kg',
      ownerName: newOwner,
      dietaryNotes: newDietary || 'Sin observaciones.',
      status: newStatus,
      // Dicebear fallback seed by dog name
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${newName}`
    };

    const updated = [...pets, newPet];
    saveUpdatedPets(updated);

    // Reset Fields
    setNewName('');
    setNewBreed('');
    setNewAge('');
    setNewWeight('');
    setNewOwner('');
    setNewDietary('');
    setNewStatus('Activo');
    setShowAddForm(false);

    setSuccessMsg(`¡Perfil de ${newPet.name} registrado con éxito!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleDeletePet = (id: string) => {
    const updated = pets.filter(p => p.id !== id);
    saveUpdatedPets(updated);
  };

  // Filter calculations
  const uniqueBreeds = Array.from(new Set(pets.map(p => p.breed)));

  const filteredPets = pets.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase());
    
    const matchesBreed = breedFilter === 'All' ? true : p.breed === breedFilter;
    const matchesStatus = statusFilter === 'All' ? true : p.status === statusFilter;

    return matchesSearch && matchesBreed && matchesStatus;
  });

  return (
    <div id="pet-directory-portal" className="min-h-[calc(100vh-4rem)] bg-surface text-on-surface py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-1">
              <PawPrint className="w-4 h-4" /> Administrador de Huéspedes
            </div>
            <h1 className="text-3xl font-display font-extrabold text-on-surface tracking-tight">
              Directorio de Mascotas
            </h1>
            <p className="text-sm text-on-surface-variant">
              Fichas clínicas, dietas especiales y perfiles de los comensales premium de DogSitter.
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={onGoBack}
              className="flex-1 md:flex-none px-4 py-2 bg-surface-container border border-outline hover:bg-surface-container-high text-on-surface font-semibold text-xs rounded-full transition-all cursor-pointer"
            >
              Volver a la Bandeja
            </button>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex-1 md:flex-none bg-primary hover:bg-on-primary-container text-white font-semibold text-xs px-5 py-2 rounded-full flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Registrar Mascota
            </button>
          </div>
        </header>

        {successMsg && (
          <div className="mb-6 p-4 bg-tertiary-fixed text-on-tertiary-container rounded-xl border border-tertiary/10 text-xs font-bold flex items-center gap-2 shadow-sm animate-pulse">
            <CheckCircle className="w-4 h-4 text-tertiary shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Add Pet Form Collapsible container with animation style */}
        {showAddForm && (
          <div className="bg-surface-container-low border border-primary/20 rounded-2xl p-6 mb-8 shadow-md">
            <h2 className="text-xl font-display font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-outline-variant/20 pb-2">
              <Sparkles className="w-5 h-5 text-primary" /> Registrar Ficha de Mascota
            </h2>
            
            <form onSubmit={handleCreatePet} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Nombre de la Mascota *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Max"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Raza *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Golden Retriever"
                  value={newBreed}
                  onChange={(e) => setNewBreed(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Dueño / Solicitante *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sarah Jenkins"
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Edad</label>
                <input
                  type="text"
                  placeholder="Ej. 2 años o 6 meses"
                  value={newAge}
                  onChange={(e) => setNewAge(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Peso</label>
                <input
                  type="text"
                  placeholder="Ej. 20 kg"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Estado de Estadía</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Activo">Activo</option>
                  <option value="En Evento">En Evento</option>
                  <option value="De Vacaciones">De Vacaciones</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Observaciones / Alergias Alimentarias</label>
                <textarea
                  rows={2}
                  placeholder="Ej. Intolerante al gluten o pollo. Prefiere snack de salmón seco..."
                  value={newDietary}
                  onChange={(e) => setNewDietary(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="md:col-span-3 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-sm font-semibold hover:bg-surface-container rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-on-primary-container"
                >
                  Guardar Mascota
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 shadow-sm">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar por mascota, raza o dueño..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-surface-container border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-2 shrink-0">
            <div className="relative">
              <select 
                value={breedFilter}
                onChange={(e) => setBreedFilter(e.target.value)}
                className="pl-3 pr-8 py-2 text-xs bg-surface-container border border-outline-variant rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">Todas las Razas</option>
                {uniqueBreeds.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-3 pr-8 py-2 text-xs bg-surface-container border border-outline-variant rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">Todos los Estados</option>
                <option value="Activo">Activo</option>
                <option value="En Evento">En Evento</option>
                <option value="De Vacaciones">De Vacaciones</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pets Bento grid blocks */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <article 
                key={pet.id} 
                className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Brand sidebar accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  pet.status === 'En Evento' ? 'bg-primary' : pet.status === 'De Vacaciones' ? 'bg-amber-500' : 'bg-tertiary-container'
                }`} />

                <div>
                  {/* Info Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/20 shadow-inner shrink-0 leading-none">
                      <img 
                        src={pet.avatar} 
                        alt={pet.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${pet.name}`;
                        }}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-lg text-on-surface">{pet.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                          pet.status === 'En Evento' ? 'bg-primary-container/20 text-primary' :
                          pet.status === 'De Vacaciones' ? 'bg-amber-100 text-amber-700' :
                          'bg-tertiary-fixed text-on-tertiary-container'
                        }`}>
                          {pet.status}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-semibold flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-primary" /> {pet.breed}
                      </p>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">
                        {pet.age} • {pet.weight}
                      </p>
                    </div>
                  </div>

                  {/* Owner information block */}
                  <div className="bg-surface-container/30 border border-outline-variant/20 rounded-xl p-3 mb-4 space-y-1">
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider flex items-center gap-1">
                      <User className="w-3 h-3" /> Propietario / Cuenta
                    </p>
                    <p className="text-xs font-bold text-on-surface">{pet.ownerName}</p>
                  </div>

                  {/* Dietary Warning segment */}
                  <div className="p-3 bg-error-container/10 border border-error/10 rounded-xl space-y-1">
                    <p className="text-[10px] text-error font-bold uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-error shrink-0" /> Restricción y Notas Dietéticas
                    </p>
                    <p className="text-xs text-on-surface italic leading-relaxed">
                      "{pet.dietaryNotes}"
                    </p>
                  </div>
                </div>

                {/* Footer section inside bento box card */}
                <div className="pt-4 mt-4 border-t border-outline-variant/20 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-on-surface-variant font-semibold">ID: {pet.id}</span>
                  <button 
                    onClick={() => handleDeletePet(pet.id)}
                    className="text-on-surface-variant/40 hover:text-error hover:scale-110 p-1.5 rounded bg-surface transition-all cursor-pointer"
                    aria-label={`Eliminar ficha de ${pet.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-panel rounded-2xl border border-dashed border-outline-variant/30">
            <PawPrint className="w-12 h-12 text-outline mx-auto mb-3 opacity-60" />
            <h3 className="font-semibold text-on-surface">No se encontraron mascotas</h3>
            <p className="text-xs text-on-surface-variant mt-1">Ajusta los filtros de búsqueda o registra una ficha nueva.</p>
          </div>
        )}

      </div>
    </div>
  );
}
