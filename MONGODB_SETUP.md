# MongoDB Setup Guide for Ariella Adventures

## ✨ Migration Complete!

Your project has been successfully migrated from **SQLite to MongoDB** with full Mongoose ODM integration.

---

## 🚀 Getting Started

### 1. Install MongoDB

**Option A: Local MongoDB Installation**
- **Windows**: Download from [mongodb.com/try/download/community](https://mongodb.com/try/download/community)
- **Mac**: `brew install mongodb-community`
- **Linux**: `sudo apt-get install mongodb`

**Option B: MongoDB Atlas (Cloud)**
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string

### 2. Set Environment Variables

Create a `.env.local` file in your project root:

```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/ariella-adventures

# OR MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ariella-adventures?retryWrites=true&w=majority
```

### 3. Start Development Server

```bash
npm run dev
```

The app will:
- ✅ Connect to MongoDB
- ✅ Auto-create collections
- ✅ Seed initial data (if empty)
- ✅ Ready for API requests

---

## 📊 What's Changed

### Before (SQLite)
```typescript
import db from './database';
db.prepare('SELECT * FROM packages').all()
```

### After (MongoDB + Mongoose)
```typescript
import Package from './models/Package';
await Package.find()
```

---

## 🗄️ MongoDB Collections

Your MongoDB database will have these collections:

| Collection | Purpose | Documents |
|-----------|---------|-----------|
| **packages** | Travel packages | 3 seeded |
| **testimonials** | Client reviews | 2 seeded |
| **blogposts** | Blog articles | 2 seeded |
| **galleryimages** | Gallery photos | 2 seeded |
| **contactmessages** | Contact form submissions | 0 (user submissions) |

### Example Document Structure

**packages**
```json
{
  "_id": ObjectId("..."),
  "title": "3 Days Queen Elizabeth Safari",
  "location": "Western Uganda",
  "priceUGX": 1200000,
  "priceUSD": 320,
  "duration": "3 Days, 2 Nights",
  "days": 3,
  "nights": 2,
  "includes": ["Transport", "Accommodation", "Game drives"],
  "excludes": ["Personal expenses", "Tips"],
  "featured": true,
  "createdAt": "2026-04-06T10:30:00.000Z",
  "updatedAt": "2026-04-06T10:30:00.000Z"
}
```

---

## 🔌 API Endpoints

All endpoints now use MongoDB with Mongoose validation:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/packages` | GET | Fetch all packages |
| `/api/packages` | POST | Create package |
| `/api/testimonials` | GET | Fetch testimonials |
| `/api/testimonials` | POST | Create testimonial |
| `/api/blog` | GET | Fetch blog posts |
| `/api/blog` | POST | Create blog post |
| `/api/gallery` | GET | Fetch gallery images |
| `/api/gallery` | POST | Upload gallery image |
| `/api/contact` | GET | Get contact messages |
| `/api/contact` | POST | Submit contact form |

### Example API Calls

**Get all packages:**
```bash
curl http://localhost:3001/api/packages
```

**Create a testimonial:**
```bash
curl -X POST http://localhost:3001/api/testimonials \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "John Doe",
    "message": "Great experience!",
    "rating": 5,
    "tripType": "Safari"
  }'
```

**Submit contact form:**
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane",
    "email": "jane@example.com",
    "subject": "Booking inquiry",
    "message": "I would like to book the Queen Elizabeth Safari package."
  }'
```

---

## ✅ Validation Rules

Mongoose automatically validates all data:

### Packages
- `title` - Required, max 100 chars
- `location` - Required, max 100 chars
- `priceUGX` - Required, min 0
- `priceUSD` - Required, min 0
- `duration` - Required, max 50 chars
- `days` - Required, min 1
- `nights` - Required, min 0
- `includes` - Array of strings
- `excludes` - Array of strings

### Testimonials
- `clientName` - Required, max 100 chars
- `message` - Required, min 10 chars
- `rating` - Required, min 1, max 5
- `tripType` - Required, max 50 chars

### Blog Posts
- `title` - Required, max 200 chars
- `slug` - Required, unique, lowercase
- `content` - Required, min 50 chars
- `excerpt` - Required, max 200 chars
- `author` - Required, max 100 chars
- `tags` - Array of strings
- `published` - Boolean, default false

### Gallery Images
- `title` - Required, max 100 chars
- `url` - Required, valid URL
- `category` - Required, one of: safari, beach, group, clients

### Contact Messages
- `name` - Required, max 100 chars
- `email` - Required, valid email format
- `phone` - Optional, max 20 chars
- `subject` - Required, max 200 chars
- `message` - Required, min 10 chars

---

## 📁 File Structure

```
lib/backend/
├── database.ts                 # MongoDB connection
├── initDb.ts                  # Collections & seeding
│
├── models/                    # Mongoose Schemas
│   ├── Package.ts            # Package schema
│   ├── Testimonial.ts        # Testimonial schema
│   ├── BlogPost.ts           # Blog post schema
│   ├── GalleryImage.ts       # Gallery image schema
│   └── ContactMessage.ts     # Contact message schema
│
└── controllers/              # Business logic (legacy)
    ├── PackageController.ts
    ├── TestimonialController.ts
    ├── BlogPostController.ts
    ├── GalleryImageController.ts
    └── ContactMessageController.ts

pages/api/
├── packages.ts              # Uses Package model
├── testimonials.ts          # Uses Testimonial model
├── blog.ts                  # Uses BlogPost model
├── gallery.ts              # Uses GalleryImage model
└── contact.ts              # Uses ContactMessage model
```

---

## 🔐 Connection Security

### Local Development
```env
MONGODB_URI=mongodb://localhost:27017/ariella-adventures
```

### Production (Atlas)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ariella-adventures?retryWrites=true&w=majority
```

**Security Tips:**
- Never commit `.env.local` to git
- Use strong passwords for Atlas
- Enable IP whitelist in Atlas
- Use dedicated database user (not admin)
- Rotate credentials regularly

---

## 🐛 Troubleshooting

### "Cannot find module 'mongoose'"
```bash
npm install mongoose
```

### "Connect ECONNREFUSED 127.0.0.1:27017"
MongoDB not running locally. Start it:
- **Windows**: `mongod` in terminal
- **Mac**: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`

Or use MongoDB Atlas instead.

### "ValidationError: rating: Rating must be at least 1"
Ensure rating is between 1-5:
```json
{ "rating": 5 }  // ✓ Valid
{ "rating": 0 }  // ✗ Invalid
```

### "MongoNetworkError: connect ENOTFOUND"
Check your MongoDB URI in `.env.local`:
```env
# Correct format
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
```

### "Duplicate key error: E11000"
Trying to create blog post with duplicate slug. Slugs must be unique:
```json
{ "slug": "my-first-post" }     // ✓ First time - OK
{ "slug": "my-first-post" }     // ✗ Second time - Error
```

---

## 📚 MongoDB Studio Tools

### Recommended Tools for Visual Exploration

1. **MongoDB Compass** (Official)
   - Download: [mongodb.com/products/compass](https://mongodb.com/products/compass)
   - GUI for exploring data

2. **Atlas Data Explorer** (Web)
   - Built into MongoDB Atlas
   - No installation needed

3. **VS Code Extension**
   - Extension: "MongoDB" by MongoDB
   - Browse collections within VS Code

---

## 💾 Backup & Migration

### Export Data
```bash
mongodump --uri="mongodb://localhost:27017/ariella-adventures" --out backup/
```

### Import Data
```bash
mongorestore --uri="mongodb://localhost:27017/ariella-adventures" backup/
```

---

## 🚀 Production Deployment

### Recommended Platforms

1. **Vercel** (Next.js native)
   - Set `MONGODB_URI` environment variable
   - Auto-connects to MongoDB Atlas

2. **Railway**
   - Simple environment variable setup
   - MongoDB add-on available

3. **Heroku** (via Railway)
   - Set `MONGODB_URI` config var
   - Works with MongoDB Atlas

### Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] IP whitelist configured (allow 0.0.0.0/0 for testing)
- [ ] `MONGODB_URI` environment variable set
- [ ] Database user created (not admin)
- [ ] Data seeding works (check logs)
- [ ] API endpoints respond with data
- [ ] Error handling tested

---

## 📊 Performance Tips

### Indexing
```javascript
// Create index on frequently queried fields
db.packages.createIndex({ "featured": 1, "createdAt": -1 })
db.blogposts.createIndex({ "slug": 1 })
```

### Pagination
```typescript
const page = req.query.page || 1;
const limit = 10;
const skip = (page - 1) * limit;

const packages = await Package.find()
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });
```

### Caching
Consider adding Redis for frequently accessed data:
```typescript
// Check cache first, then database
```

---

## 🎓 Next Steps

1. **Local Testing**
   - Start MongoDB: `mongod`
   - Start dev server: `npm run dev`
   - Test API endpoints

2. **Production Setup**
   - Create MongoDB Atlas cluster
   - Set environment variables
   - Deploy to Vercel/Railway

3. **Advanced Features**
   - Add authentication
   - Implement pagination
   - Add image uploads
   - Create admin dashboard

---

## 📝 Example: Creating a Custom Query

```typescript
// In a model file
const getPopularPackages = async () => {
  return await Package.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(5);
};

// In an API route
export default async function handler(req, res) {
  const popular = await getPopularPackages();
  res.status(200).json(popular);
}
```

---

## ✨ Migration Summary

| Feature | SQLite | MongoDB |
|---------|--------|---------|
| **Type** | File-based | Cloud/Local DB |
| **Scalability** | Limited | Excellent |
| **Flexibility** | Rigid schema | Flexible documents |
| **Performance** | Synchronous | Asynchronous |
| **Cloud Ready** | No | Yes |
| **Transactions** | Limited | Full support |
| **Real-time Updates** | No | With subscriptions |

---

## 🎉 You're All Set!

Your MongoDB migration is complete! 

**Next steps:**
1. Create `.env.local` with MongoDB URI
2. Run `npm run dev`
3. Check API endpoints at `http://localhost:3001/api/*`
4. Deploy when ready!

**Questions?** Check MongoDB docs: [docs.mongodb.com](https://docs.mongodb.com)

---

**Built with ❤️ using Next.js + MongoDB + Mongoose**
