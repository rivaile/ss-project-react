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
      const auths = respone.data;

      const treeFun = auths => {
        return auths.map(it => {
          let treeObj = {};
          treeObj.title = it.name;
          treeObj.key = 'm-' + it.id;
          treeObj.children = [];
          if (it.authList.length > 0) {
            it.authList.forEach(item => {
              let treeAuthLeaf = {};
              treeAuthLeaf.title = item.name;
              treeAuthLeaf.key = 'a-' + item.id;
              treeObj.children.push(treeAuthLeaf);
            });
          }
          if (it.moduleList.length > 0) {
            it.moduleList.forEach(item => {
              let treeModuleLeaf = {};
              treeModuleLeaf.title = item.name;
              treeModuleLeaf.key = 'm-' + item.id;
              treeObj.children.push(treeModuleLeaf);
              if (item.moduleList.length > 0) {
                treeFun(item.moduleList);
              }
            });
          }
          return treeObj;
        });
      };

      const authTree = treeFun.call(this, auths);
      console.dir(authTree);

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

