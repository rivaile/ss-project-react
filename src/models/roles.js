import * as rolesService from '@/services/roles';


export default {
  namespace: 'roles',
  state: {
    list: [],
    total: null,
    page: null,
    auths: []
  },
  reducers: {
    save(state, {payload: {data: list, total, page}}) {
      return {...state, list, total, page};
    }
  },

  effects: {
    * fetch({payload: values}, {call, put}) {
      const respone = yield call(rolesService.fetch, values);
      yield put({
        type: 'save',
        payload: {
          data: respone.data,
          total: respone.total,
          page: respone.current
        }
      });
    },

    * auth({payload: values}, {call, put}) {
      const respone = yield call(rolesService.auths, values);
      this.state.auths = respone.data;

    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin1/role') {
          dispatch({type: 'fetch', payload: query});
        }
      });
    }
  }
}

