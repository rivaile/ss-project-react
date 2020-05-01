import * as usersService from '@/services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
    deptTree: []
  },
  reducers: {
    save(state, {payload: {data: list, total, page}}) {
      return {...state, list, total, page};
    },

    saveDept(state, {payload: {data: depts}}) {
      const deptTreeFun = (depts) => {
        return depts.map(it => {
          it.title = it.name;
          it.key = it.id;
          it.value = it.id;
          console.dir(it.children.length);
          if (it.children.length > 0) {
            deptTreeFun(it.children);
          }
          return it;
        });
      };

      const deptTree = deptTreeFun.call(this, depts);
      return {...state, deptTree};
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

    * fetchDept(action, {call, put}) {
      const respone = yield call(usersService.fetchDept);
      yield put({
        type: 'saveDept',
        payload: {
          data: respone.data,
        }
      });
    },

    * createDept({payload: values}, {call, put}) {
      yield call(usersService.createDept, values);
      yield put({type: 'fetchDept'});
    },

    * patchDept({payload: {id, values}}, {call, put}) {
      yield call(usersService.patchDept, id, values);
      yield put({type: 'fetchDept'});
    },

    * removeDept({payload: id}, {call, put}) {
      yield call(usersService.removeDept, id);
      yield put({type: 'fetchDept'});
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin1/users') {
          dispatch({type: 'fetch', payload: query});
          dispatch({type: 'fetchDept'});
        }
      });
    }
  }
}
