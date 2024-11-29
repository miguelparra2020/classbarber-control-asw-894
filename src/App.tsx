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
    import { Chart, Pie } from 'react-chartjs-2';
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
    const BarChartWeekDays = ({ title, weekDaysUsers }: { title: string; weekDaysUsers: any }) => {
      // Nombres de los días de la semana en español
      const weekDayNames = ['Lunes - '+weekDaysUsers[0], 'Martes - '+weekDaysUsers[1], 'Miércoles - '+weekDaysUsers[2], 'Jueves  - '+weekDaysUsers[3], 'Viernes - '+weekDaysUsers[4], 'Sábado - '+weekDaysUsers[5], 'Domingo - '+weekDaysUsers[6]];

      // Colores del arcoiris para cada día de la semana
      const rainbowColors = [
        'rgba(255, 0, 0, 0.7)',    // Rojo (Lunes)
        'rgba(255, 165, 0, 0.7)',  // Naranja (Martes)
        'rgba(255, 255, 0, 0.7)',  // Amarillo (Miércoles)
        'rgba(0, 128, 0, 0.7)',    // Verde (Jueves)
        'rgba(0, 0, 255, 0.7)',    // Azul (Viernes)
        'rgba(75, 0, 130, 0.7)',   // Índigo (Sábado)
        'rgba(238, 130, 238, 0.7)' // Violeta (Domingo)
      ];

      // Verificamos que la longitud del array coincida con los 7 días de la semana
      if (weekDaysUsers.length !== 7) {
        throw new Error('El array weekDaysUsers debe contener exactamente 7 elementos.');
      }
      

      return (
        <>
          <h1>{title}</h1>
          <Chart 
            type="bar" 
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Estadísticas de usuarios por día de la semana' },
              },
            }} 
            data={{
              labels: weekDayNames, // Nombres de los días de la semana
              datasets: [
                {
                  type: 'bar',
                  label: 'Cantidad de usuarios',
                  data: weekDaysUsers,
                  backgroundColor: rainbowColors, // Aplicar colores del arcoiris
                },
                {
                  type: 'line',
                  label: 'Tendencia',
                  data: weekDaysUsers, 
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

    const BubbleChartCities = ({ title, datos }: { title: string; datos: { city: string; users: number; totalTime: number; averageTime: number }[] }) => {
      // Mapeo de datos para la gráfica
      const data = datos.map((item) => ({
        x: item.city,
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
                  text: 'Ciudades que han ingresado',
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Ciudad',
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
                label: 'Cantidad de Usuarios por Ciudad',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
              }]
            }}
          />
        </>
      );
    };

    const BarChartPaths = ({ title, pathData }: { title: string; pathData: { path: string; users: number }[] }) => {
      const paths = pathData.map((item) => item.path);
      const userCounts = pathData.map((item) => item.users);

      return (
        <>
          <h1>{title}</h1>
          <Chart 
            type="bar" 
            options={{
              indexAxis: 'y', // Cambia a gráfica horizontal
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Cantidad de usuarios por ruta' },
              },
            }} 
            data={{
              labels: paths, // Las rutas serán las etiquetas
              datasets: [
                {
                  type: 'bar',
                  label: 'Cantidad de usuarios',
                  data: userCounts, // Los conteos de usuarios
                  backgroundColor: 'rgba(75, 192, 192, 0.7)',
                }
              ],
            }} 
          />
        </>
      );
    };
    interface PieChartData {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    }
    interface PieChartProps {
      data: PieChartData;
    }
    
    const PieChart: React.FC<PieChartProps> = ({ data }) => {
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const, // Asegúrate de usar 'as const' aquí
          },
          title: {
            display: true,
            text: 'Distribución de Dispositivos',
          },
        },
      };
    
      return (
        <>
          <h1>Diagrama de Pastel</h1>
          <div style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Pie data={data} options={options} />
          </div>
        </>
      );
    };
    

    const GenericTable = ({ data, columns }: { data: any[]; columns: { key: string; label: string }[] }) => {
      if (!data.length) {
        return <p>No hay datos disponibles.</p>;
      }
    
      const renderRow = (row: any, index: number) => (
        <tr key={index} className="bg-white even:bg-gray-100">
          {columns.map((col) => (
            <td key={col.key} className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
              {row[col.key]}
            </td>
          ))}
        </tr>
      );
    
      return (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
            <thead className="bg-gray-200">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{data.map(renderRow)}</tbody>
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
      function countUsersByWeekDay(allResults: any) {
        // Inicializar un arreglo con 7 posiciones para cada día de la semana (lunes a domingo)
        let weekDaysUsers = [0, 0, 0, 0, 0, 0, 0]; // [lunes, martes, ..., domingo]

        // Iterar sobre los resultados
        allResults.forEach((result: any) => {
            // Extraer la fecha del campo 'date'
            const dateStr = result.date; // Ejemplo: '2024-09-27'
            
            // Crear un objeto Date
            const dateObj = new Date(dateStr);
            
            // Obtener el día de la semana (0 es domingo, 1 es lunes, ..., 6 es sábado)
            const dayOfWeek = dateObj.getDay(); // Este devuelve de 0 (domingo) a 6 (sábado)
            
            // Depuración: Imprimir día de la semana
            console.log(`Fecha: ${dateStr}, Día de la semana (getDay): ${dayOfWeek}`);

            // Mapear el día de la semana para que empiece desde lunes (0)
            const mappedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; 
            
            // Depuración: Imprimir día mapeado
            console.log(`Día mapeado (lunes = 0): ${mappedDay}`);

            // Incrementar el contador para el día correspondiente
            weekDaysUsers[mappedDay] += 1;
        });

        // Depuración: Ver los resultados
        console.log("Conteo de usuarios por día de la semana:", weekDaysUsers);
        const adjustedWeekDaysUsers = [weekDaysUsers.pop(), ...weekDaysUsers]
        
        return adjustedWeekDaysUsers;
      }

      const weekDaysUsers = countUsersByWeekDay(allResults);

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
            totalTime: totalTimeInMinutes,  // Mostrar total redondeado en minutos
            averageTime: averageTimeInMinutes,  // Mostrar promedio redondeado en minutos
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
      const averageTime = users ? totalTime / users : 0; // Manejo de división por cero

      return {
        country,
        users,
        totalTime,
        averageTime,
      };
    }).sort((a, b) => b.users - a.users).splice(0, 20);

    const cityData = allResults.reduce((acc: any, current: any) => {
      const { city, duration_minutes } = current;

      if (!city || !duration_minutes) return acc; // Control de datos faltantes

      // Convertir el tiempo a minutos
      const timeInMinutes = timeToMinutes(duration_minutes);

      // Si la ciudad no está en el acumulador, inicializa
      if (!acc[city]) {
        acc[city] = {
          users: 0,
          totalTime: 0,
        };
      }

      // Acumula la cantidad de usuarios y el tiempo
      acc[city].users += 1; // Cantidad de usuarios
      acc[city].totalTime += timeInMinutes; // Total tiempo en minutos

      return acc;
    }, {});

    const cityDataArray = Object.keys(cityData).map(city => {
      const { users, totalTime } = cityData[city];
      const averageTime = users ? totalTime / users : 0; // Manejo de división por cero

      return {
        city,
        users,
        totalTime,
        averageTime,
      };
    }).sort((a, b) => b.users - a.users).splice(0, 20);

    // Lógica para agrupar por ruta
    const pathDataArray = allResults.reduce((acc: any, current: any) => {
      const { path } = current;
      if (!path) return acc;

      if (!acc[path]) {
        acc[path] = { users: 0 };
      }

      acc[path].users += 1;
      return acc;
    }, {});

    const pathData = Object.keys(pathDataArray).map(path => ({
      path,
      users: pathDataArray[path].users
    })).sort((a, b) => b.users - a.users).splice(0, 20); // Ordenar por cantidad de usuarios


    const deviceCount = allResults.reduce((acc, { device }) => {
      const formattedDevice = device.charAt(0).toUpperCase() + device.slice(1).toLowerCase();
      acc[formattedDevice] = (acc[formattedDevice] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const deviceCountArray = Object.entries(deviceCount).map(([device, users]) => ({
      device,
      users
    }));
    // Preparar datos para la gráfica
    const pieData: PieChartData = {
      labels: Object.keys(deviceCount),
      datasets: [
        {
          label: 'Cantidad de usuarios',
          data: Object.values(deviceCount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(201, 203, 207, 0.5)',
          ],
        },
      ],
    };

    const monthlySummary = allResults.reduce((acc: any, current: any) => {
      const { duration_minutes } = current;
    
      // Convertir el tiempo a minutos
      const timeInMinutes = timeToMinutes(duration_minutes);
    
      // Incrementar la cantidad de usuarios y el tiempo total del mes
      acc.totalUsers += 1;
      acc.totalTime += timeInMinutes;
      acc.averageTime = acc.totalTime / acc.totalUsers;
      return acc;
    }, { totalUsers: 0, totalTime: 0, averageTime: 0 });

    const monthlySummaryArray = [monthlySummary]
      useEffect(() => {
        if (hasNextPage && !isFetchingNextPage) {
          const intervalId = setInterval(() => {
            fetchNextPage();
          }, 500); // Llama fetchNextPage cada 2 segundos

          // Limpia el intervalo cuando no hay más páginas o cuando cambie el estado
          return () => clearInterval(intervalId);
        }
      }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
      const [currentStep, setCurrentStep] = useState(1);
      return (
        <>
         <div className='flex flex-col items-center content-center'>
              <h1 className="text-3xl md:text-3xl font-bold leading-tighter tracking-tighter mb-1 font-heading">
                <div className="mt-1">
                  <span>Control Class Barber</span>
                </div>
              </h1>
            </div>
        <div className="w-full">
                <div className="grid max-w-xs grid-cols-3	 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg " role="group">
                    <button onClick={() => setCurrentStep(1)}  type="button" className={`flex flex-row items-center content-center 
                        text-center px-1 py-1.5 text-xs font-medium
                         ${currentStep === 1 ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"}
                        rounded-lg`}>
                            {currentStep === 1 && <><span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>} &nbsp;
                            Agenda Oscar Rodríguez
                        
                    </button>
                    <button onClick={() => setCurrentStep(2)} type="button" className={`flex flex-row items-center content-center text-center px-1 py-1.5 text-xs 
                    font-medium  ${currentStep === 2 ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"} 
                    rounded-lg`}>
                        {currentStep === 2 && <><span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>} &nbsp; Agenda Daniel S. Cano
                    </button>
                    <button onClick={() => setCurrentStep(3)}   type="button" className={`flex flex-row items-center content-center text-center px-1 py-1.5 
                    text-xs font-medium ${currentStep === 3 ? "text-white bg-gray-900" : "text-gray-900 bg- hover:bg-gray-200"} 
                    rounded-lg`}>
                        {currentStep === 3 && <><span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>&nbsp; &nbsp;
                   </>} &nbsp; Estadistica de ingresos
                    </button>
                </div>
            </div>
            {currentStep === 3 && <div className="p-4">
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

          <BarChartWeekDays title='Usuarios por día de la semana' weekDaysUsers={weekDaysUsers}/>

          {/* Tabla dinámica con estilos */}
                        <br />
              <GenericTable 
            data={tableData}
            columns={[
              { key: 'date', label: 'Fecha' },
              { key: 'day', label: 'Día' },
              { key: 'users', label: 'Cantidad de Usuarios' },
              { key: 'totalTime', label: 'Total de Tiempo (min)' },
              { key: 'averageTime', label: 'Promedio Tiempo (min)' }
            ]}
          />
          <br />
          {/* Componente de gráfica de burbujas */}
          <BubbleChartCountries title="Cantidad de usuarios por País" datos={countryDataArray} />

          <GenericTable 
            data={countryDataArray}
            columns={[
              { key: 'country', label: 'País' },
              { key: 'users', label: 'Cantidad de Usuarios' },
              { key: 'totalTime', label: 'Total Tiempo (min)' },
              { key: 'averageTime', label: 'Promedio Tiempo (min)' }
            ]}
          />
              <br />
          <BubbleChartCities 
              title="Cantidad de Usuarios por Ciudad"
              datos={cityDataArray}
            />

            <GenericTable 
              data={cityDataArray}
              columns={[
                { key: 'city', label: 'Ciudad' },
                { key: 'users', label: 'Cantidad de Usuarios' },
                { key: 'totalTime', label: 'Total Tiempo (min)' },
                { key: 'averageTime', label: 'Promedio Tiempo (min)' }
              ]}
            />
                <br />
          <BarChartPaths title="Usuarios por Ruta" pathData={pathData} />
          <br />
          <h1>Tabla de Rutas</h1>
          <GenericTable 
              data={pathData}
              columns={[
                { key: 'path', label: 'Ruta' },
                { key: 'users', label: 'Cantidad de Usuarios' }
              ]}
            />
          <br />
          <PieChart data={pieData} />
          <br />
          <GenericTable 
              data={deviceCountArray}
              columns={[
                { key: 'device', label: 'Dispositivo' },
                { key: 'users', label: 'Cantidad de Usuarios' }
              ]}
            />
            <br />
            <h1>Totales</h1>
            <GenericTable 
              data={monthlySummaryArray}
              columns={[
                { key: 'totalUsers', label: 'Total de Usuarios' },
                { key: 'totalTime', label: 'Total de Tiempo (min)' },
                { key: 'averageTime', label: 'Promedio de Tiempo (min)' },
              ]}
            />
           </div>

            }
          
           </>
      );
    }

    export default App;



