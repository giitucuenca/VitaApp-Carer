import { FileUploadResponse } from 'src/app/controller/interfaces/image.interface';
export interface Pictogram {
  name: string;
  imageUrl: string;
  subcategoryId: number;
  images: FileUploadResponse[];
}
