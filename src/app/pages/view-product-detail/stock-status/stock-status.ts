import {Component, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-stock-status',
  imports: [
    MatIcon
  ],
  template: `
    @if (inStock() > 0) {
      <div class="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-3 bg-white w-full">
        <mat-icon class="small !text-green-500">check_circle</mat-icon>
        <span class="text-xs text-gray-800">Em estoque e pronto para envio.</span>
      </div>
    } @else {
      <div class="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-3 bg-white w-full">
        <mat-icon class="small ml-4 !text-red-600">warning</mat-icon>
        <span class="text-xs text-red-600">
          Este item está atualmente fora de estoque. Adicione-o à sua lista de desejos para
          ser notificado quando estiver disponível novamente.
        </span>
      </div>
    }
  `,
  styles: ``,
  host: {
    class: 'block',
  }
})
export class StockStatus {
  inStock = input.required<number>();
}
