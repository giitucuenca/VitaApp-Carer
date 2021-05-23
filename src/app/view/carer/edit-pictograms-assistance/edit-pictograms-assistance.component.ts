import { EditPictogramHelperComponent } from './../../forms/helpers/edit-pictogram-helper/edit-pictogram-helper.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Pictogram,
  PictogramHelperCarer,
} from 'src/app/controller/interfaces/pictogram.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';
import { EditCategoryComponent } from '../../forms/category/edit-category/edit-category.component';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-pictograms-assistance',
  templateUrl: './edit-pictograms-assistance.component.html',
  styleUrls: ['./edit-pictograms-assistance.component.scss'],
})
export class EditPictogramsAssistanceComponent implements OnInit {
  @ViewChild('panel') panel: CollapsePanelComponent;
  @ViewChild('editPictogram') editPictogram: EditPictogramHelperComponent;
  pictogramsHelper: PictogramHelperCarer[] = [];
  helperId: number;
  subMenuNavigation = ['Ayudas', 'Pictogramas'];
  pageCurrent: string;

  constructor(
    private router: Router,
    private vitaapp: VitaappService,
    private activeRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.pageCurrent = this.subMenuNavigation[1];
    this.activeRoute.params.subscribe((params) => {
      this.helperId = params.id;
      this.getPictogramsByHelperId();
    });
  }

  selectHelpers(): void {
    this.router.navigate(['ayuda/seleccionar-ayudas/', this.helperId]);
  }

  getPictogramsByHelperId(): void {
    this.vitaapp.getAllPictogramsByHelperId(this.helperId).subscribe(
      (data) => {
        this.pictogramsHelper = data;
      },
      (err) => {
        this.router.navigateByUrl('/error');
      }
    );
  }

  updatePictogram(pictogram: PictogramHelperCarer) {
    this.editPictogram.pictogramToEdit(pictogram);
    this.panel.openPanel();
  }

  collapsePanel(): void {
    this.panel.closePanel();
  }

  deletePictogramHelperCarer(pictogramId: number): void {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar el pictograma.',
      header: 'Quiere eliminar el pictograma',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.vitaapp.deletePictogramHelper(pictogramId).subscribe(
          (resp) => {
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: 'Se elimino el pictograma.',
            };
            this.showMessage(msg);
            this.getPictogramsByHelperId();
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
      key: 'toastPictogramHelper',
      ...msg,
    });
  }

  goToHelpers(): void {
    this.router.navigateByUrl('/ayuda/crear-ayuda');
  }
}
