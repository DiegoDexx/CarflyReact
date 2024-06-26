import axios from 'axios';

export const getUserInfo = async (authToken) => {
  try {
    const response = await axios.post('http://localhost:8000/api/getUserInfo', {
      authToken
    });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo información del usuario:', error);
    throw error;
  }
};