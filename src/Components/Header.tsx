type headerProps = {
  totalspent: number;
  totalearned: number;
};

export const Header = (props: headerProps) => {
  return (
    <div className="bg-sky-300 rounded-xl border-3 border-sky-400 text-black font-bold text-lg p-2 flex flex-row gap-2">
      <h2 className="basis-1/3 text-center text-green-800">
        +{props.totalearned}
      </h2>
      <h2 className="basis-1/3 text-center">
        {props.totalearned - props.totalspent}
      </h2>
      <h2 className="basis-1/3 text-center text-red-800">
        -{props.totalspent}
      </h2>
    </div>
  );
};
