import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
    name: String,
    text: String,
    rating: [Number]
}, {timestamps: true});

const courseSchema = new mongoose.Schema({
    name: String,
    date: Number,
    description: String,
    domain: [String],
    chapters: [chapterSchema]
}, {
  timestamps: true
});

export const Course = mongoose.model('Course', courseSchema);
