import axios from 'axios';
import { BASE_URL } from '@env';


export const createTask = async (task) => {
  const response = await axios.post(`${BASE_URL}/tasks`, task);

  return response;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${BASE_URL}/tasks/${id}`, task);

  return response;
};

export const getTasks = async ({ startDate, endDate }) => {
  const response = await axios.get(
    `${BASE_URL}/tasks?start_date=${startDate}&end_date=${endDate}`
  );

  return response;
};

export const failTask = async (id) => {
  const response = await axios.post(`${BASE_URL}/tasks/${id}/fail`);

  return response;
};

export const concludeTask = async (id) => {
  const response = await axios.post(`${BASE_URL}/tasks/${id}/conclude`);

  return response;
};