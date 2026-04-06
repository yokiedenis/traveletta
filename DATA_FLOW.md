# Component & Data Flow Diagram

## 🎨 Frontend Component Tree

```
App (pages/index.tsx)
├── Hero Component
│   ├── Scroll navigation buttons
│   └── Call-to-actions
├── AboutUs Component
│   ├── Mission statement
│   └── Why choose us cards
├── FeaturedPackages Component
│   ├── Fetches /api/packages
│   ├── Displays package cards
│   │   ├── Price (UGX/USD)
│   │   ├── Duration
│   │   ├── Includes/Excludes
│   │   └── Book button
│   └── Loading state
├── SpecialExperiences Component
│   ├── 4 experience cards
│   │   ├── Romantic escapes
│   │   ├── Birthday trips
│   │   ├── Girls trips
│   │   └── Solo retreats
│   └── CTA buttons
├── CustomTripPlanner Component
│   ├── Form with validation
│   │   ├── Name input
│   │   ├── Destination
│   │   ├── Budget
│   │   ├── Dates (start/end)
│   │   ├── Number of people
│   │   └── Submit button
│   ├── Posts to /api/contact
│   └── Success message
├── Gallery Component
│   ├── Fetches /api/gallery
│   ├── Image grid (4 categories)
│   │   ├── Safari 🐾
│   │   ├── Beach 🌊
│   │   ├── Groups 🧳
│   │   └── Clients 😄
│   └── Hover animations
├── Testimonials Component
│   ├── Fetches /api/testimonials
│   ├── Testimonial cards
│   │   ├── Client name
│   │   ├── Message (quoted)
│   │   ├── Star rating
│   │   └── Trip type
│   └── Loading state
├── BlogSection Component
│   ├── Fetches /api/blog
│   ├── Blog cards
│   │   ├── Title
│   │   ├── Excerpt
│   │   ├── Author & date
│   │   ├── Tags
│   │   └── Read More button
│   └── Newsletter signup
├── Contact Component
│   ├── Contact info sidebar
│   │   ├── Location
│   │   ├── Phone
│   │   ├── Email
│   │   └── WhatsApp
│   ├── Contact form
│   │   ├── Name
│   │   ├── Email
│   │   ├── Phone
│   │   ├── Subject
│   │   ├── Message
│   │   └── Send button
│   └── Posts to /api/contact
└── Footer Component
    ├── About section
    ├── Quick links
    ├── Contact info
    └── Social links
```

## 🔄 Data Flow Diagrams

### Fetching Packages

```
FeaturedPackages.tsx (useEffect)
    ↓
fetch('/api/packages', { method: 'GET' })
    ↓
pages/api/packages.ts
    ↓
initializeDatabase() [if first run]
    ↓
PackageController.getAll()
    ↓
PackageModel.getAll()
    ↓
SQLite: SELECT * FROM packages
    ↓
Parse JSON fields (includes, excludes)
    ↓
Format response with _id mapping
    ↓
Return array of packages
    ↓
FeaturedPackages.tsx receives data
    ↓
setPackages(data)
    ↓
Component renders package cards
```

### Submitting Contact Form

```
Contact.tsx (handleSubmit)
    ↓
form data collected
    ↓
fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify(data)
})
    ↓
pages/api/contact.ts
    ↓
initializeDatabase()
    ↓
ContactMessageController.create(data)
    ↓
Validate email format
    ↓
ContactMessageModel.create()
    ↓
SQLite: INSERT INTO contact_messages
    ↓
Return created message
    ↓
Contact.tsx receives response
    ↓
Show success message
    ↓
Clear form
```

### Creating New Testimonial

```
Admin/Dashboard
    ↓
Submit testimonial data
    ↓
fetch('/api/testimonials', {
  method: 'POST',
  body: JSON.stringify({
    clientName: 'Jane',
    message: 'Amazing!',
    rating: 5,
    tripType: 'Safari'
  })
})
    ↓
pages/api/testimonials.ts
    ↓
TestimonialController.create()
    ↓
Validate rating (1-5)
    ↓
TestimonialModel.create()
    ↓
SQLite: INSERT INTO testimonials
    ↓
Return created testimonial
    ↓
Frontend receives new testimonial
    ↓
Refetch testimonials list
    ↓
Component re-renders with new data
```

## 📊 State Management Flow

### Component State
```
FeaturedPackages.tsx
├── [packages, setPackages]
├── [loading, setLoading]
└── [error, setError]
    ↓
useEffect(() => {
  fetch -> setPackages -> re-render
})
```

### Form State (Example: Contact Form)
```
Contact.tsx
└── [formData, setFormData]
    ├── name
    ├── email
    ├── phone
    ├── subject
    ├── message
    └── [submitted, setSubmitted]
        ↓
    onChange handler updates state
        ↓
    onSubmit validates & posts
        ↓
    Response updates submitted state
        ↓
    Display success/error message
```

## 🗄️ Backend Data Structure

### Model Instance Example

```
Package Model Instance
├── id: 1 (from DB)
├── title: "3 Days Queen Elizabeth Safari"
├── location: "Western Uganda"
├── priceUGX: 1200000
├── priceUSD: 320
├── duration: "3 Days, 2 Nights"
├── days: 3
├── nights: 2
├── includes: ["Transport", "Accommodation", "Game drives", "Boat cruise"]
├── excludes: ["Personal expenses", "Tips"]
├── featured: true
├── createdAt: "2024-04-06T..."
└── updatedAt: "2024-04-06T..."

(Stored as JSON in DB:)
├── includes: '["Transport","Accommodation",...]'
└── excludes: '[...]'
```

## 🎯 Request/Response Examples

### GET /api/packages

**Request:**
```
GET /api/packages HTTP/1.1
Host: localhost:3000
```

**Response:**
```json
[
  {
    "_id": "1",
    "title": "3 Days Queen Elizabeth Safari",
    "location": "Western Uganda",
    "priceUGX": 1200000,
    "priceUSD": 320,
    "duration": "3 Days, 2 Nights",
    "days": 3,
    "nights": 2,
    "includes": ["Transport", "Accommodation", "Game drives", "Boat cruise"],
    "excludes": ["Personal expenses", "Tips"],
    "featured": true
  }
]
```

### POST /api/contact

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+256701234567",
  "subject": "Trip Inquiry",
  "message": "I'm interested in the Queen Elizabeth Safari package"
}
```

**Response:**
```json
{
  "message": "Message sent successfully"
}
```

### POST /api/testimonials

**Request:**
```json
{
  "clientName": "Sarah",
  "message": "Ariella Adventures made my birthday trip unforgettable!",
  "rating": 5,
  "tripType": "Birthday Trip"
}
```

**Response:**
```json
{
  "_id": "3",
  "clientName": "Sarah",
  "message": "Ariella Adventures made my birthday trip unforgettable!",
  "rating": 5,
  "tripType": "Birthday Trip",
  "createdAt": "2024-04-06T..."
}
```

## 🔐 Error Handling Flow

```
Component Form Submission
    ↓
Validation (client-side)
    ↓
Send to API
    ↓
Controller Validation
    ├─ Email format ✓
    ├─ Required fields ✓
    ├─ Rating 1-5 ✓
    └─ Category in enum ✓
    ↓
If Invalid:
    return { success: false, error: "...", status: 400 }
    ↓
    Component shows error message
    ↓
If Valid:
    Model.create(data)
    ↓
    Database Operation
    ↓
    return { success: true, data: {}, status: 201 }
    ↓
    Component shows success message
```

## 🎬 Loading States

```
Component Lifecycle
├── Initial
│   └── show skeleton/spinner
├── Loading
│   └── fetch('/api/packages')
│   └── display loading indicator
├── Success
│   └── data received
│   └── render component with data
└── Error
    └── error caught
    └── display error message
```

---

**This comprehensive data flow ensures:** ✅ Type safety ✅ Error handling ✅ User feedback ✅ Data consistency
