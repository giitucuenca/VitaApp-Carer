import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChatRoom } from 'src/app/controller/interfaces/chat.interface';

import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MessagesComponent } from '../../components/messages/messages.component';

@Component({
  selector: 'app-messages-elderly',
  templateUrl: './messages-elderly.component.html',
  styleUrls: ['./messages-elderly.component.scss'],
})
export class MessagesElderlyComponent implements OnInit, OnDestroy {
  chatRooms = [];
  chatName = '';
  // items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  @ViewChild('messagesContainer')
  messagesContainer: ElementRef<HTMLElement>;
  @ViewChild('usersContainer') usersContainer: ElementRef<HTMLElement>;
  showSave = true;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      const heightCategory =
        this.messagesContainer.nativeElement.clientWidth ||
        this.messagesContainer.nativeElement.clientWidth;
      // const heigthUser = this.usersContainer.nativeElement.clientHeight || this.usersContainer.nativeElement.clientWidth;
      if (!heightCategory) {
        if (this.showSave) {
          this.showSave = false;
        }
      } else {
        if (!this.showSave) {
          this.showSave = true;
        }
      }
    } else {
      if (!this.showSave) {
        this.showSave = true;
      }
    }
  }

  constructor(public firebase: FirebaseService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.firebase.destroyChat();
  }

  openChat(chatRoom: ChatRoom) {
    this.chatName = chatRoom.chatName;
    this.firebase.setReadedChatroom(chatRoom);
    this.firebase.getCurrentChat(chatRoom.docId);
    this.openMessage();
  }

  openMessage(): void {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      const height =
        this.messagesContainer.nativeElement.clientWidth ||
        this.messagesContainer.nativeElement.clientWidth;
      // const heigthUser = this.usersContainer.nativeElement.clientHeight || this.usersContainer.nativeElement.clientWidth;
      if (!height) {
        this.showSave = true;
        this.messagesContainer.nativeElement.style.width = 100 + '%';
        this.usersContainer.nativeElement.style.width = '0';
      } else {
        this.showSave = false;
        this.messagesContainer.nativeElement.style.width = '0';
        this.usersContainer.nativeElement.style.width = 100 + '%';
      }
    }
  }
}
