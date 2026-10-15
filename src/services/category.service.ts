import Category from "../models/Category";

export const getCategories = async () => {
  const categories = await Category.find({
    isActive: true,
  })
    .sort({ createdAt: -1 })
    .select("_id name slug image");

  return categories;
};