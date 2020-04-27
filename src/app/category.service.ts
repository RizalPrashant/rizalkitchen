import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { 

  }

  getCategories(){
    return this.db.list('/categories',
    q => {
      return q.orderByChild('name');
    }
    ).snapshotChanges().pipe(map(items => {
      return items.map(a => {
        const key = a.payload.key;
        const val = a.payload.val();
        return {key, val};
      })
    }));
  }
}
