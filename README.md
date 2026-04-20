# 📚 StudyVault — Intelligent Study Resource Manager & Collaboration Hub

> A production-grade React application for organizing study resources, generating AI-powered quizzes, collaborating in study groups, and tracking study progress.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-Ready-FFCA28?logo=firebase)
![Vite](https://img.shields.io/badge/Vite-v8-646CFF?logo=vite)

---

## 🧠 Problem Statement

University students drown in scattered study materials — PDFs in email, notes in Google Docs, videos on YouTube. They spend **30% of study time just finding materials**. StudyVault provides a single platform to organize resources, auto-generate quizzes from notes, collaborate in study groups, and track progress with rich analytics.

## 🎯 Target Users

- University/college students preparing for exams
- Study groups collaborating on shared materials
- Self-learners following structured curricula

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📚 **Resource Library** | Full CRUD — add, edit, delete, search, filter, sort, rate resources |
| 🧠 **AI Quiz Generator** | Paste notes → built-in NLP engine generates fill-in-blank, T/F, MCQ |
| 👥 **Study Groups** | Create/join groups via invite codes, share resources |
| 📊 **Analytics Dashboard** | Bar charts, line charts, pie charts, circular progress |
| 📅 **Study Planner** | Calendar heatmap, Pomodoro timer, study goals with progress |
| 🔐 **Authentication** | Signup/login with protected routes |
| 🌗 **Dark/Light Mode** | System-aware theme with manual toggle |
| 📱 **Fully Responsive** | Mobile-first with bottom navigation |

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (Vite) |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| State | Context API + Custom Hooks |
| Auth & DB | Firebase-ready (localStorage fallback) |
| Charts | Recharts |
| Animations | Framer Motion |
| Icons | React Icons |
| Notifications | React Toastify |

### Folder Structure

```
src/
├── config/          # Firebase configuration
├── context/         # AuthContext, ThemeContext, ResourceContext
├── hooks/           # 7 custom hooks
├── components/
│   ├── ui/          # Reusable: Button, Modal, StatCard, etc.
│   ├── layout/      # Sidebar, Header, Layout, MobileNav
│   ├── auth/        # LoginForm, SignupForm, ProtectedRoute
│   ├── resources/   # ResourceCard, Grid, Form, Filters
│   ├── groups/      # GroupCard, GroupForm, MemberList
│   ├── quiz/        # QuizGenerator, QuizCard, QuizResults, QuizHistory
│   └── planner/     # StudyCalendar, GoalCard, TimerWidget
├── pages/           # 10 lazy-loaded pages
├── utils/           # Constants, helpers, quizEngine (AI)
├── App.jsx          # Root with routing
└── main.jsx         # Entry point
```

---

## ⚛️ React Concepts Used

### Core
- `useState`, `useEffect`, Props, Component composition
- Conditional rendering, Lists & keys

### Intermediate
- Controlled components (all forms)
- Lifting state up (filters, timer)
- Context API (3 global contexts)
- React Router (12+ routes, nested layouts)

### Advanced
- `useMemo` — filtered resource lists, analytics calculations
- `useCallback` — event handlers passed to children
- `useRef` — timer intervals
- `React.lazy` + `Suspense` — all pages lazy-loaded
- Performance optimization throughout

---

## 🧩 Custom Hooks

| Hook | Purpose |
|------|---------|
| `useAuth` | Authentication state & methods |
| `useResources` | Resource CRUD operations |
| `useGroups` | Study group CRUD + join/leave |
| `useQuiz` | Quiz generation, answering, scoring, history |
| `useDebounce` | Debounced search input (300ms) |
| `useLocalStorage` | Persistent local state |
| `useStudyTimer` | Pomodoro timer with session tracking |

---

## 🤖 AI Quiz Engine (Standout Feature)

The quiz generator uses a **built-in NLP engine** (no external API needed):

1. **Tokenizes** text into sentences
2. **Extracts key terms** using TF-IDF–inspired scoring
3. **Detects definitions** (pattern matching: "X is Y", "X refers to Y")
4. **Generates 3 question types**: Fill-in-the-blank, True/False, Multiple Choice
5. **Scores & reviews** answers with detailed feedback

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
cd "EndTerm Project"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Firebase Setup (Optional)

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Copy your config to `.env`:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000:web:000
```

> **Note:** The app works perfectly without Firebase using localStorage as the data layer.

---

## 🌐 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the dist/ folder to Netlify
```

---

## 📊 Database Schema

```
users/{uid}         → displayName, email, avatar, subjects, stats
resources/{id}      → title, type, subject, tags, rating, userId
groups/{id}         → name, members[], inviteCode, subject
quizzes/{id}        → questions[], score, percentage, userId
studySessions/{id}  → subject, duration, date, type
goals/{id}          → title, targetHours, completedHours, isCompleted
```

---

## 🎬 Demo Video Script (3–5 min)

1. **Intro (30s):** "StudyVault is an intelligent study platform that..."
2. **Landing Page (30s):** Show the animated landing, features, responsive design
3. **Auth Flow (30s):** Sign up → login → protected routes
4. **Resources (60s):** Add resource → search/filter/sort → edit → delete
5. **AI Quiz (60s):** Paste notes → generate → take quiz → see results
6. **Groups (30s):** Create group → invite code → join
7. **Planner (30s):** Timer → calendar heatmap → goals
8. **Analytics (30s):** Charts, stats, progress tracking
9. **Wrap-up (30s):** Dark mode toggle, tech stack recap

---

## 🎤 Viva Preparation — Q&A

### Q1: Why did you choose Context API over Redux?
**A:** Context API is built into React and ideal for this scale. Redux adds boilerplate without proportional benefit for 3 global state slices. We use `useMemo` to prevent unnecessary re-renders.

### Q2: How does the AI Quiz Engine work?
**A:** It uses NLP techniques: sentence tokenization, TF-IDF–inspired key-term extraction, definition pattern matching, and question generation (fill-blank, T/F, MCQ). All runs in the browser with zero API calls.

### Q3: Why lazy loading?
**A:** `React.lazy` + `Suspense` splits each page into separate chunks, reducing initial bundle size. Users only download code for pages they visit.

### Q4: How do you handle state management?
**A:** Three-layer approach: `AuthContext` for user state, `ThemeContext` for theme, `ResourceContext` for resources. Local state for forms and UI. Custom hooks abstract the logic.

### Q5: Explain useCallback and useMemo usage.
**A:** `useCallback` wraps event handlers passed to children (e.g., `handleDelete`) to prevent child re-renders. `useMemo` computes filtered/sorted resource lists only when dependencies change.

### Q6: How is the app responsive?
**A:** Tailwind responsive prefixes (`sm:`, `lg:`), a sidebar that collapses to a drawer on mobile, and a bottom navigation bar for mobile users.

### Q7: What is the data flow?
**A:** User Action → Component → Custom Hook → Service Layer → localStorage. Context providers bridge global state. Hooks encapsulate all business logic.

### Q8: How do you handle auth and protected routes?
**A:** `AuthContext` manages user state. `ProtectedRoute` component checks `user` — redirects to `/login` if null, shows content if authenticated. Session persists via localStorage.

### Q9: What performance optimizations did you implement?
**A:** Lazy loading (code splitting), `useMemo` for expensive computations, `useCallback` for stable references, debounced search, and Framer Motion's `AnimatePresence` for efficient animations.

### Q10: How would you scale this with Firebase?
**A:** Replace localStorage calls in service layer with Firestore operations. Add `onSnapshot` for real-time updates. Use Firebase Auth instead of localStorage-based auth. The architecture is already designed for this swap.

---

## 📝 License

Academic project — MIT License.
