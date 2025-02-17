export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  size?: number;
}