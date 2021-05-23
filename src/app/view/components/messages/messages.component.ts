import { Component, OnInit } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  createMessage(message: Message) {
    this.showMessage(message);
  }

  showMessage(msg: Message) {
    this.messageService.add({
      key: 'toastMessage',
      ...msg,
    });
  }
}
