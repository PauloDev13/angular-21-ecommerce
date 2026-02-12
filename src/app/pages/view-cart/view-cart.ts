import { Component } from '@angular/core';
import {BackButton} from '../../components/back-button/back-button';
import {ListCartItems} from './list-cart-items/list-cart-items';
import {TeaseWishlist} from './tease-wishlist/tease-wishlist';
import {SummarizeOrder} from '../../components/summarize-order/summarize-order';

@Component({
  selector: 'app-view-cart',
  imports: [
    BackButton,
    ListCartItems,
    TeaseWishlist,
    SummarizeOrder,
  ],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">
      <app-back-button class="mb-6"
                       navigateTo="/products/todas"
                       label="Continuar comprando"/>
      <h1 class="text-3xl font-extrabold mb-4">Carrinho de Compras</h1>

      <app-tease-wishlist class="mb-8 block" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <app-list-cart-items/>
        </div>
        <div>
          <app-summarize-order />
        </div>
      </div>
    </div>
  `,
  styles: ``,
  standalone: true
})
export class ViewCart {

}
