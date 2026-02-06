export interface Pizza {
  id: number;
  name: string;
  ingredients: string;
  price: number;
  category: 'especiais' | 'promocoes' | 'doces';
  imageUrl: string;
}

export interface CartItem {
  pizza: Pizza;
  quantity: number;
}