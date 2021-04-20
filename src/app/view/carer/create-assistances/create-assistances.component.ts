import { CategoryGet } from './../../../controller/interfaces/category_get.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-assistances',
  templateUrl: './create-assistances.component.html',
  styleUrls: ['./create-assistances.component.scss'],
})
export class CreateAssistancesComponent implements OnInit {
  @ViewChild('updatePanel') updatePanel: CollapsePanelComponent;
  category: CategoryGet = {
    categoryId: 1,
    name: 'Hola',
    description: 'Hola Mundo',
    colorId: 1,
    color: '17a2b8',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/vitaapp-ucuenca.appspot.com/o/pictograms%2Fimages%2Fbr%C3%B3coli.png?alt=media&token=07f1659f-ae88-4524-b09d-d479342a9ae9',
  };
  constructor(private router: Router) {}

  ngOnInit(): void {}

  updateCategory(idEdit: number): void {
    this.updatePanel.openPanel();
  }

  showSelectAsistense(idAsistense: number): void {
    this.router.navigate(['ayuda/seleccionar-ayudas', idAsistense]);
  }
}
