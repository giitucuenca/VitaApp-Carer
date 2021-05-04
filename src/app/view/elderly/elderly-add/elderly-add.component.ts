import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import { Elderly } from 'src/app/controller/interfaces/elderly.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';

@Component({
  selector: 'app-elderly-add',
  templateUrl: './elderly-add.component.html',
  styleUrls: ['./elderly-add.component.scss'],
})
export class ElderlyAddComponent implements OnInit {
  formElderly: FormGroup;
  carer: Carer;

  levels = [
    { id: 1, name: 'Primaria' },
    { id: 2, name: 'Secundaria' },
    { id: 3, name: 'Bachillerato' },
    { id: 4, name: 'Tecnólogo/a' },
    { id: 5, name: 'Unirversitaria' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private vitaapp: VitaappService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.vitaapp.meInformation().subscribe((carer) => {
      this.carer = carer;
    });
  }

  initializeForm(): void {
    this.formElderly = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      username: [
        '',
        [Validators.required, Validators.pattern('^[0-9a-zA-Z.]+$')],
      ],
      scholarityId: ['', [Validators.required]],
      laterality: ['d', [Validators.required]],
      gender: ['f', [Validators.required]],
      carerId: ['', [Validators.required]],
    });
  }

  saveElderly(): void {
    if (this.carer && this.carer.carerId) {
      this.formElderly.get('carerId').setValue(this.carer.carerId);
      if (this.formElderly.valid) {
        const elderly: Elderly = {
          name: this.formElderly.get('name').value,
          surname: this.formElderly.get('surname').value,
          scholarityId: this.formElderly.get('scholarityId').value,
          gender: this.formElderly.get('gender').value,
          laterality: this.formElderly.get('laterality').value,
          carerId: this.formElderly.get('carerId').value,
          username: this.formElderly.get('username').value,
          password: this.formElderly.get('username').value,
        };
        console.log(elderly);
        this.vitaapp.saveElderly(elderly).subscribe(
          (resp) => {
            const msg = {
              severity: 'success',
              summary: 'Enhorabuena',
              detail: resp.message,
            };
            this.showMessage(msg);
          },
          (error) => {
            error.error.errors.forEach((err: any) => {
              const msg = {
                severity: 'error',
                summary: 'Error',
                detail: err,
              };
              this.showMessage(msg);
            });
          }
        );
      } else {
        this.validForm();
        const msg = {
          severity: 'error',
          summary: 'Error',
          detail: 'Error revise la información del formulario.',
        };
        this.showMessage(msg);
      }
    } else {
      const msg = {
        severity: 'error',
        summary: 'Error',
        detail:
          'Error al obtener la información del cuidador, recargue la pagina por favor.',
      };
      this.showMessage(msg);
    }
  }

  get invalidName(): boolean {
    return (
      this.formElderly.get('name').invalid &&
      this.formElderly.get('name').touched
    );
  }
  get invalidSurname(): boolean {
    return (
      this.formElderly.get('surname').invalid &&
      this.formElderly.get('surname').touched
    );
  }
  get invalidUsername(): boolean {
    return (
      this.formElderly.get('username').invalid &&
      this.formElderly.get('username').touched
    );
  }
  get invalidScholarity(): boolean {
    return (
      this.formElderly.get('scholarityId').invalid &&
      this.formElderly.get('scholarityId').touched
    );
  }
  get invalidLaterality(): boolean {
    return (
      this.formElderly.get('laterality').invalid &&
      this.formElderly.get('laterality').touched
    );
  }
  get invalidGender(): boolean {
    return (
      this.formElderly.get('gender').invalid &&
      this.formElderly.get('gender').touched
    );
  }
  get invalidCarerId(): boolean {
    return (
      this.formElderly.get('carerId').invalid &&
      this.formElderly.get('carerId').touched
    );
  }

  validForm(): void {
    if (this.formElderly.invalid) {
      return Object.values(this.formElderly.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
  }

  showMessage(msg: Message) {
    this.messageService.add({
      key: 'toastElderlyAdd',
      ...msg,
    });
  }
}
