import mongoose, { Document, Model, Types } from 'mongoose';

export interface Section {
  type: string; // e.g., 'hero', 'mainProducts', etc.
  data: Record<string, unknown>;
}

export interface IPage extends Document {
  _id: Types.ObjectId;
  title: string;
  // The slug is a unique, URL-friendly identifier for the page (e.g., "about-us")
  slug: string;
  imageUrl?: string;
  sections: Section[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPageModel extends Model<IPage> {
  findBySlug(slug: string): Promise<IPage | null>;
}

// Section schema for flexible page sections
const SectionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'hero', 'features', 'faq', etc.
  data: { type: mongoose.Schema.Types.Mixed, required: true }, // flexible content per section type
});

const pageSchema = new mongoose.Schema<IPage, IPageModel>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  imageUrl: {
    type: String,
  },
  sections: [SectionSchema], // Array of sections for this page
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// This static method allows you to find a page document by its slug.
// It attaches a function to the schema's statics, so you can call PageModel.findBySlug('some-slug')
// and it will return the page with that slug, or null if not found.
pageSchema.statics.findBySlug = function (slug: string) {
  return this.findOne({ slug });
};

// Example for Hero section data structure (for reference):
// {
//   type: 'hero',
//   data: {
//     title: 'Welcome to EasyFWD',
//     subtitle: 'Your digital solution',
//     imageUrl: '/images/hero.jpg',
//     buttonText: 'Get Started',
//     buttonLink: '/signup'
//   }
// }

// The following line ensures that the Page model is not redefined if it already exists (which can happen in development with hot reloading).
// It checks if mongoose.models.Page exists; if so, it uses that, otherwise it creates a new model with the schema.
export const PageModel = (mongoose.models.Page as IPageModel) || mongoose.model<IPage, IPageModel>('Page', pageSchema); 