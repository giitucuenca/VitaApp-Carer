import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import { Elderly } from 'src/app/controller/interfaces/elderly.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';

@Component({
  selector: 'app-elderly-edit',
  templateUrl: './elderly-edit.component.html',
  styleUrls: ['./elderly-edit.component.scss'],
})
export class ElderlyEditComponent implements OnInit {
  formElderly: FormGroup;
  carer: Carer;
  elderly: Elderly;
  @Output() reload = new EventEmitter<boolean>();
  @Output() collapse = new EventEmitter<boolean>();

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
      elderlyId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      scholarityId: ['', [Validators.required]],
      laterality: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  collapsePanel(): void {
    this.initializeForm();
    this.collapse.emit(true);
  }

  saveElderly(): void {
    if (this.formElderly.valid) {
      const elderly: Elderly = {
        elderlyId: this.formElderly.get('elderlyId').value,
        name: this.formElderly.get('name').value,
        surname: this.formElderly.get('surname').value,
        scholarityId: this.formElderly.get('scholarityId').value,
        gender: this.formElderly.get('gender').value,
        laterality: this.formElderly.get('laterality').value,
      };
      console.log(elderly);
      this.vitaapp.editElderly(elderly).subscribe(
        (resp) => {
          const msg = {
            severity: 'success',
            summary: 'Realizado',
            detail: resp.message,
          };

          this.showMessage(msg);
          this.reload.emit(true);
          this.collapsePanel();
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
  }

  elderlyToEdit(elderly: Elderly): void {
    this.elderly = elderly;
    this.formElderly.get('elderlyId').setValue(this.elderly.elderlyId);
    this.formElderly.get('name').setValue(this.elderly.name);
    this.formElderly.get('surname').setValue(this.elderly.surname);
    this.formElderly.get('gender').setValue(this.elderly.gender);
    this.formElderly.get('laterality').setValue(this.elderly.laterality);
    this.formElderly.get('scholarityId').setValue(this.elderly.scholarityId);
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
