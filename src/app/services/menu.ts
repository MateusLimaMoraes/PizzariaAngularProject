import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pizza } from '../models/pizza.models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private pizzas: Pizza[] = [
    { id: 1, name: 'Marguerita', ingredients: 'Manjericão, Tomate, Mussarela, Azeitonas e Orégano', price: 45.00, category: 'especiais', imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=150&h=150&fit=crop' },
    { id: 2, name: 'Calabresa Simples', ingredients: 'Calabresa, Cebola, Azeitonas e Orégano', price: 42.00, category: 'especiais', imageUrl: '/images/calabresa-simples.jpg' },
    { id: 3, name: 'Alho Poró', ingredients: 'Mussarela, Alho Poró, Tomate, Azeitonas e Orégano', price: 48.00, category: 'especiais', imageUrl: 'assets/images/alho-poro.jpg' },
    { id: 4, name: 'Hot-Dog', ingredients: 'Mussarela, Salsicha ao Molho, Batata Palha, Azeitonas e Orégano', price: 44.00, category: 'especiais', imageUrl: 'assets/images/hot-dog.jpg' },
    { id: 5, name: '4 Queijos', ingredients: 'Gorgonzola, Catupiry, Mussarela, Provolone, Azeitonas e Orégano', price: 52.00, category: 'promocoes', imageUrl: 'assets/images/4-queijos.jpg' },
    { id: 6, name: 'Calabresa Toscana', ingredients: 'Calabresa, Mussarela, Cebola, Azeitonas e Orégano', price: 46.00, category: 'promocoes', imageUrl:'assets/images/calabresa-toscana.jpg' },
    { id: 7, name: 'Portuguesa', ingredients: 'Presunto, Ervilha, Cebola, Ovo, Mussarela, Azeitonas e Orégano', price: 50.00, category: 'promocoes', imageUrl: 'assets/images/portuguesa.jpg' },
    { id: 8, name: 'Frango com Catupiry', ingredients: 'Frango, Catupiry, Mussarela, Azeitonas e Orégano', price: 48.00, category: 'promocoes', imageUrl: 'assets/images/frango-catupiry.jpg' },
    { id: 9, name: 'Chocolate', ingredients: 'Chocolate, Mussarela, Caramelo e Leite Condensado', price: 38.00, category: 'doces', imageUrl: 'assets/images/chocolate.jpg' },
    { id: 10, name: 'Brigadeiro', ingredients: 'Creme de Brigadeiro, Caramelo e Chocolate Granulado', price: 40.00, category: 'doces', imageUrl: 'assets/images/brigadeiro.jpg' },
    { id: 11, name: 'Prestígio', ingredients: 'Creme de Brigadeiro, Caramelo e Coco Ralado', price: 42.00, category: 'doces', imageUrl:'assets/images/prestigio.jpg' },
    { id: 12, name: 'M&M', ingredients: 'Leite Condensado, Mussarela, Chocolate ao Leite, M&M e Caramelo', price: 45.00, category: 'doces', imageUrl:'assets/images/m-m.jpg' },
  ];

  getPizzasByCategory(category: string): Observable<Pizza[]> {
    return of(this.pizzas.filter(p => p.category === category));
  }

  getAllPizzas(): Observable<Pizza[]> {
    return of(this.pizzas);
  }
}