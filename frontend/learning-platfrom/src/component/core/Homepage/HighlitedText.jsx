import React from 'react'

const HighlitedText = ({text , color}) => {
  return (
    <>
        {" "}
       <span className={`${color} text-transparent bg-clip-text font-bold`}>{text}</span>     
    </>
  )
}

export default HighlitedText