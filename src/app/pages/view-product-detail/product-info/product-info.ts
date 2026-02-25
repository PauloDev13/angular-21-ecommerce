import {Component, inject, input, signal} from '@angular/core';
import {Product} from '../../../models/product';
import {TitleCasePipe} from '@angular/common';
import {StockStatus} from '../stock-status/stock-status';
import {QtySelector} from '../../../components/qty-selector/qty-selector';
import {MatButton, MatIconButton} from '@angular/material/button';
import {EcommerceStore} from '../../../ecommerce-store';
import {MatIcon} from '@angular/material/icon';
import {ToggleWishlistButton} from '../../../components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  selector: 'app-product-info',
  imports: [
    TitleCasePipe,
    StockStatus,
    QtySelector,
    MatButton,
    MatIcon,
    ToggleWishlistButton,
    MatIconButton
  ],
  template: `
    <div class="text-xs rounded-xl bg-gray-100 px-2 py-1 w-fit mb-2">
      {{ product().category | titlecase }}
    </div>
    <h1 class="text-2xl font-extrabold mb-3">{{ product().name }}</h1>
    <p class="text-3xl font-extrabold mb-4">\R$ {{ product().price }}</p>

    <app-stock-status class="mb-4" [inStock]="product().inStock"/>

    <p class="font-semibold mb-2">Descrição:</p>
    <p class="text-gray-600 border-b border-b-gray-200 pb-4">
      {{ product().description }}
    </p>

    <div class="flex items-center gap-2 mb-3 pt-4">
      <span class="font-semibold">Quantidade:</span>
      <app-qty-selector [quantity]="quantity()" (quantityChange)="quantity.set($event)"/>
    </div>
    <div class="flex gap-4 mb border-b border-b-gray-200 pb-4">
      <button
        matButton="filled"
        class="w-2/3 flex items-center gap-2"
        (click)="store.addToCart(product(), quantity())"
        [disabled]="!product().inStock"
      >
        <mat-icon>shopping_cart</mat-icon>

        {{ product().inStock ? 'Adicionar ao carrinho' : 'Sem estoque' }}
      </button>

      <app-toggle-wishlist-button [product]="product()"/>

      <button matIconButton>
        <mat-icon>share</mat-icon>
      </button>
    </div>
    <div class="pt-6 flex flex-col gap-2 text-gray-700 text-xs">
      <div class="flex items-center gap-3">
        <mat-icon class="small">local_shipping</mat-icon>
        <span>Frete grátis para compras acima de R$ 50,00</span>
      </div>
      <div class="flex items-center gap-3">
        <mat-icon class="small">autorenew</mat-icon>
        <span>Política de devolução de 30 dias</span>
      </div>
      <div class="flex items-center gap-3">
        <mat-icon class="small">shield</mat-icon>
        <span>Dois anos de garantia inclusos</span>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductInfo {
  store = inject(EcommerceStore);
  product = input.required<Product>();
  quantity = signal<number>(1);
}
