# NgxModel

This util ames to make working with models in Typescript and Angular much easier.

Features:

- safely loading model
- safely loading relations in model
- exporting clean entity for let say backend (without: undefined, null, NaN)
- ...more to come

## Usage

### 1. Create a DTO that comes from Backend or from some static JSON file.

```
export interface ProductDTO {
  id : string;
  name: string | null;
  price: number;
  category?: string;
  bundle: boolean;
  products: Array<ProductDTO>;
}

```

### 2. Extend the Product class with Model adding DTO as generic type.

```
export class Product extend Model<ProductDTO> {
  id: string = '';
  name: string | null = '';
  price: number = 0.00;
  category?: string = '';
  bundle: boolean = false;
  products: Array<Product> = [];

  getPrice(){
    if(!this.isBundle){
      return this.price;
    }
    return products.reduce( (acc, product) => acc + product.price, 0);
  }
}

```

## Benefits

### 1. We are able to load model in a nice way from object literal or JSON file.

```
const productFromBackend = {"id": "123abx1ba..",...}
const product = new Product().loadModel(productFromBackend);

```

### 2. We have intelisense while populating manually our object.

```
const product = new Product().loadModel({
  name: "Jacket" // while typing intelisense kicks in helping because of ProductDTO.
})

```

### 3. With loadModel() function we have avoided populating object in **constructor** and its nasty **super()** calls when extending class.

### 4. When using model with configurations and options we are able to gracefully introduce defaults.

```
export class LoggerOptions exends Model<{enabled:boolean, url:string}>{
  enabled = true;
  url = 'https://mysite.com/api/logs'
}

// developers configuration
const loggerOptions = {url: 'https://mycustomlogendpoint.com/api/logs'}

//merging developer configs with defaults
const options = new Options().loadModel(loggerOptions);
```

\*\*\* here the url property will be set by developer but property enabled will be true acting like default if not passed into loadModel() function. We have avoided nasty checks if developer has passed enabled property for configuration.

### 5. We have a nice way to load relations also by overriding loadModel() function.

\*\*\* This will probably be available without overriding in future

```
export class User extends Model<UserDTO>{
  id: string = '';
  firstName: string | null = null;
  lastName: string | null = null;
  sex: string = '';
  virgin?: boolean = undefined;
  address: Address = new Address(); // relation

  /**
   * We can override loadModel() function to populate adress model aswell
   */
  loadModel(input: UserDTO) {
    super.loadModel(input); // using to populate user object

    // then populating Address relation
    this.address = new Address().loadModel(input.address);
    return this;
  }
}

//we can now do something like this

const user = new User().loadModel(dataFromBackend);

user.addres.getCombinedAddress() // We use some function from address instance

```

_Have a nice day!_
