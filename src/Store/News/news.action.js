import { put, takeLatest } from "redux-saga/effects";

//Replace action name and update action types
export const actionCreator = {
  getNewsInformation: (params) => {
    return { type: "GET_NEWS_DATA", payload: params };
  },
  getNewsInformationRequest: (params) => {
    return {
      type: "GET_NEWS_DATA_REQUEST",
      payload: params,
    };
  },
  getNewsInformationSuccess: (payload) => {
    return {
      type: "GET_NEWS_DATA_SUCCESS",
      payload: payload,
    };
  },

  getNewsInformationFailure: () => {
    return {
      type: "GET_NEWS_DATA_FAILURE",
    };
  },
};
const genereateQueryString = (object) => {
  for (let key in object) {
    if (object[key]?.length === 0) {
      delete object[key];
    }
  }
  const params = new URLSearchParams({
    ...object,
  });
  return "?" + params.toString();
};

function* sagasRequestExample({ payload }) {
  const params = payload;
  yield put(actionCreator.getNewsInformationRequest({ ...params }));
  const response = yield fetch(
    "https://newsapi.org/v2/top-headlines" +
      genereateQueryString({
        ...params,
        apiKey: "39f762deeaeb4cbc97b5f04b6af240b6",
      })
  ).then((res) => res?.json());

  if (response?.status === "ok") {
    yield put(actionCreator.getNewsInformationSuccess(response?.articles));
  } else {
    yield put(actionCreator.getNewsInformationFailure());
  }
}

export function* newsActionsWatcher() {
  yield takeLatest("GET_NEWS_DATA", sagasRequestExample);
}
