export const Entry = () => {
  return (
    <div className="bg-sky-300 rounded-xl border-3 border-sky-500 text-black p-2 h-full flex flex-col gap-2">
      <h2>Entry</h2>
      <input
        type="number"
        className="bg-white"
        placeholder="Enter Amount"
      ></input>
      <input type="datetime-local" className="bg-white"></input>
      <select id="category" name="cat" required className="bg-white">
        <option value="" disabled selected>
          Select Category...
        </option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        className="bg-white"
        placeholder="Enter Description"
      ></input>
    </div>
  );
};
