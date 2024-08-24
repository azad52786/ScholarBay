import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getAllCatagoryDetails } from '../service/operations/CatagoryBackendConnection';
import { useSelector } from 'react-redux';
import TagHeadingSection from './TagHeadingSection';
import Loading from './Loading';
import CatagoryCourseSection from './CatagoryCourseSection';

const CatalogsHome = () => {
    const { token } = useSelector((store) => store.Auth);
    const [searchParams, setSearchParams] = useSearchParams();
    const [allCourseDetails , setAllCourseDetails ] = useState(null);
    const id = searchParams.get('tagId');
    useEffect(() => {
      async function getallCourses(){
        setAllCourseDetails(null)
        const res = await getAllCatagoryDetails(JSON.stringify({tagId : id}) , token);
        setAllCourseDetails(res);
      }
      getallCourses()
    } , [id]);
    console.log(allCourseDetails)
  return allCourseDetails === null ? (<Loading/>) :  (
    <div className=' w-full h-full'>
      <TagHeadingSection currentCatagroyDetails = {allCourseDetails?.currentTagCourses}/>
      <CatagoryCourseSection allCourseDetails = {allCourseDetails}/>
      {/* <CourseCard/> */}
    </div>
  )
}

export default CatalogsHome
