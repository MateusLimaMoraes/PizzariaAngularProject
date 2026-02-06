import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { MenuService } from '../../services/menu';
import { CartService } from '../../services/cart';
import { Pizza } from '../../models/pizza.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  featuredPizzas: Pizza[] = [];

  constructor(
    private router: Router,
    private menuService: MenuService,
    private cartService: CartService
  ) {
    this.menuService.getAllPizzas().subscribe(pizzas => {
      this.featuredPizzas = pizzas.filter(p => p.category === 'especiais').slice(0, 3);
    });
  }

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }

  addToCart(pizza: Pizza): void {
    this.cartService.addToCart(pizza);
    this.router.navigate(['/menu']);
  }
}
