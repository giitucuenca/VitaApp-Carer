import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud-assistances',
  templateUrl: './crud-assistances.component.html',
  styleUrls: ['./crud-assistances.component.scss'],
})
export class CrudAssistancesComponent implements OnInit, OnDestroy {
  showHeader = true;
  subscriberRouter: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showHeader = this.router.url !== '/ayuda/crear-ayuda';
    this.subscriberRouter = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.router.url !== '/ayuda/crear-ayuda';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriberRouter) {
      this.subscriberRouter.unsubscribe();
    }
  }
}
