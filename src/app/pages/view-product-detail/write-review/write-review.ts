import {Component, inject, signal} from '@angular/core';
import {ViewPanel} from '../../../directives/view-panel';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput, MatFormField, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {EcommerceStore} from '../../../ecommerce-store';
import {MatOption, MatSelect} from '@angular/material/select';
import {AddReviewParams} from '../../../models/user-review';

@Component({
  selector: 'app-write-review',
  imports: [
    ViewPanel,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatSelect,
    MatOption,
    MatLabel
  ],
  template: `
    <div appViewPanel>
      <h2 class="text-xl font-semibold mb-6">Deixe sua avaliação</h2>
      <form [formGroup]="reviewForm" (ngSubmit)="saveReview()">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <mat-form-field>
            <mat-label>Título da Avaliação</mat-label>
            <input
              formControlName="title"
              placeholder="Resuma sua avaliação"
              matInput
              type="text"
            />
          </mat-form-field>
          <mat-form-field>
            <mat-select formControlName="rating">
              @for (option of ratingOptions(); track option.value) {
                <mat-option [value]="option.value">{{ option.label }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field class="col-span-2">
            <mat-label>Avaliação</mat-label>
            <textarea
              formControlName="comment"
              placeholder="Fale sobre suas experiências com este produto"
              matInput
              type="text"
              rows="4"
            ></textarea>
          </mat-form-field>
        </div>
        <div class="flex gap-4">
          <button matButton="filled" type="submit" [disabled]="!store.loading">
            {{ store.loading() ? 'Enviando...' : 'Enviar avaliação' }}
          </button>

          <button matButton="outlined" type="button"
            (click)="store.hideWriteReview()"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: ``,
  host: {
    class: 'block',
  },
  standalone: true
})
export class WriteReview {
  store = inject(EcommerceStore);

  fb = inject(NonNullableFormBuilder);

  reviewForm = this.fb.group({
    title: ['', [Validators.required]],
    comment: ['', [Validators.required]],
    rating: [5, [Validators.required]],
  });

  ratingOptions = signal<OptionItem[]>([
    { label: '5 Estrelas - Excelente', value: 5 },
    { label: '4 Estrelas - Bom', value: 4 },
    { label: '3 Estrelas - Médio', value: 3 },
    { label: '2 Estrelas Ruim', value: 2 },
    { label: 'Estrela 1 Péssimo', value: 1 },
  ]);

  saveReview() {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const { title, comment, rating} = this.reviewForm.value;
    this.store.addReview({ title, comment, rating } as AddReviewParams);
  }
}
