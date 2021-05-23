import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import { CategoryCarer } from 'src/app/controller/interfaces/category.interface';
import {
  Subcategory,
  SubcategoryCarer,
} from 'src/app/controller/interfaces/subcategory.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';

@Component({
  selector: 'app-select-subcategories',
  templateUrl: './select-subcategories.component.html',
  styleUrls: ['./select-subcategories.component.scss'],
})
export class SelectSubcategoriesComponent implements OnInit {
  categoryId: number;
  carer: Carer;
  subcategoriesCarer: SubcategoryCarer[] = [];
  subcategories: Subcategory[] = [];

  constructor(
    private router: Router,
    private vitaapp: VitaappService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.categoryId = data.id;
      this.vitaapp
        .getCategoryCarerById(this.categoryId)
        .subscribe((category: CategoryCarer) => {
          this.vitaapp
            .getAllSubcategoriesByCategoryId(category.categoryId)
            .subscribe((data) => {
              this.subcategories = data;
            });
        });
    });
  }

  showOption(): void {
    this.router.navigate(['panel/editar-subcategorias', this.categoryId]);
  }

  addSubcategoryCarer(subcategory: Subcategory): void {
    const subcategoryCarer: SubcategoryCarer = {
      name: subcategory.name,
      description: subcategory.description,
      imageUrl: subcategory.imageUrl,
      subcategoryId: subcategory.subcategoryId,
      categoryId: this.categoryId,
      color: subcategory.color,
    };

    this.subcategoriesCarer.push(subcategoryCarer);
    console.log(this.subcategoriesCarer);
  }

  deleteSubcategoryCarer(index: number): void {
    this.subcategoriesCarer.splice(index, 1);
  }

  saveListSubcategories(): void {
    if (this.subcategoriesCarer.length) {
      this.vitaapp
        .saveListSubcategories(this.subcategoriesCarer)
        .subscribe((resp) => {
          this.showOption();
        });
    }
  }
}
