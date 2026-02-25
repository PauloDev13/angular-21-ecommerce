import {Component, inject, input, output} from '@angular/core';
import {Product} from '../../models/product';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {EcommerceStore} from '../../ecommerce-store';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-product-card',
  imports: [
    MatIcon,
    MatButton,
    RouterLink,
  ],
  template: `
    <div
      class="relative bg-white cursor-pointer rounded-xl shadow-lg
      overflow-hidden flex flex-col h-full transition-all duration-200 ease-out
      hover:translate-y-1 hover:shadow-xl"
    >
      <img
        [src]="product().imageUrl"
        class="w-full h-[300px] object-cover rounded-t-xl" alt="Imagem"
        [routerLink]="['/product', product().id]"
        [style.view-transition-name]="'product-image-' + product().id"
      />

      <ng-content/>

      <div class="p-5 flex flex-col flex-1" [routerLink]="['/product', product().id]">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {{ product().name }}
        </h3>
        <p class="text-sm text-gray-600 mb-4 flex-1 leading-tight">
          {{ product().description }}
        </p>

        <div class="text-sm font-medium mb-4">
          {{ product().inStock ? 'No Estoque' : 'Sem Estoque' }}
        </div>

        <div class="flex items-center justify-between mt-auto">
          <span class="text-2xl font-bold text-gray-900">
            R$ {{ product().price }}
          </span>
          <button matButton="filled" class="flex items-center gap-2"
            (click)="store.addToCart(product())">
            <mat-icon color="indigo" size="lg">
              shopping_cart
            </mat-icon>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  standalone: true
})
export class ProductCard {
  store = inject(EcommerceStore);
  product = input.required<Product>()

  addToCartClicked = output<Product>();
}
