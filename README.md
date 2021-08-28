# NgxModel

This library is trying to solve problems occured during Typescript Angular development.

## Usage

### 1. Create a DTO that comes from Backend or from some static JSON file

```
export interface ProductDTO {
  id: string = '';
  name: string | null = '';
  price: number = 0.00;
  category?: string = '';
  bundle: boolean = false;
  products: Array<ProductDTO> = [];
}

```

### 2. Extend the Product class with Model adding DTO as generic type

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

### 1. We are able to load model in a nice way from JSON

```
const productFromBackend = {"id": "123abx1ba..",...}
const product = new Product().loadModel(productFromBackend);

```

### 2. We have intelisense while filling manualy product object

```
const product = new Product().loadModel({
  name: "Jacket" // while typing have intelisense helping out because we added ProductDTO as generic type
})

```

### 3. With loadModel() function we have avoided populating object in **constructor** and its nasty **super()** calls when extending class

### 4. When using for configs and options we are able to nicely introduce defaults

```
export class LoggerOptions exends Model<{enabled:boolean, url:string}>{
  enabled = true;
  url = 'https://mysite.com/api/logs'
}

// developers configuration
const loggerOptions = {url: 'https://mycustomlogendpoint.com/api/logs'}
const options = new Options().loadModel(loggerOptions);
```

\*\*\* here url will be set by developer but property enabled will be true acting like default if not passed into loadModel function. Here we avoid nasty checks if developer has passed enabled property for configuration.

### 5. We have a nice way to load relations also by overriding loadModelFunction()

```
export class User extends Model<UserDTO>{
  id: string = '';
  firstName: string | null = null;
  lastName: string | null = null;
  sex: string = '';
  virgin?: boolean = undefined;
  address: Address = new Address();

  /**
   * Overriden to be able to load Address relation
   */
  loadModel(input: UserDTO) {
    super.loadModel(input); // using to populate main object
    // then populating Address relation
    this.address = new Address().loadModel(input.address);
    return this;
  }
}

//we can now do something like this

const user = new User().loadModel(dataFromBackend);

user.addres.getCombinedAddress() // here we could implement whole address as a string

```
