import { Model } from './../model';

import { Product } from './example-models/product/product';
import { productsMock } from './example-models/product/productMock';
import { ProductDTO } from './example-models/product/product-dto';

import { EmptyObject } from './example-models/empty/empty';

import { usersMock } from './example-models/user/userMock';
import { User } from './example-models/user/user';
import { Address } from './example-models/user/address';
import { ModuleOptions } from './example-models/options/options';

describe('Model class', () => {
  it('Generated object should be instance of Product', () => {
    const product = new Product();
    expect(product instanceof Product).toBeTrue();
  });

  it('Generated object should be instance of Model', () => {
    const product = new Product();
    expect(product instanceof Model).toBeTrue();
  });

  it('Should load model that is passed in', () => {
    const product = new Product();
    const manualProduct = new Product();

    Object.assign(manualProduct, productsMock[0]);
    product.loadModel(productsMock[0]);

    expect(product).toEqual(manualProduct);
  });

  it('Should throw error if undefinded is passed in loadModel function', () => {
    const product = new Product();
    const wrongValue: any = undefined;
    expect(() => product.loadModel(wrongValue)).toThrow(
      new Error(`Cannot load <<${product.constructor.name}>> from undefined!`)
    );
  });

  it('Should throw error if empty object is passed in to loadModel function', () => {
    const emptyObject = new EmptyObject();
    expect(() => emptyObject.loadModel(emptyObject)).toThrow(
      new Error(
        'Please initialize values in class when using model. See https://stackoverflow.com/a/54559894!'
      )
    );
  });

  it('loadModel() should override only given properties', () => {
    const options = new ModuleOptions().loadModel({
      name: 'myCustomName',
    });

    expect(options.name).toBe('myCustomName');
    expect(options.active).toBe(false);
  });

  it('clean() should remove properties with undefined, NaN or null values.', () => {
    const product = new Product();
    const neki: any = productsMock[1] as ProductDTO;
    product.loadModel(neki);

    product.category = undefined;
    product.name = null;
    product.price = NaN;

    const cleanProduct = product.clean();

    expect(cleanProduct.hasOwnProperty('name')).toBeFalse();
    expect(cleanProduct.hasOwnProperty('price')).toBeFalse();
    expect(cleanProduct.hasOwnProperty('category')).toBeFalse();
  });

  it('clean() function should create new object.', () => {
    const product = new Product();
    const neki: any = productsMock[1] as ProductDTO;
    product.loadModel(neki);

    product.name = null;

    const cleanProduct = product.clean();

    expect(cleanProduct === product).toBeFalse();
  });

  it('clean() function should create deep copy of orgin object.', () => {
    const user = new User();
    user.loadModel(usersMock[0]);

    const cleanUser = user.clean();
    cleanUser.address.streetNumber = '45';

    expect(cleanUser.address instanceof Address).toBeTrue();
    expect(user.address.streetNumber).toBe('12');
  });

  it('clean() function should return object that is same instance as origin object.', () => {
    const product = new Product();
    const neki: any = productsMock[1] as ProductDTO;

    product.loadModel(neki);

    const cleanProduct = product.clean();

    expect(cleanProduct).toBeInstanceOf(Product);
  });

  it('Modifiying clean object should not modify properties of object that was created from.', () => {
    const product = new Product();
    const mock = productsMock[1];

    product.loadModel(mock);

    const cleanProduct = product.clean();
    cleanProduct.id = '45';

    expect(product.id).toBe('2');
  });
});
