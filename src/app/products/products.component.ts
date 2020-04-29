import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  product$;
  categories$;
  category: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService, 
    private route: ActivatedRoute) {

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

  // filterProduct(categoryClicked, categoryProduct){
  //   if(categoryClicked == null){
  //     return false;
  //   }
  //   if(categoryClicked === categoryProduct){
  //     return true;
  //   }
  //   return false;
  // }
}
