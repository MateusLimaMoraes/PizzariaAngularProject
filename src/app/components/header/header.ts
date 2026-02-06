import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';
import { LucideAngularModule } from 'lucide-angular';
import { CartModalComponent } from '../cart-modal/cart-modal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, CartModalComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  cartCount = 0;
  showCartModal = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      isAuth => this.isLoggedIn = isAuth
    );

    this.cartService.cartItems$.subscribe(
      items => this.cartCount = items.length
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openCart(): void {
    this.showCartModal = true;
  }

  closeCart(): void {
    this.showCartModal = false;
  }
}
