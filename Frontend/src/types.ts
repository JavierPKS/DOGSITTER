/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EventRequest {
  id: string;
  clientName: string;
  initials: string;
  petName: string;
  petSize: string; // 'peq' | 'med' | 'gde'
  petBreed?: string;
  eventDate: string;
  eventTheme: string; // 'cumpleanos' | 'verano' | 'gala' | 'personalizado'
  eventLocation: string;
  dogsSmall: number;
  dogsMedium: number;
  dogsLarge: number;
  humansTotal: number;
  status: 'Finalizado' | 'En Revisión' | 'Aprobado' | 'Rechazado';
  createdAt: string;
}

export interface Staff {
  id: number;
  name: string;
  role: string;
  initials: string;
  avatar?: string;
  status: 'Disponible' | 'Asignado';
}

export interface ThemePackage {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  iconName: string;
  bulletPoints: string[];
}
