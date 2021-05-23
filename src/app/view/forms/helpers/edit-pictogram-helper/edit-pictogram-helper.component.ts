import { PictogramHelperCarer } from './../../../../controller/interfaces/pictogram.interface';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ImagesRadioComponent } from 'src/app/view/components/images-radio/images-radio.component';
import { MessagesComponent } from 'src/app/view/components/messages/messages.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import {
  FileUploadResponse,
  ImagePictogram,
} from 'src/app/controller/interfaces/image.interface';

@Component({
  selector: 'app-edit-pictogram-helper',
  templateUrl: './edit-pictogram-helper.component.html',
  styleUrls: ['./edit-pictogram-helper.component.scss'],
})
export class EditPictogramHelperComponent implements OnInit {
  @Output() reload = new EventEmitter<boolean>();
  @ViewChild('imageRadioPictogram') imageRadioPictogram: ImagesRadioComponent;
  @Output() collapse = new EventEmitter<boolean>();
  @ViewChild('message') message: MessagesComponent;
  pictogram: PictogramHelperCarer;

  invalidUrl = false;
  formPictogram: FormGroup;
  constructor(
    private vitaapp: VitaappService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  savePictogram(): void {
    this.setImageUrl(this.imageRadioPictogram.imagePrimary);
    if (this.formPictogram.valid) {
      const pictogram: PictogramHelperCarer = {
        pictogramId: this.getPictogramId,
        pictogramCarerId: this.getPictogramCarerId,
        name: this.getName,
        imageUrl: this.getImageUrl,
        helperId: this.getHelperId,
        position: this.getPosition,
      };
      console.log(pictogram);

      this.vitaapp.editPictogramCarerHelper(pictogram).subscribe(
        (resp) => {
          console.log(resp);
          this.reload.emit(true);
          this.collapsePanel();
          const msg = {
            severity: 'success',
            summary: 'Realizado',
            detail: 'Se modificó el pictograma correctamente.',
          };
          this.message.createMessage(msg);
          //Notify('Pictograma modificado correctamente.', null, null, 'success');
        },
        (err) => {
          console.log(err);
          const msg = {
            severity: 'error',
            summary: 'Error',
            detail: 'Error al modificar el pictograma.',
          };
          this.message.createMessage(msg);
          //Notify('Error al pictograma un pictograma.', null, null, 'danger');
        }
      );
    } else {
      this.validateForm();
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
    this.formPictogram = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      helperId: ['', Validators.required],
      pictogramId: ['', Validators.required],
      position: ['', Validators.required],
      pictogramCarerId: ['', Validators.required],
    });
    if (this.imageRadioPictogram) {
      this.imageRadioPictogram.emptyImages();
    }
  }

  pictogramToEdit(pictogram: PictogramHelperCarer): void {
    this.initializeForm();
    this.formPictogram.get('helperId').setValue(pictogram.helperId);
    this.pictogram = pictogram;
    this.formPictogram.get('name').setValue(pictogram.name);
    this.formPictogram.get('imageUrl').setValue(pictogram.imageUrl);
    this.formPictogram.get('pictogramId').setValue(pictogram.pictogramId);
    this.formPictogram.get('position').setValue(pictogram.position);
    this.formPictogram
      .get('pictogramCarerId')
      .setValue(pictogram.pictogramCarerId);
    this.vitaapp
      .getImagesPictogramsHelp(pictogram.pictogramId)
      .subscribe((images) => {
        images.forEach((image: ImagePictogram) => {
          const name = image.name;
          const imageUrl = image.imageUrl;
          const imageUpload: FileUploadResponse = {
            name,
            imageUrl,
          };
          this.imageRadioPictogram.images.push(imageUpload);
        });
      });
    console.log(pictogram);

    this.imageRadioPictogram.principalImage = pictogram.imageUrl;
  }

  collapsePanel(): void {
    this.initializeForm();
    this.collapse.emit(true);
  }

  get invalidName(): boolean {
    return (
      this.formPictogram.get('name').invalid &&
      this.formPictogram.get('name').touched
    );
  }
  get invalidDescription(): boolean {
    return (
      this.formPictogram.get('description').invalid &&
      this.formPictogram.get('description').touched
    );
  }

  setImageUrl(imageUrl: string): void {
    if (imageUrl) {
      this.invalidUrl = false;
    } else {
      this.invalidUrl = true;
    }
    this.formPictogram.get('imageUrl').setValue(imageUrl);
  }

  get getName(): string {
    return this.formPictogram.get('name').value;
  }

  get getImageUrl(): string {
    return this.formPictogram.get('imageUrl').value;
  }

  get getHelperId(): number {
    return this.formPictogram.get('helperId').value;
  }

  get getPictogramId(): number {
    return this.formPictogram.get('pictogramId').value;
  }

  get getPictogramCarerId(): number {
    return this.formPictogram.get('pictogramCarerId').value;
  }

  get getPosition(): number {
    return this.formPictogram.get('position').value;
  }

  validateForm(): void {
    if (this.formPictogram.invalid) {
      return Object.values(this.formPictogram.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
  }
}
