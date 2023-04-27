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
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-messages-elderly',
  templateUrl: './messages-elderly.component.html',
  styleUrls: ['./messages-elderly.component.scss'],
})
export class MessagesElderlyComponent implements OnInit, OnDestroy {
  chatRooms = [];
  chatName = '';
  incomingChatId = '';
  outgoingMessage = '';

  @ViewChild('messagesContainer')
  messagesContainer: ElementRef<HTMLElement>;
  @ViewChild('usersContainer') usersContainer: ElementRef<HTMLElement>;
  showSave = true;

  @HostListener('window:resize', ['$event'])
  onResize() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      const heightCategory =
        this.messagesContainer.nativeElement.clientWidth ||
        this.messagesContainer.nativeElement.clientWidth;

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

  constructor(
    public firebase: FirebaseService,
    public firestore: AngularFirestore
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.firebase.destroyChat();
  }

  openChat(chatRoom: ChatRoom) {
    this.chatName = chatRoom.chatName;
    this.incomingChatId = chatRoom.docId;
    this.firebase.setReadedChatroom(chatRoom);
    this.firebase.getCurrentIncomingChat(chatRoom.docId);
    this.firebase.getCurrentOutgoingChat(chatRoom.docId);
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

  onCtrlEnter(): void {
    this.outgoingMessage += '\r';
  }

  async sendMessage(event: KeyboardEvent): Promise<void> {
    event.preventDefault();

    const timestamp = firebase.default.firestore.FieldValue.serverTimestamp();
    const outgoingChatId = this.incomingChatId.split('_').reverse().join('_');

    const doc = await this.firestore
      .collection('chatrooms')
      .doc(outgoingChatId)
      .get()
      .toPromise();
    if (!doc.exists) {
      await this.firestore.collection('chatrooms').doc(outgoingChatId).set({
        docId: outgoingChatId,
      });
    }
    console.log(this.outgoingMessage);
    await this.firestore
      .collection(`chatrooms/${outgoingChatId}/messages`)
      .add({ mensaje: this.outgoingMessage, timestamp: timestamp });
    console.log(this.outgoingMessage);

    this.outgoingMessage = '';
  }
}
