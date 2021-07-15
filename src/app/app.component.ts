import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { FirebaseService } from './services/firebase/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vitaapp-web-carer-ucuenca';
  constructor(private swUpdate: SwUpdate, private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.updatePWA();
    this.firebase.listenNotifications();
  }
  updatePWA() {
    this.swUpdate.available.subscribe((value) => {
      console.log('update', value);
      window.location.reload();
    });
  }
}
