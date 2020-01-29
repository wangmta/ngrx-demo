import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as FromProduct from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  // use the extended state from product.reducer (lazy loaded)
  constructor(private store: Store<FromProduct.State>, private productService: ProductService) {}

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => (this.selectedProduct = selectedProduct)
    );

    this.productService.getProducts().subscribe(
      (products: Product[]) => (this.products = products),
      (err: any) => (this.errorMessage = err.error)
    );

    // TODO: Unsubscribe
    // no need to detect if product is null or not since its initial state is declared in the reducer
    this.store
      .pipe(select('product'))
      .subscribe(product => (this.displayCode = product.showProductCode));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }
}
