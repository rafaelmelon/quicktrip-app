export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RouteStop {
  id: string;
  routeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  photoUrl?: string;
  position: number;
}

export interface TripRoute {
  id: string;
  userId: string;
  name: string;
  category: string;
  estimatedMinutes: number;
  originName: string;
  originLat: number;
  originLng: number;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  stops: RouteStop[];
  notes?: Note[];
  _count?: { notes: number };
  createdAt: string;
}

export interface Place {
  id: string;
  userId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  photoUrl?: string;
  category?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  routeId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRouteInput {
  name: string;
  category: string;
  estimatedMinutes: number;
  originName: string;
  originLat: number;
  originLng: number;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  stops?: Omit<RouteStop, "id" | "routeId">[];
}

export interface CreatePlaceInput {
  name: string;
  address: string;
  lat: number;
  lng: number;
  photoUrl?: string;
  category?: string;
}
