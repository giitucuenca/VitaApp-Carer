import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import {
  Category,
  CategoryCarer,
} from 'src/app/controller/interfaces/category.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';

@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.component.html',
  styleUrls: ['./select-categories.component.scss'],
})
export class SelectCategoriesComponent implements OnInit {
  carer: Carer;
  categories: Category[] = [];
  categoriesCarer: CategoryCarer[] = [];

  constructor(private router: Router, private vitaapp: VitaappService) {}

  ngOnInit(): void {
    this.vitaapp.meInformation().subscribe((data) => {
      this.carer = data;
      this.getAllCategories();
    });
  }

  showOption(): void {
    this.router.navigate(['panel/editar-categorias']);
  }

  getAllCategories(): void {
    this.vitaapp.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addCategoryCarer(category: Category): void {
    const categoryCarer: CategoryCarer = {
      name: category.name,
      description: category.description,
      color: category.color,
      imageUrl: category.imageUrl,
      carerId: this.carer.carerId,
      categoryId: category.categoryId,
    };

    this.categoriesCarer.push(categoryCarer);
    console.log(this.categoriesCarer);
  }

  deleteCategoryCarer(index: number): void {
    this.categoriesCarer.splice(index, 1);
  }

  saveListCategories(): void {
    if (this.categoriesCarer.length) {
      this.vitaapp
        .saveListCategories(this.categoriesCarer)
        .subscribe((resp) => {
          this.showOption();
        });
    }
  }
}
