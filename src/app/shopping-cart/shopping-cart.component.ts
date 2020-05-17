import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart$;
  price: number;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCart$ = this.cartService.getCart().valueChanges();
  }

  getCart(){
  }

  getCartSize(){
    localStorage.setItem('quantity', this.cartService.quantityItem.toString())
    return localStorage.getItem('quantity');
  }

  clearCart(){
    this.cartService.removeCart();
  }
}
