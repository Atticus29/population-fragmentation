import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

 //  signOut() {
 //   return this.afAuth.auth.signOut().then(() => {
 //     console.log("logged out");
 //     // this.router.navigate(['sign-in']);
 //   });
 // }

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  // signInAnonymously(){
  //   console.log("signInAnonymously in auth service entered");
  //   const credential = await this.afAuth.auth.signInAnonymously();
  //   return this.updateUserData(credential.user);
  //   // return this.afAuth.auth.signInAnonymously()
  //   // return this.afAuth.auth.login({
  //   //   provider: AuthProviders.Anonymous,
  //   //   method: AuthMethods.Anonymous,
  //   // })
  //   // .then(() => console.log("successful login") )
  //   // .catch(error => console.log(error));
  // }

  anonymousLogin() {
    console.log("anonymousLogin entered");
    // console.log('AuthIsStateResolved: ' + this.afAuth.auth.isStateResolved_);
    return this.afAuth.auth.signInAnonymously()
     .then((credential) => {
       console.log("success inside callback for signInAnonymously");
       // this.authState = credential;
       this.updateUserData(credential.user);
     })
     .catch(error => console.log(error));
  }

  getUser(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  private async oAuthLogin(provider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }
}
