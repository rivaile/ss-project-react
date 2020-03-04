import request from '@/utils/request';

export async function queryUserList(params) {
  return request('/api/sys/user', {
    params,
  });
}
