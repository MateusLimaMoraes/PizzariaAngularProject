import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { CartModalComponent } from '../../components/cart-modal/cart-modal';
import { MenuService } from '../../services/menu';
import { CartService } from '../../services/cart';
import { Pizza } from '../../models/pizza.models';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, LucideAngularModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent implements OnInit {
  selectedCategory = 'especiais';
  pizzas: Pizza[] = [];
  filteredPizzas: Pizza[] = [];
  
  categories = [
    { value: 'especiais', label: 'Pizzas Especiais' },
    { value: 'promocoes', label: 'Promoções' },
    { value: 'doces', label: 'Pizzas Doces' }
  ];

  constructor(
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.menuService.getAllPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
      this.filterPizzas();
    });
  }

  filterPizzas(): void {
    this.filteredPizzas = this.pizzas.filter(p => p.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterPizzas();
  }

  addToCart(pizza: Pizza): void {
    this.cartService.addToCart(pizza);
  }
}