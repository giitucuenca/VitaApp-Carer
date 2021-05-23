import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  PictogramCarer,
  PictogramHelperCarer,
} from 'src/app/controller/interfaces/pictogram.interface';

@Component({
  selector: 'app-grid-drag-drop',
  templateUrl: './grid-drag-drop.component.html',
  styleUrls: ['./grid-drag-drop.component.scss'],
})
export class GridDragDropComponent implements OnInit {
  items = [];

  change = false;
  @Input() pictogramsCarer: PictogramCarer[] = [];
  @Input() pictogramsHelper: PictogramHelperCarer[] = [];
  drop(event: CdkDragDrop<any>) {
    this.change = true;
    if (this.pictogramsCarer.length) {
      this.pictogramsCarer[event.previousContainer.data.index] =
        event.container.data.item;
      this.pictogramsCarer[event.container.data.index] =
        event.previousContainer.data.item;
      console.log(this.pictogramsCarer);
    } else if (this.pictogramsHelper.length) {
      this.pictogramsHelper[event.previousContainer.data.index] =
        event.container.data.item;
      this.pictogramsHelper[event.container.data.index] =
        event.previousContainer.data.item;
    }
  }

  get getPictogramsCarer(): PictogramCarer[] {
    return this.pictogramsCarer.map((pictogram, index) => {
      pictogram.position = index;
      return pictogram;
    });
  }

  get getPictogramsHelper(): PictogramHelperCarer[] {
    return this.pictogramsHelper.map((pictogram, index) => {
      pictogram.position = index;
      return pictogram;
    });
  }

  set setChange(change: boolean) {
    this.change = change;
  }

  get getChange(): boolean {
    return this.change;
  }

  ngOnInit(): void {}
}
