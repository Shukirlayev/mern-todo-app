import TodoItem from './TodoItem';
import { MdOutlineDone } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

function TodoList({
  todos,
  editingTodo,
  editedText,
  setEditedText,
  saveEdit,
  cancelEdit,
  startEditing,
  toggleTodo,
  deleteTodo,
}) {
  return (
    <div className="mt-4">
      {todos.length === 0 ? (
        <p className="text-center text-gray-400">No tasks yet ✨</p>
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div key={todo._id}>
                {editingTodo === todo._id ? (
                  <div className="flex items-center gap-x-3">
                    <input
                      className="flex-1 p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />

                    <button
                      onClick={() => saveEdit(todo._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
                    >
                      <MdOutlineDone />
                    </button>

                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"
                    >
                      <IoClose />
                    </button>
                  </div>
                ) : (
                  <TodoItem
                    todo={todo}
                    startEditing={startEditing}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default TodoList;
