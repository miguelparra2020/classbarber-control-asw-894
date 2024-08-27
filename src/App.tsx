import './App.css';
import React, { useEffect, useState } from 'react';
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
import { useUsersIntoPage } from './hooks/useGetUsers';


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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const staticDataLast30Days = [1580, 390, 560, 23, 565, 345, 123, 904, 395, 324, 99, 234, 562, 66, 322, 50, 100, 200, 65, 34, 200, 300, 234, 454, 200, 350, 500, 600, 800, 400, 300];





const useLast30Days = () => {
  const [dataLast30Days, setDataLast30Days] = useState<string[]>([]);

  useEffect(() => {
    const todayData = new Date();
    const dates: string[] = [];

    const formatDate = (date: Date): string => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const weekDay = date.toLocaleDateString('es-ES', { weekday: 'long' });
      return `${weekDay}, ${day}-${month}-${year}`;
    };

    for (let i = 0; i <= 30; i++) {
      const date = new Date();
      date.setDate(todayData.getDate() - i);
      dates.unshift(formatDate(date));
    }

    setDataLast30Days(dates);
  }, []);

  return dataLast30Days;
};


const useCurrentMonthDays = () => {
  const [dataCurrentMonth, setDataCurrentMonth] = useState<string[]>([]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Número de días en el mes actual

    const dates: string[] = [];

    const formatDate = (date: Date): string => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const weekDay = date.toLocaleDateString('es-ES', { weekday: 'long' });
      return `${weekDay}, ${day}-${month}-${year}`;
    };

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      dates.push(formatDate(date));
    }

    setDataCurrentMonth(dates);
  }, []);

  return dataCurrentMonth;
}

const BarChartLast30Days = ({ title, data,last30DaysDataUsers,quantityLast30DaysDataUsers }: { title: string; data: string[],last30DaysDataUsers: number[], quantityLast30DaysDataUsers: number }) => (
  
  <>
    <h1>{title}</h1>
    <h3>Cantidad de usuarios en los últimos 30 días: {quantityLast30DaysDataUsers}</h3>
    <Chart type="bar" options={{
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Estadísticas de ingresos - cantidades',
        },
      },
    }} data={{
      labels: data,
      datasets: [
        {
          type: 'bar' as const,
          label: 'Cantidad de usuarios ingresados - cantidades',
          data: last30DaysDataUsers.slice(-data.length), 
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          type: 'line' as const,
          label: 'Tendencia',
          data: last30DaysDataUsers.slice(-data.length), 
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
      ],
    }} />
  </>
);

const LineChartCurrentMonth = ({ title, data, actualDaysDataUsers, quantityActualDaysDataUsers }: { title: string, data: string[], actualDaysDataUsers: number[], quantityActualDaysDataUsers: number }) => (
  <>
    <h1>{title}</h1>
    <h3>Cantidad de usuarios en el mes actual: {quantityActualDaysDataUsers}</h3>
    <Chart type="line" options={{
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Estadísticas de ingresos - cantidades',
        },
      },
    }} data={{
      labels:data,
      datasets: [{
        label: 'Dataset 1',
        data: actualDaysDataUsers,
        borderColor: 'rgba(205, 99, 32, 0.5)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      } ],
    }} />
  </>
);

const BubbleChart = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <Chart type="bubble" options={{
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart.js Bubble Chart',
        },
      },
    }} data={{
      labels,
      datasets: [{
        label: 'Dataset 1',
        data: staticDataLast30Days.map((value, index) => ({ x: index, y: value, r: value / 10 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }]
    }} />
  </>
);

const PolarAreaChart = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <Chart type="polarArea" options={{
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart.js Polar Area Chart',
        },
      },
    }} data={{
      labels,
      datasets: [{
        label: 'Dataset 1',
        data: staticDataLast30Days,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(53, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(201, 203, 207, 0.5)'
        ],
      }],
    }} />
  </>
);

const DoughnutChart = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <Chart type="doughnut" options={{
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart',
        },
      },
    }} data={{
      labels,
      datasets: [{
        label: 'Dataset 1',
        data: staticDataLast30Days,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(53, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(201, 203, 207, 0.5)'
        ],
      }],
    }} />
  </>
);


function App() {
  const last30Days = useLast30Days();
  const currentMonthDays = useCurrentMonthDays()
  const { last30DaysDataUsers, quantityLast30DaysDataUsers, actualDaysDataUsers, quantityActualDaysDataUsers } =  useUsersIntoPage()
  
  return (
    <React.Fragment>
      <BarChartLast30Days title="Estadística últimos 30 días" data={last30Days} last30DaysDataUsers={last30DaysDataUsers} quantityLast30DaysDataUsers={quantityLast30DaysDataUsers}/>
      <LineChartCurrentMonth title="Crecimiento mes actual" data={currentMonthDays} actualDaysDataUsers={actualDaysDataUsers} quantityActualDaysDataUsers={quantityActualDaysDataUsers}/>
      <BubbleChart title="Países que ingresaron" />
      <BubbleChart title="Ciudades que ingresaron" />
      <PolarAreaChart title="Rutas que ingresaron" />
      <DoughnutChart title="Ingresos de celular o computador" />
    </React.Fragment>
  );
}

export default App;
