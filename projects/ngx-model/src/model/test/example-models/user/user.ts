import { Address } from './address';
import { Model } from './../../../model';
import { UserDTO } from './user-dto';

export class User extends Model<UserDTO>{
  id: string = '';
  firstName: string | null = null;
  lastName: string | null = null;
  sex: string = '';
  virgin?: boolean = undefined;
  address: Address = new Address();

  /**
   * Overriden to be able to load relation
   */
  override loadModel(input: UserDTO) {
    super.loadModel(input);
    console.log('from user', this);
    this.address = new Address().loadModel(input.address);
    return this;
  }
}
