import { Carer } from './../../../controller/interfaces/carer.interface';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PictogramCarer,
  PictogramHelperCarer,
} from 'src/app/controller/interfaces/pictogram.interface';
import { SubcategoryCarer } from 'src/app/controller/interfaces/subcategory.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { Helper } from 'src/app/controller/interfaces/helper.irterface';
import {
  Category,
  CategoryCarer,
} from 'src/app/controller/interfaces/category.interface';
import { MessagesComponent } from '../../components/messages/messages.component';
import { GridDragDropComponent } from '../grid-drag-drop/grid-drag-drop.component';

declare var ResizeObserver;

@Component({
  selector: 'app-edit-grid',
  templateUrl: './edit-grid.component.html',
  styleUrls: ['./edit-grid.component.scss'],
})
export class EditGridComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('gridContent') gridContent: ElementRef<HTMLElement>;
  @ViewChild('message') message: MessagesComponent;
  @ViewChild('gridPictogramsCarer') gridPictogramsCarer: GridDragDropComponent;
  @ViewChild('gridPictogramsHelper')
  gridPictogramsHelper: GridDragDropComponent;

  categoryId: number;
  carer: Carer;
  category: CategoryCarer;
  subcategories: SubcategoryCarer[];
  pictogramsCarer: PictogramCarer[] = [];
  pictogramsHelper: PictogramHelperCarer[] = [];
  helperId: number = 0;
  helpers: Helper[] = [];

  resizeObserver: any;

  constructor(
    private vitaapp: VitaappService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.categoryId = params.id;
      this.getAllSubcategoriesByCategoryId(this.categoryId);
      this.getCategoryById();
      this.getCarer();
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.widthPictogram();
    });

    this.resizeObserver.observe(this.gridContent.nativeElement);
  }

  ngAfterViewChecked() {
    this.widthPictogram();
  }

  ngOnDestroy(): void {
    this.resizeObserver.unobserve(this.gridContent.nativeElement);
  }

  getCarer(): void {
    this.vitaapp.meInformation().subscribe((data) => {
      this.carer = data;
      this.getHelpersByCarerId(this.carer.carerId);
    });
  }

  getCategoryById(): void {
    this.vitaapp.getCategoryCarerById(this.categoryId).subscribe((data) => {
      this.category = data;
      if (this.category.helperId) {
        this.helperId = this.category.helperId;
        this.getAllPictogramsByHelperId(this.helperId);
      }
    });
  }

  saveDataGrid(): void {
    if (this.helperId) {
      this.category.helperId = this.helperId;
      this.vitaapp.editCategoryCarer(this.category).subscribe(
        (resp) => {
          const msg = {
            severity: 'success',
            summary: 'Realizado',
            detail: 'Se asigno la ayuda a la categoria.',
          };
          this.message.createMessage(msg);
        },
        (err) => {
          const msg = {
            severity: 'error',
            summary: 'Error',
            detail: 'Error al asignar la ayuda a la categoria.',
          };
          this.message.createMessage(msg);
        }
      );
    }

    if (this.gridPictogramsCarer.getChange) {
      this.vitaapp
        .editPositionPictogram(this.gridPictogramsCarer.getPictogramsCarer)
        .subscribe(
          (resp) => {
            this.gridPictogramsCarer.setChange = false;
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: resp.message,
            };
            this.message.createMessage(msg);
          },
          (err) => {
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: err.error.message,
            };
            this.message.createMessage(msg);
          }
        );
    }

    if (this.gridPictogramsHelper.getChange) {
      this.vitaapp
        .editPositionPictogramHelper(
          this.gridPictogramsHelper.getPictogramsHelper
        )
        .subscribe(
          (resp) => {
            this.gridPictogramsHelper.setChange = false;
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: resp.message,
            };
            this.message.createMessage(msg);
          },
          (err) => {
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: err.error.message,
            };
            this.message.createMessage(msg);
          }
        );
    }
  }

  getAllSubcategoriesByCategoryId(categoryId: number): void {
    this.vitaapp
      .getAllSubcategoriesCarerByCategoryId(categoryId)
      .subscribe((data) => {
        this.subcategories = data;
        this.subcategories.forEach((subcategory) => {
          subcategory.color = '9EF9FF';
        });
        if (this.subcategories.length) {
          this.getPictogramsBySubcategoryId(
            this.subcategories[0].subcategoryCarerId
          );
        }
      });
  }

  getPictogramsBySubcategoryId(subcategoryId: number): void {
    this.vitaapp
      .getAllPictogramsCarerBySubcategoryId(subcategoryId)
      .subscribe((data) => {
        this.pictogramsCarer = data;
        this.gridPictogramsCarer.setChange = false;
      });
  }

  getHelpersByCarerId(carerId: number): void {
    this.vitaapp.getHelpersByCarerId(carerId).subscribe((data) => {
      this.helpers = data;
      this.gridPictogramsHelper.setChange = false;
    });
  }

  getAllPictogramsByHelperId(id: number): void {
    this.vitaapp.getAllPictogramsByHelperId(id).subscribe((data) => {
      this.pictogramsHelper = data;
      console.log(data);
    });
  }

  widthPictogram(): void {
    const widthGridContent = this.gridContent.nativeElement.offsetWidth;
    const widthWindow = window.innerWidth;
    const items = this.gridContent.nativeElement.getElementsByClassName(
      'content-pictogram-grid__card'
    );

    for (let element of items) {
      const htmlElement: HTMLElement = element as HTMLElement;
      if (widthWindow >= 1200) {
        htmlElement.style.width = `calc(${
          (widthGridContent * 7.6923) / 100
        }px - 0.5rem)`;
      } else if (widthWindow >= 768) {
        htmlElement.style.width = `calc(${
          (widthGridContent * 11.111111) / 100
        }px - 0.5rem)`;
      } else if (widthWindow >= 576) {
        htmlElement.style.width = `calc(${
          (widthGridContent * 20) / 100
        }px - 0.5rem)`;
      } else if (widthWindow >= 365) {
        htmlElement.style.width = `calc(${
          (widthGridContent * 25) / 100
        }px - 0.5rem)`;
      } else {
        htmlElement.style.width = `calc(${
          (widthGridContent * 33.33333) / 100
        }px - 0.5rem)`;
      }
    }
  }
}
