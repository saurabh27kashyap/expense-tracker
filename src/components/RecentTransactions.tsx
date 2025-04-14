
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, updatedTransaction: Transaction) => void;
}

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

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  deleteTransaction,
  editTransaction,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [isEditing, setIsEditing] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: "",
      category: "",
      date: "",
    },
  });

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setSelectedTransactionId(null);
    }
  };

  const confirmDelete = () => {
    if (selectedTransactionId) {
      deleteTransaction(selectedTransactionId);
      toast({
        title: "Success!",
        description: "Transaction deleted successfully.",
      });
      setOpen(false);
      setSelectedTransactionId(null);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setIsEditing(true);
    setTransactionToEdit(transaction);
    form.setValue("description", transaction.description);
    form.setValue("amount", String(transaction.amount));
    form.setValue("category", transaction.category);
    form.setValue("date", transaction.date);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTransactionToEdit(null);
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (transactionToEdit) {
      const updatedTransaction = {
        id: transactionToEdit.id,
        ...values,
        amount: Number(values.amount),
      };
      editTransaction(transactionToEdit.id, updatedTransaction);
      toast({
        title: "Success!",
        description: "Transaction edited successfully.",
      });
      setIsEditing(false);
      setTransactionToEdit(null);
      form.reset();
    }
  };

  return (
    <>
      <Table>
        <TableCaption>Recent transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(transaction)}
                  disabled={isEditing}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedTransactionId(transaction.id)}
                      disabled={isEditing}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setOpen(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={confirmDelete}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isEditing && transactionToEdit && (
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
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the transaction category.
                  </FormDescription>
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
            <div className="flex justify-between">
              <Button type="submit">Update</Button>
              <Button type="button" variant="secondary" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export { RecentTransactions };
