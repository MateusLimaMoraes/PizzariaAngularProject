import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  isLoading = false;

  emailError = '';
  passwordError = '';
  confirmPasswordError = '';
  nameError = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  validateName(): void {
    if (!this.name) {
      this.nameError = '';
    } else if (this.name.trim().length < 3) {
      this.nameError = 'Nome muito curto';
    } else if (!this.name.includes(' ')) {
      this.nameError = 'Digite nome e sobrenome';
    } else {
      this.nameError = '';
    }
  }
  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.email) {
      this.emailError = '';
    } else if (!emailRegex.test(this.email)) {
      this.emailError = 'Email inválido';
    } else {
      this.emailError = '';
    }
  }

  validatePassword(): void {
    if (!this.password) {
      this.passwordError = '';
    } else if (this.password.length < 6) {
      this.passwordError = 'A senha deve ter no mínimo 6 caracteres';
    } else {
      this.passwordError = '';
    }

    // Revalida confirmação se já foi preenchida
    if (this.confirmPassword) {
      this.validateConfirmPassword();
    }
  }
  validateConfirmPassword(): void {
    if (!this.confirmPassword) {
      this.confirmPasswordError = '';
    } else if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'As senhas não coincidem';
    } else {
      this.confirmPasswordError = '';
    }
  }
  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, '');

    value = value.slice(0, 11);

    let formatted = '';

    if (value.length > 0) {
      formatted = '(' + value.substring(0, 2);
    }

    if (value.length >= 3) {
      formatted += ') ' + value.substring(2, 7);
    }

    if (value.length >= 8) {
      formatted += '-' + value.substring(7, 11);
    }

    input.value = formatted;
    this.phone = value;
  }

  async onRegister(): Promise<void> {
    this.validateName(); 
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    if (!this.name || !this.email || !this.phone || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Preencha todos os campos';
      return;
    }

    if (this.emailError || this.passwordError || this.confirmPasswordError) {
      this.errorMessage = 'Corrija os campos antes de continuar';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    try {
      const result = await this.authService.register(this.email, this.password, this.name, this.phone);

      if (result.success) {
        alert('Cadastro realizado com sucesso!');

        // Faz login automaticamente
        const loginResult = await this.authService.login(this.email, this.password);

        if (loginResult.success) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.errorMessage = result.error || 'Erro ao cadastrar';
      }
    } catch (error) {
      this.errorMessage = 'Erro ao cadastrar';
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}