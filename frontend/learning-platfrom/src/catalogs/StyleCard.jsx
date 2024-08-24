import React, { useState } from 'react';

const StyleCard = () => {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const width = 200;
  const height = 200;

  const handleMouseMove = (e) => {
    // const rect = e.target.getBoundingClientRect();
    // const offsetX = e.clientX - rect.left;
    // const offsetY = e.clientY - rect.top;
    
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;
    setX(offsetX - width / 2);
    setY(offsetY - height / 2);
  };

  return (
    <div className=' container'>
      <div
        className={`relative glow w-[300px] h-[400px] bg-[rgba(45,45,45,1)] rounded-md overflow-hidden`}
        onMouseMove={handleMouseMove}
        style={{
          '--before-top': `${y}px`,
          '--before-left': `${x}px`,
        }}
      >
        <style>
          {`
            .glow:before {
              content: '';
              position: absolute;
              height: 200px;
              width: 200px;
              z-index: 10;
              background-color: yellow;
              border-radius: 50%;
              transition: 0.5s , top 0s , left 0s , opacity 0.3s, filter 0.3s;
              opacity: 0;
            }
            .glow:hover:before {
              opacity: 0.5;
              filter: blur(3.5rem);
            }
            .glow:before {
              top: ${y}px;
              left: ${x}px;
            }
           .glow:after {
              content: "";
              position: absolute;
              inset: 2px;
              border-radius: 18px;
              background: rgba(45,45,45,.75);
            } 
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default StyleCard;



{
/*  <div className='h-full w-full flex items-center gap-4'>
      <div 
        className='relative h-[400px] m-6 rounded-md w-[300px] bg-[rgba(45,45,45,1)] overflow-hidden'
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setX(150); // Center X
          setY(200); // Center Y
        }}
        style={{
          '--mouse-x': `${x}px`,
          '--mouse-y': `${y}px`,
        }}
      >
        <div 
          className="absolute h-[200px] w-[200px] z-10 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-300"
          style={{
            top: `calc(var(--mouse-y, 50%) - 100px)`,
            left: `calc(var(--mouse-x, 50%) - 100px)`,
          }}
        >fdsfsd</div>
      </div>
    </div> */
}
