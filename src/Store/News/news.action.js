import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
//Replace action name and update action types
export const actionCreator = {
  getNewsInformation: (params) => {
    return { type: 'GET_NEWS_DATA', payload: params };
  },
  getNewsInformationRequest: (params) => {
    return {
      type: 'GET_NEWS_DATA_REQUEST',
      payload: params,
    };
  },
  getNewsInformationSuccess: (payload) => {
    return {
      type: 'GET_NEWS_DATA_SUCCESS',
      payload: payload,
    };
  },

  getNewsInformationFailure: () => {
    return {
      type: 'GET_NEWS_DATA_FAILURE',
    };
  },
};

function* sagasRequestExample({ payload }) {
  const params = payload;
  yield put(actionCreator.getNewsInformationRequest({ ...params }));

  var options = {
    method: 'GET',
    url: 'https://api.newscatcherapi.com/v2/latest_headlines',
    params: { ...params },
    headers: {
      'x-api-key': 'N_OUWDurZT4maYL7NdaajmrIV0dH3r6JK8s5zGc2nGE',
    },
  };
  try {
    const response = yield axios.request(options);
    if (response?.status === 200 && response?.data?.status === 'ok') {
      yield put(actionCreator.getNewsInformationSuccess(response?.data?.articles));
    }
    if (response?.status === 200) {
      yield put(actionCreator.getNewsInformationSuccess(response?.data?.articles));
    }
  } catch (error) {
    yield put(actionCreator.getNewsInformationFailure());
  }
}

export function* newsActionsWatcher() {
  yield takeLatest('GET_NEWS_DATA', sagasRequestExample);
}
