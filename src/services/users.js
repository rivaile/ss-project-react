import request from '@/utils/request';
import {PAGE_SIZE} from '@/constants';

export function queryUserList({ page }) {
  return request(`/api/sys/user?current=${page}&pageSize=${PAGE_SIZE}`);
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
