import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, AuthError, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://fcuqqqjdumijbkgscdyz.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdXFxcWpkdW1pamJrZ3NjZHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxOTAyNjIsImV4cCI6MjA4MTc2NjI2Mn0.u32FmgCJbGcny1i2tQ1-YWrtNhyfbdibicQsUeXtL_o'
    );
  }

  async signUp(email: string, password: string, name: string, phone: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone: phone
        }
      }
    });
    return { data, error };
  }

  // Login
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  }

  // Logout
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }

  // Pegar usuário atual
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  // Verificar se está logado
  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }
}