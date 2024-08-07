import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const CatalogsHome = () => {
    const { tagName } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tagId , setTagId] = useState();
    const id = searchParams.get('tagId');
    useEffect(() => {
      console.log(id)
    } , [id])
    
  return (
    <div>
      hiii 
    </div>
  )
}

export default CatalogsHome
