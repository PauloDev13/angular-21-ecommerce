import {Component, computed, input, signal} from '@angular/core';
import {Product} from '../../models/product';
import {ProductCard} from '../../components/product-card/product-card';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatListItemTitle, MatNavList} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900 font-bold">
            Categorias
          </h2>
          <mat-nav-list>
            @for (cat of categories(); track cat) {
              <mat-list-item [activated]="cat === category()" class="my-2"
                             [routerLink]="['/products', cat]"
              >
                <span matListItemTitle class="!font-semibold"
                      [class]="cat === category() ? '!text-white' : null"
                >
                  {{ cat | titlecase }}
                </span>
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">
          {{ category() | titlecase}}
        </h1>
        <p class="text-base text-gray-600 mb-6">
          {{ filteredProducts().length }} produtos encontrados
        </p>
        <div class="responsive-grid">
          @for (product of filteredProducts(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
  standalone: true
})
export default class ProductsGrid {
  category = input<string>('todas');

  products = signal<Product[]>(
    [
      {
        id: '1',
        name: 'Smartphone Android Display 6.5',
        description: 'Smartphone moderno com grande display, câmera de alta resolução e desempenho eficiente para tarefas diárias.',
        price: 1599.00,
        imageUrl: 'https://images.pexels.com/photos/6078129/pexels-photo-6078129.jpeg',
        rating: 4.5,
        reviewCount: 230,
        inStock: 0,
        category: 'Eletrônicos'
      },
      {
        id: '2',
        name: 'Fone de Ouvido Bluetooth Sem Fio',
        description: 'Fones de ouvido Bluetooth com cancelamento de ruído e autonomia de bateria prolongada.',
        price: 299.90,
        imageUrl: 'https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg',
        rating: 4.2,
        reviewCount: 540,
        inStock: 120,
        category: 'Eletrônicos'
      },
      {
        id: '3',
        name: 'Notebook Ultrafino 14\'',
        description: 'Notebook ultrafino com processador de última geração, ideal para trabalho e entretenimento.',
        price: 4899.99,
        imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
        rating: 4.8,
        reviewCount: 310,
        inStock: 30,
        category: 'Eletrônicos'
      },
      {
        id: '5',
        name: 'Jogo de Lençol Casal 4 Peças',
        description: 'Jogo de lençol de casal com 4 peças, tecido macio e excelente durabilidade para uso diário.',
        price: 249.50,
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81dQwQlmAXL._AC_SL1500_.jpg',
        rating: 4.3,
        reviewCount: 410,
        inStock: 60,
        category: 'Cama e mesa'
      },
      {
        id: '6',
        name: 'Colcha Cama Queen Floral',
        description: 'Colcha para cama queen com estampa floral elegante e acabamento de alta qualidade.',
        price: 329.99,
        imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
        rating: 4.1,
        reviewCount: 155,
        inStock: 50,
        category: 'Cama e mesa'
      },
      {
        id: '7',
        name: 'Geladeira Frost Free Inox 375 L',
        description: 'Geladeira frost free com amplo espaço interno, compartimentos ajustáveis e eficiência energética.',
        price: 3799.00,
        imageUrl: 'https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg',
        rating: 4.6,
        reviewCount: 98,
        inStock: 20,
        category: 'Eletrodomésticos'
      },
      {
        id: '8',
        name: 'Micro-ondas Digital 32 L',
        description: 'Micro-ondas digital com múltiplas funções de aquecimento e design moderno para sua cozinha.',
        price: 699.90,
        imageUrl: 'https://images.pexels.com/photos/374023/pexels-photo-374023.jpeg',
        rating: 4.4,
        reviewCount: 152,
        inStock: 37,
        category: 'Eletrodomésticos'
      },
      {
        id:'9',
        name: 'Lavadora de Roupas 11 kg',
        description: 'Lavadora de roupas com alta capacidade, ciclos programáveis e baixo consumo de água e energia.',
        price: 2499.00,
        imageUrl: 'https://images.pexels.com/photos/5399410/pexels-photo-5399410.jpeg',
        rating: 4.7,
        reviewCount: 78,
        inStock: 15,
        category: 'Eletrodomésticos'
      },
      {
        id: '10',
        name: 'Liquidificador 700 W',
        description: 'Liquidificador potente com lâminas de aço inoxidável, ideal para sucos e preparos variados.',
        price: 189.99,
        imageUrl: 'https://images.pexels.com/photos/1307695/pexels-photo-1307695.jpeg',
        rating: 4.0,
        reviewCount: 340,
        inStock: 90,
        category: 'Eletrodomésticos'
      }
    ]
  );

  filteredProducts = computed(() => {
    if (this.category() === 'todas') {
      return this.products();
    }
      return this.products()
        .filter(p => p.category.toLowerCase() === this.category().toLowerCase())
  });

  categories = signal<string[]>([
    'todas', 'eletrônicos', 'cama e mesa','eletrodomésticos', 'casa'
  ])
}
