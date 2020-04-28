import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  product$;
  categories$;

  constructor(private productService: ProductService, private categoryService: CategoryService) { 
    this.product$ = this.productService.getAll().snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const key = a.payload.key;
        const val = a.payload.val();
        return {key, val};
      })
    }))

    this.categories$ = categoryService.getCategories();
  }
}
