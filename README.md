# Ariella Adventures - Tourism Website

A monolithic Next.js + TypeScript website for Ariella Adventures tourism company. Backend API and frontend UI in a single application, ready for Vercel deployment.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn

### Installation & Development

```bash
cd next-app
npm install
npm run dev
```

Visit http://localhost:3000 in your browser.

## 📁 Project Structure

```
next-app/
├── pages/
│   ├── api/
│   │   ├── packages.ts          # Package CRUD endpoints
│   │   ├── bookings.ts          # Booking management
│   │   ├── testimonials.ts      # Testimonials endpoints
│   │   ├── blog.ts              # Blog posts endpoints
│   │   ├── gallery.ts           # Gallery images endpoints
│   │   └── contact.ts           # Contact form submission
│   ├── _app.tsx                 # Next.js App component
│   ├── _document.tsx            # HTML document
│   └── index.tsx                # Homepage
├── components/
│   ├── Hero.tsx                 # Hero section
│   ├── AboutUs.tsx              # About section
│   ├── FeaturedPackages.tsx     # Packages display
│   ├── Testimonials.tsx         # Testimonials section
│   ├── BlogSection.tsx          # Blog section
│   ├── Gallery.tsx              # Gallery grid
│   ├── Contact.tsx              # Contact form
│   ├── SpecialExperiences.tsx   # Special experiences
│   ├── CustomTripPlanner.tsx    # Custom trip form
│   └── Footer.tsx               # Footer
├── types/
│   └── index.ts                 # TypeScript interfaces
├── styles/
│   └── globals.css              # Global styles
├── public/
│   └── favicon.ico              # Favicon
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🌐 Pages & Routes

### Frontend Pages

- `/` - Homepage with all sections
- `/api/health` - Health check endpoint

### API Routes (Backend)

- `GET /api/packages` - Get all packages
- `POST /api/packages` - Create new package
- `PUT /api/packages/:id` - Update package
- `DELETE /api/packages/:id` - Delete package

- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Submit testimonial

- `GET /api/blog` - Get all blog posts
- `POST /api/blog` - Create blog post

- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Upload gallery image

- `POST /api/contact` - Submit contact form

## 🎨 Features

✅ **Monolithic Architecture**: Frontend and backend in single Next.js app
✅ **TypeScript**: Full type safety across the application
✅ **API Routes**: Built-in backend endpoints via Next.js API routes
✅ **Responsive Design**: Mobile-first CSS styling
✅ **Light Grey Theme**: Clean, professional appearance
✅ **Mock Data**: Realistic sample data for immediate testing
✅ **One Port**: Single deployment entry point for Vercel

## 📦 Content Sections

### Homepage Includes:

1. **Hero Section** - Headline, sub-text, CTA buttons
2. **About Us** - Company mission and values
3. **Featured Packages** - 3 curated travel packages:
   - Queen Elizabeth Safari (3 Days, 2 Nights)
   - Zanzibar Beach Escape (4 Days, 3 Nights)
   - Lake Bunyonyi Romantic Getaway (2 Days)
4. **Special Experiences** - Curated trip types
5. **Custom Trip Planner** - Form to request custom itinerary
6. **Gallery** - Real moments and memories
7. **Testimonials** - Client reviews
8. **Blog Section** - Travel tips and articles
9. **Contact Us** - Kampala location, phone, email
10. **Footer** - Links and copyright

## 🚢 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Vercel auto-detects Next.js and sets build command
5. Click "Deploy"

### Step 3: Environment Variables (if needed)

Add any required environment variables in Vercel dashboard.

**Note**: Vercel automatically handles port assignment. Next.js will run on the assigned port.

## 🔧 Environment Variables

Create a `.env.local` file for local development (optional):

```
# Add environment variables here if needed
```

## 📝 TypeScript Interfaces

All data models are strongly typed in `types/index.ts`:

```typescript
interface Package {
  _id: string;
  title: string;
  location: string;
  priceUGX: number;
  priceUSD: number;
  duration: string;
  days: number;
  nights: number;
  includes: string[];
  excludes: string[];
  featured: boolean;
}

interface Booking {
  _id: string;
  packageId: string;
  customerName: string;
  email: string;
  phone: string;
  travelDates: { start: string; end: string };
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalPrice: number;
}

// ... and more
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev         # Start development server (localhost:3000)
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm run type-check  # Check TypeScript types
```

## 📱 Contact Information

**Ariella Adventures**

- 📍 Kampala, Uganda
- 📱 +256703269028 / 0773150749
- 📧 ariellaadventuressafari@gmail.com
- 💬 WhatsApp: +256773150749

## 💖 Brand

**Travel With Nuella Hearts**
Join curated trips filled with fun, laughter, connection, and unforgettable vibes. Let's explore the world together—not just as travelers, but as a family 💖

## 📄 License

MIT License - Feel free to use this project for your tourism business.

## 🙏 Support

For issues or questions, contact Ariella Adventures directly at ariellaadventuressafari@gmail.com

---

**Built with ❤️ by Ariella Adventures**
