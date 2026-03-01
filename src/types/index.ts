export type TransportMode = "walking" | "transit" | "taxi";

export const INTEREST_OPTIONS = [
  { id: "unesco", label: "UNESCO Sites", icon: "earth" },
  { id: "architecture", label: "Architecture", icon: "business" },
  { id: "nature", label: "Nature & Parks", icon: "leaf" },
  { id: "gastronomy", label: "Gastronomy", icon: "restaurant" },
  { id: "museums", label: "Museums", icon: "color-palette" },
  { id: "religious", label: "Religious Sites", icon: "star" },
  { id: "history", label: "History", icon: "book" },
  { id: "nightlife", label: "Nightlife", icon: "moon" },
] as const;

export const TRANSPORT_OPTIONS = [
  { id: "walking" as TransportMode, label: "Walking", icon: "walk", description: "Best for exploring at your own pace" },
  { id: "transit" as TransportMode, label: "Public Transport", icon: "bus", description: "Cover more ground efficiently" },
  { id: "taxi" as TransportMode, label: "Taxi / Rideshare", icon: "car", description: "Fastest and most comfortable" },
] as const;

export interface User {
  id: string;
  email: string;
  username: string;
  onboardingCompleted: boolean;
  transportMode: TransportMode;
  interests: string[];
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
  category?: string;
  rating?: number;
  description?: string;
  placeId?: string;
}

export interface TripRoute {
  id: string;
  userId: string;
  name: string;
  category: string;
  transportMode: TransportMode;
  estimatedMinutes: number;
  departureTime: string;
  arrivalTime: string;
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
  transportMode: TransportMode;
  estimatedMinutes: number;
  departureTime: string;
  arrivalTime: string;
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

export interface OnboardingInput {
  transportMode: TransportMode;
  interests: string[];
}
