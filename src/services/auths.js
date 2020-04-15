import request from '@/utils/request';

export function createAuthModule(data) {
  return request(`/api/system/auth-module`, {
    method: 'post',
    data: data,
  });
}

export async function removeAuthModule(moduleId) {
  return request(`/api/system/auth-module/${moduleId}`, {
    method: 'delete'
  });
}

export async function patchAuthModule(id, data) {
  return request(`/api/system/auth-module/${id}`, {
    method: 'put',
    data: data
  });
}

export function fetchAuthModule() {
  return request(`/api/system/auth-module`, {
    method: 'get',
  });
}

export function createAuth(data) {
  return request(`/api/system/auth`, {
    method: 'post',
    data: data,
  });
}

export function patchAuth(id, data) {
  return request(`/api/system/auth/${id}`, {
    method: 'put',
    data: data,
  });
}

export function fetchAuth(id) {
  return request(`/api/system/auth/${id}`, {
    method: 'get',
  });
}
