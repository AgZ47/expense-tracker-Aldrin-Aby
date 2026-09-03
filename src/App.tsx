import { useState, useEffect } from "react";
import { Entry } from "./Components/Entry";
import { Header } from "./Components/Header";
import { Transaction } from "./Components/Transaction";
import type { transactionProps } from "./Components/Transaction";

function App() {
  const [transactions, setTransactions] = useState<transactionProps[]>(() => {
    const savedData = localStorage.getItem("expense-tracker-data");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        return parsedData.map((t: transactionProps) => ({
          ...t,
          date: new Date(t.date),
        }));
      } catch (error) {
        console.error("Failed to parse local storage data:", error);
      }
    }

    return [
      {
        id: "1",
        amount: 500,
        category: "expense",
        date: new Date(),
        desc: "Initial Transaction",
      },
    ];
  });

  const [editingTransaction, setEditingTransaction] =
    useState<transactionProps | null>(null);

  useEffect(() => {
    localStorage.setItem("expense-tracker-data", JSON.stringify(transactions));
  }, [transactions]);

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
    <section className="bg-sky-900 h-[100dvh] w-full flex flex-col md:flex-row p-2 gap-2 overflow-hidden">
      <div className="flex flex-col gap-2 flex-grow md:basis-4/5 overflow-hidden">
        <div className="shrink-0">
          <Header totalearned={totalEarned} totalspent={totalSpent} />
        </div>
        <div className="overflow-y-auto flex flex-col gap-2 flex-grow pb-2 pr-1">
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

      <div className="shrink-0 md:basis-1/5 flex flex-col justify-end">
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
