
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CategoryPieChartProps {
  categoryBreakdown: { [category: string]: number };
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  categoryBreakdown,
}) => {
  const data = Object.entries(categoryBreakdown).map(([category, value]) => ({
    name: category,
    value: Math.abs(value), // Use absolute value for charting
  })).filter(item => item.value > 0);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#808080"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export { CategoryPieChart };
