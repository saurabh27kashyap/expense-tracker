"use client";

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

interface BudgetComparisonChartProps {
  budgetData: { [category: string]: number };
  actualData: { [category: string]: number };
}

const BudgetComparisonChart: React.FC<BudgetComparisonChartProps> = ({
  budgetData,
  actualData,
}) => {
  const data = Object.keys(budgetData).map((category) => ({
    category,
    budget: budgetData[category],
    actual: actualData[category] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
        <Bar dataKey="actual" fill="#8884d8" name="Actual" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export { BudgetComparisonChart };
