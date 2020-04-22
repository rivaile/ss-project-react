import request from '@/utils/request';

export function fetch(params) {
  return request(`/api/system/role`, {
    method: 'get',
    params: params
  });
}

export async function create(params) {
  return request('/api/system/role', {
    method: 'post',
    data: params
  });
}

export async function patch(id, values) {
  return request(`/api/system/role/${id}`, {
    method: 'put',
    data: values
  });
}

export async function remove(userId) {
  return request(`/api/system/role/${userId}`, {
    method: 'delete'
  });
}

export async function changeRoleAuths(id, params) {
  return request(`/api/system/role/${id}/auth`, {
    method: 'post',
    params: params
  });
}

export async function getDept() {
  return request('/api/system/dept');
}

export async function auths(roleId) {
  return request(`/api/system/role/${roleId}`);
}

