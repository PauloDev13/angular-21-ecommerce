import {Component, computed, inject, input} from '@angular/core';
import {CartModel} from '../../models/cart-model';
import {QtySelector} from '../../components/qty-selector/qty-selector';
import {EcommerceStore} from '../../ecommerce-store';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-show-cart-items',
  imports: [
    QtySelector,
    MatIconButton,
    MatIcon
  ],
  template: `
    <div class="grid grid-cols-3 lg:grid-cols-[3fr_1fr_1fr]">
      <div class="flex items-center gap-4">
        <img
          [src]="item().product.imageUrl" alt="item"
          class="w-24 h-24 rounded-lg object-cover"
          [style.view-transition-name]="'product-image-' + item().product.id"
        />
        <div>
          <div class="text-gray-900 text-lg font-semibold">{{ item().product.name }}</div>
          <div class="text-gray-600 text-lg">\R$ {{ item().product.price }}</div>
        </div>
      </div>

      <app-qty-selector
        [quantity]="item().quantity"
        (quantityChange)="store.setItemQuantity({ productId: item().product.id, quantity: $event })"
      />

      <div class="flex flex-col items-end">
        <div class="text-right text-lg font-semibold">
          \R$ {{ total() }}
        </div>
        <div class="flex -me-3">
          <button matIconButton (click)="store.moveToWishlist(item().product)">
            <mat-icon>favorite_border</mat-icon>
          </button>
          <button matIconButton class="danger" (click)="store.removeFromCart(item().product)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>

    </div>
  `,
  styles: ``,
  standalone: true
})
export class ShowCartItems {
  item = input.required<CartModel>();
  store = inject(EcommerceStore);

  total = computed(() =>
    (this.item().quantity * this.item().product.price).toFixed(2));
}
