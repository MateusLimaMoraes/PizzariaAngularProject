import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  name = '';
  phone = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  async onLogin(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorMessage = 'Preencha email e senha';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    try {
      const result = await this.authService.login(this.email, this.password);

      console.log('🎯 Resultado recebido:', result); // ← Debug

      if (result.success) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Email ou senha incorretos';
        console.log('❌ Mostrando erro:', this.errorMessage);
      }
    } catch (error) {
      console.error('❌ Exceção capturada:', error);
      this.errorMessage = 'Erro ao fazer login';
    } finally {
      this.isLoading = false; // ← SEMPRE para o loading
      this.cdr.detectChanges();
    }
  }

  async onRegister(): Promise<void> {
    this.router.navigate(['/register']);
  }
}