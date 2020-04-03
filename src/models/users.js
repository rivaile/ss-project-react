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

    * fetch({payload: values}, {call, put}) {
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

    * patch({payload: {id, values}}, {call, put}) {
      yield call(usersService.patch, id, values);
      yield put({type: 'reload'});
    },

    * reload(action, {put, select}) {
      const page = yield select(state => state.users.page);
      yield put({type: 'fetch', payload: {current: page}});
    },

    * remove({payload: id}, {call, put}) {
      yield call(usersService.remove, id);
      yield put({type: 'reload'});
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
