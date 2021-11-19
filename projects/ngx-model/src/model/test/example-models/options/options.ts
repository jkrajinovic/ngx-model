import { Model } from './../../../model';

export interface ModuleOptionsDTO {
  name?: string;
  active?: boolean;
}

export class ModuleOptions extends Model<ModuleOptionsDTO> {
  name = 'dummyModule';
  active = false;
}
