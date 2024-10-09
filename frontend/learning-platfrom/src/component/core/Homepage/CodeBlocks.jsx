import React from 'react'
import CTAButton from './CTAButton'
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({postion , heading , paragraph , ctabtn1 , ctabtn2 , codetext , codecolor , bgstyle}) => {
  return (
    <div className={`flex flex-col md:flex-row ${postion} gap-28 justify-around `}>
        <div className = ' w-full md:w-[50%] flex flex-col justify-center gap-5 items-start'>
                {heading}
                <div className=' font-semibold text-richblack-300 text-start'>{paragraph}</div>
                <div className='flex flex-row gap-5 mt-8 font-bold'>
                    <CTAButton isyellow={ctabtn1.isyellow} className='flex flex-row gap-2'>{ctabtn1.text + " " + "→"}</CTAButton>
                    <CTAButton isyellow={ctabtn2.isyellow}> {ctabtn2.text}</CTAButton>
                </div>
        </div>
        <div className='relative w-full md:w-[37%] font-mono'>
          <div className=' absolute top-0 left-0 w-80 h-64 rounded-full opacity-20 blur-2xl'
            style={bgstyle}
          >
          </div>
          <div 
          style={{background: 'linear-gradient(111.93deg, rgba(14, 26, 45, .24) -1.4%, rgba(17, 30, 50, .38) 104.96%)'}}
          className=' py-3 w-full flex flex-row gap-2 leading-6 text-sm  border-richblack-300 border-2'>
              <div className=' w-[5%] flex flex-col text-richblack-300 font-bold pl-1'>
                  <p>1</p>
                  <p>2</p>
                  <p>3</p>
                  <p>4</p>
                  <p>5</p>
                  <p>6</p>
                  <p>7</p>
                  <p>8</p>
                  <p>9</p>
                  <p>10</p>
                  <p>11</p>
              </div>
              <div className={`text-start ${codecolor} font-bold pr-1`} style={{ whiteSpace: 'pre-wrap' }}>
                <TypeAnimation 
                    sequence={[codetext, 5000]}
                />
            </div>
          </div>
        </div>
    </div>
    
  )
}

export default CodeBlocks