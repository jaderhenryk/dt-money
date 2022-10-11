import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";
import { Transaction } from "../models/transaction.interface";

interface TransactionsContextType {
  transactions: Transaction[],
  loadTransactions: (query?: string) => Promise<void>,
  createTransaction: (data: Transaction) => Promise<void>
}

interface TransactionsPropsProvider {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsPropsProvider) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const loadTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(async (data: Transaction) => {
    const { description, price, category, type } = data;
    const response = await api.post('/transactions', {
      category,
      price,
      type,
      description,
      createdAt: new Date()
    });
    setTransactions(state => [response.data, ...state]);
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);
  
  return (
    <TransactionsContext.Provider value={{ transactions, loadTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}