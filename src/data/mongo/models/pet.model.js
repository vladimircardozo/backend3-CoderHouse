import { Schema, model } from "mongoose";

const petSchema = new Schema({
  name: { type: String, required: true }, 
  species: { type: String, required: true }, 
  age: { type: Number, required: true, min: 0 }, 
  adopted: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }, 
});

const Pet = model("Pet", petSchema); 
export default Pet;