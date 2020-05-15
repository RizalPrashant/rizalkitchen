import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/take';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductService } from './product.service';
import { ProductsComponent } from './products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  quantityItem: number

  constructor(private db: AngularFireDatabase) { }

  create(){
    console.log("Went in create")
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }
  getCart(){
    let cartId = localStorage.getItem('cartId');
    return this.db.list('/shopping-carts/' + cartId + '/items');
  }

  private async getOrCreateCartId(){

    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    let result = await this.create();
    console.log("Went in create new cart ID")
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      if(item.payload.exportVal() == null) item$.update({product: product.val, quantity: 1});
      else item$.update({product: product.val, quantity: (item.payload.exportVal().quantity || 0) + 1});
    })
  }

  async removeFromCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
    item$.update({product: product.val, quantity: (item.payload.exportVal().quantity) - 1});
    if(item.payload.exportVal().quantity == 1) {
      item$.remove();
    }
    })
  }
}
