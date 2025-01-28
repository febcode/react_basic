# How does React Work?
React creates a **VIRTUAL DOM** in memory.

Instead of manipulating the browser's DOM directly, React creates a virtual DOM in memory, 
where it does all the necessary manipulating, before making the changes in the browser DOM.
React only changes what needs to be changed!
React finds out what changes have been made, and changes only what needs to be changed.

## Setting up a React Environment
If you have npx and Node.js installed, you can create a React application by using create-react-app.
```
npx create-react-app my-react-app
cd my-react-app
npm start
```
A new browser window will pop up with your newly created React App! If not, open your browser and type localhost:3000 in the address bar.

```
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```
