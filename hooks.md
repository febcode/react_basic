# What is hooks
Hooks allow function components to have access to state and other React features. 
Because of this, class components are generally no longer needed.
Although Hooks generally replace class components, there are no plans to remove classes from React.

```
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function FavoriteColor() {
  const [color, setColor] = useState("red");
    
  return (
    <>
      <h1>My favorite color is {color}!</h1>
      <button
        type="button"
        onClick={() => setColor("blue")}
      >Blue</button>
      <button
        type="button"
        onClick={() => setColor("red")}
      >Red</button>
      
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FavoriteColor />);
```

You must import Hooks from react.
Here we are using the useState Hook to keep track of the application state.
State generally refers to application data or properties that need to be tracked.

# Hook Rules
There are 4 rules for hooks:

1) Hooks can only be called inside React function components.
2) Hooks can only be called at the top level of a component.
3) Hooks cannot be conditional or Hooks should not be inside conditional statements
4) Hooks must be imported from React

Note: Hooks will not work in React class components.

## 1. useState  :
- it accepts an initial state and returns two values:
- 1 . The current state.
- 2 . A function that updates the state.

State Hooks like useState allows functional components to manage local state.
```
import React, { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => 
                setCount(count + 1)}>Increment</button>
        </div>
    );
}

export default Counter;
```
useState initializes the count variable with 0 and provides a method setCount to update it.
Clicking the button updates the state using the setCount function.

## 2. Context Hooks (useContext)
Context Hooks like useContext enable functional components to access the React Context API and share data across the component tree.
```
import React, { createContext, useContext } from "react";

const Contexts = createContext("light");

function Theme() {
    const theme = useContext(Contexts);
    return <h1>Theme: {theme}</h1>;
}

export default function App() {
    return (
        <Contexts.Provider value="dark">
            <Theme />
        </Contexts.Provider>
    );
}
```
The Theme Context provides a value (“dark”) accessible via useContext in DisplayTheme.
This eliminates the need to pass props manually down the component tree.

## 3. Ref Hooks (useRef)
Ref Hooks like useRef provide access to DOM nodes or persist values without causing re-renders.
```
import React, { useRef } from "react";

function Focus() {
    const input = useRef();

    const focus = () => input.current.focus();

    return (
        <div>
            <input ref={input} type="text" />
            <button onClick={focus}>Focus</button>
        </div>
    );
}
```
export default Focus;
useRef stores a reference to the input element, allowing the focus function to programmatically set focus on it.
Updating inputRef does not cause the component to re-render.

## 4. Effect Hooks (useEffect)
Effect Hooks like useEffect handle side effects like fetching data, subscriptions, and DOM manipulation.
```
import React, { useEffect, useState } from "react";

function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => 
            setSeconds((s) => s + 1), 1000);
        return () => clearInterval(interval); 
    }, []);

    return <h1>Time: {seconds}s</h1>;
}

export default Timer;
```
The useEffect hook starts an interval to update the seconds state every second.
The cleanup function ensures the interval is cleared when the component unmounts.

## 5. Performance Hooks (useMemo , useCallback )
Performance Hooks like useMemo and useCallback optimize rendering by memoizing values or functions.

- **useMemo:** Returns a memoized value to avoid expensive calculations on every render.
- **useCallback:** Returns a memoized version of a callback function.
```
import React, { useMemo } from "react";

function ExpCal({ num }) {
    const compute = useMemo(() => num * 2, [num]);
    return <h1>Result: {compute}</h1>;
}
```
useMemo caches the computed value (num * 2), recalculating it only when num changes.
This prevents unnecessary calculations on every render.

## 6. Resource Hooks (useFetch , custom hook)
These include useFetch or custom hooks for fetching and managing external resources.
```
function useFetch(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [url]);

    return data;
}
```
useFetch is a custom hook for fetching data from a given URL.
It uses useEffect to fetch data when the URL changes and updates the data state.

## 7. Other Hooks
React offers additional hooks for specific use cases

- **useReducer:** For complex state management.
- **useImperativeHandle:**  Customizes the instance value exposed by useRef.
- **useLayoutEffect:**  Like useEffect but fires synchronously after DOM updates.

## 8.Custom Hooks
Custom Hooks are user-defined functions that encapsulate reusable logic. They enhance code reusability and readability by sharing behavior between components.
Creating a Custom Hook
```
import { useState, useEffect } from "react";

function useWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
}

export default useWidth;
```
Using a Custom Hook
```
import React from "react";
import useWidth from "./useWidth";

function App() {
    const width = useWidth();
    return <h1>Window Width: {width}px</h1>;
}

export default App;
```
The custom hook useWidth encapsulates the logic for tracking the window’s width.
It reduces redundancy by reusing the logic across components.

## Benefits of using Hooks
Hooks can improve code reusability and make it easier to split complex components into smaller functions.
- Simpler, cleaner code: Functional components with hooks are often more concise and easier to understand than class components.
- Better for complex UIs: Hooks make it easier to manage state and side effects in components with intricate logic.
- Improved maintainability: Code using hooks is often easier to test and debug.
- 
## Why the need for ReactJs Hooks?
There are multiple reasons responsible for the introduction of the Hooks which may vary depending upon the experience of developers in developing React application.
 Needs for react hooks are:
1. Use of ‘this’ keyword
2. Reusable stateful logics
3. Simplifying complex scenarios
### 1. Use of ‘this’ keyword
Working with classes in React involves understanding JavaScript’s ‘this’ keyword intricacies, causing challenges uncommon in other languages.
Implementing class components requires binding event handlers, adding complexity compared to the simplicity of props and state
React developers note that classes lack efficiency and may hinder hot reloading reliability, a concern Hooks address effectively
### 2. Reusable stateful logics:
Addressing higher-level concepts like Higher-order components (HOC) and render props, reusing stateful logic is challenging.
Solutions like HOC and render props can lead to an inefficient code base, complicating readability with nested components.
Hooks offer a cleaner way to share stateful logic without altering component hierarchy, enhancing code organization and clarity.
### 3. Simplifying complex scenarios:
In complex scenarios, life-cycle methods may scatter code, making it challenging to organize related logic in one place.
Hooks address this issue by allowing the organization of code based on related functionality rather than life-cycle methods.


# Difference Between Hooks and Class Components
|Feature |	Class Components |	React Hooks |
|----|----|----|
|State Management	|this.state and lifecycle methods|	useState and useEffect|
|Code Structure|	Spread across methods, can be complex	| Smaller,  focused functions|
|Reusability	|Difficult to reuse logic	|Easy to create and reuse custom hooks|
|Learning Curve	|Familiar to OOP developers	|Requires different mindset than classes|
|Error | Boundaries	Supported	|Not currently supported|
|Third-party Libraries|	Some libraries rely on them|	May not all be compatible yet|

## Important things to remember while using hooks
- Hooks are optional in React 16.8+, allowing partial or full project adoption without rewriting existing code.
- Hooks are backward-compatible, ensuring smooth integration with existing components and preventing breaking changes.
- React has no plans to eliminate classes; Hooks and class components can coexist.
- React projects can seamlessly blend class-based and functional components with Hooks.
- Hooks provide a direct API for key React concepts, such as props, state, context, refs, and lifecycle.

