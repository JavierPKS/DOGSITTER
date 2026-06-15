export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Inactive';
  description: string;
  ingredients: Ingredient[];
}

export interface EventRequest {
  id: string;
  title: string;
  status: 'Pending' | 'Approved' | 'Declined';
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  requesterTier: string;
  requesterAvatar: string;
  date: string;
  time: string;
  location: string;
  dogs: number;
  humans: number;
  cakeType: string;
  pupcakes: number;
  meatballs: number;
  humanFood: 'finger_food' | 'sliders';
  includeAlcohol: boolean;
  specialNotes?: string;
  dietaryAlerts?: string;
  venueRequirements?: string;
  medicalStandby?: boolean;
}

export interface UserSession {
  role: 'admin' | 'client';
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Coordinador' | 'Chef Repostero' | 'Auxiliar Canino' | 'Soporte Veterinario' | 'Líder Operativo';
  status: 'Disponible' | 'En Evento' | 'De Licencia' | 'Inactivo';
  email: string;
  phone: string;
  avatarUrl: string;
}

