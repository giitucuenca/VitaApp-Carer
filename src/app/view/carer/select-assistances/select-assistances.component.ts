import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Pictogram,
  PictogramHelper,
  PictogramHelperCarer,
} from 'src/app/controller/interfaces/pictogram.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';

@Component({
  selector: 'app-select-assistances',
  templateUrl: './select-assistances.component.html',
  styleUrls: ['./select-assistances.component.scss'],
})
export class SelectAssistancesComponent implements OnInit {
  helperId: number;
  pictogramsHelper: PictogramHelper[] = [];
  pictogramsHelperCarer: PictogramHelperCarer[] = [];

  constructor(
    private router: Router,
    private vitaapp: VitaappService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.helperId = params.id;
      this.vitaapp.getAllPictogramsByHelperId(this.helperId).subscribe(
        (pictograms) => {
          this.vitaapp.getAllPictogramsHelper().subscribe((data) => {
            this.pictogramsHelper = data;
            this.pictogramsHelper.forEach((pictogram) => {
              pictogram.color = 'fff';
            });
          });
        },
        (err) => {
          this.router.navigateByUrl('/error');
        }
      );
    });
  }

  showOption(): void {
    this.router.navigate(['ayuda/editar-ayuda', this.helperId]);
  }

  addPictogramCarer(pictogram: PictogramHelper): void {
    const pictogramCarer: PictogramHelperCarer = {
      name: pictogram.name,
      imageUrl: pictogram.imageUrl,
      helperId: this.helperId,
      pictogramId: pictogram.pictogramId,
    };
    this.pictogramsHelperCarer.push(pictogramCarer);
  }

  deletePictogramCarer(index: number): void {
    this.pictogramsHelperCarer.splice(index, 1);
  }

  saveListPictograms(): void {
    console.log(this.pictogramsHelperCarer);

    if (this.pictogramsHelperCarer.length) {
      this.vitaapp
        .saveListPictogramsHelper(this.pictogramsHelperCarer)
        .subscribe((resp) => {
          this.showOption();
        });
    }
  }
}
