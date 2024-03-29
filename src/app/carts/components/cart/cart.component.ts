import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  sum: number = 0;
  success: boolean = false;

  isSmallScreen: boolean = false;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}
  ngOnInit() {
    this.getCarts();

    // Check screen size on component initialization
    this.isSmallScreen = window.innerWidth > 768;
  }

  // Update screen size on window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isSmallScreen = window.innerWidth > 768;
  }

  getCarts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.sharedService.items = this.cartProducts.length;
    this.sharedService.setValue('Your Items', this.cartProducts.length);
    // console.log(this.cartProducts);
    this.totalSalary();
  }

  totalSalary() {
    this.sum = 0;
    for (let x in this.cartProducts) {
      this.sum +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  detectChanges() {
    this.totalSalary();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  onMinus(index: number) {
    if (this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity--;
      this.totalSalary();
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    } else if (this.cartProducts[index].quantity <= 2) {
      this.cartProducts[index].quantity = 1;
    }
  }

  onPlus(index: number) {
    this.cartProducts[index].quantity++;
    this.totalSalary();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.totalSalary();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.sharedService.setValue('Your Items', this.cartProducts.length);
    $('#deleteModal').modal('hide');
    this.toastr.success('You are Delete This Product', 'Delete Success');
  }

  clearCarts() {
    this.cartProducts = [];
    this.totalSalary();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.sharedService.setValue('Your Items', this.cartProducts.length);
    $('#clearModal').modal('hide');
    if (!this.success) {
      this.toastr.success('You are Clear This Shopping Cart', 'Clear Success');
    }
  }

  addNewCart() {
    let newProducts = this.cartProducts.map((res) => {
      return { productId: res.item.id, quantity: res.quantity };
    });

    let model = {
      userId: 5,
      date: new Date(),
      products: newProducts,
    };

    this.cartService.addCart(model).subscribe((res: any) => {
      this.success = true;
      this.clearCarts();
      this.toastr.success(
        'Thank you to Order This Shopping Cart',
        'Order Success'
      );
    });
    $('#addNewCartModal').modal('hide');
  }
}
