# Ariella Adventures - Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        SINGLE PORT: 3000                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            NEXT.JS FRONTEND COMPONENTS                  │  │
│  │  ┌──────────┬──────────┬──────────┬──────────┐          │  │
│  │  │  Hero    │ Packages │  Blog    │ Gallery  │ ...      │  │
│  │  └──────────┴──────────┴──────────┴──────────┘          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          NEXT.JS API ROUTES (/api/*)                   │  │
│  │  ┌───────────┬────────────┬────────┬─────────┐         │  │
│  │  │ /packages │ /blog      │ /gallery│ /contact│ ...    │  │
│  │  └───────────┴────────────┴────────┴─────────┘         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │      TYPESCRIPT MONOLITHIC BACKEND (lib/backend)        │  │
│  │                                                          │  │
│  │  ┌───────────────────────────────────────────────────┐  │  │
│  │  │           CONTROLLERS LAYER                       │  │  │
│  │  │  ┌──────────┬──────────┬──────────┬──────────┐   │  │  │
│  │  │  │ Package  │ Blog     │ Gallery  │ Contact  │   │  │  │
│  │  │  │Controller│Controller│Controller│Controller│   │  │  │
│  │  │  └──────────┴──────────┴──────────┴──────────┘   │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  │                      ↓                                    │  │
│  │  ┌───────────────────────────────────────────────────┐  │  │
│  │  │              MODELS LAYER                         │  │  │
│  │  │  ┌──────────┬──────────┬──────────┬──────────┐   │  │  │
│  │  │  │ Package  │ Blog     │ Gallery  │ Contact  │   │  │  │
│  │  │  │  Model   │ Model    │  Model   │  Model   │   │  │  │
│  │  │  └──────────┴──────────┴──────────┴──────────┘   │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  │                      ↓                                    │  │
│  │  ┌───────────────────────────────────────────────────┐  │  │
│  │  │         DATABASE LAYER (database.ts)              │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              SQLITE DATABASE                            │  │
│  │         (data/tourism.db - File Based)                 │  │
│  │  ┌─────────┬────────┬────────┬──────────┬────────┐     │  │
│  │  │ packages│ blogs  │ gallery│testimonials│contact │  │  │
│  │  │ table   │ table  │ table  │  table   │ table  │     │  │
│  │  └─────────┴────────┴────────┴──────────┴────────┘     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

```
Browser Request
    ↓
Next.JS Frontend Component
    ↓
fetch('/api/packages')
    ↓
API Route (/pages/api/packages.ts)
    ↓
Initialize Database (if needed)
    ↓
PackageController.getAll()
    ↓
PackageModel.getAll()
    ↓
SQLite Database Query
    ↓
Parse & Return Formatted Data
    ↓
Response to Frontend
    ↓
Component Updates & Renders
```

## 📦 File Organization

```
project-root/
├── components/                 # React Components
│   ├── Hero.tsx
│   ├── FeaturedPackages.tsx
│   ├── BlogSection.tsx
│   └── ...
├── pages/
│   ├── index.tsx              # Home page
│   └── api/                   # API Routes (Entry Points)
│       ├── packages.ts        # Uses PackageController
│       ├── blog.ts            # Uses BlogPostController
│       ├── gallery.ts         # Uses GalleryImageController
│       ├── testimonials.ts    # Uses TestimonialController
│       └── contact.ts         # Uses ContactMessageController
├── lib/
│   └── backend/               # TypeScript Backend
│       ├── database.ts        # SQLite Configuration
│       ├── initDb.ts          # Schema & Seeding
│       ├── models/            # Data Layer
│       │   ├── Package.ts
│       │   ├── Testimonial.ts
│       │   ├── BlogPost.ts
│       │   ├── GalleryImage.ts
│       │   └── ContactMessage.ts
│       ├── controllers/       # Business Logic
│       │   ├── PackageController.ts
│       │   ├── TestimonialController.ts
│       │   ├── BlogPostController.ts
│       │   ├── GalleryImageController.ts
│       │   └── ContactMessageController.ts
│       ├── routes/           # (Optional expansion)
│       ├── middleware/       # (Optional expansion)
│       └── services/         # (Optional expansion)
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── data/
│   └── tourism.db           # SQLite Database (Auto-created)
├── BACKEND_DOCUMENTATION.md  # Full backend docs
├── BACKEND_SETUP_SUMMARY.md  # Quick reference
└── package.json
```

## 🎯 Model-Controller Pattern

### Controllers (Business Logic)
```typescript
// Example: PackageController
- getAll() → Fetch all packages with validation
- getById(id) → Get single package
- create(data) → Validate and insert new package
- update(id, data) → Validate and update package
- delete(id) → Remove package
```

### Models (Data Persistence)
```typescript
// Example: PackageModel
- Direct database operations using SQLite
- Uses prepared statements for safety
- Handles all CRUD operations
- Returns formatted data
```

## 🔐 Data Flow with Types

```
Request
  ↓
Controller (receives request data)
  ↓
Validate Input (email, rating, categories, etc.)
  ↓
Model Method (executes DB query)
  ↓
Database Operation
  ↓
Format Response
  ↓
Return Typed Response
  ↓
API Route formats for JSON
  ↓
Client receives data
```

## 📊 Database Schema

### Relationships

```
packages
├── id (PK)
├── title
├── location
├── pricing (UGX/USD)
├── duration, days, nights
├── includes (JSON array)
├── excludes (JSON array)
├── featured
└── timestamps

testimonials
├── id (PK)
├── clientName
├── message
├── rating (1-5 validated)
├── tripType
└── createdAt

blog_posts
├── id (PK)
├── title
├── slug (unique, for URLs)
├── content
├── excerpt
├── author
├── tags (JSON array)
├── published (filter)
└── timestamps

gallery_images
├── id (PK)
├── title
├── url
├── category (enum: safari|beach|group|clients)
└── uploadedAt

contact_messages
├── id (PK)
├── name, email, phone
├── subject
├── message
├── responded (boolean)
└── createdAt
```

## 🚀 Deployment Ready

✅ **Single Port Architecture**
- No CORS configuration needed
- Simplified deployment
- No microservice complexity

✅ **Lightweight Database**
- SQLite (file-based)
- No external DB server
- No connection pooling needed

✅ **Type Safe**
- Full TypeScript
- Compile-time error checking
- Better IDE support

✅ **Scalable Structure**
- Easy to add new models
- Controllers can be extended
- Middleware can be added
- Services can be extracted

## 🔄 Extensibility

Future additions are simple:

```
Add New Feature (e.g., Bookings):
1. Create BookingModel in lib/backend/models/
2. Create BookingController in lib/backend/controllers/
3. Create /pages/api/bookings.ts
4. Import and use in component
5. Done! Follows same pattern
```

## 🎓 Technology Choices

| Component | Technology | Why |
|-----------|-----------|-----|
| Database | SQLite | Lightweight, file-based, no setup |
| Backend Lang | TypeScript | Type safety, better tooling |
| Framework | Next.js | Built-in API routes, fullstack |
| Pattern | Model-Controller | Clean separation, easy to test |
| Port | 3000 | Single monolithic application |

## 📈 Performance Considerations

- ✅ SQLite: Fast for small-medium datasets
- ✅ In-memory operations: Controllers don't store state
- ✅ Prepared statements: SQL injection safe
- ✅ No external API calls: Fast local access

---

**This is a production-ready monolithic backend architecture!** 🎉
