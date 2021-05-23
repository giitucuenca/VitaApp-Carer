import {
  Category,
  CategoryCarer,
} from 'src/app/controller/interfaces/category.interface';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  AfterViewChecked,
  HostListener,
} from '@angular/core';
import {
  Elderly,
  ElderlyCategory,
} from 'src/app/controller/interfaces/elderly.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import { MessagesComponent } from '../../components/messages/messages.component';

@Component({
  selector: 'app-elderly-categories',
  templateUrl: './elderly-categories.component.html',
  styleUrls: ['./elderly-categories.component.scss'],
})
export class ElderlyCategoriesComponent implements OnInit, AfterViewChecked {
  @ViewChild('usersContainer') usersContainer: ElementRef<HTMLElement>;
  @ViewChild('categoriesContainer')
  categoriesContainer: ElementRef<HTMLElement>;
  @ViewChild('message') message: MessagesComponent;
  charging = true;
  // @ViewChildren('checkCategory') checkCategories: ElementRef<HTMLInputElement>;
  checkedCategories: boolean[] = [];
  elderlies: Elderly[] = [];
  elderlyActive: Elderly;
  indexActive = -1;
  carer: Carer;
  categories: CategoryCarer[] = [];
  categoriesElderly: ElderlyCategory[] = [];
  showSave = true;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      const heightCategory =
        this.categoriesContainer.nativeElement.clientWidth ||
        this.categoriesContainer.nativeElement.clientWidth;
      // const heigthUser = this.usersContainer.nativeElement.clientHeight || this.usersContainer.nativeElement.clientWidth;
      if (!heightCategory) {
        if (this.showSave) {
          this.showSave = false;
        }
      } else {
        if (!this.showSave) {
          this.showSave = true;
        }
      }
    } else {
      if (!this.showSave) {
        this.showSave = true;
      }
    }
  }

  constructor(private vitaapp: VitaappService) {}

  ngOnInit(): void {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      this.showSave = false;
    } else {
      this.showSave = true;
    }
    this.getCarerInformation();
  }

  ngAfterViewChecked(): void {}

  getCarerInformation(): void {
    this.vitaapp.meInformation().subscribe((carer: Carer) => {
      this.carer = carer;
      this.getElderlies();
    });
  }

  getElderlies(): void {
    this.vitaapp.getAllElderlies(this.carer.carerId).subscribe((elderlies) => {
      this.elderlies = elderlies;
      if (this.elderlies.length) {
        this.elderlyActive = this.elderlies[0];
        this.indexActive = 0;
        this.getCategoriesByCarerId();
      }
      console.log(elderlies);
    });
  }

  getCategoriesByCarerId(): void {
    this.vitaapp
      .getAllCategoriesCarer(this.carer.carerId)
      .subscribe((categories) => {
        this.categories = categories;
        this.checkedCategories = this.categories.map(() => false);
        this.getCategoriesElderly(this.elderlyActive.elderlyId);
      });
  }

  getCategoriesElderly(elderlyId: number): void {
    this.charging = true;
    this.vitaapp.getCategoriesElderly(elderlyId).subscribe((data) => {
      this.categoriesElderly = data;
      for (let i = 0; i < this.categories.length; i++) {
        for (const elderlyCatergory of this.categoriesElderly) {
          if (
            this.categories[i].categoryCarerId === elderlyCatergory.categoryId
          ) {
            this.checkedCategories[i] = true;
          }
        }
      }
      this.charging = false;
    });
  }

  saveListElderlyCategories(): void {
    console.log(this.elderlyActive);
    console.log(this.checkedCategories);
    this.categoriesElderly = [];
    this.checkedCategories.forEach((value, index) => {
      if (value) {
        const elderlyId = this.elderlyActive.elderlyId;
        const categoryId = this.categories[index].categoryCarerId;
        const elderlyCategory: ElderlyCategory = {
          elderlyId,
          categoryId,
        };
        this.categoriesElderly.push(elderlyCategory);
      }
    });

    if (this.categoriesElderly.length) {
      this.vitaapp
        .saveElderlyCategory(
          this.elderlyActive.elderlyId,
          this.categoriesElderly
        )
        .subscribe(
          (resp) => {
            const msg = {
              severity: 'success',
              summary: 'Realizado',
              detail: 'Se asigno correctamente las categorias al adulto.',
            };
            this.message.createMessage(msg);
          },
          (error) => {
            console.log(error);

            const msg = {
              severity: 'error',
              summary: 'Error',
              detail: 'Error al relizar la petición.',
            };
            this.message.createMessage(msg);
          }
        );
    }
  }

  selectCategory(index: number, event: any) {
    if (event.currentTarget.checked) {
      this.checkedCategories[index] = true;
    } else {
      this.checkedCategories[index] = false;
    }
  }

  changeElderly(index: number) {
    if (index !== this.indexActive) {
      this.elderlyActive = this.elderlies[index];
      this.checkedCategories = this.categories.map(() => false);
      this.getCategoriesElderly(this.elderlyActive.elderlyId);
      this.indexActive = index;
    }
    this.openCategories();
  }

  openCategories(): void {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      const heightCategory =
        this.categoriesContainer.nativeElement.clientWidth ||
        this.categoriesContainer.nativeElement.clientWidth;
      // const heigthUser = this.usersContainer.nativeElement.clientHeight || this.usersContainer.nativeElement.clientWidth;

      if (!heightCategory) {
        this.showSave = true;
        this.categoriesContainer.nativeElement.style.width = 100 + '%';
        this.categoriesContainer.nativeElement.style.height = 'auto';
        this.usersContainer.nativeElement.style.width = '0';
        this.usersContainer.nativeElement.style.height = '0';
      } else {
        this.showSave = false;
        this.categoriesContainer.nativeElement.style.width = '0';
        this.categoriesContainer.nativeElement.style.height = '0';
        this.usersContainer.nativeElement.style.width = 100 + '%';
        this.usersContainer.nativeElement.style.height = 'auto';
      }
    }
  }
}
