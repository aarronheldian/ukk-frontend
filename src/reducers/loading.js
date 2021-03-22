import { ACTIONS } from '../constants';

const initialState = {
  isLoading: false,
  isLoadingSubmit: false,
};

export default function reducer(state = initialState, action) {
  const {
    DONE_LOADING,
    DONE_LOADING_SUBMIT,
    LOADING,
    LOADING_SUBMIT,
  } = ACTIONS;
  const { type } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case DONE_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case LOADING_SUBMIT:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case DONE_LOADING_SUBMIT:
      return {
        ...state,
        isLoadingSubmit: false
      };
    default:
      return state;
  }
}
