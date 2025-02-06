# useState, MobX, and RxJS
All three (useState, MobX, and RxJS) are used for state management in React, but they have key differences in how they work.

## 1️⃣ useState (React Built-in State)
- Type: Local state (Component-level)
- Reactivity: Only updates when explicitly set using setState
- Performance: Causes component re-renders on state change
- Best For: Small-scale state management (form inputs, toggles, etc.)
Example:
```
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
```
- ✔ Pros: Simple, built-in, no extra libraries needed.
- ❌ Cons: Not suitable for global or shared state.

## 2️⃣ MobX (Reactive State Management)
- Type: Global state (observable)
- Reactivity: Auto-tracked changes, modifies state directly
- Performance: Efficient, only updates components that use the changed state
- Best For: Large-scale applications, shared/global state
Example: javascript
```
import { makeAutoObservable } from "mobx";

class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }
}

const store = new CounterStore();
export default store;
```
jsx
```
import React from "react";
import { observer } from "mobx-react-lite";
import store from "./store";

const Counter = observer(() => {
  return (
    <div>
      <p>Count: {store.count}</p>
      <button onClick={() => store.increment()}>Increment</button>
    </div>
  );
});

export default Counter;
```
- ✔ Pros: Automatic reactivity, minimal re-renders, easy state updates.
- ❌ Cons: Adds dependency (mobx), may be overkill for small projects.

## 3️⃣ RxJS (Reactive Streams)
- Type: Event-based (Observable streams)
- Reactivity: Push-based (subscribes to updates)
- Performance: Can be optimized for async/state streams
- Best For: Asynchronous events, real-time data, WebSockets, complex data flows
Example: javascript
```
import { BehaviorSubject } from "rxjs";

const count$ = new BehaviorSubject(0);

const increment = () => {
  count$.next(count$.getValue() + 1);
};

export { count$, increment };
```
jsx
```
import React, { useEffect, useState } from "react";
import { count$, increment } from "./store";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const subscription = count$.subscribe(setCount);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
```
- ✔ Pros: Best for async operations, WebSockets, API calls, debounced inputs.
- ❌ Cons: Complex setup, learning curve, hard to debug.

 ## 🚀 Summary Table
| Feature |	useState (React) |	MobX |	RxJS |
|---------|------------------|--------|-------|
|Scope	|Component-level|	Global|	Global/Streams|
|Reactivity	|Only updates when setState is called	|Automatic tracking of observable changes	|Push-based subscriptions|
|Performance|	Re-renders whole component	|Renders only affected parts|	Optimized for streams|
|Best For	|Local state (UI state, form handling)|	Shared global state (app-wide state management)|	Real-time data, WebSockets, async events|
|Complexity|	Easy	|Medium	|High|
|Library Needed?	|❌ No|	✅ Yes (mobx, mobx-react-lite)|	✅ Yes (rxjs)|



## 🚀 When to Use What?
- ✅ Use useState for small UI states (forms, toggles, counters).
- ✅ Use MobX for global state (shared app-wide state, stores, reactive UIs).
- ✅ Use RxJS for real-time data & async events (WebSockets, API polling, event streams).

