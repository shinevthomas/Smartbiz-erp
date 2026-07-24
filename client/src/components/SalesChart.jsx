import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SalesChart({ report }) {

  const data = {
    labels: [
      "Products",
      "Customers",
      "Sales",
      "Invoices",
    ],

    datasets: [
      {
        label: "ERP Statistics",
        data: [
          report.totalProducts,
          report.totalCustomers,
          report.totalSales,
          report.totalInvoices,
        ],
        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#f59e0b",
          "#dc2626",
        ],
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "SmartBiz ERP Overview",
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default SalesChart;