import mongoose, { Schema } from 'mongoose';
import type { PortfolioContent } from '@portfolio/shared/types/portfolio';

const siteSchema = new Schema(
  {
    name: String,
    role: String,
    tagline: String,
    headline: String,
    headlineAccent: String,
    bio: String,
    email: String,
    phone: String,
    location: String,
    showAvailability: Boolean,
    showPhone: Boolean,
    cgpa: Number,
    interns: Number,
    repos: Number,
    githubUrl: String,
    linkedinUrl: String,
    profileImage: String,
  },
  { _id: false },
);

const educationSchema = new Schema(
  {
    school: String,
    degree: String,
    dates: String,
    location: String,
    cgpa: String,
  },
  { _id: false },
);

const experienceSchema = new Schema(
  {
    dates: String,
    title: String,
    company: String,
    location: String,
    description: String,
    tags: [String],
    featured: Boolean,
  },
  { _id: false },
);

const projectSchema = new Schema(
  {
    title: String,
    stack: String,
    githubUrl: String,
    description: String,
  },
  { _id: false },
);

const skillCategorySchema = new Schema(
  {
    category: String,
    items: [String],
  },
  { _id: false },
);

const portfolioSchema = new Schema<PortfolioContent>(
  {
    site: siteSchema,
    education: educationSchema,
    experiences: [experienceSchema],
    projects: [projectSchema],
    skillCategories: [skillCategorySchema],
    marqueeItems: [String],
  },
  { timestamps: true },
);

export const Portfolio = mongoose.model<PortfolioContent>('Portfolio', portfolioSchema);
