import { Component, OnInit, ViewChild } from '@angular/core';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';
import { Router } from '@angular/router';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import { CategoryCarer } from 'src/app/controller/interfaces/category.interface';
import { EditCategoryComponent } from '../../forms/category/edit-category/edit-category.component';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss'],
})
export class EditCategoriesComponent implements OnInit {
  @ViewChild('panel') panel: CollapsePanelComponent;
  @ViewChild('editCategory') editCategory: EditCategoryComponent;

  idEdit = -1;

  carer: Carer;

  categoriesCarer: CategoryCarer[] = [];

  subMenu = ['Categorias', 'Subcategoria', 'Pictogramas'];
  subMenuNavigation = ['Categorias'];
  pageCurrent: string;

  constructor(
    private router: Router,
    private vitaapp: VitaappService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.pageCurrent = this.subMenu[0];
    this.vitaapp.meInformation().subscribe((data) => {
      this.carer = data;
      this.getCategoriesCarer();
    });
  }

  getCategoriesCarer(): void {
    this.vitaapp.getAllCategoriesCarer(this.carer.carerId).subscribe((data) => {
      this.categoriesCarer = data;
      console.log(this.categoriesCarer);
    });
  }

  updateCategory(category: CategoryCarer): void {
    /*if (this.idEdit === idEdit || this.updatePanel.isCollapsed) {
      this.updatePanel.collapse();
    }
    this.idEdit = idEdit;*/
    console.log(category);
    this.editCategory.categoryToEdit(category);

    this.panel.openPanel();
  }

  showSubcategories(i: number): void {
    this.router.navigate(['panel/editar-subcategorias', i]);
  }

  collapsePanel(): void {
    this.panel.closePanel();
  }

  deleteCategory(categoryId: number): void {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar la categoria.',
      header: 'Quiere eliminar la categoria',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.vitaapp.deleteCategory(categoryId).subscribe(
          (resp) => {
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: 'Se elimino la categoria.',
            };
            this.showMessage(msg);
            this.getCategoriesCarer();
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
      key: 'toastCategory',
      ...msg,
    });
  }
  editGrid(categoryId: number): void {
    this.router.navigate(['/panel/editar-grid', categoryId]);
  }
}
