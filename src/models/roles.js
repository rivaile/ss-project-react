import * as rolesService from '@/services/roles';


export default {
  namespace: 'roles',
  state: {
    list: [],
    total: null,
    page: null,
    auths: [],
    checkedKeys: []
  },
  reducers: {
    save(state, {payload: {data: list, total, page}}) {
      return {...state, list, total, page};
    },

    saveAuths(state, {payload: {authTree}}) {
      const checkedKeys = [];

      const treeFun = (auths) => {
        return auths.map(it => {
          let treeObj = {};
          treeObj.title = it.name;
          treeObj.key = 'm-' + it.id;
          treeObj.children = [];
          if (it.authList.length > 0) {
            it.authList.forEach(item => {
              if (item.checked == true) {
                checkedKeys.push('a-' + item.id);
              }
              let treeAuthLeaf = {};
              treeAuthLeaf.title = item.name;
              treeAuthLeaf.key = 'a-' + item.id;
              treeObj.children.push(treeAuthLeaf);
            });
          }
          if (it.moduleList.length > 0) {
            treeObj.children.push(...treeFun(it.moduleList));
          }
          return treeObj;
        });
      };

      const auths = treeFun.call(this, authTree);
      console.dir(checkedKeys);
      return {...state, auths, checkedKeys};
    },

    setCheckedKeys(state, {payload: {checkedKeys}}) {
      return {...state, checkedKeys};
    },
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

    * create({payload: values}, {call, put}) {
      yield call(rolesService.create, values);
      yield put({
        type: 'fetch'
      });
    },

    * patch({payload: {id, values}}, {call, put}) {
      yield call(rolesService.patch, id, values);
      yield put({
        type: 'fetch'
      });
    },


    * auth({payload: values}, {call, put}) {
      const respone = yield call(rolesService.auths, values);

      yield put({
        type: 'saveAuths',
        payload: {
          authTree: respone.data,
        }
      });

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

