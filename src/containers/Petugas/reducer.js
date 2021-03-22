import { ACTIONS } from '../../constants';

export const initialState = {
  listPetugas: {
    data: [],
    meta: {}
  },
  detailPetugas: {},
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const { LIST_PETUGAS, DETAIL_PETUGAS } = ACTIONS;
  switch (type) {
    case LIST_PETUGAS:
      return {
        ...state,
        listPetugas: data
      };
    case DETAIL_PETUGAS:
      return {
        ...state,
        detailPetugas: data
      };
    default:
      return state;
  }
}
