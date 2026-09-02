import { Entry } from "./Components/Entry";
import { Header } from "./Components/Header";
import { Transaction } from "./Components/Transaction";

function App() {
  return (
    <section className="bg-sky-900 h-screen flex flex-row p-2 gap-2">
      <div className="flex flex-col gap-2 basis-4/5">
        <div>
          <Header totalearned={5000} totalspent={2000} />
        </div>
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
      <div className="basis-1/5">
        <Entry />
      </div>
    </section>
  );
}

export default App;
