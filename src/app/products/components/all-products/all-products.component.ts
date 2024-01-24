import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  error = '';
  loading = false;
  // sending = false;
  cartProducts: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true;
    this.productsService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.loading = false;
      },
      (error) => {
        alert('there are Error.. ');
        this.error = error.message;
        this.loading = false;
      }
    );
  }

  getCategories() {
    this.loading = true;
    this.productsService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.loading = false;
    });
  }

  filterCategory(event: any) {
    // (this.categoryValue === 'all')? this.getProducts() : this.getProductsCategory();
    let value = event.target.value;
    if (value === 'all') {
      this.getProducts();
    } else {
      this.getProductsCategory(value);
    }
  }

  getProductsCategory(keyword: string) {
    this.loading = true;
    this.productsService.getSpecificCategory(keyword).subscribe(
      (res: any) => {
        this.products = res;
        this.loading = false;
      },
      (error) => {
        alert('there are Error.. ');
        this.error = error.message;
        this.loading = false;
      }
    );
  }

  addToCart(event: any) {
    console.log(event);

    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);

      let exist = this.cartProducts.find((res) => res.item.id == event.item.id);
      if (exist) {
        // this.sending = true;
        alert('this data is already exist');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
