import mongoose, { Document, Model, CallbackError, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

/* This interface describes the shape of a User document in MongoDB.
It extends Mongoose's Document type and adds our custom fields and methods. */
export interface IUser extends Document {
  _id: Types.ObjectId; // MongoDB ObjectId for the user
  email: string; // (unique)
  passwordHash: string; 
  role: 'admin' | 'editor'; 
  createdAt: Date; 
  updatedAt: Date; 
comparePassword(candidatePassword: string): Promise<boolean>; // Method to compare passwords
}

/* This interface describes static methods available on the User model itself. */
export interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>; 
}

/* Define the schema for the User collection in MongoDB. */
const userSchema = new mongoose.Schema<IUser, IUserModel>(
  {
    /* Email field: required, unique, trimmed, lowercased, and must match email regex */
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    /* Password hash field: required */
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },
    /* Role field: can be 'admin' or 'editor', defaults to 'editor' */
    role: {
      type: String,
      enum: ['admin', 'editor'],
      default: 'editor',
    },
  },
  {
    timestamps: true, /* Automatically adds createdAt and updatedAt fields */
  }
);

// Pre-save hook: hashes the password before saving if it was modified
userSchema.pre('save', async function (this: IUser, next: (err?: CallbackError) => void) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('passwordHash')) return next();
  
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    // Pass any errors to the next middleware
    next(error as CallbackError);
  }
});

// Instance method: compares a candidate password to the stored hash
userSchema.methods.comparePassword = async function (
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  // bcrypt.compare returns true if the password matches the hash
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Static method: find a user by their email address
userSchema.statics.findByEmail = function (email: string) {
  // Returns a promise that resolves to the user or null
  return this.findOne({ email });
};

// Export the User model. If it already exists (due to hot reloads), use the existing one.
const UserModel = (mongoose.models.User as IUserModel) || 
  mongoose.model<IUser, IUserModel>('User', userSchema);

export default UserModel;