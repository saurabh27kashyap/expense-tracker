"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(50, {
      message: "Description must not be longer than 50 characters.",
    }),
  amount: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num);
  }, "Amount must be a number."),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  date: z.string().min(2, {
    message: "Date must be at least 2 characters.",
  }),
});

interface AddTransactionFormProps {
  addTransaction: (transaction: any) => void;
}

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Income",
  "Other",
];

export const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  addTransaction,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: "",
      category: categories[0],
      date: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newTransaction = {
      id: uuidv4(),
      ...values,
      amount: Number(values.amount),
    };
    addTransaction(newTransaction);
    toast({
      title: "Success!",
      description: "Transaction added successfully.",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-md border p-4"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                Enter a brief description of the transaction.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Amount" {...field} />
              </FormControl>
              <FormDescription>Enter the transaction amount.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Enter the transaction category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input placeholder="Date" {...field} />
              </FormControl>
              <FormDescription>Enter the transaction date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
