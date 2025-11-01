import { useEffect, useState } from "react";
import { counterStore } from "../stores/counterStore";

export default function CounterA() {
  const [count, setCount] = useState(counterStore.state.count);

  useEffect(() => {
    const unsubscribe = counterStore.subscribe((state, change) => {
      if (change.key === "count") setCount(state.count);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <h1>CountA: {count}</h1>
      <button onClick={() => (counterStore.state.count += 1)}>+</button>
      <button onClick={() => (counterStore.state.count = 0)}>reset</button>
      <button onClick={() => (counterStore.state.count -= 1)}>-</button>
    </>
  );
}
