import { useState } from 'react';
import ToDoHolder from './Components/ToDoHolder';
import ReactIconsBs from 'react-icons/bs/index';

interface ToDo {
  text: string
  col: number
  isSelected: boolean
  needsToGetShort: boolean
}

interface Input {
  value: string
  msg: string
}

interface Data {
  inputValue: Input
  toDos: ToDo[]
}

function App() {

  const [data, setData] = useState<Data>({
    inputValue: {
      value: "",
      msg: ""
    },
    toDos: []
  })

  const add = (): void => {

    if (!data.inputValue.value) return setData({ ...data, inputValue: { value: "", msg: "Field cannot be empty!" } })

    setData({
      inputValue: { value: "", msg: "" },
      toDos: [...data.toDos, {
        text: data.inputValue.value,
        col: 1,
        isSelected: false,
        needsToGetShort:  data.inputValue.value.length > 30
      }]
    })
  }

  const select = (index: number): void => {

    const toDos = [...data.toDos]

    toDos[index].isSelected = !toDos[index].isSelected

    setData({ ...data, toDos })

  }

  const remove = (): void => setData({ ...data, toDos: data.toDos.filter(item => !item.isSelected) })
        
  const read = (index: number): void => {

    const toDos = [...data.toDos]

    toDos[index].needsToGetShort = false

    setData({...data, toDos })
    
  }

  const moveSelected = (col: number): void => setData({...data, toDos: data.toDos.reduce((acc: ToDo[], cur: ToDo): ToDo[] => (cur.isSelected ? [...acc, { ...cur, isSelected: false, col }] : [...acc, cur]), [])})

  const moveAll = (col: number): void => 
    setData({
      ...data,
      toDos: data.toDos.map(item => ({
        ...item,
        isSelected: false,
        col
      }
    ))  
  })
  
  return (
    <div className='flex flex-col items-center md:h-screen font-light m-6 md:m-0'>
      <div className="flex flex-wrap gap-6 md:w-[50rem] md:m-auto">
        <h1 className='w-full font-bold text-2xl'>Typescript Simple App</h1>
          <p className='w-full'>This is a simple to do list written in typescript.</p>
          <p className='text-sm font-medium text-red-600 -mb-[0.1rem]'>{data.inputValue.msg}</p>
        <div
          className='flex gap-2 w-full'
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              return add()
          }}
        >
          <input
            value={data.inputValue.value}
            onChange={(e) => setData({...data, inputValue: {value:e.target.value.trimStart(), msg: ""}})}
            placeholder='Type something...'
            className={`${data.inputValue.msg ? 'border-[1px] border-red-600' : ""} 
            rounded-xl py-2 px-3 bg-blue-50 focus:bg-blue-100 outline-0 md:w-[calc(50%-6.3rem)] w-[calc(100%-5.6rem)]`}
            />
            <button
            className='bg-black text-white px-4 rounded-xl'
            onClick={add}
            >
              Add
          </button>
      </div>
      <div className='md:w-[calc(50%-20px)] w-full h-[30rem] rounded-2xl shadow-2xl shadow-blue-50 p-5 my-4
        border-t-[1px] border-blue-50 italic flex flex-col items-start gap-2 overflow-y-auto overflow-x-clip'>
          <h2 className='font-medium text-lg mb-2'>Goals for Today</h2>
          {
            data.toDos.map((item, index) => item.col === 1 && (<ToDoHolder item={item} index={index} />))
          }
        </div>
        <div className='md:w-[calc(50%-20px)] w-full h-[30rem] rounded-2xl shadow-2xl shadow-blue-50 p-5 my-4
        border-t-[1px] border-blue-50 italic flex flex-col items-start gap-2 overflow-y-auto overflow-x-clip'>
          <h2 className='font-medium text-lg mb-2'>Goals Checked!</h2>
          {
            data.toDos.map((item, index) => item.col === 2 && (<ToDoHolder item={item} index={index} />))
          }
        </div>
        <div className='w-full md:mb-0 mb-12'>
          <div className='grid grid-cols-5 w-max gap-2 m-auto'>
            <ReactIconsBs.BsFillArrowLeftCircleFill
              className='text-2xl cursor-pointer'
              onClick={() => moveAll(1)}
            />     
            <ReactIconsBs.BsArrowLeftCircle
              className='text-2xl cursor-pointer'
              onClick={() => moveSelected(1)}
            />
            <ReactIconsBs.BsXCircle
              className='text-2xl cursor-pointer'
              onClick={remove}
            />
            <ReactIconsBs.BsArrowRightCircle
              className='text-2xl cursor-pointer'
              onClick={() => moveSelected(2)}
              
            />
            <ReactIconsBs.BsFillArrowRightCircleFill
              className='text-2xl cursor-pointer'
              onClick={() => moveAll(2)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
