import {Component, input, output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-qty-selector',
  imports: [
    MatIconButton,
    MatIcon
  ],
  template: `
    <div class="flex items-center gap-3">
      <div class="inline-flex items-center">
        <button matIconButton
                [disabled]="quantity() === 1"
                (click)="quantityChange.emit(quantity() - 1)"
        >
          <mat-icon>remove</mat-icon>
        </button>
        <div class="px-3">{{ quantity() }}</div>
        <button matIconButton
                (click)="quantityChange.emit(quantity() + 1)"
        >
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: ``,
  standalone: true
})
export class QtySelector {
  quantity = input(0);
  quantityChange = output<number>();
}
