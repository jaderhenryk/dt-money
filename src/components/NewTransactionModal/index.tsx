import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import * as Dialog from '@radix-ui/react-dialog';

import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome'])
});

type newTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const { control, register, handleSubmit, reset, formState: { isSubmitting } } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  });
  const createTransaction = useContextSelector(TransactionsContext, context => context.createTransaction);

  async function handleNewTransactionSubmit(data: newTransactionFormInputs) {
    const { description, price, category, type } = data;
    await createTransaction({
      description,
      price,
      category,
      type
    })
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay/>

      <Content>
        <Dialog.Title>
          Nova Transação
        </Dialog.Title>
        <CloseButton>
          <X size={24}/>
        </CloseButton>

        <form onSubmit={handleSubmit(handleNewTransactionSubmit)}>
          <input 
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input 
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input 
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton
                    value='income'
                    variant="income"
                  >
                    <ArrowCircleUp size={24}/>
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton
                    value='outcome'
                    variant="outcome"
                  >
                    <ArrowCircleDown size={24}/>
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>

      </Content>
    </Dialog.Portal>
  )
}