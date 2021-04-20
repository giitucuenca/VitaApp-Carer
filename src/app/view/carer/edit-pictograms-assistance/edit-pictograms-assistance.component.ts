import { Component, OnInit } from '@angular/core';
import { PictogramGet } from 'src/app/controller/interfaces/pictogram_get.interface';

@Component({
  selector: 'app-edit-pictograms-assistance',
  templateUrl: './edit-pictograms-assistance.component.html',
  styleUrls: ['./edit-pictograms-assistance.component.scss'],
})
export class EditPictogramsAssistanceComponent implements OnInit {
  pictogram: PictogramGet = {
    pictogramId: 1,
    name: 'Hola',
    color: '17a2b8',
    subcategoryId: 1,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/vitaapp-ucuenca.appspot.com/o/pictograms%2Fimages%2Fbr%C3%B3coli.png?alt=media&token=07f1659f-ae88-4524-b09d-d479342a9ae9',
  };
  constructor() {}

  ngOnInit(): void {}
}
