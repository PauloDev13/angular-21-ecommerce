import {Component, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-stock-status',
  imports: [
    MatIcon
  ],
  template: `
    @if (inStock() > 0) {
      <div class="flex items-center gap-2 border border-b-gray-200 rounded-lg px-3 py-3 bg-white w-full">
        <mat-icon class="small">check_circle</mat-icon>
        <span class="text-xs text-gray-800">Em estoque e pronto para envio.</span>
      </div>
    } @else {
      <div class="flex items-center gap-2 border border-b-gray-200 rounded-lg">
        <mat-icon class="small">warning</mat-icon>
        <span class="text-xs">
          Este item está atualmente fora de estoque. Adicione-o à sua lista de desejos para
          ser notificado quando estiver disponível novamente.
        </span>
      </div>
    }
  `,
  styles: ``,
})
export class StockStatus {
  inStock = input.required<number>();
}
