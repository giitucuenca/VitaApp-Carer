import { HorizontalCollapsePanelComponent } from './../../components/horizontal-collapse-panel/horizontal-collapse-panel.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild('collapsePanel') panel: HeaderComponent;
  isCollapsed = false;
  constructor() {}

  ngOnInit(): void {}

  collapse(): void {
    console.log('hola');

    this.panel.collapse();
    this.isCollapsed = this.panel.isCollapsed;
  }
}
