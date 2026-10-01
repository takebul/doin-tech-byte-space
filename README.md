# ByteSpace — Modern Digital Learning & Course Platform

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ByteSpace-0047FF?style=for-the-badge&logo=vercel&logoColor=white)](https://byte-space-black.vercel.app)
[![Client Repository](https://img.shields.io/badge/GitHub-Client%20Repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/takebul/doin-tech-byte-space)
[![Server Repository](https://img.shields.io/badge/GitHub-Server%20Repo-24292e?style=for-the-badge&logo=github&logoColor=white)](https://github.com/takebul/doin-tech-byte-space-server)

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.7-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Express 5](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47a248?style=flat-square&logo=mongodb)](https://www.mongodb.com/atlas)
[![Better Auth](https://img.shields.io/badge/Better_Auth-JWT_Cookie-orange?style=flat-square)](https://better-auth.com/)

**ByteSpace** is a modern, high-performance e-learning web platform crafted with pixel-perfect visual fidelity to original Figma designs. It bridges passionate learners with world-class course creators through dynamic catalogs, interactive course breakdowns, creator analytics, and secure authentication.

[Explore Live Demo](https://byte-space-black.vercel.app) • [Client Repo](https://github.com/takebul/doin-tech-byte-space) • [Server Repo](https://github.com/takebul/doin-tech-byte-space-server)

</div>

---

## 📌 Project Links

| Resource | Link |
|---|---|
| 🌐 **Live Website** | [https://byte-space-black.vercel.app](https://byte-space-black.vercel.app) |
| 💻 **Frontend Repository** | [https://github.com/takebul/doin-tech-byte-space](https://github.com/takebul/doin-tech-byte-space) |
| ⚙️ **Backend Repository** | [https://github.com/takebul/doin-tech-byte-space-server](https://github.com/takebul/doin-tech-byte-space-server) |

---

## ✨ Key Features

### 1. Hero & Signature Visual Composition
- **Authentic Figma Hero Composition**: Centered around a modern student model, floating information cards, and dynamic lime accents (`#cbfc01`).
- **Interactive Course Card**: Displays authentic course metadata (*"Learn Figma from Basic"*, *"by purepearl studio"*, rating `4.5 ★`, `Beginner` badge with 3-bar optical signal, student avatar stack with `26+`, and `$25/lifetime`).
- **Floating Learning Stats**: Real-time progress metric card (`55%`) with bright lime progress indicators and 3D floating doodle shapes.

### 2. Comprehensive Course Catalog (`/courses`)
- **18 Diverse Courses**: Rich dataset covering *UI/UX Design, Graphic Design, Web Development, Data Science, AI & Machine Learning, Marketing, Business & Finance, and Photography*.
- **Real-Time Live Search**: Instant filtering across course titles, instructors, and descriptions.
- **Category Filter Badges**: Quickly toggle between featured topics with dynamic count badges.
- **Level & Sorting Controls**: Filter by difficulty (*Beginner, Intermediate, Advanced*) and sort by *Most Popular, Highest Rated, Newest, or Price*.
- **Pagination Engine**: Smooth client-side pagination supporting responsive viewports.

### 3. Deep Course Details Experience (`/courses/[id]`)
- **Dynamic Routing**: Dedicated pages for each course by ID or slug.
- **Curriculum & Syllabus Breakdown**: Expandable modular sections with lesson titles, durations, and free preview badges.
- **Learning Outcomes**: Structured *"What You Will Learn"* checklist for clear expectations.
- **Instructor Showcase**: Instructor avatar, bio, credentials, and course counts.
- **Verified Student Reviews**: Community ratings, review commentary, and timestamp badges.
- **Sticky Enrollment Sidebar**: Transparent pricing breakdown, money-back guarantee, and instant enrollment triggers.

### 4. Creator Profile & Analytics (`/creator-profile`, `/creators`)
- Dedicated instructor hub showcasing creator biographies, social channels, and taught courses.
- **"Create & Manage Courses Easily"** Feature Section: Realistic revenue cards (*Total Revenue $120.29*, *Year to Date $1,200.38*, and *Happy Students 4.5 ★ with 2K+ students*).

### 5. Authentication & Cookie Sessions (`/signin`, `/register`)
- **Better Auth Integration**: Clean sign-up and sign-in workflows with password visibility toggles and validation.
- **Cookie Session Strategy**: Configured with `cookieCache` (JWT strategy, 7-day maxAge) for persistent, secure user sessions.

### 6. Robust Fallback & Offline Resilience
- **Dual-Layer Data Fetching**: The frontend connects to the MongoDB Atlas REST API (`http://localhost:5000/api/courses`), but embeds a synchronized fallback dataset so all features remain functional even if the backend is temporarily offline.

---

## 🛠️ Tech Stack Breakdown

### Frontend (Client)
- **Framework**: [Next.js 16.3.7](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Authentication**: [Better Auth](https://better-auth.com/) Client with cookie session management
- **Icons & Assets**: Lucide Icons, Heroicons, and optimized SVG/PNG assets

### Backend (Server)
- **Runtime & Framework**: [Node.js](https://nodejs.org/) & [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (via official native `mongodb` 7 driver)
- **Middleware**: `cors`, `dotenv`
- **Seeding Script**: Automated database seeder pipeline (`seed.js`)

---

## 📁 Project Architecture

```
doin-tech-project/
├── byte-space/                         # Next.js 16 Frontend Application
│   ├── public/                         # Optimized image assets, course graphics & 3D doodles
│   ├── src/
│   │   ├── app/                        # Next.js App Router pages
│   │   │   ├── courses/                # Catalog (/courses) & dynamic details (/courses/[id])
│   │   │   ├── creators/               # Creator directory & profile routes
│   │   │   ├── signin/ & register/     # Authentication pages
│   │   │   ├── not-found.js            # Custom 404 page
│   │   │   └── page.js                 # Homepage root
│   │   ├── components/                 # Modular, reusable React components
│   │   │   ├── Auth/                   # Sign-in & register form sections
│   │   │   ├── CourseDetails/          # Syllabus, reviews, video player & sidebar
│   │   │   ├── Courses/                # CourseCard, catalog grid, filtering & pagination
│   │   │   ├── Creators/               # Creator profile cards & course tabs
│   │   │   ├── Features/               # Growth & creator analytics feature blocks
│   │   │   ├── Hero/                   # MainVisual, CourseInfoCard, progress cards & shapes
│   │   │   └── Navbar.jsx & Footer.jsx # Global navigation & footer
│   │   └── lib/                        # api.js (data layer) & auth-client.js
│   └── package.json
│
└── byte-space-server/                  # Express.js REST API Server
    ├── data/                           # courses.json, creators.json, categories.json
    ├── index.js                        # Express server & API route handlers
    ├── seed.js                         # MongoDB Atlas automated seeder script
    ├── .env.example                    # Environment variable template
    └── package.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.18+ or v20+
- **npm** or **yarn** / **pnpm**
- **MongoDB Atlas** account (or local MongoDB connection URI)

---

### Step 1: Clone the Repositories

```bash
# Clone the client repository
git clone https://github.com/takebul/doin-tech-byte-space.git

# Clone the server repository
git clone https://github.com/takebul/doin-tech-byte-space-server.git
```

---

### Step 2: Set Up & Run the Server

```bash
cd byte-space-server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

Edit `.env` with your MongoDB credentials:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
DB_NAME=byte-space
CLIENT_ORIGIN=http://localhost:3000
```

Seed the database and start the API:
```bash
# Seed initial courses, creators, and categories
node seed.js

# Start server in development mode
npm run dev
# Server runs on: http://localhost:5000
```

---

### Step 3: Set Up & Run the Client

```bash
cd ../byte-space

# Install dependencies
npm install

# Start Next.js development server
npm run dev
# Client runs on: http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Step 4: Validate Production Build

```bash
cd byte-space
npm run build
```
*(Next.js will build all static and dynamic pages with 0 errors).*

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/courses` | Fetch courses with optional `search`, `category`, `level`, `sort`, `page`, `limit` |
| `GET` | `/api/courses/:idOrSlug` | Fetch single course details by numeric ID or slug |
| `GET` | `/api/creators` | List creators and instructor profiles |
| `GET` | `/api/creators/:id` | Fetch creator details with attributed courses |
| `GET` | `/api/categories` | Get featured and catalog category taxonomies |

---

## 📱 Responsive & Cross-Browser Design

- **Mobile First**: Fluid layouts tailored for small screens (360px+), tablets (768px+), laptops (1024px+), and ultrawide desktops (1440px+).
- **Tested Across**: Modern versions of Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge.
- **Fast Performance**: Sub-second initial load times with Next.js Turbopack image optimization and preloaded assets.

---

## 📄 License & Attribution

Developed with ❤️ as part of the **Doin Tech Application Assessment**.  
All design assets and trademarks belong to their respective creators.
