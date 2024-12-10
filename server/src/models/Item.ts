import { Schema, type Document, model } from 'mongoose';

export interface ItemDocument extends Document {
  title: string;
  price: string;
  description: string;
  image?: string;
  category?: string;
}

const itemSchema = new Schema<ItemDocument>({
  price: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  // saved item id from Googleitems
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

const Item = model<ItemDocument>('Item', itemSchema);

export {itemSchema, Item};
