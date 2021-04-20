import { CategoryGet } from './../../../controller/interfaces/category_get.interface';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-elderly-categories',
  templateUrl: './elderly-categories.component.html',
  styleUrls: ['./elderly-categories.component.scss'],
})
export class ElderlyCategoriesComponent implements OnInit {
  @ViewChild('usersContainer') usersContainer: ElementRef<HTMLElement>;
  @ViewChild('categoriesContainer')
  categoriesContainer: ElementRef<HTMLElement>;
  category: CategoryGet = {
    categoryId: 1,
    name: 'Hola',
    description: 'Hola Mundo',
    colorId: 1,
    color: '17a2b8',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/vitaapp-ucuenca.appspot.com/o/pictograms%2Fimages%2Fbr%C3%B3coli.png?alt=media&token=07f1659f-ae88-4524-b09d-d479342a9ae9',
  };
  constructor() {}

  ngOnInit(): void {}

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
        this.categoriesContainer.nativeElement.style.width = 100 + '%';
        this.categoriesContainer.nativeElement.style.height = 'auto';
        this.usersContainer.nativeElement.style.width = '0';
        this.usersContainer.nativeElement.style.height = '0';
      } else {
        this.categoriesContainer.nativeElement.style.width = '0';
        this.categoriesContainer.nativeElement.style.height = '0';
        this.usersContainer.nativeElement.style.width = 100 + '%';
        this.usersContainer.nativeElement.style.height = 'auto';
      }
    }
  }
}
