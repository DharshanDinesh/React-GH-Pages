import { combineReducers } from "redux";
import newsReducer from "./News/news.reducer";

export default combineReducers({
  news: newsReducer,
});
