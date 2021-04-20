import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PictogramGet } from 'src/app/controller/interfaces/pictogram_get.interface';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';

@Component({
  selector: 'app-edit-pictograms',
  templateUrl: './edit-pictograms.component.html',
  styleUrls: ['./edit-pictograms.component.scss'],
})
export class EditPictogramsComponent implements OnInit {
  @ViewChild('updatePanel') updatePanel: CollapsePanelComponent;
  idEdit = -1;
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

  updatePictogram(idEdit: number): void {
    /*if (this.idEdit === idEdit || this.updatePanel.isCollapsed) {
      this.updatePanel.collapse();
    }
    this.idEdit = idEdit;*/
    console.log(idEdit);

    this.updatePanel.openPanel();
  }
}
