import { CategoryGet } from './category_get.interface';

export interface SubcategoryGet {
  subcategoryId: number;
  name: string;
  description: string;
  categoryId: number;
  color: string;
  imageUrl: string;
}
