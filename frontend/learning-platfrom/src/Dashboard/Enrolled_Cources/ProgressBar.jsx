import React from 'react'



const ProgressBar = () => {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    if(randomNumber < 40) randomNumber += 40;
    const style = {
        width: `${randomNumber}%`,
    }

  return (
    <div className='h-2 w-32 bg-white  rounded-md relative'>
      <span
        style={{
          background : "linear-gradient(90deg, rgba(126,98,237,1) 0%, rgba(123,163,228,1) 21%, rgba(78,196,84,1) 36%, rgba(114,207,104,1) 62%, rgba(52,216,118,1) 80%, rgba(210,95,224,1) 100%)" , 
          width : `${randomNumber}%` 
        }}
        after-ele-width={`${randomNumber}%`}
      className={`absolute inline-block h-full progress
       rounded-md scale-0 progress`}></span>
    </div>
  )
}

export default ProgressBar
