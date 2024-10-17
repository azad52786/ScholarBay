import React from 'react';

const Spinner = () => {
  return (
  <>
  
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    //   className=' bg-red text-white'
    >
      <style>
        {`
          .spinner {
            transform-origin: center;
            animation: spinner 0.75s step-end infinite;
        
          }

          @keyframes spinner {
            8.3% { transform: rotate(30deg); }
            16.6% { transform: rotate(60deg); }
            25% { transform: rotate(90deg); }
            33.3% { transform: rotate(120deg); }
            41.6% { transform: rotate(150deg); }
            50% { transform: rotate(180deg); }
            58.3% { transform: rotate(210deg); }
            66.6% { transform: rotate(240deg); }
            75% { transform: rotate(270deg); }
            83.3% { transform: rotate(300deg); }
            91.6% { transform: rotate(330deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <g className="spinner ">
        <circle cx="12" cy="2.5" r="1.5" opacity="0.14" fill='yellow' />
        <circle cx="16.75" cy="3.77" r="1.5" opacity="0.29" fill='yellow'/>
        <circle cx="20.23" cy="7.25" r="1.5" opacity="0.43" fill='yellow'/>
        <circle cx="21.5" cy="12" r="1.5" opacity="0.57"  fill='yellow'/>
        <circle cx="20.23" cy="16.75" r="1.5" opacity="0.71" fill='yellow' />
        <circle cx="16.75" cy="20.23" r="1.5" opacity="0.86" fill='yellow' />
        <circle cx="12" cy="21.5" r="1.5" fill='yellow'/>
      </g>
    </svg></>
  );
};

export default Spinner;
