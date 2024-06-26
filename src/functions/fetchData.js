import axios from 'axios';
import { getTokenFromStorage, getUserIdFromStorage } from '../functions/storage';

export const getUserData = async () => {
  try {
    const token = getTokenFromStorage('authToken');
    const userId = getUserIdFromStorage('userId');

    const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Error fetching user data');
  }
};
