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
  selector: 'app-add-helper',
  templateUrl: './add-helper.component.html',
  styleUrls: ['./add-helper.component.scss'],
})
export class AddHelperComponent implements OnInit {
  @Output() reload = new EventEmitter<boolean>();
  @ViewChild('message') message: MessagesComponent;

  formHelper: FormGroup;

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

    this.formHelper = this.formBuilder.group({
      name: ['', [Validators.required]],
      imageUrl: [this.imageUrl, [Validators.required]],
      color: ['', [Validators.required]],
    });
  }

  saveHelper(): void {
    if (this.formHelper.valid && this.carer) {
      const helper: Helper = {
        name: this.formHelper.get('name').value,
        imageUrl: this.imageUrl,
        color: this.formHelper.get('color').value,
        carerId: this.carer.carerId,
      };

      this.vitaapp.saveHelper(helper).subscribe(
        (resp) => {
          console.log(resp);
          this.emitReload();

          const msg = {
            severity: 'success',
            summary: 'Realizado',
            detail: 'Se creo la ayuda correctamente.',
          };
          this.message.createMessage(msg);
        },
        (error) => {
          console.log(error);
          const msg = {
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear la ayuda.',
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
}
