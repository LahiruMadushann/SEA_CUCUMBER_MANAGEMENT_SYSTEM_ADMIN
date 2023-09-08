import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    
    userId: String,
    role: String,
    message: String,
    
   
  },
  { timestamps: true }
);

const News = mongoose.model("News", NewsSchema);
export default News;
