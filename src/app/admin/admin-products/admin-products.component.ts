import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$  //actual product data
  productKey$ //actual metadata

  constructor(private productService: ProductService) { 
    this.products$ = this.productService.getAll().valueChanges();
    this.productKey$ = this.productService.getAll().snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const key = a.payload.key;
        const val = a.payload.val();
        return {key, val};
      })
    }))
    ; //snapshot changes to get metadata so to get id i m doing this.
  }

  ngOnInit(): void {
  }

}
