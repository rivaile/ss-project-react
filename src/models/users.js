import * as usersService from '@/services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null
  },
  reducers: {
    save(state, {payload: {data: list, total, page}}) {
      return {...state, list, total, page};
    }
  },
  effects: {
    * fetch({payload: {page = 1, current = 1, values}}, {call, put}) {
      const respone = yield call(usersService.fetch, values);
      yield put({
        type: 'save',
        payload: {
          data: respone.data,
          total: respone.total,
          page: respone.current
        }
      });
    },
    * create({payload: values}, {call, put}) {
      yield call(usersService.create, values);
      yield put({type: 'fetch'});
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      console.log('setup');
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin1/users') {
          dispatch({type: 'fetch', payload: query});
        }
      });
    }
  }
}
