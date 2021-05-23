import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryCarer } from 'src/app/controller/interfaces/category.interface';
import { Color } from 'src/app/controller/interfaces/color.interface';
import {
  FileUploadResponse,
  ImageCategory,
} from 'src/app/controller/interfaces/image.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { ImagesRadioComponent } from 'src/app/view/components/images-radio/images-radio.component';
import { MessagesComponent } from 'src/app/view/components/messages/messages.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  formCategory: FormGroup;

  @ViewChild('imageRadioCategory') imageRadioCategory: ImagesRadioComponent;
  @ViewChild('message') message: MessagesComponent;

  invalidUrl = false;

  category: CategoryCarer;

  colors: Color[] = [];

  @Output() collapse = new EventEmitter<boolean>();
  @Output() reloadCategories = new EventEmitter<boolean>();

  constructor(
    private vitaapp: VitaappService,
    private formBuilder: FormBuilder
  ) {
    this.initializeForm();
    this.vitaapp.getColor().subscribe(
      (colors) => {
        this.colors = colors;
        console.log(colors);
      },
      (err) => console.log('error al cargar los colores')
    );
  }

  ngOnInit(): void {}

  initializeForm(): void {
    this.invalidUrl = false;
    this.formCategory = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.maxLength(40)]],
      color: ['', Validators.required],
      imageUrl: ['', Validators.required],
      categoryCarerId: ['', Validators.required],
      carerId: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
    if (this.imageRadioCategory) {
      this.imageRadioCategory.emptyImages();
    }
  }

  collapsePanel(): void {
    this.initializeForm();
    this.collapse.emit(true);
  }

  saveCategory(): void {
    this.setImageUrl(this.imageRadioCategory.imagePrimary);
    if (this.formCategory.valid && this.imageRadioCategory.getImages.length) {
      const category: CategoryCarer = {
        categoryId: this.getCategoryId,
        name: this.getName,
        description: this.getDescription,
        color: this.getColor,
        imageUrl: this.getImageUrl,
        carerId: this.getCarerId,
        categoryCarerId: this.getCategoryCarerId,
      };

      console.log(category);

      this.vitaapp.editCategoryCarer(category).subscribe(
        (resp) => {
          console.log(resp);
          this.reloadCategories.emit(true);
          this.collapsePanel();
          const msg = {
            severity: 'success',
            summary: 'Realizado',
            detail: 'Se modificó la categoria correctamente.',
          };
          this.message.createMessage(msg);
          // Notify('Categoria agregada correctamente.', null, null, 'success');
        },
        (err) => {
          console.log(err);
          const msg = {
            severity: 'error',
            summary: 'Error',
            detail: 'Error al modificar la categoria.',
          };
          this.message.createMessage(msg);
          // Notify('Error al agregar una categoria.', null, null, 'danger');
        }
      );
    } else {
      this.validateForm();
      this.invalidUrl = this.formCategory.get('imageUrl').invalid;
      const msg = {
        severity: 'error',
        summary: 'Error',
        detail: 'Error revice la información del formulario.',
      };
      this.message.createMessage(msg);
    }
  }

  categoryToEdit(category: CategoryCarer): void {
    this.initializeForm();
    this.category = category;
    this.formCategory.get('name').setValue(category.name);
    this.formCategory.get('description').setValue(category.description);
    this.vitaapp
      .getImagesCategory(category.categoryId)
      .subscribe((images: ImageCategory[]) => {
        images.forEach((image: ImageCategory) => {
          const name = image.name;
          const imageUrl = image.imageUrl;
          const imageUpload: FileUploadResponse = {
            name,
            imageUrl,
          };
          this.imageRadioCategory.images.push(imageUpload);
        });
      });

    this.imageRadioCategory.principalImage = category.imageUrl;
    this.formCategory.get('color').setValue(category.color);
    this.formCategory.get('imageUrl').setValue(category.imageUrl);
    this.formCategory.get('categoryId').setValue(category.categoryId);
    this.formCategory.get('categoryCarerId').setValue(category.categoryCarerId);
    this.formCategory.get('carerId').setValue(category.carerId);
    console.log(category);
    console.log(this.formCategory);
  }

  get invalidName(): boolean {
    return (
      this.formCategory.get('name').invalid &&
      this.formCategory.get('name').touched
    );
  }
  get invalidDescription(): boolean {
    return (
      this.formCategory.get('description').invalid &&
      this.formCategory.get('description').touched
    );
  }
  get invalidColor(): boolean {
    return (
      this.formCategory.get('color').invalid &&
      this.formCategory.get('color').touched
    );
  }

  get getName(): string {
    return this.formCategory.get('name').value;
  }

  get getDescription(): string {
    return this.formCategory.get('description').value;
  }

  get getColor(): string {
    return this.formCategory.get('color').value;
  }

  get getImageUrl(): string {
    return this.formCategory.get('imageUrl').value;
  }

  get getCategoryId(): number {
    return this.formCategory.get('categoryId').value;
  }

  get getCategoryCarerId(): number {
    return this.formCategory.get('categoryCarerId').value;
  }

  get getCarerId(): number {
    return this.formCategory.get('carerId').value;
  }

  get invalidImageUrl(): boolean {
    return (
      this.formCategory.get('imageUrl').invalid &&
      this.formCategory.get('imageUrl').touched
    );
  }

  setImageUrl(imageUrl: string): void {
    if (imageUrl) {
      this.invalidUrl = false;
    } else {
      this.invalidUrl = true;
    }

    this.formCategory.get('imageUrl').setValue(imageUrl);
  }

  validateForm(): void {
    if (this.formCategory.invalid) {
      return Object.values(this.formCategory.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
  }
}
