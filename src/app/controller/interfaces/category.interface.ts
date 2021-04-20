import { FileUploadResponse } from './image.interface';
export interface Category {
  name: string;
  description: string;
  colorId: number;
  imageUrl: string;
  images: FileUploadResponse[];
}
