# Buyer Public Website

## Overview
A React-based e-commerce storefront (Buyer Public Website) that allows users to browse products, view details, manage a cart, and handle authentication.

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Package Manager**: npm
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM v6
- **API Client**: Axios + NSwag-generated client
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure
- `src/api/` - HTTP client and NSwag-generated `apiClient.ts`
- `src/components/` - Reusable UI components (common/ and product/)
- `src/layouts/` - Layout wrappers (e.g., PublicLayout)
- `src/pages/` - Page components (public/ and shared/)
- `src/repositories/` - Data access layer abstracting API calls
- `src/state/` - React Contexts (Auth, Cart, Currency, Language, Shop)
- `src/styles/` - Global CSS and design tokens
- `src/theme/` - Theme provider and configuration
- `scripts/` - Utility scripts (e.g., generate-api-client.mjs)

## Key Design Patterns
- **Repository Pattern**: Pages use repositories, never the API client directly
- **Path Aliasing**: `@/` maps to `src/`
- **Generated Client**: NSwag generates the API client from a JSON spec

## Environment Variables
- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_SWAGGER_URL` - Swagger JSON URL for API client generation
- `VITE_TENANT_ID` - Tenant identifier

## Development
```bash
npm run dev       # Start dev server on port 5000
npm run build     # TypeScript compile + Vite build
npm run lint      # ESLint
```

## Replit Setup
- Dev server: port 5000, host 0.0.0.0, allowedHosts: true (proxy-friendly)
- Workflow: "Start application" runs `npm run dev`
- Deployment: Static site, build with `npm run build`, serve from `dist/`
