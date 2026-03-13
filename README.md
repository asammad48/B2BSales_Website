# Buyer Public Website Structure

This is a strong starter structure for the public e-commerce style buyer website.

## Stack
- React
- TypeScript
- React Router
- Centralized theme tokens
- Repository layer over generated NSwag client
- Public storefront + login-aware behavior

## Important placement
Put the generated NSwag file here:
- `src/api/generated/apiClient.ts`

## Environment
Create `.env` in project root:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## API methods expected from generated client
- `public(...)` -> public products list
- `public2(id)` -> public product detail
- `theme()` -> public theme data
- `login(body)` -> login
- `me()` -> current user info

## Core rule
Pages must never call `apiClient` directly. Pages call repositories. Repositories call generated methods.
