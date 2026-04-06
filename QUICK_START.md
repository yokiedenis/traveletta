# ⚡ Quick Start Guide - Ariella Adventures Backend

## 🎯 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install better-sqlite3
```

### Step 2: Start the Development Server
```bash
npm run dev
```

That's it! Your backend is ready to use. ✨

## 🧪 Testing the Backend

### Using Browser DevTools
Open your browser and try:
```
GET http://localhost:3000/api/packages
GET http://localhost:3000/api/testimonials
GET http://localhost:3000/api/blog
GET http://localhost:3000/api/gallery
```

### Using cURL
```bash
# Get all packages
curl http://localhost:3000/api/packages

# Submit contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "subject": "Trip Inquiry",
    "message": "I want to book a safari"
  }'
```

### Using Postman
1. Create new GET request: `http://localhost:3000/api/packages`
2. Create new POST request: `http://localhost:3000/api/testimonials`
   - Body (raw JSON):
   ```json
   {
     "clientName": "Sarah",
     "message": "Amazing experience!",
     "rating": 5,
     "tripType": "Safari"
   }
   ```

## 📂 What Gets Created

When you first run the app:
```
data/
└── tourism.db          # SQLite database (auto-created)
```

Database includes:
- ✅ 5 tables (packages, testimonials, blog_posts, gallery_images, contact_messages)
- ✅ 3 sample packages
- ✅ 2 sample testimonials
- ✅ 2 sample blog posts
- ✅ 2 sample gallery images

## 🔌 API Endpoints Quick Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/packages` | GET | Get all packages |
| `/api/packages` | POST | Create new package |
| `/api/testimonials` | GET | Get all testimonials |
| `/api/testimonials` | POST | Create new testimonial |
| `/api/blog` | GET | Get all blog posts |
| `/api/blog` | POST | Create new blog post |
| `/api/gallery` | GET | Get all gallery images |
| `/api/gallery` | POST | Upload new image |
| `/api/contact` | GET | Get all messages |
| `/api/contact` | POST | Submit contact form |

## 📝 Common Tasks

### Get All Packages
```javascript
// In component
const [packages, setPackages] = useState([]);

useEffect(() => {
  fetch('/api/packages')
    .then(res => res.json())
    .then(data => setPackages(data));
}, []);
```

### Submit Contact Form
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'John',
      email: 'john@example.com',
      subject: 'Inquiry',
      message: 'Hello'
    })
  });
  if (response.ok) {
    alert('Message sent!');
  }
};
```

### Create New Testimonial
```javascript
const createTestimonial = async () => {
  const res = await fetch('/api/testimonials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientName: 'Alice',
      message: 'Best trip ever!',
      rating: 5,
      tripType: 'Beach Vacation'
    })
  });
  const data = await res.json();
  console.log('Created:', data);
};
```

## 🗂️ File Locations

```
Backend Code:
lib/backend/
├── database.ts              # Database setup
├── initDb.ts               # Initialization
├── models/                 # Data models
└── controllers/            # Business logic

API Routes:
pages/api/
├── packages.ts
├── testimonials.ts
├── blog.ts
├── gallery.ts
└── contact.ts

Documentation:
├── BACKEND_DOCUMENTATION.md   # Detailed docs
├── BACKEND_SETUP_SUMMARY.md   # Overview
├── ARCHITECTURE.md            # System design
└── QUICK_START.md             # This file
```

## 🐛 Troubleshooting

### Problem: `Cannot find module 'better-sqlite3'`
**Solution:**
```bash
npm install better-sqlite3
```

### Problem: Database already exists error
**Solution:** Delete `data/tourism.db` and restart the app.

### Problem: Port 3000 already in use
**Solution:**
```bash
# Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows (PowerShell):
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

## 📚 Learn More

- **Architecture Details**: See `ARCHITECTURE.md`
- **Full Documentation**: See `BACKEND_DOCUMENTATION.md`
- **Setup Details**: See `BACKEND_SETUP_SUMMARY.md`

## ✅ Checklist

- [ ] Installed better-sqlite3
- [ ] Run `npm run dev`
- [ ] Check console for initialization messages
- [ ] Visit `http://localhost:3000`
- [ ] Test API endpoint in browser
- [ ] Check `data/tourism.db` exists

## 🎉 You're All Set!

Your monolithic TypeScript backend is ready for:
- ✅ Development
- ✅ Testing
- ✅ Deployment
- ✅ Scaling

**Happy coding!** 🚀

---

**Questions?** Check the detailed documentation files for more info.
