import { createContext, ReactNode, useEffect, useState } from "react";
import { Transaction } from "../models/transaction.interface";

interface TransactionsContextType {
  transactions: Transaction[]
}

interface TransactionsPropsProvider {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsPropsProvider) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions');
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, [])
  
  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}