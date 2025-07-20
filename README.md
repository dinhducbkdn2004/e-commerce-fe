# E-Commerce Frontend

A modern e-commerce frontend application built with React, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Code Quality**: ESLint + Prettier

## 📦 Features

- 🌙 **Dark/Light Theme**: Toggle between themes with persistent storage
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🔥 **Fast Development**: Vite with React Fast Refresh
- 🛡️ **Type Safety**: Full TypeScript integration
- 🎨 **Modern UI**: Clean and intuitive user interface
- 📂 **Path Aliases**: Clean imports with @ prefix

## 🛠️ Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**

   Create a `.env` file:

   ```env
   VITE_BASE_URL=http://localhost:3000
   VITE_BASE_URL_API=http://localhost:3000/api/v1
   ```

3. **Start development**

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` in your browser.

## 📚 Scripts

| Script               | Description              |
| -------------------- | ------------------------ |
| `npm run dev`        | Start development server |
| `npm run build`      | Build for production     |
| `npm run preview`    | Preview production build |
| `npm run lint`       | Run ESLint               |
| `npm run type-check` | TypeScript checking      |

## 📁 Project Structure

```
src/
├── api/             # API client & endpoints
├── components/      # Reusable UI components
├── config/          # Configuration files
├── constants/       # App constants
├── contexts/        # React contexts
├── features/        # Feature-based modules
├── hooks/           # Custom hooks
├── layouts/         # Layout components
├── pages/           # Page components
├── services/        # Business logic
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## 🎨 Styling & Themes

- **Tailwind CSS v4** with custom configuration
- **Dark/Light Mode** with persistent storage
- **Responsive Design** with mobile-first approach
- **Custom Components** with consistent styling

## 🔧 Development

### Code Quality

- **Auto-formatting** with Prettier on save
- **Linting** with ESLint for React + TypeScript
- **Type Safety** with strict TypeScript configuration
- **Path Aliases** for clean imports (`@/components/Button`)

### Environment Variables

```env
# API Configuration
VITE_BASE_URL=http://localhost:3000
VITE_BASE_URL_API=http://localhost:3000/api/v1

# Add other variables as needed
```

## 📖 Documentation

- 📋 **[Architecture Guide](./ARCHITECTURE.md)** - Detailed project structure and patterns
- 🏗️ **Layered Architecture** - Clean separation of concerns
- 🎯 **Feature-based Organization** - Modular development approach

## 🚀 Deployment

1. **Build for production**

   ```bash
   npm run build
   ```

2. **Deploy** the `dist/` folder to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` and `npm run type-check`
5. Submit a pull request

---

Built with ❤️ using React + TypeScript + Tailwind CSS
