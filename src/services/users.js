import request from '@/utils/request';

export async function queryUserList(params) {
  return request('/api/sys/user?size=2', {
    params,
  });
}

export async function addUser(params) {
  return request('/api/sys/user', {
    method: 'post',
    data: params
  });
}

export async function updateUserById(params) {
  return request('/api/sys/user', {
    method: 'put',
    data: params
  });
}

export async function deleteUserById(userId) {
  return request(`/api/sys/user/${userId}`, {
    method: 'delete'
  });
}

export async function getDept() {
  return request('/api/sys/dept');
}
