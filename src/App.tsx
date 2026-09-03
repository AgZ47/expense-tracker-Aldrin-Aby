import { useState } from "react";
import { Entry } from "./Components/Entry";
import { Header } from "./Components/Header";
import { Transaction } from "./Components/Transaction";
import type { transactionProps } from "./Components/Transaction";

function App() {
  const [transactions, setTransactions] = useState<transactionProps[]>([
    {
      id: "1",
      amount: 500,
      category: "expense",
      date: new Date("2026-09-03T12:00:00Z"),
      desc: "pari",
    },
  ]);

  const [editingTransaction, setEditingTransaction] =
    useState<transactionProps | null>(null);

  function handleSave(transaction: transactionProps) {
    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === transaction.id ? transaction : t)),
      );
      setEditingTransaction(null);
    } else {
      setTransactions((prev) => [...prev, transaction]);
    }
  }

  function handleDelete(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));

    if (editingTransaction?.id === id) {
      setEditingTransaction(null);
    }
  }

  const totalSpent = transactions
    .filter((t) => t.category === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalEarned = transactions
    .filter((t) => t.category === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <section className="bg-sky-900 h-screen flex flex-row p-2 gap-2">
      <div className="flex flex-col gap-2 basis-4/5">
        <div>
          <Header totalearned={totalEarned} totalspent={totalSpent} />
        </div>
        <div className="overflow-y-auto flex flex-col gap-1">
          {transactions.map((trans) => (
            <Transaction
              key={trans.id}
              id={trans.id}
              amount={trans.amount}
              category={trans.category}
              date={trans.date}
              desc={trans.desc}
              onEdit={setEditingTransaction}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      <div className="basis-1/5">
        <Entry
          onClickHandler={handleSave}
          editingTransaction={editingTransaction}
          onCancelEdit={() => setEditingTransaction(null)}
        />
      </div>
    </section>
  );
}

export default App;
