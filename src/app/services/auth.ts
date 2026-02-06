import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private supabase: SupabaseService) {
    this.checkUser();
  }

  private async checkUser() {
    const isLogged = await this.supabase.isLoggedIn();
    this.isAuthenticatedSubject.next(isLogged);
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔐 AuthService: Tentando login...');
      
      const { data, error } = await this.supabase.signIn(email, password);
      
      console.log('📊 Resposta:', { data, error });
      
      if (error) {
        console.error('❌ Erro no login:', error);
        return { success: false, error: error.message };
      }

      if (!data.user) {
        console.error('❌ Usuário não retornado');
        return { success: false, error: 'Usuário não encontrado' };
      }

      console.log('✅ Login bem-sucedido!');
      this.isAuthenticatedSubject.next(true);
      return { success: true };
      
    } catch (err: any) {
      console.error('❌ Exceção no login:', err);
      return { success: false, error: err.message || 'Erro desconhecido' };
    }
  }

  async register(email: string, password: string, name: string, phone: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await this.supabase.signUp(email, password, name, phone);
      
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
      
    } catch (err: any) {
      return { success: false, error: err.message || 'Erro desconhecido' };
    }
  }

  async logout(): Promise<void> {
    await this.supabase.signOut();
    this.isAuthenticatedSubject.next(false);
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.supabase.isLoggedIn();
  }
}