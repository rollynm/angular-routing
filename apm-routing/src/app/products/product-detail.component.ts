import { Component, OnInit } from '@angular/core';

import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product | null = null;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // const id = +this.route.snapshot.paramMap.get('id')!;
    //this.getProduct(id);
    // retrieve data from route, not hitting db
    const data: ProductResolved = this.route.snapshot.data['product'];
    this.errorMessage = data.error!;
    this.onProductRetrieved(data.product!);
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product) => this.onProductRetrieved(product),
      error: (err) => (this.errorMessage = err),
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
