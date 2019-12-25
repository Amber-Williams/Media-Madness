import { combineReducers } from 'redux';

export const itemLoading = (state = [], action) => {
  switch(action.type) {
    case 'DATA_LOADING':
      return [...state, action.status]
    default:
      return state;
  }
}

export const itemLoadError = (state = false, action) => {
  switch(action.type) {
    case 'DATA_LOADING_FAILURE':
      return action.status
    default:
      return state;
  }
}


export const rootReducer = combineReducers({
  itemLoading,
  itemLoadError
});

export default rootReducer;