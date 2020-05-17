import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  product$;
  categories$;
  category: string;
  subscription: Subscription
  shoppingCart$;
  @Input('show-actions') showActions = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService, 
    private route: ActivatedRoute,
    private cartService : ShoppingCartService) {
    
    this.product$ = this.productService.getAll().snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const key = a.payload.key;
        const val = a.payload.val();
        return {key, val};
      })
    }))

    this.categories$ = categoryService.getCategories();
    
    route.queryParamMap.subscribe(q => {
      this.category = q.get('category');
    })
  }

  ngOnInit(){

    this.shoppingCart$ = this.cartService.getCart().valueChanges();
    
    console.log(this.shoppingCart$);
  }


  addToCart(product){
    this.cartService.addToCart(product);
  }

  removeFromCart(product){
    this.cartService.removeFromCart(product);
  }
}
