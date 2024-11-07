import React from 'react'



const ProgressBar = () => {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    if(randomNumber < 40) randomNumber += 40;

    const style = {
        width: `${randomNumber}%`,
    }

  return (
    <div className='h-2 w-32 bg-white  rounded-md relative'>
      <span className={`absolute inline-block h-full w-[50%] progress
      bg-pink-200 rounded-md scale-0 progress after:content-['50%']`}></span>
    </div>
  )
}

export default ProgressBar
