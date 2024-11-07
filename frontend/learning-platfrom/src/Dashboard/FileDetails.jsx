import React from 'react'
import { getPathArray } from '../utils/constants'

const FileDetails = ({ pathname , extra = null }) => {

    const pathArray = getPathArray(pathname);

    if(extra && extra.length > 0) {
        for(let i of extra) {
            pathArray.push(i)
        }
    }
  return (
    <div className=" h-fit w-full flex gap-1">
        {pathArray.map(
          (path , index) =>
            path.length > 0 &&
            path.toLowerCase() !== "default" && (
              <div
                key={index}
                className={`ml-4 mt-5 text-base ${index === pathArray.length - 1? " text-yellow-25" : "text-pure-greys-50"}   font-inter font-medium flex gap-5`}
              >
                {/* {path === "Dashboard" ? ( <div>Home</div>) : ( <div>{path} </div>)} */}
                {path}
                {
                  index !== pathArray.length - 1 &&
                  <div>/</div>
                }
              </div>
            )
        )}
      </div>
  )
}

export default FileDetails
