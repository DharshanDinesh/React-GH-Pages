import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
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

  var options = {
    method: "GET",
    url: "https://api.newscatcherapi.com/v2/latest_headlines",
    params: { ...params },
    headers: {
      "x-api-key": "N_OUWDurZT4maYL7NdaajmrIV0dH3r6JK8s5zGc2nGE",
    },
  };

  const response = yield axios.request(options);
  console.log(response);

  if (response?.status === 200) {
    yield put(
      actionCreator.getNewsInformationSuccess(response?.data?.articles)
    );
  } else {
    yield put(actionCreator.getNewsInformationFailure());
  }
}

export function* newsActionsWatcher() {
  yield takeLatest("GET_NEWS_DATA", sagasRequestExample);
}
