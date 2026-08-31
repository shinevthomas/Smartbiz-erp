import "./DashboardCards.css";

import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiTrendingUp,
} from "react-icons/fi";

const cards = [
  {
    title: "Revenue",
    value: "$128,450",
    growth: "+12.8%",
    subtitle: "This month",
    icon: <FiDollarSign />,
    color: "blue",
  },
  {
    title: "Orders",
    value: "2,486",
    growth: "+8.2%",
    subtitle: "Completed Orders",
    icon: <FiShoppingBag />,
    color: "green",
  },
  {
    title: "Customers",
    value: "1,254",
    growth: "+5.1%",
    subtitle: "Active Customers",
    icon: <FiUsers />,
    color: "purple",
  },
  {
    title: "Products",
    value: "324",
    growth: "+16%",
    subtitle: "In Inventory",
    icon: <FiPackage />,
    color: "orange",
  },
];

function DashboardCards() {
  return (
    <section className="dashboard-cards">

      {cards.map((card, index) => (

        <div
          key={index}
          className="dashboard-card"
        >

          <div className="card-top">

            <div className={`card-icon ${card.color}`}>
              {card.icon}
            </div>

            <div className="card-growth">

              <FiTrendingUp />

              {card.growth}

            </div>

          </div>

          <h2>{card.value}</h2>

          <h4>{card.title}</h4>

          <p>{card.subtitle}</p>

        </div>

      ))}

    </section>
  );
}

export default DashboardCards;