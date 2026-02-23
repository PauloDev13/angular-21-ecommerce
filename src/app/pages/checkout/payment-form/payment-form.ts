import { Component } from '@angular/core';
import {ViewPanel} from '../../../directives/view-panel';
import {MatIcon} from '@angular/material/icon';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

@Component({
  selector: 'app-payment-form',
  imports: [
    ViewPanel,
    MatIcon,
    MatRadioGroup,
    MatRadioButton
  ],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>payment</mat-icon>
        Opções de pagamento
      </h2>
      <div class="lg:col-span-3 flex flex-col gap-6">
        <mat-radio-group [value]="'stripe'">
          <mat-radio-button value="stripe">
            <img src="stripe-logo.png" alt="Stripe" class="h-6">
          </mat-radio-button>
        </mat-radio-group>
      </div>
    </div>
  `,
  styles: ``,
})
export class PaymentForm {

}
