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
