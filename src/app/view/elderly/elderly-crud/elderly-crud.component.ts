import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import { Elderly } from 'src/app/controller/interfaces/elderly.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { CollapsePanelComponent } from 'src/app/view/components/collapse-panel/collapse-panel.component';
import { ElderlyEditComponent } from '../elderly-edit/elderly-edit.component';

@Component({
  selector: 'app-elderly-crud',
  templateUrl: './elderly-crud.component.html',
  styleUrls: ['./elderly-crud.component.scss'],
})
export class ElderlyCrudComponent implements OnInit {
  showAddElderly = false;
  carer: Carer;
  @ViewChild('panel') panel: CollapsePanelComponent;
  @ViewChild('editElderlyForm') editElderlyForm: ElderlyEditComponent;

  elderlies: Elderly[] = [];

  constructor(
    private vitaapp: VitaappService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.vitaapp.meInformation().subscribe((carer: Carer) => {
      this.carer = carer;
      this.getElderlies();
    });
  }

  getElderlies(): void {
    this.vitaapp.getAllElderlies(this.carer.carerId).subscribe((elderlies) => {
      this.elderlies = elderlies;
      console.log(elderlies);
    });
  }

  setShowAddElderly(): void {
    this.showAddElderly = !this.showAddElderly;
  }

  editElderly(elderly: Elderly): void {
    this.editElderlyForm.elderlyToEdit(elderly);
    this.panel.openPanel();
  }

  collapsePanel(): void {
    this.panel.closePanel();
  }

  deleteElderly(elderlyId: number): void {
    this.confirmationService.confirm({
      message:
        'Esta seguro que desea eliminar el pictograma, recuerde que se efectuara un eliminado lógico.',
      header: 'Quiere Eliminar el Pictograma',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.vitaapp.deleteElderly(elderlyId).subscribe(
          (resp) => {
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: 'Se elimino el pictograma.',
            };
            this.showMessage(msg);
            this.getElderlies();
          },
          (err) => {
            const msg = {
              severity: 'error',
              summary: 'Error',
              detail: err.message,
            };
            this.showMessage(msg);
          }
        );
      },
      reject: () => {
        const msg = {
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Se canceló el eliminado.',
        };
        this.showMessage(msg);
      },
      key: 'positionDialog',
    });
  }

  showMessage(msg: Message) {
    this.messageService.add({
      key: 'toastElderlyCrud',
      ...msg,
    });
  }
}
