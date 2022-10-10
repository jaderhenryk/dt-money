import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Transaction } from "../models/transaction.interface";

interface TransactionsContextType {
  transactions: Transaction[],
  loadTransactions: (query?: string) => Promise<void>
}

interface TransactionsPropsProvider {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsPropsProvider) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  async function loadTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query
      }
    })

    setTransactions(response.data);
  }

  useEffect(() => {
    loadTransactions();
  }, [])
  
  return (
    <TransactionsContext.Provider value={{ transactions, loadTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}