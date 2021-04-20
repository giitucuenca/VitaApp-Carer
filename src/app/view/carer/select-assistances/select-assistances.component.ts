import { EditPictogramsAssistanceComponent } from './../edit-pictograms-assistance/edit-pictograms-assistance.component';
import { CategoryGet } from './../../../controller/interfaces/category_get.interface';
import { Component, OnInit } from '@angular/core';
import { PictogramGet } from 'src/app/controller/interfaces/pictogram_get.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-assistances',
  templateUrl: './select-assistances.component.html',
  styleUrls: ['./select-assistances.component.scss'],
})
export class SelectAssistancesComponent implements OnInit {
  pictogram: PictogramGet = {
    pictogramId: 1,
    name: 'Hola',
    color: '17a2b8',
    subcategoryId: 1,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/vitaapp-ucuenca.appspot.com/o/pictograms%2Fimages%2Fbr%C3%B3coli.png?alt=media&token=07f1659f-ae88-4524-b09d-d479342a9ae9',
  };
  constructor(private router: Router) {}

  ngOnInit(): void {}

  editPictogramsAssistance(): void {
    this.router.navigate(['ayuda/editar-ayuda', 1]);
  }
}
