import {Component, computed, inject} from '@angular/core';
import {ViewPanel} from '../../directives/view-panel';
import {EcommerceStore} from '../../ecommerce-store';

@Component({
  selector: 'app-summarize-order',
  imports: [
    ViewPanel
  ],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-4">Resumo do Pedido</h2>
      <div class="space-y-3 text-lg pt-4 border-t">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>\R$ {{ subtotal() }}</span>
        </div>

        <div class="flex justify-between">
          <span>Taxa</span>
          <span>\R$ {{ taxa() }}</span>
        </div>

        <div class="flex justify-between border-t pt-3 font-bold text-lg">
          <span>Total</span>
          <span>\R$ {{ total() }}</span>
        </div>
      </div>

      <ng-content select="[actionButtons]" />
    </div>
  `,
  styles: ``,
  standalone: true
})
export class SummarizeOrder {
  store = inject(EcommerceStore);
  subtotal = computed(() => Math.round(this.store.cartItems()
    .reduce((acc, item) => acc + (item.product.price * item.quantity), 0)));

  taxa = computed(() => Math.round(0.05 * this.subtotal()));

  total = computed(() => this.subtotal() - this.taxa());
}
