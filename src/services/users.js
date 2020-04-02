import request from '@/utils/request';

export function fetch(params) {
  return request(`/api/sys/user`, {
    method: 'get',
    params: params
  });
}

export async function create(params) {
  return request('/api/sys/user', {
    method: 'post',
    data: params
  });
}

export async function patch(params) {
  return request('/api/sys/user', {
    method: 'put',
    data: params
  });
}

export async function remove(userId) {
  return request(`/api/sys/user/${userId}`, {
    method: 'delete'
  });
}

export async function getDept() {
  return request('/api/sys/dept');
}
