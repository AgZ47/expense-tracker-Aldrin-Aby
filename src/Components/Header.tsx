type headerProps = {
  totalspent: number;
  totalearned: number;
};

export const Header = (props: headerProps) => {
  return (
    <div className="bg-sky-300 rounded-xl border-3 border-sky-400 text-black font-bold text-base md:text-xl p-3 flex flex-row gap-2 shadow-sm">
      <h2 className="basis-1/3 text-center text-green-800">
        +{props.totalearned}
      </h2>
      <h2 className="basis-1/3 text-center border-x-2 border-sky-400">
        {props.totalearned - props.totalspent}
      </h2>
      <h2 className="basis-1/3 text-center text-red-800">
        -{props.totalspent}
      </h2>
    </div>
  );
};
