import { Schema, model, Document } from "mongoose";

export interface IProductVariant {
  name: string;
  stock: number;
}

export interface IProduct extends Document {
  categoryId: Schema.Types.ObjectId;
  brand: string;
  name: string;
  images: string[];
  price: number;
  discountPercentage: number;
  description?: string;
  productDetails: string[];
  variants: IProductVariant[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productVariantSchema =
  new Schema<IProductVariant>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
      },
    },
    {
      _id: false,
    }
  );

const productSchema = new Schema<IProduct>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    description: {
      type: String,
      trim: true,
    },

    productDetails: {
      type: [String],
      default: [],
    },

    variants: {
      type: [productVariantSchema],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model<IProduct>(
  "Product",
  productSchema
);

export default Product;