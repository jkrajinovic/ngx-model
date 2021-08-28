import { Model } from './../../../model';
import { ProductDTO } from './product-dto';

export class Product extends Model<ProductDTO> {
  id: string = '';
  name: string | null = '';
  price: number = 0.00;
  category?: string = '';
  isBundle: boolean = false;
  products: Array<Product> = [];
}
