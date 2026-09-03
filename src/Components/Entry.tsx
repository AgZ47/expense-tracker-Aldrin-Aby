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

  const resetForm = () => {
    if (amountRef.current) amountRef.current.value = "";
    if (categoryRef.current) categoryRef.current.value = "";
    if (descRef.current) descRef.current.value = "";

    if (datetimeRef.current)
      datetimeRef.current.value = formatForInput(new Date());
  };

  useEffect(() => {
    if (props.editingTransaction) {
      amountRef.current.value = props.editingTransaction.amount.toString();
      datetimeRef.current.value = formatForInput(props.editingTransaction.date);
      categoryRef.current.value = props.editingTransaction.category;
      descRef.current.value = props.editingTransaction.desc;
    } else {
      resetForm();
    }
  }, [props.editingTransaction]);

  const handleSubmit = () => {
    if (!amountRef.current.value || !categoryRef.current.value) {
      alert("Please enter an amount and category");
      return;
    }

    props.onClickHandler({
      id: props.editingTransaction
        ? props.editingTransaction.id
        : crypto.randomUUID(),
      amount: Number(amountRef.current.value),
      date: new Date(datetimeRef.current.value),
      category: categoryRef.current.value as "income" | "expense",
      desc: descRef.current.value,
    });

    if (!props.editingTransaction) {
      resetForm();
    }
  };

  return (
    <div className="bg-sky-300 rounded-xl border-3 border-sky-400 text-black p-2 h-full flex flex-col gap-2 w-full">
      <h2 className="text-center font-bold text-lg">
        {props.editingTransaction ? "Edit Entry" : "New Entry"}
      </h2>
      <input
        ref={amountRef}
        type="number"
        className="bg-sky-400 p-1 rounded-xl border-2 border-sky-500"
        placeholder="Enter Amount"
      />
      <input
        ref={datetimeRef}
        type="datetime-local"
        className="bg-sky-400 p-1 rounded-xl border-2 border-sky-500"
      />
      <select
        ref={categoryRef}
        className="bg-sky-400 p-1 rounded-xl border-2 border-sky-500"
        defaultValue=""
      >
        <option value="" disabled>
          Select Category...
        </option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        ref={descRef}
        type="text"
        className="bg-sky-400 p-1 rounded-xl border-2 border-sky-500"
        placeholder="Enter Description"
      />

      <div className="flex gap-2 mt-2">
        <button
          className="bg-sky-100 px-3 py-1 rounded-lg border-2 border-sky-400 font-semibold text-sm w-full hover:bg-sky-200 "
          onClick={handleSubmit}
        >
          {props.editingTransaction ? "Update" : "Add+"}
        </button>

        {props.editingTransaction && (
          <button
            className="bg-red-400 text-white rounded-xl p-1 w-full font-bold"
            onClick={props.onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
