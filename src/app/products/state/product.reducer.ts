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

// declare initial value for product state
const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

// reducer takes in the original state, the action dispatched by the component, and last return the new state
export function reducer(state = initialState, action): ProductState {
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
