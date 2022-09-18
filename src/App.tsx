import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface MyTodo {
  inputValue: string,
  todos: string[],
  completed: string[]
}

const [todos, setTodos] = useState<MyTodo>({
  inputValue: "",
  todos: [],
  completed: []
})

interface PropsMyTodo extends MyTodo {
setTodos: React.Dispatch<React.SetStateAction<MyTodo>>
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
