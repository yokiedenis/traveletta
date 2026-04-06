import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  _id: mongoose.Types.ObjectId;
  clientName: string;
  message: string;
  rating: number;
  tripType: string;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must not exceed 5'],
    },
    tripType: {
      type: String,
      required: [true, 'Trip type is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>('Testimonial', testimonialSchema);

export default Testimonial;
