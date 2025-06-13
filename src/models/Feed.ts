import mongoose from 'mongoose';

const feedSchema = new mongoose.Schema({
  url: { type: String, required: true },
  userEmail: { type: String, required: true },
  title: { type: String }, // Feed title/publisher
}, { timestamps: true });

export default mongoose.models.Feed || mongoose.model('Feed', feedSchema);
