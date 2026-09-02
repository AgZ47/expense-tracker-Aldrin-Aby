type transactionProps = {
  id: number;
  amount: number;
  category: "income" | "expense";
  date: Date;
  desc: string;
};

export const Transaction = (props: transactionProps) => {
  return (
    <div className="bg-sky-300 rounded-xl border-3 border-sky-500 text-black p-2">
      <div className="flex flex-row gap-3">
        <h2>
          {props.amount}
          {props.category == "income" ? "+" : "-"}
        </h2>
        <h2>{props.category}</h2>
        <h2>{props.date.toDateString()}</h2>
      </div>
      <p>{props.desc}</p>
    </div>
  );
};
