# Imperial Tours Qatar (ITQ) – Tourism & Travel Booking Platform

A modern, production-ready full-stack tourism and travel booking website for **Imperial Tours Qatar (ITQ)**, selling desert safaris, dhow cruises, city tours, water sports, and bespoke cultural journeys across Qatar.

---

## 🌟 Brand Identity & Luxury Design
- **Brand**: Imperial Tours Qatar (ITQ)
- **Base Location**: State of Qatar (Doha)
- **Currency**: Qatari Riyal (QAR)
- **Design Aesthetic**: Premium royal gold, Qatar maroon (`#8A1538`), desert sand, and deep obsidian slate.
- **Typography**: Serif headlines (*Playfair Display*) with modern clean interface type (*Plus Jakarta Sans*).
- **Interactive Experience**: Dynamic pricing engine, live group size recalculation, prefilled WhatsApp concierge integration, and full administrative back-office.

---

## 🛠️ Mandatory Technology Stack

### Frontend
- **Framework**: React.js 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + custom luxury color palette and gradients
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM (v7)
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios with automated bearer token interception
- **Forms & Validation**: React Hook Form + Zod validation

### Backend
- **Runtime**: Node.js + Express.js + TypeScript
- **Database ORM**: Prisma ORM with SQLite (local development) / PostgreSQL (production ready)
- **Authentication**: JWT (JSON Web Tokens) + BCrypt password hashing
- **Security**: Helmet, CORS origin restriction, Express rate limiting

---

## 📂 Project Structure

```
imperial-tours-qatar/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Prisma relational schema
│   │   ├── seed.ts             # Complete database seed with all 25 tours
│   │   └── dev.db              # SQLite development database
│   ├── src/
│   │   ├── config/             # Environment, Database, and JWT config
│   │   ├── controllers/        # Auth, Tour, Booking, Category, Content controllers
│   │   ├── middleware/         # Auth, validation, error handler
│   │   ├── routes/             # REST API routes
│   │   ├── utils/              # Pricing engine, slugify, booking ref generator
│   │   ├── validators/         # Zod schemas for input validation
│   │   ├── app.ts              # Express application setup
│   │   └── server.ts           # Server bootstrap
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   │   ├── logo.svg            # Custom ITQ luxury crest icon
│   │   ├── robots.txt          # SEO robots configuration
│   │   └── sitemap.xml         # XML Sitemap covering all 25 tours
│   ├── src/
│   │   ├── assets/             # Brand logos and imagery
│   │   ├── components/
│   │   │   ├── common/         # Logo, SearchFilterBar, WhatsAppButton
│   │   │   ├── layout/         # Luxury Navbar, Mega Dropdowns, Footer
│   │   │   └── tours/          # TourCard with dynamic pricing
│   │   ├── layouts/
│   │   │   ├── CustomerLayout.tsx  # Customer portal shell
│   │   │   └── AdminLayout.tsx     # Admin dashboard shell with navigation
│   │   ├── pages/
│   │   │   ├── customer/       # Home, All Tours, Details, Checkout, Confirmation, About, Contact, FAQs, Legal
│   │   │   └── admin/          # Overview, Tours, Pricing, Bookings, Customers, Settings, Reports, Profile
│   │   ├── routes/             # ProtectedRoute guard for admin
│   │   ├── services/           # Axios API services
│   │   ├── store/              # Redux Toolkit store & slices
│   │   ├── types/              # Comprehensive TypeScript interfaces
│   │   ├── utils/              # Centralized dynamic pricing calculation & QAR formatters
│   │   ├── App.tsx             # Master router
│   │   ├── index.css           # Tailwind directives & luxury styling
│   │   └── main.tsx            # React application entry
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── README.md
```

---

## 📋 Complete Tour Catalogue (All 25 Tours Implemented)

### Category A: Desert Safari Tours
1. **Half Day Desert Safari**: 1p: 700 QAR | 2p: 400 QAR/p | 3–4p: 275 QAR/p | 5–6p: 200 QAR/p
2. **Full Day Desert Safari**: 1p: 1,000 QAR | 2p: 600 QAR/p | 3p: 400 QAR/p | 4p: 350 QAR/p | 5p: 325 QAR/p
3. **Overnight Safari Tour**: 1p: 1,400 QAR | 2p: 775 QAR/p | 3p: 575 QAR/p | 4p: 475 QAR/p | 5p: 450 QAR/p
4. **Half Day Safari With Aquarium**: 1p: 1,050 QAR | 2p: 550 QAR/p | 3p: 400 QAR/p | 4p: 300 QAR/p | 5p: 250 QAR/p
5. **Full Day Safari With Romantic Dinner**: 2 persons: 2,250 QAR total (Fixed Group Package)
6. **Night Safari With Bonfire (20:00–00:00)**: 1p: 800 QAR | 2p: 450 QAR/p | 3p: 330 QAR/p | 4p: 275 QAR/p | 5p: 230 QAR/p

### Category B: Water Sports & Adventure
7. **Scuba Diving**: 1p: 1,400 QAR | 2p: 1,250 QAR/p | 3p: 1,200 QAR/p | 4p: 1,175 QAR/p | 5p: 1,150 QAR/p
8. **Horse Riding Tour (50 mins)**: 1p: 800 QAR | 2p: 500 QAR/p | 3p: 450 QAR/p | 4p: 400 QAR/p | 5p: 350 QAR/p
9. **Quad Bike Tour**: 1p: 1,200 QAR | 2p: 850 QAR/p | 3p: 735 QAR/p | 4p: 675 QAR/p | 5p: 640 QAR/p
10. **Jet Ski Tour (Safliya Island)**: 1–2 persons: 1,200 QAR total
11. **Kayaking Tour (Mangroves)**: 1p: 1,000 QAR | 2p: 600 QAR/p | 3p: 450 QAR/p | 4p: 430 QAR/p | 5p: 420 QAR/p
12. **Water Sports Tour (Speedboat, Banana, Doughnut)**: 1–5 persons: 2,800 QAR total (Fixed Group Package)

### Category C: Cruise Tours
13. **Dhow Cruise Tour**: 1p: 1,000 QAR | 2p: 600 QAR/p | 3p: 400 QAR/p
14. **Dhow Cruise With Dinner (BBQ)**: 1p: 1,200 QAR | 2p: 650 QAR/p | 3p: 500 QAR/p | 4p: 400 QAR/p | 5p: 350 QAR/p

### Category D: City & Cultural Tours
15. **Museum Tour (NMOQ, MIA, Msheireb)**: 1p: 800 QAR | 2p: 450 QAR/p | 3p: 335 QAR/p | 4p: 275 QAR/p | 5p: 240 QAR/p
16. **Doha City Tour**: 1p: 1,000 QAR | 2p: 600 QAR/p | 3p: 400 QAR/p | 4p: 300 QAR/p | 5p: 240 QAR/p
17. **City Tour With Lunch**: 1p: 900 QAR | 2p: 520 QAR/p | 3p: 400 QAR/p | 4p: 350 QAR/p | 5p: 300 QAR/p
18. **City Tour From Sea & Land (4 Hours)**: 1p: 1,400 QAR | 2p: 750 QAR/p | 3p: 600 QAR/p | 4p: 500 QAR/p | 5p: 400 QAR/p
19. **City Tour Speedboat**: 1p: 1,150 QAR | 2p: 600 QAR/p | 3p: 500 QAR/p | 4p: 400 QAR/p | 5p: 300 QAR/p
20. **Grand Doha City Tour**: 1p: 850 QAR | 2p: 475 QAR/p | 3p: 375 QAR/p | 4p: 350 QAR/p | 5p: 300 QAR/p
21. **North Of Qatar Tour (Historical Trip)**: 1p: 1,000 QAR | 2p: 525 QAR/p | 3p: 400 QAR/p | 4p: 350 QAR/p | 5p: 300 QAR/p
22. **Cultural Tour**: 1p: 1,000 QAR | 2p: 550 QAR/p | 3p: 400 QAR/p | 4p: 350 QAR/p | 5p: 300 QAR/p
23. **West Coast Tour**: 1p: 900 QAR | 2p: 490 QAR/p | 3p: 350 QAR/p | 4p: 300 QAR/p | 5p: 260 QAR/p
24. **North Of Qatar With Kayak Tour**: 1p: 1,400 QAR | 2p: 800 QAR/p | 3p: 600 QAR/p | 4p: 550 QAR/p | 5p: 520 QAR/p
25. **Camel Race Tour**: 1p: 850 QAR | 2p: 625 QAR/p | 3p: 580 QAR/p | 4p: 550 QAR/p | 5p: 525 QAR/p

---

## ⚡ Dynamic Pricing Rules
1. **Tiered per-person calculation**: Selected number of guests matches the exact bracket stored in PostgreSQL/Prisma.
2. **Fixed package pricing**: Special tours (Water Sports Tour, Romantic Safari Dinner) charge a flat package total rather than multiplying per person.
3. **No invented prices**: When group size falls outside configured tiers, the platform explicitly displays *"Contact us for group pricing"* and opens custom inquiry routing.

---

## 🔐 Admin Authentication Credentials
- **URL**: `http://localhost:5173/admin/login`
- **Default Email**: `admin@imperialtours.qa`
- **Default Password**: `changeme123`

---

## 🚀 How to Run the Project

### 1. Backend Server
```bash
cd imperial-tours-qatar/backend
pnpm install
npx prisma generate
npx prisma db push
npx tsx src/prisma/seed.ts
npx tsx src/server.ts
```
Backend runs on `http://localhost:5000`. Health check at `http://localhost:5000/api/health`.

### 2. Frontend Application
```bash
cd imperial-tours-qatar/frontend
pnpm install
pnpm run dev
```
Customer website runs on `http://localhost:5173`.
Admin console accessible at `http://localhost:5173/admin`.
Production build: `pnpm run build`.

---

## 🛡️ Quality Assurance Verification
- [x] All 25 tours appear correctly with official descriptions and imagery.
- [x] Exact pricing tiers seeded in database.
- [x] Inclusions and exclusions rendered accurately.
- [x] Dynamic pricing recalculation verified on guest count change.
- [x] Fixed group pricing (Water Sports, Romantic Dinner) handled properly.
- [x] Unique booking references (`ITQ-...`) generated.
- [x] Status workflow (`pending`, `approved`, `rejected`, `cancelled`, `completed`) implemented.
- [x] Admin console with pricing tier editor, booking manager, customer profiles, and reports.
- [x] Protected admin routes with JWT session security.
- [x] Production build passes cleanly with zero TypeScript errors.
