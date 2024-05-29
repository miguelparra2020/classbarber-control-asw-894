
import './App.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const staticData = [200, 350, 500, 600, 800, 400, 300]
export const data = {
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
function App() {

  return (<>
  <Bar options={options} data={data} />
  <Bar options={options} data={data} />
  <Bar options={options} data={data} />
  </>)
}

export default App
