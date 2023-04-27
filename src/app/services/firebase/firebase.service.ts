import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';
import 'firebase/firestore';
import 'firebase/messaging';
import { Subscription } from 'rxjs';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import {
  ChatRoom,
  ContentMessage,
  OutgoingMessage,
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

  incomingChatRooms: ChatRoom[] = [];
  incomingMessages: ContentMessage[] = undefined;

  outgoingMessages: OutgoingMessage[] = undefined;

  dataIncomingChatRoomSuscriber: Subscription;

  dataCurrentIncomingChatSuscriber: Subscription;
  dataCurrentOutgoingChatSuscriber: Subscription;

  constructor(
    private firestore: AngularFirestore,
    private messaging: AngularFireMessaging,
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

  async getIncomingChatRooms() {
    if (!this.chatRoomExists) {
      try {
        const carer: Carer = await this.vitaapp.meInformation().toPromise();
        this.dataIncomingChatRoomSuscriber = this.firestore
          .collection<any>(`messages/${carer.uid}/chatrooms`, (ref) =>
            ref.orderBy('timestamp', 'desc')
          )
          .valueChanges()
          .subscribe((data) => {
            this.incomingChatRooms = data;
            this.totalNotRead = 0;
            this.incomingChatRooms.forEach((room) => {
              if (!room.read) {
                this.totalNotRead++;
              }
            });
          });
        this.chatRoomExists = true;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }

  getCurrentIncomingChat(chatId: string) {
    if (this.dataCurrentIncomingChatSuscriber) {
      this.dataCurrentIncomingChatSuscriber.unsubscribe();
    }
    this.dataCurrentIncomingChatSuscriber = this.firestore
      .collection(`chatrooms/${chatId}/messages`, (ref) =>
        ref.orderBy('timestamp', 'desc')
      )
      .valueChanges()
      .subscribe((data) => {
        this.incomingMessages = data as ContentMessage[];
      });
  }

  getCurrentOutgoingChat(incomingChatId: string) {
    const outgoingChatId = incomingChatId.split('_').reverse().join('_');

    if (this.dataCurrentOutgoingChatSuscriber) {
      this.dataCurrentOutgoingChatSuscriber.unsubscribe();
    }
    this.dataCurrentOutgoingChatSuscriber = this.firestore
      .collection(`chatrooms/${outgoingChatId}/messages`, (ref) =>
        ref.orderBy('timestamp', 'desc')
      )
      .valueChanges()
      .subscribe((data) => {
        this.outgoingMessages = data as OutgoingMessage[];
      });
  }

  destroyChat(): void {
    if (this.dataCurrentIncomingChatSuscriber) {
      this.dataCurrentIncomingChatSuscriber.unsubscribe();
    }
    this.incomingMessages = undefined;

    if (this.dataCurrentOutgoingChatSuscriber) {
      this.dataCurrentOutgoingChatSuscriber.unsubscribe();
    }
    this.outgoingMessages = undefined;
  }

  reloadData(): void {
    this.totalNotRead = 0;
    this.incomingChatRooms = [];
    this.chatRoomExists = false;
    if (this.dataIncomingChatRoomSuscriber) {
      this.dataIncomingChatRoomSuscriber.unsubscribe();
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
    this.messaging.messages.subscribe(() => {});
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
