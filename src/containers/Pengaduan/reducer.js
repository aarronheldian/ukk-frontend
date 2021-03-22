import { ACTIONS } from '../../constants';

export const initialState = {
  listPengaduan: {
    data: [],
    meta: {}
  },
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  const { LIST_PENGADUAN } = ACTIONS;
  switch (type) {
    case LIST_PENGADUAN:
      return {
        ...state,
        listPengaduan: data
      };
    default:
      return state;
  }
}
