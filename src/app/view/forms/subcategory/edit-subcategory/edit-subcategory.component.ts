import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FileUploadResponse,
  ImageSubcategory,
} from 'src/app/controller/interfaces/image.interface';
import { SubcategoryCarer } from 'src/app/controller/interfaces/subcategory.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { ImagesRadioComponent } from 'src/app/view/components/images-radio/images-radio.component';
import { MessagesComponent } from 'src/app/view/components/messages/messages.component';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.scss'],
})
export class EditSubcategoryComponent implements OnInit {
  @ViewChild('imageRadioSubcategory')
  imageRadioSubcategory: ImagesRadioComponent;
  @Output() reloadSubcategories = new EventEmitter<boolean>();
  @Output() collapse = new EventEmitter<boolean>();
  invalidUrl = false;
  subcategory: SubcategoryCarer;
  formSubcategory: FormGroup;
  @ViewChild('message') message: MessagesComponent;

  constructor(
    private vitaapp: VitaappService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  saveSubcategory(): void {
    this.setImageUrl(this.imageRadioSubcategory.imagePrimary);
    if (this.formSubcategory.valid) {
      const subcategory: SubcategoryCarer = {
        subcategoryId: this.getSubcategoryId,
        name: this.getName,
        description: this.getDescription,
        imageUrl: this.getImageUrl,
        categoryId: this.getCategoryId,
        subcategoryCarerId: this.getSubcategoryCarerId,
      };

      this.vitaapp.editSubcategoryCarer(subcategory).subscribe(
        (resp) => {
          console.log(resp);
          this.reloadSubcategories.emit(true);
          this.collapsePanel();
          const msg = {
            severity: 'success',
            summary: 'Realizado',
            detail: 'Se modificó la subcategoría correctamente.',
          };
          this.message.createMessage(msg);

          // Notify('Categoría agregada correctamente.', null, null, 'success');
        },
        (err) => {
          console.log(err);
          const msg = {
            severity: 'error',
            summary: 'Error',
            detail: 'Error al modificar la subcategoría.',
          };
          this.message.createMessage(msg);
          // Notify('Error al agregar una categoría.', null, null, 'danger');
        }
      );
    } else {
      this.validateForm();
      this.invalidUrl = this.formSubcategory.get('imageUrl').invalid;
      const msg = {
        severity: 'error',
        summary: 'Error',
        detail: 'Error revice la información del formulario.',
      };
      this.message.createMessage(msg);
    }
  }

  initializeForm(): void {
    this.invalidUrl = false;
    this.formSubcategory = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      categoryId: ['', Validators.required],
      subcategoryId: ['', Validators.required],
      subcategoryCarerId: ['', Validators.required],
    });

    if (this.imageRadioSubcategory) {
      this.imageRadioSubcategory.emptyImages();
    }
  }

  subcategoryToEdit(subcategory: SubcategoryCarer): void {
    this.initializeForm();
    this.subcategory = subcategory;
    this.formSubcategory.get('categoryId').setValue(subcategory.categoryId);
    this.formSubcategory.get('name').setValue(subcategory.name);
    this.formSubcategory.get('description').setValue(subcategory.description);
    this.formSubcategory
      .get('subcategoryId')
      .setValue(subcategory.subcategoryId);
    this.formSubcategory
      .get('subcategoryCarerId')
      .setValue(subcategory.subcategoryCarerId);
    this.formSubcategory.get('imageUrl').setValue(subcategory.imageUrl);
    this.vitaapp
      .getImagesSubcategory(subcategory.subcategoryId)
      .subscribe((images) => {
        images.forEach((image: ImageSubcategory) => {
          const name = image.name;
          const imageUrl = image.imageUrl;
          const imageUpload: FileUploadResponse = {
            name,
            imageUrl,
          };
          this.imageRadioSubcategory.images.push(imageUpload);
        });
      });

    this.imageRadioSubcategory.principalImage = subcategory.imageUrl;
  }

  collapsePanel(): void {
    this.initializeForm();
    this.collapse.emit(true);
  }

  get invalidName(): boolean {
    return (
      this.formSubcategory.get('name').invalid &&
      this.formSubcategory.get('name').touched
    );
  }
  get invalidDescription(): boolean {
    return (
      this.formSubcategory.get('description').invalid &&
      this.formSubcategory.get('description').touched
    );
  }

  setImageUrl(imageUrl: string): void {
    if (imageUrl) {
      this.invalidUrl = false;
    } else {
      this.invalidUrl = true;
    }
    this.formSubcategory.get('imageUrl').setValue(imageUrl);
  }

  addImage(src: FileUploadResponse): void {
    this.imageRadioSubcategory.addImage(src);
  }

  get getName(): string {
    return this.formSubcategory.get('name').value;
  }

  get getDescription(): string {
    return this.formSubcategory.get('description').value;
  }

  get getImageUrl(): string {
    return this.formSubcategory.get('imageUrl').value;
  }

  get getCategoryId(): number {
    return this.formSubcategory.get('categoryId').value;
  }

  get getSubcategoryId(): number {
    return this.formSubcategory.get('subcategoryId').value;
  }

  get getSubcategoryCarerId(): number {
    return this.formSubcategory.get('subcategoryCarerId').value;
  }

  validateForm(): void {
    if (this.formSubcategory.invalid) {
      return Object.values(this.formSubcategory.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
  }
}
