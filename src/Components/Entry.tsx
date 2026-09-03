import { useRef, useEffect } from "react";
import type { transactionProps } from "./Transaction";

type entryProps = {
  onClickHandler: (data: transactionProps) => void;
  editingTransaction: transactionProps | null;
  onCancelEdit: () => void;
};

const formatForInput = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export const Entry = (props: entryProps) => {
  const amountRef = useRef<HTMLInputElement>(null!);
  const datetimeRef = useRef<HTMLInputElement>(null!);
  const categoryRef = useRef<HTMLSelectElement>(null!);
  const descRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (props.editingTransaction) {
      amountRef.current.value = props.editingTransaction.amount.toString();
      datetimeRef.current.value = formatForInput(props.editingTransaction.date);
      categoryRef.current.value = props.editingTransaction.category;
      descRef.current.value = props.editingTransaction.desc;
    } else {
      amountRef.current.value = "";
      datetimeRef.current.value = "";
      categoryRef.current.value = "";
      descRef.current.value = "";
    }
  }, [props.editingTransaction]);

  const handleSubmit = () => {
    props.onClickHandler({
      id: props.editingTransaction
        ? props.editingTransaction.id
        : crypto.randomUUID(),
      amount: Number(amountRef.current.value),
      date: new Date(datetimeRef.current.value),
      category: categoryRef.current.value as "income" | "expense",
      desc: descRef.current.value,
    });
  };

  return (
    <div className="bg-sky-300 rounded-xl border-3 border-sky-500 text-black p-2 h-full flex flex-col gap-2 w-full">
      <h2>{props.editingTransaction ? "Edit Entry" : "New Entry"}</h2>
      <input
        ref={amountRef}
        type="number"
        className="bg-white p-1"
        placeholder="Enter Amount"
      />
      <input ref={datetimeRef} type="datetime-local" className="bg-white p-1" />
      <select ref={categoryRef} className="bg-white p-1" defaultValue="">
        <option value="" disabled>
          Select Category...
        </option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        ref={descRef}
        type="text"
        className="bg-white p-1"
        placeholder="Enter Description"
      />

      <div className="flex gap-2 mt-2">
        <button
          className="bg-white rounded p-1 w-full font-bold"
          onClick={handleSubmit}
        >
          {props.editingTransaction ? "Update" : "Add+"}
        </button>

        {props.editingTransaction && (
          <button
            className="bg-red-400 text-white rounded p-1 w-full font-bold"
            onClick={props.onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
