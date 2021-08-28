import { ObjectLiteral } from './../types/object-literal';

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
                'Please initialize values in class when using model. See https://stackoverflow.com/a/54559894 !'
            );
        }

        keys.forEach((key:string) => {
            if (input[key]) {
                (this as ObjectLiteral)[key] = input[key];
            }
        });
        return this;
    }

    /**
     * Returns entity without null or undefined values
     * Helpful when sending to backend
     */
    clean() {
        Object.keys(this).forEach((key:string) => {
            const self = this as ObjectLiteral;
            if (self[key] === undefined || self[key] === null) {
                delete self[key][key];
            }
        });
        return this;
    }
}
