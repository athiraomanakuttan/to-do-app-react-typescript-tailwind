type input ={
    inputValue : string,
    setInputValue:React.Dispatch<React.SetStateAction<string>>
}

function Input({inputValue, setInputValue}:input) {
  return (
    <input type="text" name="task" id="task" className="border-gray-500 rounded w-80 p-2 text-center " placeholder="Enter new task" value={inputValue} onChange={(event)=>setInputValue(event.target.value)} />
  )
}

export default Input
