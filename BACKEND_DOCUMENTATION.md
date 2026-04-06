# Ariella Adventures - TypeScript Monolithic Backend

## Architecture Overview

This is a **monolithic TypeScript backend** integrated within the Next.js application, running on a single port (3000). The backend uses the **Model-Controller pattern** for clean separation of concerns.

## Directory Structure

```
lib/backend/
├── database.ts              # Database initialization and configuration
├── initDb.ts               # Database schema initialization & seed data
├── models/                 # Data models and database operations
│   ├── Package.ts
│   ├── Testimonial.ts
│   ├── BlogPost.ts
│   ├── GalleryImage.ts
│   └── ContactMessage.ts
├── controllers/            # Business logic & request handling
│   ├── PackageController.ts
│   ├── TestimonialController.ts
│   ├── BlogPostController.ts
│   ├── GalleryImageController.ts
│   └── ContactMessageController.ts
├── routes/                 # API route handlers (optional future expansion)
├── middleware/             # Request middleware (optional future expansion)
└── services/              # Business services (optional future expansion)
```

## Technology Stack

- **Database**: SQLite (better-sqlite3) - No external DB needed
- **Language**: TypeScript
- **Framework**: Next.js API Routes
- **Pattern**: Model-Controller Pattern

## Installation

### Install Dependencies

```bash
npm install better-sqlite3
```

### Type Definitions (if needed)

```bash
npm install --save-dev @types/better-sqlite3
```

## Database Models

### 1. Package Model
**Table**: `packages`
- id (INTEGER PRIMARY KEY)
- title (TEXT)
- location (TEXT)
- priceUGX (INTEGER)
- priceUSD (INTEGER)
- duration (TEXT)
- days (INTEGER)
- nights (INTEGER)
- includes (JSON)
- excludes (JSON)
- featured (BOOLEAN)
- createdAt (TEXT)
- updatedAt (TEXT)

**Methods**:
- `getAll()` - Get all packages
- `getById(id)` - Get package by ID
- `create(data)` - Create new package
- `update(id, data)` - Update package
- `delete(id)` - Delete package

### 2. Testimonial Model
**Table**: `testimonials`
- id (INTEGER PRIMARY KEY)
- clientName (TEXT)
- message (TEXT)
- rating (INTEGER 1-5)
- tripType (TEXT)
- createdAt (TEXT)

**Methods**:
- `getAll()` - Get all testimonials
- `getById(id)` - Get testimonial by ID
- `create(data)` - Create new testimonial
- `update(id, data)` - Update testimonial
- `delete(id)` - Delete testimonial

### 3. BlogPost Model
**Table**: `blog_posts`
- id (INTEGER PRIMARY KEY)
- title (TEXT)
- slug (TEXT UNIQUE)
- content (TEXT)
- excerpt (TEXT)
- author (TEXT)
- tags (JSON)
- published (BOOLEAN)
- createdAt (TEXT)
- updatedAt (TEXT)

**Methods**:
- `getAll()` - Get all published posts
- `getById(id)` - Get post by ID
- `getBySlug(slug)` - Get post by slug
- `create(data)` - Create new post
- `update(id, data)` - Update post
- `delete(id)` - Delete post

### 4. GalleryImage Model
**Table**: `gallery_images`
- id (INTEGER PRIMARY KEY)
- title (TEXT)
- url (TEXT)
- category (TEXT: 'safari' | 'beach' | 'group' | 'clients')
- uploadedAt (TEXT)

**Methods**:
- `getAll()` - Get all gallery images
- `getByCategory(category)` - Get images by category
- `getById(id)` - Get image by ID
- `create(data)` - Create new image
- `update(id, data)` - Update image
- `delete(id)` - Delete image

### 5. ContactMessage Model
**Table**: `contact_messages`
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT)
- phone (TEXT)
- subject (TEXT)
- message (TEXT)
- responded (BOOLEAN)
- createdAt (TEXT)

**Methods**:
- `getAll()` - Get all messages
- `getUnanswered()` - Get unanswered messages
- `getById(id)` - Get message by ID
- `create(data)` - Create new message
- `markResponded(id)` - Mark message as responded
- `delete(id)` - Delete message

## API Endpoints

### Packages
- `GET /api/packages` - Get all packages
- `POST /api/packages` - Create new package

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create new testimonial

### Blog Posts
- `GET /api/blog` - Get all published blog posts
- `POST /api/blog` - Create new blog post

### Gallery
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Upload new gallery image

### Contact
- `GET /api/contact` - Get all contact messages
- `POST /api/contact` - Submit contact form

## Data Seeding

Initial data is automatically seeded on first application startup. The `initDb.ts` file:
1. Creates all database tables
2. Checks if data exists
3. Seeds initial test data including:
   - 3 featured packages
   - 2 sample testimonials
   - 2 blog posts
   - 2 gallery images

## Controllers

Each controller handles business logic:

```typescript
// Example: PackageController
static getAll() -> { success, data }
static create(data) -> { success, data, status }
static update(id, data) -> { success, data }
static delete(id) -> { success, message }
```

All controllers return consistent response objects:

```typescript
{
  success: boolean;
  data?: any;
  error?: string;
  status?: number;
  message?: string;
}
```

## Database File Location

The SQLite database file is stored at:
```
project_root/data/tourism.db
```

This directory is created automatically on first run.

## Error Handling

The backend includes comprehensive error handling:
- Input validation
- Email validation for contact forms
- Rating validation (1-5)
- Category validation
- Database error logging

## Usage Example

### In API Routes

```typescript
import { initializeDatabase } from '../../lib/backend/initDb';
import { PackageController } from '../../lib/backend/controllers/PackageController';

export default function handler(req, res) {
  if (!dbInitialized) {
    initializeDatabase();
  }
  
  const result = PackageController.getAll();
  if (result.success) {
    return res.status(200).json(result.data);
  }
}
```

### Direct Usage

```typescript
import { PackageModel } from './models/Package';

// Get all packages
const packages = PackageModel.getAll();

// Create new package
const newPackage = PackageModel.create({
  title: 'New Package',
  location: 'Location',
  // ... other fields
});

// Update
PackageModel.update(1, { featured: true });

// Delete
PackageModel.delete(1);
```

## Future Enhancements

1. **Middleware Layer**
   - Authentication middleware
   - Rate limiting
   - Request validation

2. **Services Layer**
   - Email service for notifications
   - Payment processing service
   - Image upload service

3. **Routes Organization**
   - Separate route files for each resource
   - Route middleware
   - Request validation middleware

4. **Advanced Features**
   - Bookings management
   - User authentication
   - Admin dashboard APIs
   - Analytics & reporting

## Single Port Architecture

✅ **All services run on port 3000**:
- Next.js Frontend
- API Routes (/api/*)
- TypeScript Backend (database, models, controllers)

This eliminates cross-origin issues and simplifies deployment!

## Development Notes

- Database is SQLite (file-based, no external server needed)
- Models handle all database operations
- Controllers handle business logic & validation
- API routes are the entry points
- All code is TypeScript for type safety
- Automatic table creation on first run
- Automatic test data seeding

---

**Architecture Pattern**: Model-Controller Pattern
**Database**: SQLite (better-sqlite3)
**Port**: 3000 (Monolithic)
**Language**: TypeScript
