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
    <div className="bg-sky-300 rounded-xl border-3 border-sky-400 text-black p-3 flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="flex flex-row gap-2 items-center">
          <span
            className={`font-bold text-lg md:text-xl ${category == "income" ? "text-green-800" : "text-red-800"}`}
          >
            {category == "income" ? "+" : "-"}
            {amount}
          </span>
          <span className="text-xs uppercase font-bold bg-sky-200 px-2 py-1 rounded">
            {category}
          </span>
        </div>
        <span className="text-sm font-medium">{date.toLocaleDateString()}</span>
      </div>

      <div className="flex flex-row justify-between items-center gap-2">
        <p className="truncate text-sm md:text-base mr-2">{desc}</p>
        <div className="flex gap-2 shrink-0">
          <button
            className="bg-sky-100 px-3 py-1 rounded-lg border-2 border-sky-400 font-semibold text-sm hover:bg-sky-200"
            onClick={() => onEdit({ id, amount, category, date, desc })}
          >
            Edit
          </button>
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-lg border-2 border-red-500 font-bold text-sm hover:bg-red-500"
            onClick={() => onDelete(id)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};
