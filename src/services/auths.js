import request from '@/utils/request';

export function fetch(params) {
  return request(`/api/system/auth-module`, {
    method: 'get',
    params: params
  });
}

export function createAuthModule(params) {
  return request(`/api/system/auth-module`, {
    method: 'get',
    data: params,
  });
}

export async function removeAuthModule(moduleId) {
  return request(`/api/system/auth-module/${moduleId}`, {
    method: 'delete'
  });
}

export async function patchAuthModule(id, params) {
  return request(`/api/system/auth-module/${id}`, {
    method: 'put',
    data: params
  });
}

export function fetchAuthModule() {
  return request(`/api/system/auth-module`, {
    method: 'get',
  });
}
