import {Component, inject, signal} from '@angular/core';
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatInput, MatPrefix, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {EcommerceStore} from '../../ecommerce-store';
import {SignUpParams} from '../../models/user';
import {SignInDialog} from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    MatDialogClose
  ],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Cadastrar</h2>
          <p class="text-sm text-gray-500">Junte-se a nós e comece a comprar hoje mesmo!</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>Close</mat-icon>
        </button>
      </div>

      <form class="mt-6 flex flex-col" [formGroup]="signUpForm" (ngSubmit)="signUp()">
        <mat-form-field class="mb-4">
          <input
            matInput
            formControlName="name"
            type="text"
            placeholder="Digite seu nome e sobrenome"
          />
        </mat-form-field>

        <mat-form-field class="mb-4">
          <input
            matInput
            formControlName="email"
            type="email"
            placeholder="Digite seu email"
          />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>

        <mat-form-field class="mb-4">
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

        <mat-form-field class="mb-4">
          <input
            matInput
            formControlName="confirmPassword"
            [type]="passwordVisible() ? 'text' : 'password'"
            placeholder="Confirme a senha"
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
          Criar Conta
        </button>
      </form>

      <p class="text-sm text-gray-500 mt-2 text-center">
        Já tem cadastro?
        <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Entrar</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  store = inject(EcommerceStore);

  passwordVisible = signal<boolean>(false)

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  matDialog = inject(MatDialog);

  dialogRef = inject(MatDialogRef);

  fb = inject(NonNullableFormBuilder);

  signUpForm = this.fb.group({
    name: ['Paulo Roberto', Validators.required],
    email: ['prmorais@gmail.com', Validators.required],
    password: ['prmorais13', Validators.required],
    confirmPassword: ['prmorais13', Validators.required],
  });

  signUp(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const {name, email, password} = this.signUpForm.value;

    this.store.signUp({
      name,
      email,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data?.checkout
    } as SignUpParams);
  }

  openSignInDialog(): void {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      }
    });
  }
}
