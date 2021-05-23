import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Pictogram,
  PictogramCarer,
} from 'src/app/controller/interfaces/pictogram.interface';
import { SubcategoryCarer } from 'src/app/controller/interfaces/subcategory.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';

@Component({
  selector: 'app-select-pictograms',
  templateUrl: './select-pictograms.component.html',
  styleUrls: ['./select-pictograms.component.scss'],
})
export class SelectPictogramsComponent implements OnInit {
  subcategoryId: number;
  pictogramsCarer: PictogramCarer[] = [];
  pictograms: Pictogram[] = [];

  constructor(
    private router: Router,
    private vitaapp: VitaappService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.subcategoryId = data.id;

      this.vitaapp
        .getSubcategoryCarerById(this.subcategoryId)
        .subscribe((subcategory: SubcategoryCarer) => {
          this.vitaapp
            .getAllPictogramsBySubcategoryId(subcategory.subcategoryId)
            .subscribe((data) => {
              this.pictograms = data;
            });
        });
    });
  }

  showOption(): void {
    this.router.navigate(['panel/editar-pictogramas', this.subcategoryId]);
  }

  addPictogramCarer(pictogram: Pictogram): void {
    const pictogramCarer: PictogramCarer = {
      name: pictogram.name,
      imageUrl: pictogram.imageUrl,
      subcategoryId: this.subcategoryId,
      color: pictogram.color,
      pictogramId: pictogram.pictogramId,
    };

    this.pictogramsCarer.push(pictogramCarer);
  }

  deletePictogramCarer(index: number): void {
    this.pictogramsCarer.splice(index, 1);
  }

  saveListPictograms(): void {
    console.log(this.pictogramsCarer);

    if (this.pictogramsCarer.length) {
      this.vitaapp
        .saveListPictograms(this.pictogramsCarer)
        .subscribe((resp) => {
          this.showOption();
        });
    }
  }
}
