export type transactionProps = {
  id: string;
  amount: number;
  category: "income" | "expense";
  date: Date;
  desc: string;
};

type transProps = transactionProps & {
  onEdit: (transaction: transactionProps) => void;
  onDelete: (id: string) => void;
};

export const Transaction = ({
  id,
  amount,
  category,
  date,
  desc,
  onEdit,
  onDelete,
}: transProps) => {
  return (
    <div className="bg-sky-300 rounded-xl border-3 border-sky-500 text-black p-2">
      <div className="flex flex-row flex grow gap-3">
        <span>
          {category == "income" ? "+" : "-"}
          {amount}
        </span>
        <span>{category}</span>
        <span>{date.toLocaleString()}</span>
        <button
          className="bg-red-700 p-1 rounded-lg"
          onClick={() => onDelete(id)}
        >
          X
        </button>
        <button
          className="bg-red-700 p-1 rounded-lg"
          onClick={() => onEdit({ id, amount, category, date, desc })}
        >
          Edit
        </button>
      </div>
      <p>{desc}</p>
    </div>
  );
};
