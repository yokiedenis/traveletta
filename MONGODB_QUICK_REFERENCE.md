# MongoDB Quick Reference Card

## 🚀 Quick Start (5 minutes)

### 1. MongoDB Connection
```env
# .env.local
MONGODB_URI=mongodb://localhost:27017/ariella-adventures
# OR
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ariella-adventures
```

### 2. Start MongoDB
```bash
mongod  # Local
# OR use MongoDB Atlas (cloud)
```

### 3. Run App
```bash
npm run dev
```

### 4. Test API
```bash
curl http://localhost:3001/api/packages
```

---

## 📊 Collections & Sample Queries

### Packages Collection
```javascript
// Get all packages
db.packages.find()

// Get featured packages
db.packages.find({ featured: true }).sort({ createdAt: -1 })

// Create package
db.packages.insertOne({
  title: "Safari Tour",
  location: "Bwindi",
  priceUGX: 1500000,
  priceUSD: 400,
  duration: "3 Days, 2 Nights",
  days: 3,
  nights: 2,
  includes: ["Transport", "Food"],
  excludes: ["Tips"],
  featured: true
})

// Update package
db.packages.updateOne(
  { _id: ObjectId("...") },
  { $set: { featured: false } }
)

// Delete package
db.packages.deleteOne({ _id: ObjectId("...") })
```

### Testimonials Collection
```javascript
// Get all testimonials
db.testimonials.find().sort({ createdAt: -1 })

// Get 5-star testimonials
db.testimonials.find({ rating: 5 })

// Create testimonial
db.testimonials.insertOne({
  clientName: "Sarah",
  message: "Amazing experience!",
  rating: 5,
  tripType: "Safari"
})

// Count testimonials by rating
db.testimonials.aggregate([
  { $group: { _id: "$rating", count: { $sum: 1 } } }
])
```

### Blog Posts Collection
```javascript
// Get published posts
db.blogposts.find({ published: true }).sort({ createdAt: -1 })

// Get post by slug
db.blogposts.findOne({ slug: "travel-tips" })

// Create blog post
db.blogposts.insertOne({
  title: "10 Tips for Traveling",
  slug: "10-tips-traveling",
  content: "Long content here...",
  excerpt: "Short excerpt",
  author: "John Doe",
  tags: ["travel", "tips"],
  published: true
})

// Get posts with specific tag
db.blogposts.find({ tags: "travel", published: true })
```

### Gallery Images Collection
```javascript
// Get all images
db.galleryimages.find()

// Get images by category
db.galleryimages.find({ category: "safari" })

// Create image
db.galleryimages.insertOne({
  title: "Safari Adventure",
  url: "/gallery/safari-1.jpg",
  category: "safari"
})

// Count images by category
db.galleryimages.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
])
```

### Contact Messages Collection
```javascript
// Get all messages
db.contactmessages.find().sort({ createdAt: -1 })

// Get unanswered messages
db.contactmessages.find({ responded: false })

// Create contact message
db.contactmessages.insertOne({
  name: "Jane",
  email: "jane@example.com",
  subject: "Booking inquiry",
  message: "I'd like to book a package",
  responded: false
})

// Mark as responded
db.contactmessages.updateOne(
  { _id: ObjectId("...") },
  { $set: { responded: true } }
)
```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/packages` | Get all packages |
| POST | `/api/packages` | Create package |
| GET | `/api/testimonials` | Get testimonials |
| POST | `/api/testimonials` | Create testimonial |
| GET | `/api/blog` | Get blog posts |
| POST | `/api/blog` | Create blog post |
| GET | `/api/gallery` | Get gallery images |
| POST | `/api/gallery` | Create gallery image |
| GET | `/api/contact` | Get contact messages |
| POST | `/api/contact` | Submit contact form |

---

## 📝 API Examples

### GET /api/packages
```bash
curl http://localhost:3001/api/packages
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "3 Days Queen Elizabeth Safari",
    "location": "Western Uganda",
    "priceUGX": 1200000,
    "priceUSD": 320,
    ...
  }
]
```

### POST /api/testimonials
```bash
curl -X POST http://localhost:3001/api/testimonials \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "John",
    "message": "Incredible experience!",
    "rating": 5,
    "tripType": "Safari"
  }'
```

### POST /api/contact
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Booking inquiry",
    "message": "I would like to book the safari package."
  }'
```

---

## 🛠️ Common Operations

### Check MongoDB Connection
```typescript
import connectDB from './lib/backend/database'

// In API route
await connectDB()
```

### Get Data from React Component
```typescript
import { useEffect, useState } from 'react'

export default function MyComponent() {
  const [packages, setPackages] = useState([])

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => setPackages(data))
  }, [])

  return <div>{packages.length} packages</div>
}
```

### Create Data from React
```typescript
const handleSubmit = async (data) => {
  const response = await fetch('/api/packages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  console.log(result)
}
```

---

## ✅ Validation Rules

### All Models Validate:
- ✅ Required fields (missing = 400 error)
- ✅ Type checking (wrong type = 400 error)
- ✅ Min/max constraints
- ✅ Enum validation
- ✅ Email format
- ✅ String length

### Examples:
- Package rating: Must be 1-5
- BlogPost slug: Must be unique
- GalleryImage category: Must be safari|beach|group|clients
- ContactMessage email: Must be valid email format

---

## 🔍 MongoDB Compass (Visual Tool)

**Download:** [mongodb.com/products/compass](https://mongodb.com/products/compass)

**Connect to local:**
```
mongodb://localhost:27017
```

**Connect to Atlas:**
```
mongodb+srv://user:pass@cluster.mongodb.net/ariella-adventures
```

---

## 📊 Database Statistics

```javascript
// Show database stats
db.stats()

// Show collections
show collections

// Show collection size
db.packages.stats()

// Count documents
db.packages.countDocuments()

// Show indexes
db.packages.getIndexes()
```

---

## 🐛 Error Handling

### Common Errors & Solutions

| Error | Cause | Fix |
|-------|-------|-----|
| ECONNREFUSED | MongoDB not running | Start with `mongod` |
| E11000 | Duplicate key | Use unique value |
| ValidationError | Invalid data | Check field types |
| 404 Not Found | Resource missing | Verify ID exists |
| 400 Bad Request | Invalid request | Check request format |

---

## 📈 Performance Tips

### Add Indexes
```javascript
// Index frequently queried fields
db.packages.createIndex({ featured: 1, createdAt: -1 })
db.blogposts.createIndex({ slug: 1 })
db.testimonials.createIndex({ rating: 1 })
```

### Pagination
```typescript
const limit = 10
const page = req.query.page || 1
const skip = (page - 1) * limit

const packages = await Package.find()
  .skip(skip)
  .limit(limit)
```

### Projection (Select Fields)
```typescript
const packages = await Package.find({}, { title: 1, location: 1 })
```

---

## 🚀 Deployment

### Vercel
1. Create MongoDB Atlas cluster
2. Copy connection string
3. Set `MONGODB_URI` in Vercel dashboard
4. Deploy!

### Railway / Heroku
1. Add MongoDB add-on or use Atlas
2. Set `MONGODB_URI` config var
3. Deploy!

---

## 📚 Useful Links

- Mongoose Docs: https://mongoosejs.com
- MongoDB Manual: https://docs.mongodb.com
- MongoDB Compass: https://mongodb.com/products/compass
- Atlas: https://mongodb.com/cloud/atlas

---

## ⚡ Quick Tips

💡 **Always `await` database calls**
```typescript
const data = await Model.find()  // ✓
const data = Model.find()       // ✗
```

💡 **Handle validation errors**
```typescript
try {
  await Package.create(data)
} catch (error) {
  console.log(error.message)  // Validation message
}
```

💡 **Use `.findByIdAndUpdate` for updates**
```typescript
const updated = await Package.findByIdAndUpdate(
  id,
  { title: 'New Title' },
  { new: true }  // Return updated document
)
```

💡 **Sort results**
```typescript
const recent = await Package.find().sort({ createdAt: -1 })
const featured = await Package.find().sort({ featured: -1 })
```

---

**Bookmark this page! 📌**
