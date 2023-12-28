import axios from 'axios';
import { BASE_URL } from '@env';


export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/users/auth`, {
    email,
    password,
  });

  return response;
};