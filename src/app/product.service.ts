import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    this.db.list('/product').push(product);
  }

  getAll(){
    return this.db.list('/product');
  }

  get(productId){
    return this.db.object('/product/' + productId);
  }
}
