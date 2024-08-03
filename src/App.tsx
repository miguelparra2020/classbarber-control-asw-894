import './App.css'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BubbleController,
  PolarAreaController,
  DoughnutController,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Bubble, PolarArea, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BubbleController,
  PolarAreaController,
  DoughnutController,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export const bubbleOptions = {
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
};

export const polarAreaOptions = {
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
};

export const doughnutOptions = {
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
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const staticData = [200, 350, 500, 600, 800, 400, 300]

export const barData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: staticData,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: staticData,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

export const lineData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: staticData,
      borderColor: 'rgba(255, 99, 132, 0.5)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    },
    {
      label: 'Dataset 2',
      data: staticData,
      borderColor: 'rgba(53, 162, 235, 0.5)',
      backgroundColor: 'rgba(53, 162, 235, 0.2)',
      fill: true,
    },
  ],
}

export const bubbleData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: staticData.map((value, index) => ({ x: index, y: value, r: value / 10 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: staticData.map((value, index) => ({ x: index, y: value, r: value / 10 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

export const polarAreaData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: staticData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(53, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(201, 203, 207, 0.5)'
      ],
    },
  ],
}

export const doughnutData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: staticData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(53, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(201, 203, 207, 0.5)'
      ],
    },
  ],
}

const BarChart = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <Bar options={barOptions} data={barData} />
  </>
);

const LineChart = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <Line options={lineOptions} data={lineData} />
  </>
);

const BubbleChart = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <Bubble options={bubbleOptions} data={bubbleData} />
  </>
);

const PolarAreaChart = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <PolarArea options={polarAreaOptions} data={polarAreaData} />
  </>
);

const DoughnutChart = ({ title }: { title: string }) => (
  <>
    <h1>{title}</h1>
    <Doughnut options={doughnutOptions} data={doughnutData} />
  </>
);

function App() {
  return (
    <React.Fragment>
      <BarChart title="Estadística mensual" />
      <LineChart title="Crecimiento mes actual" />
      <BarChart title="Dias de la semana - mes actual" />
      <BubbleChart title="Países que ingresaron" />
      <BubbleChart title="Ciudades que ingresaron" />
      <PolarAreaChart title="Rutas que ingresaron" />
      <DoughnutChart title="Ingresos de celular o computador" />
      <BarChart title="Ingresos al home - ingresos más rutas" />
    </React.Fragment>
  )
}

export default App
