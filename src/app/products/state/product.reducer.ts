import { Product } from '../product';
import * as FromRoot from '../../app.state';

// this represents the entire state tree
export interface State extends FromRoot.State {
  product: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

// reducer takes in the original state, the action dispatched by the component, and last return the new state
export function reducer(state: ProductState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload
      };

    default:
      return state;
  }
}
