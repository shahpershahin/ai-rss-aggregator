// models/Feed.ts
import mongoose from 'mongoose';

const feedSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  addedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Feed || mongoose.model('Feed', feedSchema);
