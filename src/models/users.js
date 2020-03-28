import * as userservice from '@/services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null
  },
  reducers: {},
  effects: {
    * fetch({payload: {page = 1}}, {call, put}) {
      let response = yield call(userservice.queryUserList, {page});
      console.dir(response);

    }
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
