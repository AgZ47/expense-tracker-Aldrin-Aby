import { Transaction } from "./Components/Transaction";

function App() {
  return (
    <section>
      <div className="bg-sky-900 h-screen p-2">
        <div></div>
        <div>
          <Transaction
            id={1}
            amount={500}
            category="expense"
            date={new Date("2026-09-02T12:00:00Z")}
            desc="pari"
          />
        </div>
      </div>
    </section>
  );
}

export default App;
