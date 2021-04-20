import { CategoryGet } from './../../../controller/interfaces/category_get.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/controller/interfaces/category.interface';
import { SubcategoryGet } from 'src/app/controller/interfaces/subcategory_get.interface';
import { PictogramGet } from 'src/app/controller/interfaces/pictogram_get.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() category: CategoryGet;
  @Input() categoryView: CategoryGet;
  @Input() pictogramView: PictogramGet;
  @Input() subcategory: SubcategoryGet;
  @Input() pictogram: PictogramGet;
  @Output() clickEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickDelete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickContent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  clickedDelete(): void {
    this.clickDelete.emit(true);
  }

  clickedEdit(): void {
    this.clickEdit.emit(true);
  }

  clickedContent(): void {
    this.clickContent.emit(true);
  }
}
