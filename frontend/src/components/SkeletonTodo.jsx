const SkeletonTodo = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-5 w-5 bg-gray-300 rounded"></div>
          <div className="h-5 w-5 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonTodo;
