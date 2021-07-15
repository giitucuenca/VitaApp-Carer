import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';
import { Subscription } from 'rxjs';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import {
  ChatRoom,
  ContentMessage,
} from 'src/app/controller/interfaces/chat.interface';
import { VitaappService } from '../vitaapp/vitaapp.service';

interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  tokenMessage: string = '';
  chatRoomExists = false;
  currentChatExists = false;
  totalNotRead = 0;

  chatRooms: ChatRoom[] = [];
  messages: ContentMessage[] = undefined;
  dataChatRoomSuscriber: Subscription;
  dataCurrentChatSuscriber: Subscription;
  constructor(
    private firestore: AngularFirestore,
    private messaging: AngularFireMessaging,
    private router: Router,
    private vitaapp: VitaappService
  ) {
    this.messaging.requestToken.subscribe((token) => {
      this.tokenMessage = token;
      console.log(this.tokenMessage);
    });
  }

  async deleteTokenLogin() {
    this.reloadData();
    this.messaging.requestToken.subscribe(async (token) => {
      try {
        await this.firestore.collection('tokenItems').doc(token).ref.delete();
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getChatRooms() {
    if (!this.chatRoomExists) {
      try {
        const carer: Carer = await this.vitaapp.meInformation().toPromise();
        this.dataChatRoomSuscriber = this.firestore
          .collection<any>(`messages/${carer.uid}/chatrooms`, (ref) =>
            ref.orderBy('timestamp', 'desc')
          )
          .valueChanges()
          .subscribe((data) => {
            this.chatRooms = data;
            this.totalNotRead = 0;
            this.chatRooms.forEach((room) => {
              if (!room.read) {
                this.totalNotRead++;
              }
            });
            console.log(JSON.stringify(data));
          });
        this.chatRoomExists = true;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }

  getCurrentChat(chatId: string) {
    if (this.dataCurrentChatSuscriber) {
      this.dataCurrentChatSuscriber.unsubscribe();
    }
    this.dataCurrentChatSuscriber = this.firestore
      .collection(`chatrooms/${chatId}/messages`, (ref) =>
        ref.orderBy('timestamp', 'desc')
      )
      .valueChanges()
      .subscribe((data) => {
        this.messages = data as ContentMessage[];
        console.log();
      });
  }

  destroyChat(): void {
    if (this.dataCurrentChatSuscriber) {
      this.dataCurrentChatSuscriber.unsubscribe();
    }
    this.messages = undefined;
  }

  reloadData(): void {
    this.totalNotRead = 0;
    this.chatRooms = [];
    this.chatRoomExists = false;
    if (this.dataChatRoomSuscriber) {
      this.dataChatRoomSuscriber.unsubscribe();
    }
    this.destroyChat();
  }

  // firebaseMessage(): void {
  //   const messaging = firebase.default.messaging();
  //   messaging
  //     .getToken({
  //       vapidKey:
  //         'BPLhqTbkFhqYe2y9M--l-1uOvcguP86TE-wIppW5lj7ghoCdlbDBx0zoFbNoXnWYc6qTRJUjVKhPjA2BRRj2pvs',
  //     })
  //     .then((currentToken) => {
  //       if (currentToken) {
  //         // Send the token to your server and update the UI if necessary
  //         // ...
  //         console.log(currentToken);
  //       } else {
  //         // Show permission request UI
  //         console.log(
  //           'No registration token available. Request permission to generate one.'
  //         );
  //         // ...
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('An error occurred while retrieving token. ', err);
  //       // ...
  //     });
  // }

  requestPermissionsMessage(uid: string): void {
    this.messaging.requestToken.subscribe((token) => {
      console.log(token);
      this.tokenMessage = token;
      this.firestore
        .collection<Token>(`tokens/${uid}/tokenItems`)
        .doc(token)
        .set({ token });
      this.firestore.collection<Token>(`tokenItems`).doc(token).set({ token });
    });
  }

  listenNotifications(): void {
    this.messaging.messages.subscribe((message) => {});
  }

  async deleteToken(uid: string) {
    try {
      if (this.tokenMessage) {
        await this.firestore
          .collection<Token>(`tokens/${uid}/tokenItems`)
          .doc(this.tokenMessage)
          .delete();
      }
    } catch (error) {
      console.log(error);
    }
  }

  setReadedChatroom(chatroom: ChatRoom) {
    if (!chatroom.read) {
      chatroom.read = true;
      this.firestore
        .collection(`messages/${chatroom.carerUid}/chatrooms`)
        .doc(chatroom.docId)
        .set(chatroom);
    }
  }
}
