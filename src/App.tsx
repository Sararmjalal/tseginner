import React, { useState } from 'react';
import ReactIconsBs from 'react-icons/bs/index'

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

    if(!data.inputValue.value) return setData({...data,  inputValue: {value: "", msg: "Field cannot be empty!"}})

    const clone = [...data.toDos]

    const inputLength = data.inputValue.value.length

    clone.push({
      text: data.inputValue.value,
      col: 1,
      isSelected: false,
      needsToGetShort: inputLength > 30
    })

    setData({ inputValue: {value: "", msg: ""}, toDos: [...clone] })

  }

  const select = (index: number): void => {

    const clone = [...data.toDos]

    clone[index].isSelected = !clone[index].isSelected

    setData({...data, toDos:[...clone]})
    
  }

  const remove  = (): void => {

    const toRemove = data.toDos.filter(item => item.isSelected)
    
    const difference = data.toDos.filter(item => !toRemove.includes(item) );
    
    setData({ ...data, toDos: [...difference] })

  }

  const read = (index: number): void => {

    const clone = [...data.toDos]

    if(clone[index].needsToGetShort) clone[index].needsToGetShort = false

    else clone[index].needsToGetShort = true

    setData({...data, toDos:[...clone]})
    
  }

  const moveSelected = (col: number): void => {

    const clone = data.toDos.reduce((acc: ToDo[], cur: ToDo): ToDo[] => (cur.isSelected ? [...acc, { ...cur, isSelected: false, col }] : [...acc, cur]), []);
    
    setData({...data, toDos:[...clone]})

  }

  const moveAll = (col: number): void => {

    const clone = [...data.toDos]

    clone.forEach(item => {
      item.isSelected = false
      item.col = col
    })

     setData({...data, toDos:[...clone]})
    
  }

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
            data.toDos.map((item, index) =>
            item.col === 1 ?
            (
              <div className='flex w-full'>
              <div>
                {
                  item.needsToGetShort ?
                    <div className='flex gap-2 max-w-[18rem]'>
                      <p>{item.text.slice(0, 25)}...</p>
                      <button
                        className='text-sm font-normal w-[5rem]'
                        onClick={() => read(index)}
                      >
                        Read more
                      </button>
                    </div>
                    :
                    <p className='max-w-[18.1rem] mr-2'>{item.text}</p>
               }
              </div>
              {
                item.isSelected ?
                  <ReactIconsBs.BsCheck2Circle
                    onClick={() => select(index)}
                    className='text-lg cursor-pointer mt-1'
                  />
                  :
                  <ReactIconsBs.BsCircle
                  onClick={() => select(index)}
                  className='text-sm cursor-pointer mt-1.5'
                  />
              }
            </div>
                )
                :
                null
                )
          }
        </div>
        <div className='md:w-[calc(50%-20px)] w-full h-[30rem] rounded-2xl shadow-2xl shadow-blue-50 p-5 my-4
        border-t-[1px] border-blue-50 italic flex flex-col items-start gap-2 overflow-y-auto overflow-x-clip'>
          <h2 className='font-medium text-lg mb-2'>Goals Checked!</h2>
          {
            data.toDos.map((item, index) =>
            item.col === 2 ?
            (
               <div className='flex w-full'>
                <div>
                  {
                    item.needsToGetShort ?
                      <div className='flex gap-2 max-w-[18rem]'>
                        <p>{item.text.slice(0, 25)}...</p>
                        <button
                          className='text-sm font-normal w-[5rem]'
                          onClick={() => read(index)}
                        >
                          Read more
                        </button>
                      </div>
                      :
                      <p className='max-w-[18.1rem] mr-2'>{item.text}</p>
                 }
                </div>
                {
                  item.isSelected ?
                    <ReactIconsBs.BsCheck2Circle
                      onClick={() => select(index)}
                      className='text-lg cursor-pointer mt-1'
                    />
                    :
                    <ReactIconsBs.BsCircle
                    onClick={() => select(index)}
                    className='text-sm cursor-pointer mt-1.5'
                    />
                }
              </div>
                )
                :
                null
                )
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
