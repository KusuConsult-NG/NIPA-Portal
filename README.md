# NIPA Portal

A comprehensive Next.js application for the **National Institute for Policy, Strategy and Leadership Course Association (NIPA)** member portal.

## 🚀 Features

### Pages
- **Landing Page** (`/`) - Public homepage with dark theme
- **Member Dashboard** (`/dashboard`) - Member overview with sidebar
- **Member Directory** (`/directory`) - Searchable member database
- **Payments** (`/payments`) - Dues calculator and transaction history
- **Elections** (`/elections`) - Voting and candidate management
- **Admin Dashboard** (`/admin`) - System management interface
- **Welfare Dashboard** (`/welfare`) - Birthday and member care tracking
- **Messages** (`/messages`) - Real-time messaging center

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Plus Jakarta Sans, Public Sans
- **Icons**: Material Symbols Outlined

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## ⚠️ Requirements

- **Node.js**: >= 20.9.0
- **npm**: >= 8.0.0

## 🎨 Design System

### Colors
- **Primary**: `#22C55E` (Green)
- **Secondary**: `#6366F1` (Indigo)
- **Navy**: `#0B1120` (Dark backgrounds)
- **Accent**: `#10B981` (Emerald)

### Components Library

Import components from `@/components`:

```typescript
import { Button, Badge, Card, Avatar, Input } from '@/components';
```

#### Button
```tsx
<Button variant="primary" size="md" icon="add">
  Add Member
</Button>
```

#### Badge
```tsx
<Badge variant="success" dot>Active</Badge>
```

#### Card
```tsx
<Card variant="elevated" padding="lg">
  <h3>Content</h3>
</Card>
```

#### StatCard
```tsx
<StatCard
  title="Total Members"
  value="1,240"
  icon="group"
  trend={{ value: "2.5%", isPositive: true }}
/>
```

#### Avatar
```tsx
<Avatar name="John Doe" size="lg" status="online" />
```

#### Input
```tsx
<Input
  label="Email"
  icon="mail"
  placeholder="Enter email"
/>
```

## 🛠 Utils

```typescript
import { formatCurrency, formatDate, getRelativeTime } from '@/lib/utils';

formatCurrency(5000);        // "₦5,000"
formatDate(new Date());       // "Jan 12, 2026"
getRelativeTime(yesterday);   // "1 day ago"
```

## 📝 Types

TypeScript interfaces for all data models are available in `lib/types.ts`:

```typescript
import type { Member, Payment, Event } from '@/lib/types';
```

## 🏗 Project Structure

```
/
├── app/                    # Next.js pages
│   ├── page.tsx           # Landing
│   ├── dashboard/         # Member dashboard
│   ├── directory/         # Members list
│   ├── payments/          # Payment system
│   ├── elections/         # Elections center
│   ├── admin/             # Admin panel
│   ├── welfare/           # Welfare dashboard
│   └── messages/          # Messaging
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   └── layout/           # Layout components
├── lib/                  # Utilities & types
└── public/               # Static assets
```

## 🎯 Development

### Adding a New Page

1. Create file in `app/[page-name]/page.tsx`
2. Use existing components from `@/components`
3. Follow NIPA design system colors and spacing

### Creating Components

1. Add to `components/ui/` or `components/layout/`
2. Export from `components/index.ts`
3. Use TypeScript for props typing

## 🌐 Deployment

```bash
# Build the application
npm run build

# Test production build locally
npm start
```

Deploy to Vercel, Netlify, or any Node.js hosting platform.

## 📄 License

© 2024 National Institute for Policy, Strategy and Leadership Course Association

---

**Built with** ❤️ **for NIPA Members**
