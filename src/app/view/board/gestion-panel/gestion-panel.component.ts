import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-panel',
  templateUrl: './gestion-panel.component.html',
  styleUrls: ['./gestion-panel.component.scss'],
})
export class GestionPanelComponent implements OnInit {
  pictograms = [
    {
      type: 'pic',
      name: 'Borrar Todo',
      imageUrl: 'assets/Images/delete-all.png',
      color: 'FFE4AE',
      position: 0,
    },
    {
      type: 'pic',
      name: 'Borrar',
      imageUrl: 'assets/Images/delete.png',
      color: 'FFE4AE',
      position: 1,
    },
    {
      type: 'pic',
      name: 'Enviar',
      imageUrl: 'assets/Images/entregar.png',
      color: 'B7FF9E',
      position: 2,
    },
    {
      type: 'msg',
      index: 3,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  items = [];

  change = false;

  drop(event: CdkDragDrop<any>) {
    this.change = true;

    this.pictograms[event.previousContainer.data.index] =
      event.container.data.item;
    this.pictograms[event.container.data.index] =
      event.previousContainer.data.item;
    console.log(this.pictograms);
  }

  get getPictogramsCarer(): any[] {
    return this.pictograms.map((pictogram, index) => {
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
}
