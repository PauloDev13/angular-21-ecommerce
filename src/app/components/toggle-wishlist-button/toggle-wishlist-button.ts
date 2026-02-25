import {Component, computed, inject, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {Product} from '../../models/product';
import {EcommerceStore} from '../../ecommerce-store';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [
    MatIcon,
    MatIconButton
  ],
  template: `
    <button
      [class]="isInWishlist() ? '!text-blue-500' : 'text-gray-400'"
      matIconButton (click)="toggleWishlist(product())"
    >
      <mat-icon>{{ isInWishlist() ? 'favorite' : 'favorite_border'}}</mat-icon>
    </button>
  `,
  styles: ``,
})
export class ToggleWishlistButton {
  product = input.required<Product>();

  store = inject(EcommerceStore);

  isInWishlist = computed(() => {
    return this.store.wishlistItems().find(p => p.id === this.product().id)
  });
  toggleWishlist(product: Product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }

}
