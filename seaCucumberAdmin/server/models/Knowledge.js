import mongoose from "mongoose";

const KnowledgeSchema = new mongoose.Schema(
  {
    
    speciesType: String,
    scientificName: String,
    description: String,
    habitats: String,
    feeding: String,
    reproduction: String,
    lifecycle: String,
    fishingmethods: String,
    image: String,
   
  },
  { timestamps: true }
);

const Knowledge = mongoose.model("Knowledge", KnowledgeSchema);
export default Knowledge;
