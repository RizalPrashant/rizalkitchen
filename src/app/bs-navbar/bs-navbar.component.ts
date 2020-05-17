import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;
  quantity 
  constructor(private auth: AuthService, private cart: ShoppingCartService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser)
   }

   getQuantity(){
     this.quantity = this.cart.quantityItem;
     return this.quantity;
   }
  logout(){
    this.auth.logout();
  }

}
