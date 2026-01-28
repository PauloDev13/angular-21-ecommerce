import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1 class="text-5x1 p-6">Hello, {{ title() }}</h1>

    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('angular-21-ecommerce');
}
