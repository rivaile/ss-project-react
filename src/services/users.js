import request from '@/utils/request';

export function fetch(params) {
  return request(`/api/system/user`, {
    method: 'get',
    params: params
  });
}

export async function create(params) {
  return request('/api/system/user', {
    method: 'post',
    data: params
  });
}

export async function patch(id, values) {
  return request(`/api/system/user/${id}`, {
    method: 'put',
    data: values
  });
}

export async function remove(userId) {
  return request(`/api/system/user/${userId}`, {
    method: 'delete'
  });
}

export async function getDept() {
  return request('/api/system/dept');
}
