import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product;
  constructor(
    private route: ActivatedRoute,
    private categoryService : CategoryService,
    private productService: ProductService, 
    private router:Router) { 
    this.categories$ = categoryService.getCategories();
    let id = this.route.snapshot.paramMap.get('id');
    console.log("ID is " + id);
    if(id) {
        this.productService.get(id).valueChanges().take(1).subscribe(p => {
        this.product = p;
        console.log("Product inside if is " + p);
      });
    } else{
      this.product = {
        title: "",
      }
    }
    console.log(this.categories$)
    console.log(this.product);
  }

  ngOnInit(): void {
  }

  save(product){
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
