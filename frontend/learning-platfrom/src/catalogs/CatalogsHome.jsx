import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const CatalogsHome = () => {
    const { tagName } = useParams();
    const tagid = useSearchParams();
    console.log(tagid)
    console.log(tagName);
    
  return (
    <div>
      hiii 
    </div>
  )
}

export default CatalogsHome
