//call logout route
import axios from 'axios';
import { getTokenFromStorage } from './storage.js'; 

export const logout = async () => {
  const token = getTokenFromStorage('authToken'); 

  try {
    await axios.post('http://localhost:8000/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Logout successful');
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
