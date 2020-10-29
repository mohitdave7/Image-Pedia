const initialState = {
  Images: [],
};
export default function imageReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "SET_IMAGES": {
      return { ...state, Images: payload };
    }
    default:
      return state;
  }
}
