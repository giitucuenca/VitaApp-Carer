import { SubcategoryGet } from './subcategory_get.interface';

export interface PictogramGet {
  pictogramId: number;
  name: string;
  imageUrl: string;
  subcategoryId: number;
  color: string;
  position?: number;
}
