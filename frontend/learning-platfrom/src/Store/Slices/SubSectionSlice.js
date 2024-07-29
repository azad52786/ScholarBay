import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // indexOfsubsection : -1 , 
    // indexOfsection : -1 , 
    sectionId : null , 
    subsectionDetails : null , 
    showSubsectionForm : false , 
    editSubSection : false , 
   
}
const SubsectionFormSlice = createSlice({
    name : "Subsection" , 
    initialState , 
    reducers : {
        setIndexOfSubsection : (state , action) => {
            state.indexOfsubsection = action.payload;
        } , 
        setIndexOfSection : (state , action ) => {
            state.indexOfsection = action.payload;
        } , 
        setSubSection : (state , action) => {
            state.subsectionDetails = action.payload ;
        } , 
        setShowSubSectionForm : (state , action ) => {
            state.showSubsectionForm = action.payload;
        },  
        setEditSubSection :(state , action ) => {
            state.editSubSection = action.payload ;
        } , 
        setSectionId : (state , action) => {
            state.sectionId = action.payload;
        } , 
        removeSubsection : (state , action) => {
            // state.indexOfsubsection =-1; 
            // state.indexOfsection = -1 ;
            state.editSubSection = false ;
            state.sectionId = null ;
            state.subsectionDetails = null;
            state.showSubsectionForm = false ; 
        }
    }
    
})

export default SubsectionFormSlice.reducer;

export const { setSubSection , setShowSubSectionForm ,setEditSubSection,  setSectionId , removeSubsection , setIndexOfSubsection , setIndexOfSection } = SubsectionFormSlice.actions;
