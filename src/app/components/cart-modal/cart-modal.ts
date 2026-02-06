import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/pizza.models';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './cart-modal.html',
  styleUrls: ['./cart-modal.css']
})
export class CartModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  onClose(): void {
    this.close.emit();
  }

  removeItem(pizzaId: number): void {
    this.cartService.removeFromCart(pizzaId);
  }

  updateQuantity(pizzaId: number, delta: number): void {
    const item = this.cartItems.find(i => i.pizza.id === pizzaId);
    if (item) {
      this.cartService.updateQuantity(pizzaId, item.quantity + delta);
    }
  }

  checkout(): void {
    const message = this.cartItems
      .map(item => `${item.quantity}x ${item.pizza.name} - R$ ${(item.pizza.price * item.quantity).toFixed(2)}`)
      .join('%0A');
    
    const total = `%0A%0ATotal: R$ ${this.total.toFixed(2)}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5543991605454&text=Olá, gostaria de fazer um pedido:%0A%0A${message}${total}`;
    
    window.open(whatsappUrl, '_blank');
  }
}