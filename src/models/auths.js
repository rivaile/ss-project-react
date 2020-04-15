import * as authsService from '@/services/auths';

export default {
  namespace: 'auths',
  state: {
    auth: {
      list: [],
      total: null,
      page: null,
    },
    module: {
      data: []
    },
  },

  reducers: {
    saveAuth(state, {payload: {data: list, total: total, current: current}}) {
      state.auth.list = list;
      state.auth.total = total;
      state.auth.page = current;
      return state;
    },

    saveAuthModule(state, {payload: {data}}) {
      state.module.data = data;
      return state;
    }
  },

  effects: {


    * fetchAuthModule({}, {call, put}) {
      const response = yield call(authsService.fetchAuthModule);
      yield put({
        type: 'saveAuthModule',
        payload: {
          data: response.data,
        }
      });
    },

    * createAuthModule({payload: values}, {call, put}) {
      const response = yield call(authsService.createAuthModule, values);
      yield put({
        type: 'fetchAuthModule'
      });
    },

    * patchAuthModule({payload: {id: id, values: values}}, {call, put}) {
      const response = yield call(authsService.patchAuthModule, id, values);
      yield put({
        type: 'fetchAuthModule',
      });
    },
    * removeAuthModule({payload: {id: id}}, {call, put}) {
      const response = yield call(authsService.removeAuthModule, id);
      yield put({
        type: 'fetchAuthModule',
      });
    },


    * createAuth({payload: values}, {call, put}) {
      const response = yield call(authsService.createAuth, values);
      yield put({
        type: 'fetchAuth'
      });
    },


    * patchAuth({payload: {id: id, data: data}}, {call, put}) {
      const response = yield call(authsService.patchAuth, id, data);
      yield put({
        type: 'fetchAuth'
      });
    },

    * fetchAuth({payload: {id: authModuleId}}, {call, put}) {
      const response = yield call(authsService.fetchAuth, authModuleId);
      yield put({
        type: 'saveAuth',
        payload: {
          data: response.data,
          total: response.total,
          current: response.current,
        }
      });
    },

  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin1/auth') {
          dispatch({type: 'fetchAuthModule'});
        }
      });
    }
  }
}
