import axios from 'axios';
import { BASE_URL } from '@env';


export const createRoutine = async (routine) => {
  const response = await axios.post(`${BASE_URL}/routines`, routine);

  return response;
};