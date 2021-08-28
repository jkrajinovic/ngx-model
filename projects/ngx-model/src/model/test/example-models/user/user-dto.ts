import { AddressDTO } from './address-dto';
export interface UserDTO {
  id: string;
  firstName: string | null;
  lastName: string | null;
  sex: string;
  virgin: boolean;
  address: AddressDTO;
}
