import { MdOutlineDone } from 'react-icons/md';
import { MdModeEditOutline } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa6';
import { motion } from 'framer-motion';

function TodoItem({ todo, startEditing, toggleTodo, deleteTodo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.15 }}
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-x-4 overflow-hidden">
        <button
          onClick={() => toggleTodo(todo._id)}
          className={`flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          {todo.completed && <MdOutlineDone />}
        </button>

        <span
          className={`text-gray-800 truncate font-medium ${
            todo.completed ? 'line-through text-gray-400' : ''
          }`}
        >
          {todo.text}
        </span>
      </div>

      <div className="flex gap-x-2">
        <button
          className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
          onClick={() => startEditing(todo)}
        >
          <MdModeEditOutline />
        </button>

        <button
          onClick={() => deleteTodo(todo._id)}
          className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
}

export default TodoItem;
