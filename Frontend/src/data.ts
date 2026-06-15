/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventRequest, Staff, ThemePackage } from './types';

export const CATALOG_THEMES: ThemePackage[] = [
  {
    id: 'cumpleanos',
    title: 'Cumpleaños Perruno',
    description: 'Una celebración clásica con tarta apta para perros, decoración festiva y juegos interactivos para todos los invitados peludos.',
    price: 'Desde $150',
    image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=600',
    iconName: 'cake',
    bulletPoints: [
      'Tarta de cumpleaños hipoalergénica',
      'Gorritos de fiesta personalizados',
      'Sesión de fotos individual y grupal',
      'Bolsas de recuerdos para invitados'
    ]
  },
  {
    id: 'verano',
    title: 'Fiesta de Verano',
    description: 'Refréscate con nuestra temática tropical de verano. Incluye mini piscinas de chapoteo, helados artesanales para perros y un menú ligero.',
    price: 'Desde $200',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600',
    iconName: 'sun',
    bulletPoints: [
      'Mini piscinas con agua filtrada',
      'Helados de caldo de hueso y fruta',
      'Juegos de frisbee y pelotas flotantes',
      'Zona lounge con sombrillas premium'
    ]
  },
  {
    id: 'gala',
    title: 'Gala de Adopción & Bienvenida',
    description: 'Un evento sofisticado para celebrar la llegada de un nuevo miembro a la familia. Incluye cócteles sin alcohol para humanos y canapés caninos gourmet.',
    price: 'Desde $250',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
    iconName: 'award',
    bulletPoints: [
      'Alfombra roja para desfile de mascotas',
      'Accesorios elegantes (pajaritas, pañuelos)',
      'Canapés gourmet de salmón y pavo',
      'Brindis especial con cerveza de perro'
    ]
  },
  {
    id: 'personalizado',
    title: 'Celebración Personalizada',
    description: 'Diseñamos una temática única desde cero según los pasatiempos, juguetes o colores preferidos de tu mejor amigo de cuatro patas.',
    price: 'Cotización Especial',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600',
    iconName: 'sparkles',
    bulletPoints: [
      'Reunión de diseño 1-a-1 con wedding planner de mascotas',
      'Decoración temática coordinada',
      'Menú especial para dietas restrictivas',
      'Regalo exclusivo para el festejado'
    ]
  }
];

export const INITIAL_REQUESTS: EventRequest[] = [
  {
    id: 'req-1',
    clientName: 'María Gómez',
    initials: 'MG',
    petName: 'Bella',
    petSize: 'peq',
    petBreed: 'Mestizo de Maltés',
    eventDate: '2023-10-15',
    eventTheme: 'cumpleanos',
    eventLocation: 'Jardines del Este',
    dogsSmall: 5,
    dogsMedium: 2,
    dogsLarge: 0,
    humansTotal: 10,
    status: 'Finalizado',
    createdAt: '2023-10-01'
  },
  {
    id: 'req-2',
    clientName: 'Juan Pérez',
    initials: 'JP',
    petName: 'Rocky',
    petSize: 'med',
    petBreed: 'Bulldog Francés',
    eventDate: '2023-12-05',
    eventTheme: 'gala',
    eventLocation: 'Domicilio Cliente',
    dogsSmall: 2,
    dogsMedium: 5,
    dogsLarge: 1,
    humansTotal: 15,
    status: 'En Revisión',
    createdAt: '2023-11-20'
  },
  {
    id: 'req-3',
    clientName: 'Ana López',
    initials: 'AL',
    petName: 'Thor',
    petSize: 'gde',
    petBreed: 'Golden Retriever',
    eventDate: '2024-06-25',
    eventTheme: 'verano',
    eventLocation: 'Parque de las Esculturas',
    dogsSmall: 1,
    dogsMedium: 3,
    dogsLarge: 8,
    humansTotal: 25,
    status: 'Aprobado',
    createdAt: '2024-06-10'
  }
];

export const INITIAL_STAFF: Staff[] = [
  {
    id: 1,
    name: 'Roberto C.',
    role: 'Especialista razas grandes',
    initials: 'RC',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'Disponible'
  },
  {
    id: 2,
    name: 'Sofía V.',
    role: 'Cuidados médicos & Nutrición',
    initials: 'SV',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'Disponible'
  },
  {
    id: 3,
    name: 'Diego M.',
    role: 'Handler de eventos & Animador',
    initials: 'DM',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'Disponible'
  },
  {
    id: 4,
    name: 'Camila F.',
    role: 'Fotógrafa & Diseñadora de set',
    initials: 'CF',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'Disponible'
  }
];

// LocalStorage helpers to simulate database operations in a single page application
export function getStoredRequests(): EventRequest[] {
  if (typeof window === 'undefined') return INITIAL_REQUESTS;
  const data = localStorage.getItem('dogsitter_event_requests');
  if (!data) {
    localStorage.setItem('dogsitter_event_requests', JSON.stringify(INITIAL_REQUESTS));
    return INITIAL_REQUESTS;
  }
  return JSON.parse(data);
}

export function saveStoredRequests(requests: EventRequest[]) {
  localStorage.setItem('dogsitter_event_requests', JSON.stringify(requests));
}

export function getStoredStaff(): Staff[] {
  if (typeof window === 'undefined') return INITIAL_STAFF;
  const data = localStorage.getItem('dogsitter_staff');
  if (!data) {
    localStorage.setItem('dogsitter_staff', JSON.stringify(INITIAL_STAFF));
    return INITIAL_STAFF;
  }
  return JSON.parse(data);
}

export function saveStoredStaff(staff: Staff[]) {
  localStorage.setItem('dogsitter_staff', JSON.stringify(staff));
}
