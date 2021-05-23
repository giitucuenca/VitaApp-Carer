import { Component, OnInit, ViewChild } from '@angular/core';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';
import { Router } from '@angular/router';
import { Helper } from 'src/app/controller/interfaces/helper.irterface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import { EditHelperComponent } from '../../forms/helpers/edit-helper/edit-helper.component';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-assistances',
  templateUrl: './create-assistances.component.html',
  styleUrls: ['./create-assistances.component.scss'],
})
export class CreateAssistancesComponent implements OnInit {
  @ViewChild('editHelper') editHelper: EditHelperComponent;
  @ViewChild('panel') panel: CollapsePanelComponent;

  helpersCarer: Helper[] = [];
  carer: Carer;

  subMenuNavigation = ['Ayudas'];
  pageCurrent: string;

  constructor(
    private router: Router,
    private vitaapp: VitaappService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.pageCurrent = this.subMenuNavigation[0];
    this.vitaapp.meInformation().subscribe((data) => {
      this.carer = data;
      this.getHelpersByCarerId();
    });
  }

  updateCategory(helper: Helper): void {
    this.panel.openPanel();
    this.editHelper.helperToEdit(helper);
  }

  getHelpersByCarerId(): void {
    console.log(this.carer);

    this.vitaapp.getHelpersByCarerId(this.carer.carerId).subscribe((data) => {
      console.log(data);

      this.helpersCarer = data;
    });
  }

  showSelectAsistense(idAsistense: number): void {
    this.router.navigate(['ayuda/editar-ayuda', idAsistense]);
  }

  collapsePanel(): void {
    this.panel.closePanel();
  }

  deleteHelper(helperId: number): void {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar la ayuda.',
      header: 'Quiere eliminar la ayuda',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.vitaapp.deleteHelper(helperId).subscribe(
          (resp) => {
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: 'Se elimino la ayuda.',
            };
            this.showMessage(msg);
            this.getHelpersByCarerId();
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
      key: 'toastHelper',
      ...msg,
    });
  }
}
