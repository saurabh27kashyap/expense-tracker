
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MonthlyExpensesChartProps {
  transactions: any[];
}

const MonthlyExpensesChart: React.FC<MonthlyExpensesChartProps> = ({
  transactions,
}) => {
  // Group transactions by month
  const monthlyData: { [month: string]: number } = transactions.reduce(
    (acc: { [month: string]: number }, transaction: any) => {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "long",
      });
      if (transaction.amount > 0) {
        if (acc[month]) {
          acc[month] += transaction.amount;
        } else {
          acc[month] = transaction.amount;
        }
      }
      return acc;
    },
    {}
  );

  // Convert the grouped data into an array of objects for recharts
  const chartData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    expenses: amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expenses" fill="#008080" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export { MonthlyExpensesChart };
