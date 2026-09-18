# NEXUS Intel - AI-Powered Criminal Network Analysis System

## 🔴 Crime Cell Intelligence Platform

**NEXUS Intel** is a sophisticated criminal network analysis system built for law enforcement agencies. The platform leverages AI-powered analytics to visualize complex criminal networks, track investigations, and manage case intelligence in real-time.

---

## 🎨 Design System - Crime Cell Theme

The frontend has been completely redesigned with a **Crime Cell Intelligence Theme** - a dark, professional aesthetic tailored for criminal intelligence operations.

### Color Palette

| Color | Value | Usage |
|-------|-------|-------|
| **Primary Red** | `#ef4444` (0° 90% 50%) | Alerts, active elements, danger indicators |
| **Accent Orange** | `#ea580c` (25° 85% 45%) | Secondary actions, warnings, connections |
| **Background** | `#0a0a0a` (0° 0% 4%) | Main application background |
| **Card Surface** | `#121212` (0° 0% 7%) | Card and panel backgrounds |
| **Border** | `#262626` (0° 0% 15%) | Subtle dividers and edges |
| **Success Green** | `#3caa3c` (120° 60% 45%) | Confirmed data, safe status |
| **Destructive** | `#f87171` (0° 84% 60%) | High-risk alerts |
| **Muted Gray** | `#404040` (0° 0% 25%) | Secondary text, disabled states |

### Typography

- **Font Family**: System fonts (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`)
- **Headings**: Bold, tight tracking, uppercase for labels
- **Body**: Clean, readable with smooth antialiasing
- **Mono**: Used for IDs, case numbers, technical data

### Animations & Effects

#### Pulse Crime Animation
```css
animation: pulse-crime 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```
Used for active alerts, status indicators, and critical elements. Creates a subtle pulsing glow effect.

#### Scan Line Effect
Horizontal gradient sweep across elements on hover, simulating data scanning.

#### Glow Effects
- `shadow-crime-glow`: 20px spread, 30% opacity
- `shadow-crime-glow-lg`: 40px spread, 40% opacity
- Used on critical/warning elements

---

## 📋 Component Overview

### 1. **Sidebar Navigation**
- **Features**: 10 primary navigation sections
- **Active State**: Left border accent + gradient background with glow
- **Icons**: Lucide React icons with hover animations
- **Status Indicator**: Pulsing green dot with "System Operational" status
- **Logo**: NEXUS branding with Shield icon and gradient text

### 2. **TopNav Header**
- **Title Display**: Dynamic page titles with context
- **Search Bar**: 
  - Rounded-full design with animated focus states
  - Real-time entity search with dropdown results
  - Connection count badges
  - Case count indicators
- **Notifications**: Badge counter with animated pulse
- **User Profile**: Analyst info with gradient background

### 3. **KPI Cards**
- **Severity Levels**:
  - `critical`: Bright red glow, animated pulse
  - `warning`: Orange glow with subtle animation
  - `normal`: Subtle gradient, gentle hover effects
- **Features**:
  - Animated number counters
  - Trend indicators (↑ ↓)
  - Icon background glows
  - Scan line effect on hover

### 4. **Data Tables**
- Header styling with secondary background
- Hover state: subtle glow + slight lift
- Row borders with reduced opacity
- Responsive padding adjustments

### 5. **Alert Badges**
- **Variants**: `high`, `medium`, `low`
- **Styles**: Gradient backgrounds + border glows
- **Animation**: Pulsing effect for critical alerts

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Runs on `http://localhost:5173`

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Sidebar.tsx      # Navigation sidebar with crime theme
│   ├── TopNav.tsx       # Header with search and notifications
│   ├── KPICard.tsx      # Severity-aware metric cards
│   ├── NetworkGraph.tsx # Cytoscape network visualization
│   └── EntityDrawer.tsx # Entity detail panel
├── pages/               # Route pages
│   ├── Overview.tsx     # Dashboard
│   ├── NetworkExplorer.tsx
│   ├── Investigations.tsx
│   ├── Entities.tsx
│   ├── Timeline.tsx
│   ├── Alerts.tsx
│   └── AIAnalysis.tsx
├── data/                # Mock data
├── utils/               # Utility functions
├── layouts/             # Layout components
├── App.tsx              # Main router
├── App.css              # Component-specific styles
├── index.css            # Global styles with crime theme
└── main.tsx             # Entry point
```

---

## 🎯 Key Features

### Crime Network Visualization
- Interactive network graph using Cytoscape.js
- Node connections represent criminal relationships
- Real-time filtering and drilling down

### Investigation Management
- Case tracking and timeline visualization
- Entity profiles with connection analysis
- Alert system with severity levels

### AI-Powered Analysis
- Network pattern recognition
- Anomaly detection
- Predictive analytics

### Real-time Alerts
- Activity notifications with 27+ pending alerts
- Severity indicators (critical/warning/normal)
- Glowing badge animations

---

## 🎨 Styling Guidelines

### Tailwind Configuration
Custom color system defined in `tailwind.config.js`:
```js
colors: {
  primary: "hsl(var(--primary))",
  accent: "hsl(var(--accent))",
  destructive: "hsl(var(--destructive))",
  // ... other theme colors
}
```

### CSS Layers
Organized with Tailwind's `@layer` system:
- `base`: Root colors, body styles, scrollbars
- `components`: Reusable component classes
- `utilities`: Custom animations and effects

### Dark Mode
Default dark theme, no light mode toggle (single-mode design for crime intelligence context)

---

## 🔧 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.8 | UI framework |
| Vite | 8.2.2 | Build tool |
| TypeScript | 6.0.2 | Type safety |
| Tailwind CSS | 4.3.3 | Utility-first styling |
| React Router | 7.18.3 | Routing |
| Cytoscape.js | 3.34.3 | Network visualization |
| Recharts | 3.10.1 | Data visualization |
| Lucide React | 1.43.0 | Icons |

---

## 📊 Demo Data

The application uses mock data for demonstration. Sample entities include:
- Suspects with connection networks
- Active investigations
- Case timelines
- Alert logs
- Network relationships

---

## 🔐 Security Notes

**Demo Mode Only**: This is a demonstration application. For production deployment:
- Implement proper authentication (OAuth, SAML)
- Add authorization checks
- Encrypt sensitive data
- Implement audit logging
- Use HTTPS
- Follow law enforcement data handling standards

---

## 🎬 Live Demo

Visit: https://sih-demo-eta.vercel.app

---

## 📝 Recent Design Updates

### Commit: Crime Cell Theme Implementation

#### Files Updated:
1. **src/index.css** - Global styles with crime theme
   - Deep red/orange color scheme
   - Glassmorphism effects
   - Crime-specific CSS utilities
   - Smooth scrollbar with gradient thumb

2. **tailwind.config.js** - Extended theme configuration
   - Custom shadow definitions (`shadow-crime-glow`, `shadow-neon-red`)
   - Animation keyframes (`pulse-crime`, `scan-line`, `data-flow`)
   - Crime-specific color variables

3. **src/App.css** - Component styles
   - KPI card enhancements with severity levels
   - Table styling with hover glows
   - Alert badge variants
   - Timeline component styles
   - Loading and empty states

4. **src/components/Sidebar.tsx** - Navigation redesign
   - Gradient backgrounds
   - Animated nav items with left border accent
   - Enhanced logo with Shield icon
   - Pulsing status indicator

5. **src/components/TopNav.tsx** - Header enhancement
   - Gradient backgrounds with backdrop blur
   - Improved search bar with animated focus
   - Glowing notification badge
   - Enhanced user profile display

6. **src/components/KPICard.tsx** - Metric cards
   - Severity levels (critical/warning/normal)
   - Animated scan line effect
   - Glowing severity indicators
   - Enhanced trend display

---

## 🤝 Contributing

This project is part of Smart India Hackathon 2024 (SIH26189).

---

## 📄 License

Proprietary - Law Enforcement Use Only

---

## 👥 Team

**Project**: SIH26189 - AI-Powered Criminal Network Analysis System
**Developer**: @AdiCodesShit
**Last Updated**: September 2026

---

## 📞 Support

For issues or inquiries about the NEXUS Intel platform, contact the development team through the project repository.
