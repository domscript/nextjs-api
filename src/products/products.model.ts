import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  url: { type: String, required: true },
  mass: { type: Number, required: true },
  date: { type: Date, required: true },
});
export interface Product extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
  url: string;
  mass: number;
  date: Date;
}
