import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  firebaseMessage(): void {
    const messaging = firebase.default.messaging();
    messaging
      .getToken({
        vapidKey:
          'BPLhqTbkFhqYe2y9M--l-1uOvcguP86TE-wIppW5lj7ghoCdlbDBx0zoFbNoXnWYc6qTRJUjVKhPjA2BRRj2pvs',
      })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log(currentToken);
        } else {
          // Show permission request UI
          console.log(
            'No registration token available. Request permission to generate one.'
          );
          // ...
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
  }
}
