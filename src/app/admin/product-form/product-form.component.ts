import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(categoryService : CategoryService, private productService: ProductService) { 
    this.categories$ = categoryService.getCategories();
    console.log(this.categories$)
  }

  ngOnInit(): void {
  }

  save(product){
    console.log(product);
    this.productService.create(product);
  }
}