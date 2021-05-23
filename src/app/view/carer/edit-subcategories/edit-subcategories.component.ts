import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Category } from 'src/app/controller/interfaces/category.interface';
import {
  Subcategory,
  SubcategoryCarer,
} from 'src/app/controller/interfaces/subcategory.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';
import { EditSubcategoryComponent } from '../../forms/subcategory/edit-subcategory/edit-subcategory.component';

@Component({
  selector: 'app-edit-subcategories',
  templateUrl: './edit-subcategories.component.html',
  styleUrls: ['./edit-subcategories.component.scss'],
})
export class EditSubcategoriesComponent implements OnInit {
  @ViewChild('panel') panel: CollapsePanelComponent;
  @ViewChild('editSubcategory') editSubcategory: EditSubcategoryComponent;
  subMenuNavigation = ['Categorias', 'Subcategoria'];
  pageCurrent: string;

  idEdit = -1;

  categoryId: number;
  subcategoriesCarer: SubcategoryCarer[] = [];
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
      this.categoryId = params.id;
      this.getSubcategoriesCarer();
    });
  }

  getSubcategoriesCarer(): void {
    this.vitaapp
      .getAllSubcategoriesCarerByCategoryId(this.categoryId)
      .subscribe((data) => {
        this.subcategoriesCarer = data;
      });
  }

  updateSubcategory(subcategory: SubcategoryCarer): void {
    this.editSubcategory.subcategoryToEdit(subcategory);
    this.panel.openPanel();
  }

  showPictograms(i: number): void {
    debugger;
    this.router.navigate(['panel/editar-pictogramas', i]);
  }

  selectSubcategories(): void {
    this.router.navigate(['/panel/seleccionar-subcategorias', this.categoryId]);
  }

  collapsePanel(): void {
    this.panel.closePanel();
  }

  editGrid(): void {
    this.router.navigate(['/panel/editar-grid', this.categoryId]);
  }

  deleteSubcategory(subcategoryId: number): void {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar la subcategoria.',
      header: 'Quiere eliminar la subcategoria',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.vitaapp.deleteSubcategory(subcategoryId).subscribe(
          (resp) => {
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: 'Se elimino la subcategoria.',
            };
            this.showMessage(msg);
            this.getSubcategoriesCarer();
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

  goToCategories(index: number): void {
    if (index == 0) {
      this.router.navigateByUrl('/panel/editar-categorias');
    }
  }
}
