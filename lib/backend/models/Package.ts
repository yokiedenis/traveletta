import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
  _id: mongoose.Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

const packageSchema = new Schema<IPackage>(
  {
    title: {
      type: String,
      required: [true, 'Package title is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    priceUGX: {
      type: Number,
      required: [true, 'Price in UGX is required'],
      min: 0,
    },
    priceUSD: {
      type: Number,
      required: [true, 'Price in USD is required'],
      min: 0,
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
    },
    days: {
      type: Number,
      required: [true, 'Number of days is required'],
      min: 1,
    },
    nights: {
      type: Number,
      required: [true, 'Number of nights is required'],
      min: 0,
    },
    includes: {
      type: [String],
      default: [],
    },
    excludes: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Package =
  mongoose.models.Package || mongoose.model<IPackage>('Package', packageSchema);

export default Package;
