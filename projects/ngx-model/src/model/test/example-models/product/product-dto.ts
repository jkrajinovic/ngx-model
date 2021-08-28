
export interface ProductDTO {
  id: string;
  name: string | null;
  price: number;
  category: string;
  isBundle: boolean;
  products: Array<ProductDTO>
}
