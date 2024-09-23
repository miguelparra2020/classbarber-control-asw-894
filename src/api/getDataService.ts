import axios from 'axios';

// Función para obtener datos de una página específica

export const getDataServiceFn = async ({ monthSelect, pageParam }: any) => {
  try {
    const response = await axios.get(`https://sistemasautoorganizados.pythonanywhere.com/api/user-interactions/?month=${monthSelect}&page=${pageParam}`);
    return response.data; // Asegúrate de que response.data contiene correctamente la página y los resultados
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
