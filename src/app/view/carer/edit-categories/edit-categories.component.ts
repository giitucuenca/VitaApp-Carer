import { CategoryGet } from './../../../controller/interfaces/category_get.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CollapsePanelComponent } from '../../components/collapse-panel/collapse-panel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss'],
})
export class EditCategoriesComponent implements OnInit {
  @ViewChild('updatePanel') updatePanel: CollapsePanelComponent;
  idEdit = -1;
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
    /*if (this.idEdit === idEdit || this.updatePanel.isCollapsed) {
      this.updatePanel.collapse();
    }
    this.idEdit = idEdit;*/
    console.log(idEdit);

    this.updatePanel.openPanel();
  }

  showSubcategories(i: number): void {
    this.router.navigate(['panel/editar-subcategorias', i]);
  }
}
