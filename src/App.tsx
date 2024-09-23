import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Input from './components/Input/Input';
import Button from './components/Button/Button';

function App() {
  const [inputValue, setInputValue] = useState<string>("");

  const [task, setTask] = useState<string[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [completedTask, setCompletedTask] = useState<string[]>([]);

  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTask));
  }, [completedTask]);

  const handleChange = () => {
    if (inputValue.trim() === "") return;

    if (editIndex !== null) {
      const updatedTask = [...task];
      updatedTask[editIndex] = inputValue;
      setTask([...updatedTask]);
      setEditIndex(null);
    } else {
      setTask([...task, inputValue]);
    }
    setInputValue("");
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setInputValue(task[index]);
  };

  const handleDelete = (index: number) => {
    setTask(task.filter((_, i) => i !== index));
  };

  const handleComplete = (index: number) => {
    setCompletedTask([...completedTask, task[index]]);
    setTask(task.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="">
        <h1 className="font-xl3 text-white mb-3">TO DO APP</h1>
        <Input inputValue={inputValue} setInputValue={setInputValue} />
        <Button classes='m-3' handleChange={handleChange}>Save</Button>

        {/* Task List */}
        <div className="mt-3 rounded">
          <ul>
            {task.map((value, index) => (
              <li key={index} className="bg-gray-400 rounded flex justify-between text-slate-100 mb-2">
                <span className="flex gap-2 justify-center align-middle">
                  <input type="checkbox" name="check" id="check" className="text-xl h-[18px] w-[18px]" onChange={() => handleComplete(index)} />
                  <span>{value}</span>
                </span>
                <span className="flex gap-4">
                  <Button classes='bg-transparent w-0' handleChange={() => handleEdit(index)}>
                    <i className="fa-regular fa-pen-to-square" key={index}></i>
                  </Button>
                  <Button classes='bg-transparent w-0' handleChange={() => handleDelete(index)}>
                    <i className="fa-solid fa-trash-arrow-up" key={index}></i>
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        </div>

        
        <div className='mt-5 bg-gray-400'>
  {completedTask.length > 0 && (
    <>
      <h2 className='font-extrabold text-white underline mb-3 pt-3'>Completed Tasks</h2>
      <ul>
        {completedTask.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </>
  )}
</div>

      </div>
    </>
  );
}

export default App;
