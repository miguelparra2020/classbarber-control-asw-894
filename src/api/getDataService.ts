import axios from 'axios';

// Función para obtener datos de una página específica

export const getDataServiceFn = async ({ pageParam = 1 }) => {
  try {
    const response = await axios.get(`https://backend-sistemas-autoorganizados-2.onrender.com/usersIntoPage?page=${pageParam}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Importante lanzar el error para que el hook lo maneje
  }
};