# Overview

This is a modern todo application built with Next.js 15, React 19, and TypeScript. The application provides a clean, responsive interface for managing tasks with full CRUD operations (Create, Read, Update, Delete). Users can add new todos, mark them as complete, edit existing tasks inline, and delete unwanted items. The app uses a contemporary design system powered by shadcn/ui components and Tailwind CSS for styling.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application follows Next.js 15's App Router architecture with React Server Components support. The main todo functionality is implemented as a client-side component using React hooks for state management.

**Key Design Decisions:**
- **Client-Side State Management**: Uses React's built-in `useState` hooks for managing todos, edit states, and form inputs. This approach was chosen for simplicity since the app doesn't require complex state sharing or persistence yet.
- **Component Structure**: Follows a single-page application pattern with the main todo logic in `src/app/page.tsx`, keeping the initial implementation straightforward and contained.
- **TypeScript Integration**: Full TypeScript support with strict type checking enabled, providing better developer experience and code reliability.

## UI/UX Framework
The application leverages shadcn/ui as the primary component library, built on top of Radix UI primitives and Tailwind CSS.

**Design System Choices:**
- **shadcn/ui Components**: Provides accessible, customizable UI components (Button, Input, Card) with consistent styling and behavior.
- **Tailwind CSS v4**: Uses the latest version with CSS custom properties and modern color system (oklch) for better color management.
- **Radix UI Primitives**: Ensures accessibility compliance and robust component behavior out of the box.
- **Lucide Icons**: Comprehensive icon library for consistent visual elements (Trash2, Edit2, Check, X, Plus).

## Styling Architecture
- **CSS Custom Properties**: Uses CSS variables for dynamic theming and consistent color management.
- **Utility-First Approach**: Tailwind CSS provides rapid development with utility classes while maintaining design consistency.
- **Component Variants**: Uses `class-variance-authority` for systematic component styling variations.
- **Font Management**: Implements Next.js font optimization with Geist font family for improved performance and typography.

## Development Environment
- **Next.js 15**: Latest version with improved performance and developer experience features.
- **React 19**: Cutting-edge React features for modern component development.
- **TypeScript 5**: Strong typing system with modern JavaScript features and excellent IDE support.
- **Hot Reloading**: Development server with instant updates disabled for a cleaner development experience.

# External Dependencies

## Core Framework Dependencies
- **Next.js 15.5.2**: Full-stack React framework providing routing, server-side rendering, and build optimization
- **React 19.1.0 & React DOM**: Latest React library with concurrent features and improved performance
- **TypeScript 5**: Static type checking and modern JavaScript features

## UI Component Libraries
- **@radix-ui/react-slot**: Primitive component for building flexible, composable UI components
- **shadcn/ui components**: Pre-built accessible components (implied by components.json configuration)
- **Lucide React 0.542.0**: Modern icon library with React components
- **class-variance-authority**: Utility for building type-safe component variants
- **clsx & tailwind-merge**: Utilities for conditional CSS class management

## Styling Framework
- **Tailwind CSS 4**: Utility-first CSS framework with modern features and performance improvements
- **tw-animate-css**: Enhanced animation utilities for Tailwind
- **@tailwindcss/postcss**: PostCSS integration for Tailwind CSS processing

## Development Tools
- **@types/node, @types/react, @types/react-dom**: TypeScript definitions for Node.js and React ecosystem
- **PostCSS**: CSS transformation and optimization tools

## Font Integration
- **next/font**: Next.js font optimization system
- **Geist & Geist Mono**: Modern font families optimized for web interfaces

The application is currently self-contained with no external APIs, databases, or third-party services, making it ideal for demonstration and further development.