import type { NextApiRequest, NextApiResponse } from 'next';
import type { Booking } from '../../types';

// Mock data
const bookings: Booking[] = [
  {
    _id: '1',
    packageId: '1',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+256700000000',
    travelDates: { start: '2024-06-15', end: '2024-06-18' },
    status: 'confirmed',
    totalPrice: 1200000,
    createdAt: '2024-01-15',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Booking[] | Booking | { message: string }>
) {
  if (req.method === 'GET') {
    res.status(200).json(bookings);
  } else if (req.method === 'POST') {
    const newBooking: Booking = {
      _id: (bookings.length + 1).toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    bookings.push(newBooking);
    res.status(201).json(newBooking);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
