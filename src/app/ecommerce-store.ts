import {Product} from './models/product';
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {produce} from 'immer';
import {ToasterService} from './services/toaster-service';
import {CartModel} from './models/cart-model';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartModel[];
}

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [
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
    ],
    category: 'todas',
    wishlistItems: [],
    cartItems: []
  } as EcommerceState),
  withComputed(({ category, products, wishlistItems, cartItems }) => ({
    filteredProducts: computed(() => {
      if (category() === 'todas') return products();
      return products()
        .filter((prod) =>
          prod.category.toLowerCase() === category().toLowerCase())
    }),
    wishlistCount: computed(() => {
      return wishlistItems().length
    }),
    cartCount: computed(() => {
      return cartItems().reduce((acc, item) => acc + item.quantity, 0);
    })

  })),

  withMethods((store, toaster = inject(ToasterService)) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category });
    }),
    addToWishlist: (product: Product) => {
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if(!draft.find(p => p.id === product.id)) {
          draft.push(product);
        }
      });

      patchState(store, { wishlistItems: updatedWishlistItems });
      toaster.success('Producto adicionado com sucesso!');
    },
    removeFromWishlist: (product: Product)=> {
      patchState(store, {
        wishlistItems: store.wishlistItems().filter((prod) => prod.id !== product.id),
      });

      toaster.success('Producto removido com sucesso!');
    },
    clearWishlist: () => {
      patchState(store, { wishlistItems: [] });
    },
    addToCart: (product: Product, quantity = 1) => {
      const existingItemIndex = store.cartItems().findIndex(item => item.product.id === product.id);
      console.log(existingItemIndex);

      const updatedCartItems = produce(store.cartItems(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity += quantity;
          return;
        }

        draft.push({
          product, quantity
        })
      });

      patchState(store, { cartItems: updatedCartItems });
      toaster.success(existingItemIndex !== -1 ? 'Adicionar produto novamente' : 'Producto adicionado ao carrinho!');
    },
    setItemQuantity: (params: { productId: string, quantity: number }) => {
      const index = store.cartItems().findIndex(c => c.product.id === params.productId);
      const updated = produce(store.cartItems(), (draft) => {
        draft[index].quantity = params.quantity
      });
      patchState(store, { cartItems: updated });
    },
    addAllWishlistToCart: () => {
      const updatedCartItems = produce(store.cartItems(), (draft) => {
        store.wishlistItems().forEach(p => {
          if (!draft.find(c => c.product.id === p.id)) {
            draft.push({ product: p, quantity: 1})
          }
        });
      });
      patchState(store, { cartItems: updatedCartItems, wishlistItems: []});
    },
    moveToWishlist: (product: Product) => {
      const updatedCartItems = store.cartItems()
        .filter((p => p.product.id !== product.id));

      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find(p => p.id === product.id)) {
          draft.push(product);
        }
      });
      patchState(store, {cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
    },
    removeFromCart: (product: Product) => {
      patchState(store, { cartItems: store.cartItems()
          .filter(c => c.product.id !== product.id)});
    }
  }))
)
