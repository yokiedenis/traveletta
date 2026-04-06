import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryImage extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  url: string;
  category: 'safari' | 'beach' | 'group' | 'clients';
  uploadedAt: Date;
}

const galleryImageSchema = new Schema<IGalleryImage>(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['safari', 'beach', 'group', 'clients'],
        message: 'Category must be one of: safari, beach, group, clients',
      },
    },
  },
  { timestamps: { createdAt: 'uploadedAt', updatedAt: false } }
);

const GalleryImage =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>('GalleryImage', galleryImageSchema);

export default GalleryImage;
