import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todoText) {
      alert('Please add a task');
      return;
    }
    setTodos([...todos, { id: Date.now(), todoText, isCompleted: false }]);
    setTodoText('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      })
    );
  };

  const editTodo = (id) => {
    const text = prompt('Edit Todo', '');
    if (!text) {
      alert('Please add a some text');
      return;
    }
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, todoText: text };
        }
        return todo;
      })
    );
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoText}
          placeholder="Add a task"
          onChange={(e) => setTodoText(e.target.value)}
        />
      </form>
      {todos.length <= 0 ? (
        <p>No todos</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <Todo text={todo.todoText} isCompleted={todo.isCompleted} />
              <button onClick={() => deleteTodo(todo.id)}>✘</button>
              <button onClick={() => editTodo(todo.id)}>📝</button>
              <button onClick={() => completeTodo(todo.id)}>✔</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const Todo = ({ text, isCompleted }) => {
  return <strong className={isCompleted ? 'complete' : ''}>{text}</strong>;
};

export default App;
