import { newsActionsWatcher } from "../News/news.action";
import { all } from "redux-saga/effects";

export function* watchSagas() {
  //Combine sagas with
  yield all([newsActionsWatcher()]);
}
