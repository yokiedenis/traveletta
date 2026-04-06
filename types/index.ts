export interface Package {
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

export interface Booking {
  _id: string;
  packageId: string;
  customerName: string;
  email: string;
  phone: string;
  travelDates: {
    start: string;
    end: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  message: string;
  rating: number;
  tripType: string;
  createdAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  _id: string;
  title: string;
  url: string;
  category: 'safari' | 'beach' | 'group' | 'clients';
  uploadedAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  responded: boolean;
  createdAt: string;
}

export interface CustomTripRequest {
  _id: string;
  name: string;
  destination: string;
  budget: string;
  travelDates: {
    start: string;
    end: string;
  };
  numberOfPeople: number;
  email: string;
  phone: string;
  createdAt: string;
}
