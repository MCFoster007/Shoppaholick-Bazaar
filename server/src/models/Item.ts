import { Schema, model, type Document } from 'mongoose';

export interface ItemDocument extends Document {
  ItemId: string;
  title: string;
  price: number;
  description: string;
  image?: string;
  category?: string;
}

const itemSchema = new Schema<ItemDocument>({
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ItemId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

// Export the model for Item
export const Item = model<ItemDocument>('Item', itemSchema);
