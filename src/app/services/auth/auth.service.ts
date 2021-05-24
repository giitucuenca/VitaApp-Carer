import { Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { VitaappService } from '../vitaapp/vitaapp.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Auth, Carer } from '../../controller/interfaces/carer.interface';
import { FirebaseService } from '../firebase/firebase.service';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    private router: Router,
    private vitaapp: VitaappService,
    private firebase: FirebaseService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  public setSession(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  // Sign in with email/password
  async SignIn(auth: Auth) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        auth.username,
        auth.password
      );
      const data = await this.vitaapp.loginCarer(auth).toPromise();
      this.setSession(data.jwt);
      this.ngZone.run(() => {
        // this.router.navigate(['dashboard']);
        this.router.navigateByUrl('/adulto-mayor');
      });
      this.SetUserData(result.user);
      this.firebase.firebaseMessage();
      return true;
    } catch (error) {
      // window.alert(error.message);
      return false;
    }
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((user) => {
        user.sendEmailVerification();
      })
      .then(() => {
        // this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign up with email/password
  async SignUp(carer: Carer) {
    try {
      // * Redirecciono al main en caso de que la informacion de registro sea correcta
      const result = await this.afAuth.createUserWithEmailAndPassword(
        carer.email,
        carer.password
      );
      carer.uid = result.user.uid;
      const data = await this.vitaapp.registerCarer(carer).toPromise();
      this.setSession(data.token);
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.SendVerificationMail();
      this.SetUserData(result.user);
      this.router.navigateByUrl('/adulto-mayor');

      return true;
    } catch (error_1) {
      return false;
    }
  }

  public logOut(): void {
    localStorage.clear();
    this.router
      .navigateByUrl('/login')
      .finally()
      .then(() => {
        window.location.reload();
      });
  }

  public verifyToken(): Observable<any> {
    return this.vitaapp.validToken();
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
