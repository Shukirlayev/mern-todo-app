import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import api from './api/axios';
import SkeletonTodo from './components/SkeletonTodo';
import { Toaster, toast } from 'sonner';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get('/todos');
        setTodos(response.data);
      } catch (error) {
        setErrorMsg('Error fetching tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    try {
      const response = await api.post('/todos', { text });
      setTodos([...todos, response.data]);

      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Error adding task');
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);

    setTodos(
      todos.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t)),
    );

    try {
      await api.patch(`/todos/${id}`, { completed: !todo.completed });

      toast.info(
        todo.completed ? 'Marked as uncompleted' : 'Marked as completed',
      );
    } catch (error) {
      toast.error('Error updating task');
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      const response = await api.patch(`/todos/${id}`, { text: editedText });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
      setEditingTodo(null);

      toast.success('Task updated!');
    } catch (error) {
      toast.error('Error saving edit');
    }
  };

  const cancelEdit = () => setEditingTodo(null);

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));

      toast.error('Task deleted');
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
  });

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Task Manager
          </h1>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center mb-2">{errorMsg}</p>
          )}

          <div className="flex justify-center gap-2 my-6">
            {['all', 'active', 'completed'].map((type) => {
              const labels = {
                all: '✔ All',
                active: '⏳ Active',
                completed: '✅ Completed',
              };
              return (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
          ${
            filter === type
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
                >
                  {labels[type]}
                </button>
              );
            })}
          </div>

          <TodoForm addTodo={addTodo} />

          {loading ? (
            <div className="mt-4 flex flex-col gap-4">
              <SkeletonTodo />
              <SkeletonTodo />
              <SkeletonTodo />
            </div>
          ) : (
            <TodoList
              todos={filteredTodos}
              editingTodo={editingTodo}
              editedText={editedText}
              setEditedText={setEditedText}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
              startEditing={startEditing}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
