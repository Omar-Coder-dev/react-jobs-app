'use client';
import {RouterProvider , createBrowserRouter , createRoutesFromElements , Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { MainLayout } from './layouts/MainLayout'
import { JobsPage } from './pages/JobsPage'
import { NotFoundPage } from './pages/NotFoundPage';
import { JobPage , jobLoader } from './pages/JobPage';
import { AddJobPage } from './pages/AddJobPage';
import { EditJobPage } from './pages/EditJobPage';



export default function Home() {
  //Add new Job
  const addJob = async (newJob:String) =>{
    const res = await fetch('/api/jobs',{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(newJob)
    })
    return;
  }
  //Delete Job
  const deleteJob = async(id:string)=>{
    const res = await fetch(`/api/jobs/${id}`,{
      method:"DELETE", 
    })
    return;
  }
  //Edit Job
const updateJob = async (updatedJob: any) => {
  await fetch(`/api/jobs/${updatedJob.id}`, { // Changed from /api/edit-job/ to /api/jobs/
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedJob),
  });
};

const router = createBrowserRouter( createRoutesFromElements(
  <Route path='/' element = {<MainLayout/>}>
    <Route index element = {<HomePage/>}/> 
    <Route path='/jobs' element = {<JobsPage />}/>
    <Route path='/add-job' element = {<AddJobPage addJobSubmit={addJob}/>}/>
    <Route path='/jobs/:id' element = {<JobPage deleteJob={deleteJob} />} loader = {jobLoader}/>    
    <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />    
    <Route path='*' element = {<NotFoundPage />}/>

  </Route>
)
)
  return <RouterProvider router = {router}   />
  
}
