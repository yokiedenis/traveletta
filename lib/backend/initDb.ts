import connectDB from './database';
import Package from './models/Package';
import Testimonial from './models/Testimonial';
import BlogPost from './models/BlogPost';
import GalleryImage from './models/GalleryImage';

export async function initializeDatabase() {
  try {
    await connectDB();

    // Seed initial data if empty
    const packageCount = await Package.countDocuments();
    if (packageCount === 0) {
      await seedInitialData();
      console.log('✓ Database seeded with initial data');
    }
  } catch (error) {
    console.error('✗ Database initialization error:', error);
    throw error;
  }
}

async function seedInitialData() {
  // Seed packages
  await Package.create({
    title: '3 Days Queen Elizabeth Safari',
    location: 'Western Uganda',
    priceUGX: 1200000,
    priceUSD: 320,
    duration: '3 Days, 2 Nights',
    days: 3,
    nights: 2,
    includes: ['Transport', 'Accommodation', 'Game drives', 'Boat cruise'],
    excludes: ['Personal expenses', 'Tips'],
    featured: true,
  });

  await Package.create({
    title: 'Zanzibar Beach Escape',
    location: 'Tanzania',
    priceUGX: 2500000,
    priceUSD: 680,
    duration: '4 Days, 3 Nights',
    days: 4,
    nights: 3,
    includes: ['Flights', 'Hotel (Bed & Breakfast)', 'Airport transfers'],
    excludes: ['Meals', 'Activities'],
    featured: true,
  });

  await Package.create({
    title: 'Romantic Getaway – Lake Bunyonyi',
    location: 'Kabale',
    priceUGX: 950000,
    priceUSD: 250,
    duration: '2 Days',
    days: 2,
    nights: 1,
    includes: ['Private accommodation', 'Candlelight dinner', 'Boat ride'],
    excludes: ['Drinks', 'Tips'],
    featured: true,
  });

  // Seed testimonials
  await Testimonial.create({
    clientName: 'Sarah',
    message: 'Ariella Adventures made my birthday trip unforgettable. Everything was perfect!',
    rating: 5,
    tripType: 'Birthday Trip',
  });

  await Testimonial.create({
    clientName: 'James',
    message: 'Best travel company in Uganda! Professional, fun, and affordable.',
    rating: 5,
    tripType: 'Safari Adventure',
  });

  // Seed blog posts
  await BlogPost.create({
    title: 'Top 10 Places to Visit in Uganda',
    slug: 'top-10-places-uganda',
    content:
      'Uganda is a beautiful country with amazing destinations. Here are the top 10 places you must visit: 1. Bwindi Impenetrable National Park - Home to endangered mountain gorillas. 2. Queen Elizabeth National Park - Perfect for safari adventures. 3. Rwenzori Mountains - Great for hiking. 4. Lake Victoria - Largest freshwater lake in Africa. 5. Murchison Falls - Spectacular waterfall. 6. Fort Portal - Gateway to the west. 7. Jinja - Adventure capital with white water rafting. 8. Kampala - Capital city. 9. Lake Bunyonyi - Picturesque lake with islands. 10. Semliki National Park - Unique ecosystem with hot springs.',
    excerpt: 'Discover the most beautiful destinations in Uganda',
    author: 'Nuella',
    tags: ['travel', 'uganda', 'destinations'],
    published: true,
  });

  await BlogPost.create({
    title: 'How to Travel on a Budget',
    slug: 'travel-on-budget',
    content:
      'Traveling doesn\'t have to be expensive. Here are proven strategies to explore the world affordably: 1. Book flights in advance. 2. Travel during off-seasons. 3. Use public transportation. 4. Stay in budget accommodations. 5. Eat local food. 6. Join group tours. 7. Look for free attractions. 8. Travel with friends to share costs. 9. Use travel rewards cards. 10. Be flexible with your itinerary. With proper planning and these tips, you can travel on a shoestring budget without compromising on experiences.',
    excerpt: 'Budget-friendly travel tips for adventurers',
    author: 'Nuella',
    tags: ['budget', 'travel', 'tips'],
    published: true,
  });

  // Seed gallery images
  await GalleryImage.create({
    title: 'Safari Adventure',
    url: '/gallery/safari-1.jpg',
    category: 'safari',
  });

  await GalleryImage.create({
    title: 'Beach Vibes',
    url: '/gallery/beach-1.jpg',
    category: 'beach',
  });
}
