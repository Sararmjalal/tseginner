export default function ToDoHolder({item, index}) {
  return (
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
}