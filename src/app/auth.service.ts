import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = this.afAuth.authState;
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; //use return url to navigate user to whatever page they tried to login from otherwise if no return then just send them to root
    localStorage.setItem('returnUrl', returnUrl)
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$() : Observable<AppUser>{
    return this.user$
    .switchMap(user => (user == null)? Observable.of(null) : this.userService.get(user.uid).valueChanges())}
}
