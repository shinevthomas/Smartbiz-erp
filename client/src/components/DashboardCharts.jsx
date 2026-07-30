import "./DashboardCharts.css";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import {
  FiTrendingUp,
  FiBarChart2,
} from "react-icons/fi";

function DashboardCharts({ revenueData, salesData }) {

  const totalRevenue = revenueData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const totalSales = salesData.reduce(
    (sum, item) => sum + item.sales,
    0
  );

  return (

    <section className="dashboard-charts">

      {/* Revenue Analytics */}

      <div className="chart-card">

        <div className="chart-header">

          <div className="chart-title">

            <div className="chart-icon revenue">

              <FiTrendingUp />

            </div>

            <div>

              <h2>Revenue Analytics</h2>

              <p>Last 6 Months Revenue</p>

            </div>

          </div>

          <div className="chart-summary">

            <h3>
              ₹{totalRevenue.toLocaleString("en-IN")}
            </h3>

            <span>Revenue</span>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={360}
        >

          <AreaChart
            data={revenueData}
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >

            <defs>

              <linearGradient
                id="revenueFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#edf2f7"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                `₹${(v / 1000).toFixed(0)}K`
              }
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />

            <Legend />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={4}
              fill="url(#revenueFill)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* Sales Analytics */}

      <div className="chart-card">

        <div className="chart-header">

          <div className="chart-title">

            <div className="chart-icon sales">

              <FiBarChart2 />

            </div>

            <div>

              <h2>Sales Analytics</h2>

              <p>Monthly Sales Performance</p>

            </div>

          </div>

          <div className="chart-summary">

            <h3>{totalSales}</h3>

            <span>Orders</span>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={360}
        >

          <BarChart
            data={salesData}
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#edf2f7"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="sales"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
              maxBarSize={45}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </section>

  );
}

export default DashboardCharts;