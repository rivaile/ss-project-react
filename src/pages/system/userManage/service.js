import request from '@/utils/request';
export async function queryUserList(params) {
//   var result =  request('/api/sys/user', {
//     params,
//   });
//   console.dir(result);
  return request('/api/sys/user', {
    params,
  });
}

export async function queryRule(params) {
    return request('/api/rule', {
      params,
    });
  }
