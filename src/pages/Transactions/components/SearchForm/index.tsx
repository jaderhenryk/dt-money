import { useContext } from "react";

import { useForm } from "react-hook-form";

import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFormSchema = zod.object({
  query: zod.string()
});

type searchFormInputs = zod.infer<typeof searchFormSchema>;

export function SearchForm() {
  const { loadTransactions } = useContext(TransactionsContext)

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<searchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  });

  async function handleSearchTransactions(data: searchFormInputs) {
    await loadTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
        type="text" 
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20}/>
        Buscar
      </button>
    </SearchFormContainer>
  )
}