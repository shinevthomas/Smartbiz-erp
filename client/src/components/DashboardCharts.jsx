import "./DashboardCharts.css";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import {
  FiTrendingUp,
  FiBarChart2,
} from "react-icons/fi";

function DashboardCharts({
  revenueData,
  salesData,
}) {
  return (
    <section className="dashboard-charts">

      {/* Revenue */}

      <div className="chart-card">

        <div className="chart-header">

          <div>

            <h2>Revenue Analytics</h2>

            <p>
              Revenue generated during the last six months
            </p>

          </div>

          <div className="chart-icon">

            <FiTrendingUp />

          </div>

        </div>

        <div className="chart-body">

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <AreaChart data={revenueData}>

              <defs>

                <linearGradient
                  id="revenueColor"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#2563eb"
                    stopOpacity={0.45}
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
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
                fill="url(#revenueColor)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Sales */}

      <div className="chart-card">

        <div className="chart-header">

          <div>

            <h2>Sales Performance</h2>

            <p>
              Monthly completed sales
            </p>

          </div>

          <div className="chart-icon">

            <FiBarChart2 />

          </div>

        </div>

        <div className="chart-body">

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart data={salesData}>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill:"#64748b",
                  fontSize:13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill:"#64748b",
                  fontSize:13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="sales"
                radius={[10,10,0,0]}
                fill="#10b981"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </section>
  );
}

export default DashboardCharts;