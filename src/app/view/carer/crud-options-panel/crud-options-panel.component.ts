import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-crud-options-panel',
  templateUrl: './crud-options-panel.component.html',
  styleUrls: ['./crud-options-panel.component.scss'],
})
export class CrudOptionsPanelComponent implements OnInit {
  showHeader = true;
  subscriberRouter: any;
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
