import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pizza, CartItem } from '../models/pizza.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  addToCart(pizza: Pizza): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.pizza.id === pizza.id);

    if (existingItem) {
      existingItem.quantity++;
      this.cartItemsSubject.next([...currentItems]);
    } else {
      this.cartItemsSubject.next([...currentItems, { pizza, quantity: 1 }]);
    }
  }

  removeFromCart(pizzaId: number): void {
    const currentItems = this.cartItemsSubject.value;
    this.cartItemsSubject.next(currentItems.filter(item => item.pizza.id !== pizzaId));
  }

  updateQuantity(pizzaId: number, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(i => i.pizza.id === pizzaId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.cartItemsSubject.next([...currentItems]);
    }
  }

  getTotal(): number {
    return this.cartItemsSubject.value.reduce(
      (sum, item) => sum + (item.pizza.price * item.quantity), 0
    );
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getCartCount(): number {
    return this.cartItemsSubject.value.length;
  }
}
