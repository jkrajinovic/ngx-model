import { Model } from './../../../model';
import { AddressDTO } from './address-dto';

export class Address extends Model<AddressDTO>{
  id: string = '';
  streetNumber: string = '';
  street: string = '';
  city: string = '';
  county: string = '';
  country: string = '';
}
