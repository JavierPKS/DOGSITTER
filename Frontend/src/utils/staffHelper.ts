import { EventRequest } from '../types';

export interface StaffRequirement {
  coordinators: number;
  chefs: number;
  helpers: number;
  vets: number;
  total: number;
}

/**
 * Calculates staffing requirements automatically based on the size and complexity of the event.
 */
export function calculateStaffNeeds(dogs: number, humans: number, medicalStandby: boolean): StaffRequirement {
  const finalDogs = dogs || 0;
  const finalHumans = humans || 0;

  // 1 Coordinator (colaborador) per 10 dogs (1 to 10 -> 1, 11 to 20 -> 2, etc.)
  const coordinators = finalDogs > 0 ? Math.ceil(finalDogs / 10) : 1;
  
  // Pastry Chefs based on sum of dogs + humans (1 to 8 -> 1, 9 to 16 -> 2, etc.)
  const totalSum = finalDogs + finalHumans;
  const chefs = totalSum > 0 ? Math.ceil(totalSum / 8) : 1;
  
  // Canine assistants: increase by 1 every 5 dogs (1 to 5 -> 1, 6 to 10 -> 2, etc.)
  const helpers = finalDogs > 0 ? Math.ceil(finalDogs / 5) : 0;
  
  // Veterinarians: same logic but every 5 dogs (1 to 5 -> 1, 6 to 10 -> 2, etc.)
  const vets = finalDogs > 0 ? Math.ceil(finalDogs / 5) : 0;

  return {
    coordinators,
    chefs,
    helpers,
    vets,
    total: coordinators + chefs + helpers + vets
  };
}

export const INITIAL_STAFF: { id: string; name: string; role: any; status: any; email: string; phone: string; avatarUrl: string }[] = [
  {
    id: 'STF-501',
    name: 'Elena Gómez',
    role: 'Coordinador',
    status: 'Disponible',
    email: 'elena.gomez@dogsitter.com',
    phone: '+56 9 8765 4321',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'STF-502',
    name: 'Carlos Paz',
    role: 'Líder Operativo',
    status: 'Disponible',
    email: 'carlos.paz@dogsitter.com',
    phone: '+56 9 7654 3210',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'STF-503',
    name: 'Mateo Roldán',
    role: 'Chef Repostero',
    status: 'Disponible',
    email: 'mateo.roldan@dogsitter.com',
    phone: '+56 9 6543 2109',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'STF-504',
    name: 'Valeria Sotomayor',
    role: 'Auxiliar Canino',
    status: 'En Evento',
    email: 'valeria.s@dogsitter.com',
    phone: '+56 9 5432 1098',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'STF-505',
    name: 'Dr. Fernando Ortiz',
    role: 'Soporte Veterinario',
    status: 'Disponible',
    email: 'fernando.o@dogsitter.com',
    phone: '+56 9 4321 0987',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'STF-506',
    name: 'Ignacio Fuentes',
    role: 'Auxiliar Canino',
    status: 'Disponible',
    email: 'ignacio.f@dogsitter.com',
    phone: '+56 9 3210 9876',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
  }
];
