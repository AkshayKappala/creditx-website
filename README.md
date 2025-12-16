<div align="center">

# 💳 CreditX Platform Website

### Modern Showcase Website for Enterprise Credit Management Platform

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=github)](https://akshaykappala.github.io/creditx-website/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[View Live Demo](https://akshaykappala.github.io/creditx-website/) • [Report Bug](https://github.com/AkshayKappala/creditx-website/issues) • [Request Feature](https://github.com/AkshayKappala/creditx-website/issues)

</div>

---

## 🎯 What is CreditX Website?

**CreditX Website** is a modern, responsive showcase website designed to present the **CreditX Platform** - an enterprise-grade microservices-based credit management system.  This website serves as the digital storefront, explaining the platform's capabilities in credit operations including main credit services, promotional credits, credit holds, and settlement processing.

### Why This Project Exists

The CreditX platform comprises multiple sophisticated backend microservices (Main Service, Promo Service, Hold Service, and Posting Service). This website bridges the gap between complex technical architecture and business stakeholders, providing: 

- 🎨 **Visual representation** of platform capabilities
- 📱 **Responsive design** for all devices
- ⚡ **Fast loading** with modern web technologies
- 🧩 **Component-based architecture** for easy updates
- 🚀 **GitHub Pages deployment** for zero-cost hosting

---

## ✨ Features

- **Modern UI/UX** - Built with Material-UI and Radix UI components
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- **Interactive Components** - Carousels, accordions, dialogs, and more
- **Fast Performance** - Powered by Vite for lightning-fast builds
- **Type-Safe** - TypeScript for robust development
- **Dark Mode Ready** - Theme switching capabilities with next-themes
- **Animation Support** - Smooth transitions with Framer Motion
- **Component Library** - Extensive Radix UI primitives for accessible UI

---

## 🛠️ Tech Stack

### Core Technologies

```json
{
  "Frontend Framework": "React 18.3.1",
  "Build Tool": "Vite 6.4.1",
  "Styling": "TailwindCSS 4.1.12",
  "Language": "TypeScript",
  "Component Library": "Material-UI 7.3.5 + Radix UI",
  "Animation": "Framer Motion 12.23.24",
  "Icons": "React Icons 5.5.0 + MUI Icons"
}
```

### Key Dependencies

| Package | Purpose |
|---------|---------|
| `@mui/material` | Material Design components |
| `@radix-ui/*` | Accessible UI primitives |
| `motion` | Animation library |
| `tailwindcss` | Utility-first CSS framework |
| `react-slick` | Carousel functionality |
| `react-hook-form` | Form management |
| `recharts` | Data visualization |
| `next-themes` | Theme management |

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed: 
- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/AkshayKappala/creditx-website.git

# Navigate to project directory
cd creditx-website

# Install dependencies
npm install
# or if using pnpm
pnpm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/creditx-website/`

### Production Build

Build the optimized production bundle:

```bash
npm run build
```

The built files will be generated in the `dist/` directory, ready for deployment.

---

## 📁 Project Structure

```
creditx-website/
├── src/
│   ├── app/              # Application components and pages
│   ├── styles/           # Global styles and CSS
│   └── main.tsx          # Application entry point
├── public/               # Static assets (favicon, images)
├── dist/                 # Production build output
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── postcss.config.mjs    # PostCSS configuration
├── package.json          # Project dependencies
└── . gitignore           # Git ignore rules
```

### Configuration Files

**`vite.config.ts`** - Vite build configuration with GitHub Pages base path: 

```typescript
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/creditx-website/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias:  {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**`index.html`** - Entry HTML file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CreditX</title>
    <link rel="icon" type="image/svg+xml" href="%BASE_URL%favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main. tsx"></script>
  </body>
</html>
```

---

## 🎨 Customization Guide

### Updating Content

The website content is component-based.  Navigate to `src/app/` to modify:

1. **Styling**: Edit Tailwind classes or create custom CSS in `src/styles/`
2. **Components**:  Modify React components in `src/app/`
3. **Assets**: Add images/icons to `public/` directory

### Theme Customization

The project uses TailwindCSS v4 with Vite plugin: 

```bash
# Tailwind classes are available throughout the project
# Customize theme in Tailwind configuration
```

### Adding New Components

```tsx
// Example: Creating a new feature component
import { Card } from '@/components/ui/card'

export function FeatureCard() {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold">New Feature</h3>
      <p>Description of the feature</p>
    </Card>
  )
}
```

---

## 🌐 Deployment

### GitHub Pages (Current Setup)

The site is automatically configured for GitHub Pages deployment: 

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Commit the dist folder** (if not gitignored):
   ```bash
   git add dist
   git commit -m "Build for deployment"
   git push origin master
   ```

3. **Configure GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Source: Deploy from branch `master`
   - Folder: `/` (root) or `/dist`
   - Save changes

Your site will be live at:  `https://akshaykappala.github.io/creditx-website/`

### Alternative Deployment Options

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

#### Custom Server

```bash
# Build the project
npm run build

# Serve the dist folder with any static file server
npx serve dist
```

---

## 🔧 Troubleshooting

### Issue: Assets not loading on GitHub Pages

**Solution**: Ensure `base` path is correctly set in `vite.config.ts`:
```typescript
base: '/creditx-website/',
```

### Issue: Development server not starting

**Solution**: Clear cache and reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Build errors with TypeScript

**Solution**: Ensure TypeScript is properly configured.  Check for type errors:
```bash
npx tsc --noEmit
```

### Issue: Styling not applied

**Solution**:  Verify TailwindCSS plugin is loaded in `vite.config.ts`:
```typescript
plugins: [react(), tailwindcss()]
```

---

## 🔗 Related Repositories

The CreditX Platform consists of multiple microservices:

- 🏗️ [creditx](https://github.com/creditx-platform/creditx) - Root repository
- 💼 [creditMainServ](https://github.com/creditx-platform/creditMainServ) - Main credit service (Java)
- 🎁 [creditPromoServ](https://github.com/creditx-platform/creditPromoServ) - Promotional credit service (Java)
- 🔒 [creditHoldServ](https://github.com/creditx-platform/creditHoldServ) - Credit hold management (Java)
- 💰 [creditPostingServ](https://github.com/creditx-platform/creditPostingServ) - Settlement service (Java)

---

## 📝 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build production-ready bundle |

---

## 📄 License

This project is private and proprietary to the CreditX platform. 

---

## 👤 Contact & Support

**Developer**:  Akshay Kappala  
**GitHub**: [@AkshayKappala](https://github.com/AkshayKappala)

- 🐛 **Bug Reports**: [Open an issue](https://github.com/AkshayKappala/creditx-website/issues)
- 💡 **Feature Requests**: [Submit a request](https://github.com/AkshayKappala/creditx-website/issues)
- 📧 **Contact**: Open an issue for direct communication

---

<div align="center">

### ⭐ Star this repository if you find it useful! 

**Built with ❤️ for the CreditX Platform**

[🔝 Back to Top](#-creditx-platform-website)

</div>
