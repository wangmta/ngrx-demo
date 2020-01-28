// import { ProductState } from './products/state/product.reducer'; // loazyloaded shouldn't be here, only import it in feature mudules
import { UserState } from './user/state/user.reducer';

export interface State {
  // products: ProductState;
  user: UserState;
}
