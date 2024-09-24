import { useInfiniteQuery } from '@tanstack/react-query';
import { getDataServiceFn } from '../getDataService'; // Asegúrate de ajustar la ruta del servicio

export const useUsersData = (monthSelect: number) => {
  return useInfiniteQuery({
    queryKey: ['usersData', monthSelect],
    queryFn: ({ pageParam = 1 }) => getDataServiceFn({ monthSelect, pageParam }), // Pasar correctamente el pageParam
    getNextPageParam: (lastPage: any) => {
      const { current_page, total_pages } = lastPage; // Verifica los nombres de estos campos
      return current_page < total_pages ? current_page + 1 : undefined; // Devolver el número de la siguiente página
    },
    staleTime: 1000 * 60 * 5, // Mantener los datos frescos por 5 minutos
    initialPageParam: 1, // Agregar esta línea para establecer el valor inicial
  });
};
