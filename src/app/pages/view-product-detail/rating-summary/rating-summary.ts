import {Component, computed, input} from '@angular/core';
import {Product} from '../../../models/product';
import {StarRating} from '../../../components/star-rating/star-rating';

@Component({
  selector: 'app-rating-summary',
  imports: [
    StarRating
  ],
  template: `
    <div class="flex items-center gap-8 mb-6 p-4 bg-gray-50 rounded-lg">
      <div class="flex flex-col items-center w-1/2">
        <div class="text-4xl font-bold text-gray-900 mb-1">
          {{ product().rating }}
        </div>
        <div class="flex items-center mb-2">
            <app-star-rating [rating]="product().rating" />
        </div>
        <div class="text-sm text-gray-500">
          Baseado em {{ totalReviews() }} visualizações
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class RatingSummary {
  product = input.required<Product>();
  totalReviews =  computed(() => this.product().reviews.length);

  ratingBreakdown = computed(() => {
    const reviews = this.product().reviews;
    const total = reviews.length;

    if (total === 0)
      return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: 0,
      percentage: 0,
    }));

    return [5, 4, 3, 2, 1].map((stars) => {
      const count = reviews.filter((review) => review.rating === stars).length;
      return {
        stars,
        count,
        percentage: (count / total) * 100 ,
      }
    });
  });
}
