import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AppUser } from './models/app-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  //method to update user info into the firebase database. I used update so that even if user change their 3rd party auth profile, it will update in my app
  save(user: firebase.User){
    this.db.object('/users/'+ user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  get(uid: string): AngularFireObject<AppUser>{
    console.log("Went in here")
    return this.db.object('/users/' + uid);
  }
}
