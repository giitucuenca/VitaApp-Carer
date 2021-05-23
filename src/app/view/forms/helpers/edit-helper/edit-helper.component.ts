import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import { Color } from 'src/app/controller/interfaces/color.interface';
import { Helper } from 'src/app/controller/interfaces/helper.irterface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { MessagesComponent } from 'src/app/view/components/messages/messages.component';

@Component({
  selector: 'app-edit-helper',
  templateUrl: './edit-helper.component.html',
  styleUrls: ['./edit-helper.component.scss'],
})
export class EditHelperComponent implements OnInit {
  @Output() reload = new EventEmitter<boolean>();
  @Output() collapse = new EventEmitter<boolean>();
  @ViewChild('message') message: MessagesComponent;

  formHelper: FormGroup;

  helper: Helper;

  colors: Color[] = [];

  carer: Carer;

  imageUrl: string =
    'https://firebasestorage.googleapis.com/v0/b/vitaapp-ucuenca.appspot.com/o/images-common%2Fayuda.png?alt=media&token=25229b24-c819-4c90-a3f5-a2784f0528d2';

  constructor(
    private formBuilder: FormBuilder,
    private vitaapp: VitaappService
  ) {}

  ngOnInit(): void {
    this.vitaapp.getColor().subscribe(
      (colors) => {
        this.colors = colors;
        console.log(colors);
      },
      (err) => console.log('error al cargar los colores')
    );

    this.vitaapp.meInformation().subscribe((data) => {
      this.carer = data;
    });

    this.initializeForm();
  }

  initializeForm(): void {
    this.formHelper = this.formBuilder.group({
      name: ['', [Validators.required]],
      imageUrl: [this.imageUrl, [Validators.required]],
      color: ['', [Validators.required]],
      helperId: ['', [Validators.required]],
      carerId: ['', [Validators.required]],
    });
  }

  saveHelper(): void {
    if (this.formHelper.valid) {
      const helper: Helper = {
        name: this.formHelper.get('name').value,
        imageUrl: this.formHelper.get('imageUrl').value,
        color: this.formHelper.get('color').value,
        carerId: this.formHelper.get('carerId').value,
        helperId: this.formHelper.get('helperId').value,
      };

      this.vitaapp.editHelper(helper).subscribe(
        (resp) => {
          this.collapsePanel();
          this.emitReload();
          const msg = {
            severity: 'success',
            summary: 'Realizado',
            detail: 'Se modificó la ayuda correctamente.',
          };
          this.message.createMessage(msg);
        },
        (error) => {
          console.log(error);
          const msg = {
            severity: 'error',
            summary: 'Error',
            detail: 'Error al modificar la ayuda.',
          };
          this.message.createMessage(msg);
        }
      );
    } else {
      this.validForm();
      const msg = {
        severity: 'error',
        summary: 'Error',
        detail: 'Revise la información del formulario.',
      };
      this.message.createMessage(msg);
    }
  }

  helperToEdit(helper: Helper): void {
    this.helper = helper;
    this.formHelper.get('name').setValue(helper.name);
    this.formHelper.get('color').setValue(helper.color);
    this.formHelper.get('imageUrl').setValue(helper.imageUrl);
    this.formHelper.get('carerId').setValue(helper.carerId);
    this.formHelper.get('helperId').setValue(helper.helperId);
  }

  emitReload(): void {
    this.reload.emit(true);
  }

  get invalidName(): boolean {
    return (
      this.formHelper.get('name').invalid && this.formHelper.get('name').touched
    );
  }

  get invalidImageUrl(): boolean {
    return (
      this.formHelper.get('imageUrl').invalid &&
      this.formHelper.get('imageUrl').touched
    );
  }

  get invalidColor(): boolean {
    return (
      this.formHelper.get('color').invalid &&
      this.formHelper.get('color').touched
    );
  }

  validForm(): void {
    if (this.formHelper.invalid) {
      return Object.values(this.formHelper.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
  }

  collapsePanel(): void {
    this.initializeForm();
    this.collapse.emit(true);
  }
}
