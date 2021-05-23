import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';
import { PictogramCarer } from 'src/app/controller/interfaces/pictogram.interface';
import { EditPictogramComponent } from '../../forms/pictogram/edit-pictogram/edit-pictogram.component';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { SubcategoryCarer } from 'src/app/controller/interfaces/subcategory.interface';

@Component({
  selector: 'app-edit-pictograms',
  templateUrl: './edit-pictograms.component.html',
  styleUrls: ['./edit-pictograms.component.scss'],
})
export class EditPictogramsComponent implements OnInit {
  @ViewChild('panel') panel: CollapsePanelComponent;
  @ViewChild('editPictogram') editPictogram: EditPictogramComponent;
  subcategoryId: number;
  pictogramsCarer: PictogramCarer[] = [];
  idEdit = -1;
  subMenuNavigation = ['Categorias', 'Subcategoria', 'Pictogramas'];
  pageCurrent: string;

  constructor(
    private router: Router,
    private vitaapp: VitaappService,
    private activeRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.pageCurrent = this.subMenuNavigation[2];
    this.activeRoute.params.subscribe((params) => {
      this.subcategoryId = params.id;
      this.getPictogramsCarer();
    });
  }

  getPictogramsCarer(): void {
    this.vitaapp
      .getAllPictogramsCarerBySubcategoryId(this.subcategoryId)
      .subscribe((data) => {
        this.pictogramsCarer = data;
      });
  }

  updatePictogram(pictogram: PictogramCarer): void {
    /*if (this.idEdit === idEdit || this.updatePanel.isCollapsed) {
      this.updatePanel.collapse();
    }
    this.idEdit = idEdit;*/
    this.editPictogram.pictogramToEdit(pictogram);

    this.panel.openPanel();
  }

  selectPictograms(): void {
    this.router.navigate([
      '/panel/seleccionar-pictogramas',
      this.subcategoryId,
    ]);
  }

  collapsePanel(): void {
    this.panel.closePanel();
  }

  deletePictogram(pictogramId: number): void {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar el pictograma.',
      header: 'Quiere eliminar el pictograma.',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.vitaapp.deletePictogram(pictogramId).subscribe(
          (resp) => {
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: 'Se elimino el pictograma.',
            };
            this.showMessage(msg);
            this.getPictogramsCarer();
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
      key: 'toastPictogram',
      ...msg,
    });
  }

  goToPage(index: number): void {
    if (index == 0) {
      this.router.navigateByUrl('/panel/editar-categorias');
    } else if (index == 1) {
      this.vitaapp
        .getSubcategoryCarerById(this.subcategoryId)
        .subscribe((subcategory: SubcategoryCarer) => {
          this.router.navigate([
            '/panel/editar-subcategorias/',
            subcategory.categoryId,
          ]);
        });
    }
  }
}
