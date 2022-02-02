const initialState = {
  articles: [],
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  pageSize: 20,
  q: "",
  country: "",
  category: "",
};
const newReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case "GET_NEWS_DATA_REQUEST":
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isFailure: false,
        pageSize: action?.payload?.pageSize,
        q: action?.payload?.q,
        country: action?.payload.country,
        category: action?.payload?.category,
      };
    case "GET_NEWS_DATA_SUCCESS":
      return {
        ...state,
        articles: action.payload,
        isLoading: false,
        isSuccess: true,
        isFailure: false,
      };
    case "GET_NEWS_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFailure: true,
      };
    default:
      return state;
  }
};
export default newReducer;
