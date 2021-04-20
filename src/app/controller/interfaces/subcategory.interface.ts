import { FileUploadResponse } from 'src/app/controller/interfaces/image.interface';
export interface Subcategory {
  name: string;
  description: string;
  imageUrl: string;
  categoryId: number;
  images: FileUploadResponse[];
}
