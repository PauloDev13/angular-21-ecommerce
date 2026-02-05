import {Component, input} from '@angular/core';
import {CartModel} from '../../models/cart-model';

@Component({
  selector: 'app-show-cart-items',
  imports: [],
  template: `
    <div class="grid grid-cols-3 grid-cols-[3fr_1fr_1fr]">
      <div class="flex items-center gap-4">
        <img [src]="item().product.imageUrl" alt="item"
        class="w-24 h-24 rounded-lg object-cover" />
        <div>
          <div class="text-gray-900 text-lg font-semibold">{{ item().product.name }}</div>
          <div class="text-gray-600 text-lg">\R$ {{ item().product.price }}</div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ShowCartItems {
  item = input.required<CartModel>();
}
