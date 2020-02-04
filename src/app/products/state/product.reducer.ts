import { Product } from '../product';
import * as FromRoot from '../../app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActionTypes, ProductActions } from '../state/product.actions';

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

// selector state, order matters
const getProductFeatureState = createFeatureSelector<ProductState>('');

// selector
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode // projector function, returns only the desired data
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(getProductFeatureState, state => state.products);

// good selector should consider encapsulation, break down into smaller units as possible
// demo only
// export const getCurrentProductId = createSelector(
//   getProductFeatureState,
//   state => state.currentProduct.id
// );
// export const getCurrentProduct = createSelector(
//   getProductFeatureState,
//   getCurrentProductId,
//   (state, productId) => state.products.find(p=>p.id === productId)
// );

// reducer takes in the original state, the action dispatched by the component, and last return the new state
export function reducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload }
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: '',
          description: '',
          starRating: 0
        }
      };

    default:
      return state;
  }
}
