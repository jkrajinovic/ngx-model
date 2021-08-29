import { ObjectLiteral } from './../types/object-literal';
import cloneDeep from 'lodash-es/cloneDeep';

/**
 * Used for populating model without the need for constructor.
 * If neccessary child object should override loadModel method for more complex object loading. Example: relational objects
 * Preserves initial object respecting immutability.
 * ***Important*** Be aware that when extending model values have to be initialy
 * assigned to be copied because of this https://stackoverflow.com/a/54559894
 * This will be default in Angular 12
 */
export abstract class Model<T extends ObjectLiteral> {
  loadModel(input: T) {
    if (input === undefined) {
      throw new Error(`Cannot load <<${this.constructor.name}>> from undefined!`);
    }

    const keys = Object.keys(this);

    if (keys.length === 0) {
      throw new Error(
        'Please initialize values in class when using model. See https://stackoverflow.com/a/54559894!'
      );
    }

    keys.forEach((key: string) => {
      if (typeof input[key] !== undefined) {
        (this as ObjectLiteral)[key] = input[key];
      }
    });
    return this;
  }

  /**
   * Returns deep cloned entity without null, undefined or NaN properties
   * Helpful when sending data to backend
   * TODO: recursevly clean()
   */
  clean(): any {
    const clean: any = cloneDeep(this);

    Object.keys(clean).forEach((key: string) => {
      if (clean[key] === undefined || clean[key] === null || Object.is(clean[key], NaN)) {
        delete clean[key];
      }
    });

    return clean;
  }

}
