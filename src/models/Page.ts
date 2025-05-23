import mongoose, { Document, Model, Types, Schema } from 'mongoose';

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

const SectionSchema = new Schema<Section>({
  type: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
}, { _id: false });

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
  sections: {
    type: [SectionSchema],
    default: [],
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// This static method allows you to find a page document by its slug.
// It attaches a function to the schema's statics, so you can call PageModel.findBySlug('some-slug')
// and it will return the page with that slug, or null if not found.
pageSchema.statics.findBySlug = function (slug: string) {
  return this.findOne({ slug });
};

// The following line ensures that the Page model is not redefined if it already exists (which can happen in development with hot reloading).
// It checks if mongoose.models.Page exists; if so, it uses that, otherwise it creates a new model with the schema.
export const PageModel = (mongoose.models.Page as IPageModel) || mongoose.model<IPage, IPageModel>('Page', pageSchema); 