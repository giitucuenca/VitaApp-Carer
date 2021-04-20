import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryGet } from 'src/app/controller/interfaces/category_get.interface';

@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.component.html',
  styleUrls: ['./select-categories.component.scss'],
})
export class SelectCategoriesComponent implements OnInit {
  category: CategoryGet = {
    categoryId: 1,
    name: 'Hola',
    description: 'Hola Mundo',
    colorId: 1,
    color: '17a2b8',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/vitaapp-ucuenca.appspot.com/o/pictograms%2Fimages%2Fbr%C3%B3coli.png?alt=media&token=07f1659f-ae88-4524-b09d-d479342a9ae9',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showOption(): void {
    this.router.navigate(['panel/editar-categorias']);
  }
}
