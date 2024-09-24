import './App.css';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BarController,
  BubbleController,
  PolarAreaController,
  DoughnutController,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useUsersData } from './api/Query/getDataQuery';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BarController,
  BubbleController,
  PolarAreaController,
  DoughnutController,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);





// const BubbleChartCountriesActualDays = ({ title, quantityCountriesActualDays, quantityActualDaysDataUsers }: { title: string, quantityCountriesActualDays: { [key: string]: number }, quantityActualDaysDataUsers: number }) => {
//   // Convertimos el objeto de países en un array de datasets para el gráfico
//   const labels = Object.keys(quantityCountriesActualDays);
//   const data = labels.map((country) => ({
//     x: country,
//     y: quantityCountriesActualDays[country],
//     r: Math.min(quantityCountriesActualDays[country] / 5, 100), // Ajustar el tamaño máximo de las burbujas
//   }));

//   return (
//     <>
//       <h1>{title}</h1>
//       <h3>Cantidad de usuarios en el mes actual: {quantityActualDaysDataUsers}</h3>
//       <Chart
//         type="bubble"
//         options={{
//           responsive: true,
//           plugins: {
//             legend: {
//               position: 'top' as const,
//             },
//             title: {
//               display: true,
//               text: 'Países que ingresaron el mes actual',
//             },
//           },
//           scales: {
//             x: {
//               title: {
//                 display: true,
//                 text: 'País',
//               },
//               type: 'category',
//               labels: labels,
//             },
//             y: {
//               title: {
//                 display: true,
//                 text: 'Cantidad de Ingresos',
//               },
//               min: 0,
//               max: Math.max(...Object.values(quantityCountriesActualDays)) + 6000, // Ajustar el rango máximo del eje y
//               ticks: {
//                 stepSize: 10,
//               },
//             },
//           },
//         }}
//         data={{
//           labels,
//           datasets: [{
//             label: 'Cantidad de Ingresos por País',
//             data,
//             backgroundColor: 'rgba(75, 192, 192, 0.5)',
//           }]
//         }}
//       />
//     </>
//   );
// };



// const BubbleChart = ({ title }: { title: string }) => (
//   <>
//     <h1>{title}</h1>
//     <Chart type="bubble" options={{
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top' as const,
//         },
//         title: {
//           display: true,
//           text: 'Chart.js Bubble Chart',
//         },
//       },
//     }} data={{
//       labels,
//       datasets: [{
//         label: 'Dataset 1',
//         data: staticDataLast30Days.map((value, index) => ({ x: index, y: value, r: value / 10 })),
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       }]
//     }} />
//   </>
// );

// const PolarAreaChart = ({ title }: { title: string }) => (
//   <>
//     <h1>{title}</h1>
//     <Chart type="polarArea" options={{
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top' as const,
//         },
//         title: {
//           display: true,
//           text: 'Chart.js Polar Area Chart',
//         },
//       },
//     }} data={{
//       labels,
//       datasets: [{
//         label: 'Dataset 1',
//         data: staticDataLast30Days,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.5)',
//           'rgba(53, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(153, 102, 255, 0.5)',
//           'rgba(255, 159, 64, 0.5)',
//           'rgba(201, 203, 207, 0.5)'
//         ],
//       }],
//     }} />
//   </>
// );

// const DoughnutChart = ({ title }: { title: string }) => (
//   <>
//     <h1>{title}</h1>
//     <Chart type="doughnut" options={{
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top' as const,
//         },
//         title: {
//           display: true,
//           text: 'Chart.js Doughnut Chart',
//         },
//       },
//     }} data={{
//       labels,
//       datasets: [{
//         label: 'Dataset 1',
//         data: staticDataLast30Days,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.5)',
//           'rgba(53, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(153, 102, 255, 0.5)',
//           'rgba(255, 159, 64, 0.5)',
//           'rgba(201, 203, 207, 0.5)'
//         ],
//       }],
//     }} />
//   </>
// );



const BarChartMonthDays = ({ title, monthDaysUsers, monthSelect }: { title: string; monthDaysUsers: number[]; monthSelect: number }) => {
  // Función para obtener el nombre del día de la semana
  const getDayOfWeek = (dayIndex: number, month: number) => {
    const year = new Date().getFullYear(); // Usamos el año actual
    const date = new Date(year, month - 1, dayIndex + 1); // Ajustar al mes seleccionado
    return date.toLocaleString('es-ES', { weekday: 'long' });
  };

  // Crear los labels incluyendo el número de día y el nombre del día de la semana
  const labels = Array.from({ length: monthDaysUsers.length }, (_, i) => `Día ${i + 1} - ${getDayOfWeek(i, monthSelect)}`);

  return (
    <>
      <h1>{title}</h1>
      <Chart 
        type="bar" 
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Estadísticas de usuarios por día' },
          },
        }} 
        data={{
          labels: labels,
          datasets: [
            {
              type: 'bar',
              label: 'Cantidad de usuarios',
              data: monthDaysUsers,
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              type: 'line',
              label: 'Tendencia',
              data: monthDaysUsers, 
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
            },
          ],
        }} 
      />
    </>
  );
};
const BubbleChartCountries = ({ title, datos }: { title: string; datos: { country: string; users: number; totalTime: number; averageTime: number }[] }) => {
  // Mapeo de datos para la gráfica
  const data = datos.map((item) => ({
    x: item.country,
    y: item.users, // Utilizamos la cantidad de usuarios para el eje Y
    r: Math.min(item.users / 5, 100), // Ajustamos el tamaño máximo de las burbujas
  }));

  return (
    <>
      <h1>{title}</h1>
      <Chart
        type="bubble"
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Países que han ingresado',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'País',
              },
              type: 'category',
            },
            y: {
              title: {
                display: true,
                text: 'Cantidad de Usuarios',
              },
              min: -5000,
              max: Math.max(...datos.map(item => item.users)) + 10000, // Ajustar el rango máximo del eje Y
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
        data={{
          datasets: [{
            label: 'Cantidad de Usuarios por País',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          }]
        }}
      />
    </>
  );
};


// Componente de la tabla de países
const CountryTable = ({ data }: { data: { country: string; users: number; totalTime: number; averageTime: number }[] }) => {
  const renderRow = (row: any, index: number) => (
    <tr key={index} className="bg-white even:bg-gray-100">
      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">{row.country}</td>
      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">{row.users}</td>
      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">{row.totalTime}</td>
      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">{Math.floor(row.averageTime)}</td>
    </tr>
  );

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600">País</th>
            <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600">Cantidad de Usuarios</th>
            <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600">Total Tiempo (min)</th>
            <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600">Promedio Tiempo (min)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};
function App() {
  const [monthSelect, setMonthSelect] = useState(new Date().getMonth() + 1);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useUsersData(monthSelect);

  // Función para convertir el formato de tiempo (HH:mm:ss) a minutos
  function timeToMinutes(time: string) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 60 + minutes + seconds / 60;
  }

  // Combinar todos los resultados de las páginas en un solo array
  const allResults = data?.pages.flatMap((page: any) => page.results) || [];

  // Agrupar por fecha y calcular los totales y promedios en minutos
  const aggregatedData = allResults.reduce((acc: any, current: any) => {
    const { date, duration_minutes } = current;

    // Convertir el tiempo a minutos
    const timeInMinutes = timeToMinutes(duration_minutes);

    if (!acc[date]) {
      acc[date] = {
        users: 0,
        totalTime: 0, // en minutos
      };
    }

    // Incrementar la cantidad de usuarios y el tiempo total
    acc[date].users += 1;
    acc[date].totalTime += timeInMinutes;

    return acc;
  }, {});

  const monthDaysUsers = Array.from({ length: 31 }, (_, day) => {
    const date = `${new Date(new Date().getFullYear(), monthSelect - 1, day + 1).toISOString().split('T')[0]}`;
    return {
      date,
      users: aggregatedData[date] ? aggregatedData[date].users : 0, // Asegúrate de que si no hay usuarios, sea 0
    };
  }).filter(dayData => dayData.date); // Elimina días que no existen (por ejemplo, días de meses que no tienen 31 días)
  
  // Extraer solo los usuarios para el gráfico
  const dataUsers = monthDaysUsers.map((day) => day.users); 

   // Crear una tabla con la data agregada, mostrando tiempos en minutos
   const tableData = Object.keys(aggregatedData).map((date) => {
    const totalTimeInMinutes = aggregatedData[date].totalTime;
    const totalUsers = aggregatedData[date].users;
    

    // Calcular el promedio de tiempo en minutos
    const averageTimeInMinutes = totalTimeInMinutes / totalUsers;

    // Obtener el día de la semana
    const dayOfWeek = new Date(date + 'T00:00:00').toLocaleString('es-ES', { weekday: 'long' });

    return {
        date,
        day: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1), // Capitaliza la primera letra
        users: totalUsers,
        totalTime: Math.floor(totalTimeInMinutes),  // Mostrar total redondeado en minutos
        averageTime: Math.floor(averageTimeInMinutes),  // Mostrar promedio redondeado en minutos
    };
});

// Dentro del componente App
const countryData = allResults.reduce((acc: any, current: any) => {
  const { country, duration_minutes } = current;

  if (!country || !duration_minutes) return acc; // Control de datos faltantes

  // Convertir el tiempo a minutos
  const timeInMinutes = timeToMinutes(duration_minutes);

  // Si el país no está en el acumulador, inicializa
  if (!acc[country]) {
    acc[country] = {
      users: 0,
      totalTime: 0,
    };
  }

  // Acumula la cantidad de usuarios y el tiempo
  acc[country].users += 1; // Cantidad de usuarios
  acc[country].totalTime += timeInMinutes; // Total tiempo en minutos

  return acc;
}, {});

const countryDataArray = Object.keys(countryData).map(country => {
  const { users, totalTime } = countryData[country];
  const averageTime = totalTime / users; // Calcular promedio

  return {
    country,
    users, // Cantidad de usuarios
    totalTime, // Total de tiempo
    averageTime, // Promedio de tiempo
  };
}).sort((a, b) => b.users - a.users);


  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      const intervalId = setInterval(() => {
        fetchNextPage();
      }, 500); // Llama fetchNextPage cada 2 segundos

      // Limpia el intervalo cuando no hay más páginas o cuando cambie el estado
      return () => clearInterval(intervalId);
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="p-4">
      {isFetchingNextPage && <p>Cargando más datos...</p>}
      <div className="mb-4">
        <label className="font-semibold">Selecciona un mes:</label>
        <select
          value={monthSelect}
          onChange={(e) => setMonthSelect(Number(e.target.value))}
          className="border rounded-md p-2 bg-white text-black ml-2"
        >
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>

      <h1 className="text-xl font-bold mb-4">Mes seleccionado: {new Date(0, monthSelect - 1).toLocaleString('es-ES', { month: 'long' })}</h1>

      <h2 className="text-lg mb-4">Total de usuarios del mes: {allResults.length}</h2>

      {/* Componente de gráfica de barras */}
      <BarChartMonthDays 
        title={`Usuarios por día en el mes ${new Date(0, monthSelect - 1).toLocaleString('es-ES', { month: 'long' })}`} 
        monthDaysUsers={dataUsers}
        monthSelect={monthSelect}
      />

      {/* Tabla dinámica con estilos */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 mt-4 shadow-lg">
          <thead className="bg-gray-200">
            <tr>                
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600">Fecha</th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600">Día</th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600">Cantidad de Usuarios</th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600">Total de Tiempo</th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600">Promedio de Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="bg-white even:bg-gray-100">                    
                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">{row.date}</td>
                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">{row.day}</td>
                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">{row.users}</td>
                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">{row.totalTime}</td>
                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">{row.averageTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          <br />
      {/* Componente de gráfica de burbujas */}
      <BubbleChartCountries title="Ingreso por País" datos={countryDataArray} />

      <CountryTable data={countryDataArray} />
    </div>
  );
}

export default App;



