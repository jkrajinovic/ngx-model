import { Model } from './../../../model';
import { EmptyObjectDTO } from './empty-dto';

/**
 * Created for purpose of testing
 * Unnassigned properties will result in empty object in runtime
 * therefore Model should throw error on loadModel function
 */
export class EmptyObject extends Model<EmptyObjectDTO>{
  id!: string;
  someOtherUnassignedProperty!: string;
}
