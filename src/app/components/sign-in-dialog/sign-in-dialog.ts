import {Component, inject, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatPrefix, MatSuffix} from '@angular/material/input';
import {EcommerceStore} from '../../ecommerce-store';
import {SignInParams} from '../../models/user';
import {SignUpDialog} from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    MatIcon,
    MatIconButton,
    MatInput,
    MatPrefix,
    MatSuffix,
    MatButton,
    MatFormField,
    ReactiveFormsModule,
    MatDialogClose
  ],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Login</h2>
          <p class="text-sm text-gray-500">Faça login para finalizar compra</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>Close</mat-icon>
        </button>
      </div>

      <form class="mt-6" [formGroup]="signInForm" (ngSubmit)="signIn()">
        <mat-form-field class="mb-4">
          <input
            matInput
            formControlName="email"
            type="email"
            placeholder="Digite seu email"
          />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="w-full mb-6">
          <input
            matInput
            formControlName="password"
            [type]="passwordVisible() ? 'text' : 'password'"
            placeholder="Digite a senha"
          />
          <mat-icon matPrefix>lock</mat-icon>
          <button
            matSuffix
            matIconButton
            type="button"
            class="mr-2"
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon [fontIcon]="passwordVisible() ? 'visibility_off' : 'visibility'"></mat-icon>
          </button>
        </mat-form-field>

        <button type="submit" matButton="filled" class="w-full">
          Entrar
        </button>
      </form>

      <p class="text-sm text-gray-500 mt-2 text-center">
        Não tem cadastro?
        <a class="text-blue-600 cursor-pointer" (click)="openSignUpDialog()">Cadastrar-se</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignInDialog {

  store = inject(EcommerceStore);

  fb = inject(NonNullableFormBuilder);

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  matDialog = inject(MatDialog);

  dialogRef = inject(MatDialogRef);

  signInForm = this.fb.group({
    email: ['prmorais@gmail.com', Validators.required],
    password: ['prmorais13', Validators.required],
  });

  passwordVisible = signal<boolean>(false)

  signIn(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;

    this.store.signIn({
      email,
      password,
      checkout: this.data?.checkout,
      dialogId: this.dialogRef.id } as SignInParams);
  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      }
    });
  }
}
