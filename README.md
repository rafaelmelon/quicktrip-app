# QuickTrip App

Cross-platform mobile app for **QuickTrip**, a travel route planner. Built with React Native and Expo — runs on iOS, Android, and web from a single codebase.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.76 + Expo SDK 52 |
| Language | TypeScript 5 |
| Navigation | Expo Router 4 (file-based routing) |
| State | Zustand 5 (auth) + TanStack Query 5 (server state) |
| Maps | react-native-maps (Google Maps) |
| Secure storage | expo-secure-store (JWT tokens) |
| Location | expo-location |
| Icons | @expo/vector-icons (Ionicons) |

## Features

- **Authentication** — Login/Signup with JWT (access + refresh tokens stored securely)
- **Explore** — Interactive map with user location
- **My Routes** — View, manage, and delete saved routes
- **Route Detail** — Map with origin/destination/stops, polyline, notes
- **Places** — Bookmarked favorite places
- **Notes** — Add/delete freeform notes to routes
- **Profile** — View account info, log out

## Architecture

```
app/                    # Expo Router file-based routes
├── _layout.tsx         # Root layout (QueryClient, auth init)
├── index.tsx           # Entry redirect (auth check)
├── (auth)/             # Auth group (login, signup)
├── (tabs)/             # Main tabs (explore, routes, places, profile)
└── route/[id].tsx      # Route detail screen

src/
├── components/         # Reusable UI (Button, Input, RouteCard, PlaceCard, EmptyState)
├── constants/          # Theme tokens (colors, spacing, typography)
├── services/           # API client with auto token refresh
│   ├── api.ts          # Core fetch wrapper + secure token storage
│   ├── auth.ts         # Login, signup, logout, getMe
│   ├── routes.ts       # Route CRUD
│   ├── places.ts       # Place CRUD
│   └── notes.ts        # Note CRUD
├── stores/             # Zustand stores
│   └── auth.store.ts   # Auth state (user, login, logout, initialize)
└── types/              # Shared TypeScript interfaces
```

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **Expo CLI**: `npm install -g expo-cli` (or use `npx expo`)
- **Expo Go** app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Running **quicktrip-api** backend (see [quicktrip-api repo](https://github.com/rafaelmelon/quicktrip-api))

### 1. Clone & install

```bash
git clone https://github.com/rafaelmelon/quicktrip-app.git
cd quicktrip-app
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Set `EXPO_PUBLIC_API_URL` to your running backend:

| Scenario | Value |
|---|---|
| iOS Simulator | `http://localhost:3000/api` |
| Android Emulator | `http://10.0.2.2:3000/api` |
| Physical device (same Wi-Fi) | `http://<your-ip>:3000/api` |

### 3. Start the development server

```bash
npx expo start
```

Then:
- Press **i** for iOS simulator
- Press **a** for Android emulator
- Scan the QR code with **Expo Go** on your phone

### 4. Demo login

If you seeded the backend, use:
- Email: `demo@quicktrip.dev`
- Password: `demo1234`

## Google Maps Setup

Maps require a Google Maps API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable **Maps SDK for Android** and **Maps SDK for iOS**
3. Create an API key (restrict it to your bundle identifiers)
4. Add it to `app.json` under `ios.config.googleMapsApiKey` and `android.config.googleMaps.apiKey`
5. Add it to `.env` as `EXPO_PUBLIC_GOOGLE_MAPS_KEY`

For development with Expo Go, maps work without a key on iOS (Apple Maps fallback). On Android, you need a valid key.

## Building for Production

### Using Expo EAS (Free tier)

```bash
npm install -g eas-cli
eas login
eas build --platform all
```

This generates `.ipa` (iOS) and `.apk`/`.aab` (Android) files.

### Local builds

```bash
npx expo run:ios       # Requires Xcode
npx expo run:android   # Requires Android Studio
```

## Project Structure Decisions

| Decision | Why |
|---|---|
| **Expo Router** (file-based) | Follows React Router / Next.js conventions, typed routes |
| **Zustand** for auth | Lightweight, no boilerplate, works well with async |
| **TanStack Query** for data | Caching, background refetch, optimistic updates |
| **expo-secure-store** for tokens | Encrypted storage (Keychain on iOS, EncryptedSharedPrefs on Android) |
| **Centralized api.ts** | Auto token refresh, consistent error handling |

## License

MIT
