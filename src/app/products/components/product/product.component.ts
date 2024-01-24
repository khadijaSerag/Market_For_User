import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() data: any = [];
  @Output() itemSelected = new EventEmitter();
  @Input() addButton: boolean = false;

  amount: number = 1;
  @Input() sending: boolean = false;

  add() {
    this.itemSelected.emit({ item: this.data, quantity: this.amount });
  }
}
