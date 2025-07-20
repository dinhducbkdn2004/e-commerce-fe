# E-Commerce Frontend - Architecture

Modern React/TypeScript e-commerce frontend with layered architecture and feature-based organization.

## 🏗️ Architecture Overview

### **Layered Architecture**

- **Presentation**: Components, Pages, Layouts
- **Business Logic**: Services, Hooks
- **Data Access**: API client, Storage
- **Infrastructure**: Config, Constants

### **Feature-Based Organization**

```
src/features/auth/
├── components/     # Auth-specific UI
├── hooks/         # Auth state & logic
└── index.ts       # Feature exports
```

## 📁 Core Structure

```
src/
├── api/           # HTTP client & endpoints
├── components/    # Reusable UI components
├── config/        # Environment & settings
├── constants/     # App constants
├── features/      # Feature modules (auth, etc.)
├── hooks/         # Global hooks
├── layouts/       # Layout components
├── pages/         # Route pages
├── services/      # Business logic
├── types/         # TypeScript definitions
└── utils/         # Helper functions
```

## 🔧 Path Aliases

```typescript
// Clean imports with aliases
import { Button } from '@/components'
import { useAuth } from '@features/auth'
import { API_ENDPOINTS } from '@constants'
```

Available aliases: `@/*`, `@components/*`, `@features/*`, `@hooks/*`, `@services/*`, `@types/*`, `@api/*`, `@config/*`, `@utils/*`, `@constants/*`, `@layouts/*`, `@pages/*`

## � Key Folders

**`/api`** - HTTP client, endpoints, interceptors
**`/features`** - Self-contained feature modules
**`/services`** - Business logic & API integration
**`/types`** - TypeScript definitions
**`/utils`** - Pure helper functions

## 🚀 Development

```bash
npm run dev        # Start development
npm run build      # Production build
npm run lint       # Code linting
```

## 🔐 Environment Setup

```env
VITE_BASE_URL=http://localhost:3000
VITE_BASE_URL_API=http://localhost:3000/api/v1
```

## � Adding Features

1. Create folder in `/src/features/[feature-name]`
2. Add components, hooks, services as needed
3. Export from feature `index.ts`
4. Add shared types to `/src/types`

## 🎯 Code Guidelines

- **TypeScript** for type safety
- **Feature isolation** for modularity
- **Layered separation** for maintainability
- **Path aliases** for clean imports
