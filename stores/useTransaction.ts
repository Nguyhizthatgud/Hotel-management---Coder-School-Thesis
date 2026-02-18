import { create } from "zustand";
import { transactionService } from "@/services/transactionService";
import { Transaction } from "@/types";

type TransactionState = {
  // state
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  filteredTransactions: Transaction[];
  totalAmount?: number;
  // actions
  getTotalAmount?: () => number;
  fetchTransactions: (filter?: { dateFrom?: string; dateTo?: string; type?: string }) => Promise<void>;
  getTransactionById: (transactionId: string) => Promise<Transaction | null>;
  deleteTransactionById: (transactionId: string) => Promise<boolean>;
};

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  filteredTransactions: [],
  loading: false,
  error: null,
  totalAmount: 0,
  // actions
  getTotalAmount: () => {
    return get().transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  },
  fetchTransactions: async (filter) => {
    set({ loading: true, error: null });
    try {
      const transactions = await transactionService.listTransactions(filter);
      set({ transactions, filteredTransactions: transactions, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch transactions.", loading: false });
      throw error;
    }
  },
  getTransactionById: async (transactionId) => {
    try {
      const transaction = await transactionService.getTransaction(transactionId);
      return transaction;
    } catch (error) {
      set({ error: "Failed to fetch transaction." });
      throw error;
    }
  },
  deleteTransactionById: async (transactionId) => {
    try {
      await transactionService.deleteTransaction(transactionId);
      // Remove from local state
      const updatedTransactions = get().transactions.filter((t) => t.transactionId !== transactionId);
      set({ transactions: updatedTransactions });
      return true;
    } catch (error) {
      set({ error: "Failed to delete transaction." });
      throw error;
    }
  }
}));
