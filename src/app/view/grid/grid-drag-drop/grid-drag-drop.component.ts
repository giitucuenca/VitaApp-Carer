import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { PictogramGet } from 'src/app/controller/interfaces/pictogram_get.interface';

@Component({
  selector: 'app-grid-drag-drop',
  templateUrl: './grid-drag-drop.component.html',
  styleUrls: ['./grid-drag-drop.component.scss'],
})
export class GridDragDropComponent implements OnInit {
  items = [];
  pictogram: PictogramGet = {
    pictogramId: 1,
    name: 'Hola',
    color: '17a2b8',
    subcategoryId: 1,
    position: 1,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/vitaapp-ucuenca.appspot.com/o/pictograms%2Fimages%2Fbr%C3%B3coli.png?alt=media&token=07f1659f-ae88-4524-b09d-d479342a9ae9',
  };
  drop(event: CdkDragDrop<any>) {
    this.items[event.previousContainer.data.index] = event.container.data.item;
    this.items[event.container.data.index] = event.previousContainer.data.item;
    console.log(this.items);
  }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      const pictogram = { ...this.pictogram };
      pictogram.position = i;
      this.items.push(pictogram);
    }
  }
}
