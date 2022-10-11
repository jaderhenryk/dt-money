import { useContextSelector } from "use-context-selector";

import { TransactionsContext } from "../../contexts/TransactionsContext";

import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, context => context.transactions);
  return (
    <div>
      <Header />
      <Summary/>

      <TransactionsContainer>
        <SearchForm/>
        <TransactionsTable>
          <tbody>
            {
              transactions.map(transaction => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.description}</td>
                    <td>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighlight>
                      </td>
                    <td>{transaction.category}</td>
                    <td>{transaction.createdAt && dateFormatter.format(new Date(transaction.createdAt))}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}