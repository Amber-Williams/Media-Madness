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

export const screenStageStatus = (state = [[1,1]], action) => {
  switch(action.type) {
    case 'CHANGING_SCREEN_STAGES':
      return [...state, action.status]
    default:
      return state;
  }
}

export const gameMessageList = (state = [], action) => {
  switch(action.type) {
    case 'ADD_GAME_MESSAGE':
      return [...state, action.status]
    default:
      return state;
  }
}

export const gameVotes = (state = [], action) => {
  switch(action.type) {
    case 'SET_GAME_ROUND_VOTES':
      return [...state, action.status]
    default:
      return state;
  }
}

export const gameRound = (state = 0, action) => {
  switch(action.type) {
    case 'INC_GAME_ROUND':
      return state + 1
    default:
      return state;
  }
}


export const rootReducer = combineReducers({
  itemLoading,
  itemLoadError,
  screenStageStatus,
  gameMessageList,
  gameVotes,
  gameRound
});

export default rootReducer;