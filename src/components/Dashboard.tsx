
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyExpensesChart } from "./MonthlyExpensesChart";
import { CategoryPieChart } from "./CategoryPieChart";
import { RecentTransactions } from "./RecentTransactions";
import { AddTransactionForm } from "./AddTransactionForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Dashboard = () => {
  const [transactions, setTransactions] = React.useState([
    {
      id: "1",
      date: "2024-08-01",
      description: "Groceries",
      category: "Food",
      amount: 50,
    },
    {
      id: "2",
      date: "2024-07-15",
      description: "Dinner with friends",
      category: "Food",
      amount: 75,
    },
    {
      id: "3",
      date: "2024-07-01",
      description: "Salary",
      category: "Income",
      amount: -5000,
    },
    {
      id: "4",
      date: "2024-07-20",
      description: "Train ticket",
      category: "Transport",
      amount: 20,
    },
    {
      id: "5",
      date: "2024-06-10",
      description: "New shoes",
      category: "Shopping",
      amount: 120,
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  const addTransaction = (transaction: any) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const editTransaction = (id: string, updatedTransaction: any) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id ? updatedTransaction : transaction
      )
    );
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const categoryBreakdown = transactions.reduce((acc: any, transaction) => {
    const category = transaction.category;
    const amount = transaction.amount;
    if (acc[category]) {
      acc[category] += amount;
    } else {
      acc[category] = amount;
    }
    return acc;
  }, {});

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          ${totalExpenses.toFixed(2)}
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Add Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={toggleForm}>
            {showForm ? "Close Form" : "Open Form"}
          </Button>
          {showForm && (
            <AddTransactionForm
              addTransaction={addTransaction}
              transactions={transactions}
              setTransactions={setTransactions}
            />
          )}
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyExpensesChart transactions={transactions} />
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryPieChart categoryBreakdown={categoryBreakdown} />
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentTransactions
            transactions={transactions}
            deleteTransaction={deleteTransaction}
            editTransaction={editTransaction}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
