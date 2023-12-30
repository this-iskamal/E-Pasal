import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "@nextui-org/react";
import axios from "axios";
import server from "../../utils/server";
import { useSpring, animated } from "react-spring";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function SellerDashboard() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [categorySalesData, setCategorySalesData] = useState([]);
  const [topBuyers, setTopBuyers] = useState([]);
  const [showTopBuyers, setShowTopBuyers] = useState(false);

  const topBuyersSpring = useSpring({
    opacity: showTopBuyers ? 1 : 0,
    marginTop: showTopBuyers ? 0 : -50,
  });

  useEffect(() => {
    axios
      .get(`${server}/api/seller-dashboard/`)
      .then((res) => {
        setOrderHistory(res.data);
        const actualSalesData = res.data.daily_sales.map((dailySale) => ({
          date: dailySale.date,
          numberOfSales: dailySale.number_of_sales,
        }));
        setSalesData(actualSalesData);

        const actualCategorySalesData = res.data.category_sales.map(
          (categorySale) => ({
            category: categorySale.category,
            sales: categorySale.sales,
          })
        );
        setCategorySalesData(actualCategorySalesData);

        setTopBuyers(res.data.customers_emails);

        setTimeout(() => {
          setShowTopBuyers(true);
        }, 2500);

        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatTick = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}`;
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        <Card
          className="py-4"
          style={{
            maxWidth: "300px",
            minWidth: "200px",
            width: "100%",
            background: "linear-gradient(to left, #4eda89, #1a9f53",
          }}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
            <h4 className="font-bold text-large">Total Products</h4>

            <h4 className="font-bold text-large">
              {orderHistory.total_products}
            </h4>
          </CardHeader>
        </Card>
        <Card
          className="py-4"
          style={{
            maxWidth: "300px",
            minWidth: "200px",
            width: "100%",
            background: "linear-gradient(to left, #ed68ff, #be0ee1)",
          }}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
            <h4 className="font-bold text-large">Total Orders</h4>

            <h4 className="font-bold text-large">
              {orderHistory.total_orders}
            </h4>
          </CardHeader>
        </Card>
        <Card
          className="py-4"
          style={{
            maxWidth: "300px",
            minWidth: "200px",
            width: "100%",
            background: "linear-gradient(to left, #f4d02b, #e1940e)",
          }}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">Total Users</h4>

            <h4 className="font-bold text-large">
              {orderHistory.total_customers}
            </h4>
          </CardHeader>
        </Card>
        <Card
          className="py-4"
          style={{
            maxWidth: "300px",
            minWidth: "200px",
            width: "100%",
            background: "linear-gradient(to left, #64b3f6, #2b77e5)",
          }}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
            <h4 className="font-bold text-large">Total Sales</h4>

            <h4 className="font-bold text-large">
              NPR {orderHistory.total_revenue}
            </h4>
          </CardHeader>
        </Card>
      </div>
      <div>
        <h2>Daily Sales Chart</h2>
        <LineChart
          width={900}
          height={300}
          data={salesData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" tickFormatter={formatTick} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="numberOfSales"
            stroke="rgba(75,192,192,1)"
          />
        </LineChart>
      </div>
      <div>
        <h2>Category Sales Distribution</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={categorySalesData}
            dataKey="sales"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {categorySalesData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <animated.div
  style={topBuyersSpring}
  className={`mt-6 bg-white rounded-md overflow-hidden shadow-lg ${
    showTopBuyers ? "opacity-100" : "opacity-0 -mt-10"
  } transition-opacity duration-500 ease-in-out`}
>
  <div className="p-2">
    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Top Buyers</h2>
    <ul className="space-y-2">
      {topBuyers.map((buyer, index) => (
        <li
          key={index}
          className="flex items-center space-x-2 py-1 border-b last:border-b-0"
        >
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-md">{buyer}</p>
        </li>
      ))}
    </ul>
  </div>
</animated.div>

    </>
  );
}

export default SellerDashboard;
