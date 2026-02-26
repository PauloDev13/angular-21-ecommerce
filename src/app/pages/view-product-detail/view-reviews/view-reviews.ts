import {Component, input} from '@angular/core';
import {Product} from '../../../models/product';
import {ViewPanel} from '../../../directives/view-panel';
import {RatingSummary} from '../rating-summary/rating-summary';

@Component({
  selector: 'app-view-reviews',
  imports: [
    ViewPanel,
    RatingSummary
  ],
  template: `
    <div appViewPanel>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Avaliações de Clientes</h2>
      </div>
      <app-rating-summary [product]="product()" />
    </div>
  `,
  styles: ``,
})
export class ViewReviews {
  product = input.required<Product>();
}
