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

**ByteSpace** is a modern, high-performance e-learning platform crafted with pixel-perfect visual fidelity to original Figma designs. It bridges passionate learners with world-class course creators through dynamic catalogs, interactive course breakdowns, real-time enrollment management, creator analytics, and secure authentication.

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

## ✨ Key Features & User Experience

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
- **Auth Required Gatekeeper Modal**: When an unauthenticated visitor clicks *"Enroll Now"*, an interactive modal informs them that an account is required with instant *"Sign In to Enroll"* and *"Create an Account"* action buttons.
- **Interactive Social Share Modal**: Share courses effortlessly with 1-click triggers for WhatsApp, X (Twitter), LinkedIn, Facebook, Web Share API, and an auto-copyable link input with visual feedback.

### 4. Enrolled Courses Management & Quick-Access Drawer (`/enrolled-courses`)
- **Sign-Out Right-Side History Icon**: Dedicated quick-access drawer trigger located right next to the user profile avatar and sign-out button in the top navigation bar, with a real-time badge count of enrolled courses.
- **Slide-Over Interactive Drawer (`EnrolledCoursesDrawer.jsx`)**: Instant slide-over drawer displaying enrolled courses, instructor details, progress indicators, category badges, and quick links.
- **Unenroll / Delete Action Confirmation Modal**: Allows learners to remove courses directly from either the slide-over drawer or the full `/enrolled-courses` dashboard, with a confirmation modal (`"Are you sure you want to unenroll?"`), immediate local state updates, and backend synchronization (`DELETE /api/enrollments/:id`).

### 5. Creator Profile & Directory (`/creators`, `/creator-profile`)
- **Creator Catalog (`/creators`)**: 6-card responsive pagination engine showcasing instructor profiles, rating scores, follower numbers, active course counts, and topic tags.
- **Dedicated Profile Page (`/creator-profile`)**: Instructor biography, social channels, and taught course catalog.
- **"Create & Manage Courses Easily"** Feature Section: Realistic revenue cards (*Total Revenue $120.29*, *Year to Date $1,200.38*, and *Happy Students 4.5 ★ with 2K+ students*).

### 6. Sign-Out Confirmation Action Modal
- **Accidental Logout Prevention**: Clicking Sign Out on desktop or mobile triggers a confirmation action modal in the navigation bar displaying user account details (name, email, avatar) with *"Cancel"* and *"Sign Out"* options, complete with loading states.

### 7. Route Protection & Custom Error Pages
- **401 Unauthorized (`/unauthorized`)**: Custom designed gatekeeper page displayed when accessing credentials-only resources.
- **403 Forbidden (`/forbidden`)**: Permission denial error page with navigation back to safety.
- **Admin Protected Route (`/admin`)**: Example administrative route protected by role-based validation.
- **404 Not Found (`/not-found`)**: Branded custom 404 page with quick navigation back to the catalog.

### 8. Authentication & Cookie Sessions (`/signin`, `/register`)
- **Better Auth Integration**: Clean sign-up and sign-in workflows with password visibility toggles and validation.
- **Cookie Session Strategy**: Configured with `cookieCache` (JWT strategy, 7-day maxAge) for persistent, secure user sessions.

### 9. Robust Fallback & Offline Resilience
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
│   │   │   ├── (auth)/                 # Route group for signin & register
│   │   │   │   ├── signin/             # Sign-in page
│   │   │   │   └── register/           # Registration page
│   │   │   ├── admin/                  # Protected administrative dashboard
│   │   │   ├── courses/                # Catalog (/courses) & dynamic details (/courses/[id])
│   │   │   ├── creators/               # Creator directory with 6-card pagination
│   │   │   ├── creator-profile/        # Instructor bio & courses showcase
│   │   │   ├── enrolled-courses/       # User enrolled courses management dashboard
│   │   │   ├── unauthorized/           # 401 Unauthorized error page
│   │   │   ├── forbidden/              # 403 Forbidden error page
│   │   │   ├── not-found.js            # Custom 404 page
│   │   │   └── page.js                 # Homepage root
│   │   ├── components/                 # Modular, reusable React components
│   │   │   ├── Auth/                   # Sign-in & register form components
│   │   │   ├── CourseDetails/          # CourseDetailsPage, syllabus, reviews & share modal
│   │   │   ├── Courses/                # CourseCard, catalog grid, filtering & pagination
│   │   │   ├── Creators/               # CreatorsCatalogPage, CreatorCard & CreatorProfilePage
│   │   │   ├── EnrolledCourses/        # EnrolledCoursesDrawer & EnrolledCoursesPage
│   │   │   ├── ErrorPages/             # UnauthorizedSection & ForbiddenSection
│   │   │   ├── Features/               # Growth & creator analytics feature blocks
│   │   │   ├── Hero/                   # MainVisual, CourseInfoCard, progress cards & shapes
│   │   │   └── Navbar.jsx & Footer.jsx # Navigation with drawer toggle, signout modal & footer
│   │   └── lib/                        # api.js (data layer) & auth-client.js
│   └── package.json
│
└── byte-space-server/                  # Express.js REST API Server
    ├── data/                           # courses.json, creators.json, categories.json, enrollments.json
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
| `GET` | `/api/courses/:id` | Fetch single course details by numeric ID, slug, or ObjectId |
| `GET` | `/api/creators` | List creators with pagination (`page`, `limit`), search, and sorting |
| `GET` | `/api/creators/:id` | Fetch creator details along with attributed courses |
| `GET` | `/api/categories` | Get featured and catalog category taxonomies |
| `POST` | `/api/enrollments` | Enroll an authenticated user in a course (with duplicate prevention) |
| `GET` | `/api/enrollments` | Fetch enrolled courses for a user by `userEmail` or `userId` |
| `DELETE` | `/api/enrollments/:id` | Unenroll/remove course by enrollment ID or course ID |
| `POST` | `/api/seed` | Programmatically reset and seed MongoDB collections from JSON files |

---

## 📱 Responsive & Cross-Browser Design

- **Mobile First**: Fluid layouts tailored for small screens (360px+), tablets (768px+), laptops (1024px+), and ultrawide desktops (1440px+).
- **Tested Across**: Modern versions of Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge.
- **Fast Performance**: Sub-second initial load times with Next.js Turbopack image optimization and preloaded assets.

---

## 📄 License & Attribution

Developed with ❤️ as part of the **Doin Tech Application Assessment**.  
All design assets and trademarks belong to their respective creators.
