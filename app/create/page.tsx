// @ts-nocheck
'use client';
import { Grid } from  'react-loader-spinner'



import { Octokit } from "@octokit/core";

import GithubProjects from '@/components/GithubProjects';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Result from "@/components/Result";


export default function Create() {

    const [projects, setProjects] = useState([])
    const [userName, setUserName] = useState("")

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    const [resObj, setResObj] = useState(null)



    async function test(data) {
        
        

        const octokit = new Octokit({
            auth: data.accessToken
          })

          const res = await octokit.request('GET /user/repos', {})

          const userData = await octokit.request('GET /user/{id}', {id: data.id})

          setUserName(userData.data.login)
          //console.log(res.data)

          setProjects(res.data)
          

          
         

        
          
    }
        
    useEffect( () => {
        
        fetch('/api/get-token')
  .then((response) => response.json())
  .then((data) => test(data))
        
  



    }, [])
    


return ( 

        <>
        
        <div className=" flex justify-center font-f text-purple-900 text-5xl">
            
            <div className="flex justify-center  w-5/6">
            {(loading) && 
            <div className='mt-64'>
                <Grid
            height="200"
            width="200"
            color="#14532d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
            </div>
            }
            {(!loading) && submitted && <Result username={resObj.username} title={resObj.title}></Result>}
                
            <Formik
        
          initialValues={{ name: '', email: '', job:'', selectedProjects: '', skills:'', hobbies:'', style:'', title:'SiteifyProject', instagramUrl:'', twitterUrl:'', description: '' }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(40, 'Must be 40 characters or less')
              .required('Required'),
              job: Yup.string()
              .max(30, 'Must be 30 characters or less')
              .required('Required'),

            
            email: Yup.string().email('Invalid email address').required('Required'),

            skills: Yup.string()
              .max(80, 'Must be 80 characters or less')
              .required('Required'),

              hobbies: Yup.string()
              .max(80, 'Must be 80 characters or less')
              .required('Required'),

              style: Yup.string()
              .max(40, 'Must be 40 characters or less')
              .required('Required'),

              description: Yup.string()
              .max(90, 'Must be 90 characters or less')
              .required('Required'),

              
            
          })}
          onSubmit={(values, { setSubmitting }) => {
            
            setLoading(true);
            setSubmitted(true);
            
            const times = values.selectedProjects.length;
                for (let i = 0; i < times; i++) {
                    const j = parseInt(values.selectedProjects[i]);
                    console.warn(j);
                    
                    const apiUrl = projects[j].url
                    const url = apiUrl.replace("https://api.github.com/repos", "https://github.com")
                    
                    const obj = {
                        'title': projects[j].name,
                        'url': url,
                        'stars': projects[j].stargazers_count,
                        'description': projects[j].description,
                        'language': projects[j].language
                    }
                    console.log(obj)
                    values.selectedProjects[i] = obj
                    
                }
                             
                values.username = userName;
                console.log("THIOS IS VALUES:")
                console.log(JSON.stringify(values))
                fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                }).
                then((res) => res.json())
                .then((data)=> {
                    setResObj(data)
                    console.log(data)
                    
                    setLoading(false)
                })

                
                
              setSubmitting(false);
           
          }}
        >

        
         {(!loading) && (!submitted) &&
         <Form className=" pt-20  flex-col flex w-full gap-6 outline-none ">

            
         <div className="flex flex-col justify-start gap-12 mt-10">


             <div className='flex justify-between gap-0 items-center'>
                 <div className=" ">
                    <span className="bg-green-400">{userName}/</span> 
                 </div>
                     <Field name="title" type="text" autoComplete="off">{({
                 field, // { name, value, onChange, onBlur }
                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                 meta,
                 }) => (
                 <div className='w-full flex flex-col'>
                     <input className=' bg-clear text-5xl placeholder:5xl border-transparent focus:border-transparent focus:ring-0 rounded-sm pl-2 focus:placeholder:opacity-0 focus:bg-green-900 duration-200 focus:duration-200 outline-none w-full h-24 text-purple-900 focus:text-white placeholder:italic' autoComplete="off" type="text" placeholder="MyProjectName" {...field} />
                    
                     
                     {meta.touched && meta.error && (
                     <div className="error  text-red-400 italic ">{ <span className='bg-red-900 pl-2 pr-4 text-2xl'>{meta.error}</span>}</div>
                     )}
                 </div>
                 )}</Field>
       </div>


       <div className='flex justify-between  gap-10 '>
             <label htmlFor="name" className="w-64 ">Full Name:</label>
                     <Field name="name" type="text" autoComplete="off">{({
                 field, // { name, value, onChange, onBlur }
                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                 meta,
                 }) => (
                 <div className=' w-full flex flex-col'>
                     <input className=' bg-clear text-5xl placeholder:5xl border-transparent focus:border-transparent focus:ring-0 rounded-sm pl-6 focus:placeholder:opacity-0 focus:bg-green-900 duration-200 focus:duration-200 outline-none w-full h-24 text-purple-900  focus:text-white placeholder:italic' autoComplete="off" type="text" placeholder="John Doe" {...field} />
                     <hr className="-mt-2 border-green-900 border-2 "/>
                     
                     {meta.touched && meta.error && (
                     <div className="error  text-red-400 italic ">{ <span className='bg-red-900 pl-2 pr-4 text-2xl'>{meta.error}</span>}</div>
                     )}
                 </div>
                 )}</Field>
       </div>

       <div className='flex justify-between  gap-10'>
             <label htmlFor="email" className="w-64 ">Contact Email:</label>
                     <Field name="email" type="email" autoComplete="off">{({
                 field, // { name, value, onChange, onBlur }
                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                 meta,
                 }) => (
                 <div className=' w-full flex flex-col'>
                     <input className='bg-clear text-5xl placeholder:5xl border-transparent focus:border-transparent focus:ring-0 rounded-sm pl-6 focus:placeholder:opacity-0 focus:bg-green-900 duration-200 focus:duration-200 outline-none w-full h-24 text-purple-900 focus:text-white placeholder:italic' autoComplete="off" type="text" placeholder="john@example.com" {...field} />
                     <hr className="-mt-2 border-green-900 border-2 "/>
                     
                     {meta.touched && meta.error && (
                     <div className="error  text-red-400 italic ">{ <span className='bg-red-900 pl-2 pr-4 text-2xl'>{meta.error}</span>}</div>
                     )}
                 </div>
                 )}</Field>
       </div>

       <div className='flex justify-between  gap-10'>
             <label htmlFor="name" className="w-64 ">Job <br/> Title:</label>
                     <Field name="job" type="text" autoComplete="off">{({
                 field, // { name, value, onChange, onBlur }
                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                 meta,
                 }) => (
                 <div className=' w-full flex flex-col'>
                     <input className='bg-clear text-5xl placeholder:5xl border-transparent focus:border-transparent focus:ring-0 rounded-sm pl-6 focus:placeholder:opacity-0 focus:bg-green-900 duration-200 focus:duration-200 outline-none w-full h-24 text-purple-900 focus:text-white placeholder:italic' autoComplete="off" type="text" placeholder="Software Developer" {...field} />
                     <hr className="-mt-2 border-green-900 border-2 "/>
                     
                     {meta.touched && meta.error && (
                     <div className="error  text-red-400 italic ">{ <span className='bg-red-900 pl-2 pr-4 text-2xl'>{meta.error}</span>}</div>
                     )}
                 </div>
                 )}</Field>
       </div>

       <div className='flex justify-between  gap-10'>
             <label htmlFor="description" className="w-64 "> Describe yourself:</label>
                     <Field name="description" type="text" autoComplete="off">{({
                 field, // { name, value, onChange, onBlur }
                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                 meta,
                 }) => (
                 <div className=' w-full flex flex-col'>
                     <input className='bg-clear text-3xl placeholder:text-3xl border-transparent focus:border-transparent focus:ring-0 rounded-sm pl-6 focus:placeholder:opacity-0 focus:bg-green-900 duration-200 focus:duration-200 outline-none w-full h-24 text-purple-900 focus:text-white placeholder:italic' autoComplete="off" type="text" placeholder="A 19-year old software engineer who loves to tinker!" {...field} />
                     <hr className="-mt-2 border-green-900 border-2 "/>
                     
                     {meta.touched && meta.error && (
                     <div className="error  text-red-400 italic ">{ <span className='bg-red-900 pl-2 pr-4 text-2xl'>{meta.error}</span>}</div>
                     )}
                 </div>
                 )}</Field>
       </div>

       <div className='flex justify-between  gap-10'>
             <label htmlFor="name" className="w-64 ">Hobbies <br/> <span className="text-3xl">(comma seperated):</span>  </label>
                     <Field name="hobbies" type="text" autoComplete="off">{({
                 field, // { name, value, onChange, onBlur }
                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                 meta,
                 }) => (
                 <div className=' w-full flex flex-col'>
                     <input className='bg-clear text-5xl placeholder:5xl border-transparent focus:border-transparent focus:ring-0 rounded-sm pl-6 focus:placeholder:opacity-0 focus:bg-green-900 duration-200 focus:duration-200 outline-none w-full h-24 text-purple-900 focus:text-white placeholder:italic' autoComplete="off" type="text" placeholder="Hiking, Reading, Water Polo" {...field} />
                     <hr className="-mt-2 border-green-900 border-2 "/>
                     
                     {meta.touched && meta.error && (
                     <div className="error  text-red-400 italic ">{ <span className='bg-red-900 pl-2 pr-4 text-2xl'>{meta.error}</span>}</div>
                     )}
                 </div>
                 )}</Field>
       </div>

       <div className='flex justify-between  gap-10'>
             <label htmlFor="name" className="w-64 ">Skills <br/>  <span className="text-3xl">(comma seperated):</span> </label>
                     <Field name="skills" type="text" autoComplete="off">{({
                 field, // { name, value, onChange, onBlur }
                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                 meta,
                 }) => (
                 <div className=' w-full flex flex-col'>
                     <input className='bg-clear text-5xl placeholder:5xl border-transparent focus:border-transparent focus:ring-0 rounded-sm pl-6 focus:placeholder:opacity-0 focus:bg-green-900 duration-200 focus:duration-200 outline-none w-full h-24 text-purple-900 focus:text-white placeholder:italic' autoComplete="off" type="text" placeholder="ReactJS, C++, TailwindCSS" {...field} />
                     <hr className="-mt-2 border-green-900 border-2 "/>
                     
                     {meta.touched && meta.error && (
                     <div className="error  text-red-400 italic ">{ <span className='bg-red-900 pl-2 pr-4 text-2xl'>{meta.error}</span>}</div>
                     )}
                 </div>
                 )}</Field>
       </div>

       <div className='flex justify-between  gap-10'>
             <label htmlFor="name" className="w-64 ">Style: </label>
                     <Field name="style" type="text" autoComplete="off">{({
                 field, // { name, value, onChange, onBlur }
                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                 meta,
                 }) => (
                 <div className=' w-full flex flex-col'>
                     <input className='bg-clear text-5xl placeholder:5xl border-transparent focus:border-transparent focus:ring-0 rounded-sm pl-6 focus:placeholder:opacity-0 focus:bg-green-900 duration-200 focus:duration-200 outline-none w-full h-24 text-purple-900 focus:text-white placeholder:italic' autoComplete="off" type="text" placeholder="Formal" {...field} />
                     <hr className="-mt-2 border-green-900 border-2 "/>
                     
                     {meta.touched && meta.error && (
                     <div className="error  text-red-400 italic ">{ <span className='bg-red-900 pl-2 pr-4 text-2xl'>{meta.error}</span>}</div>
                     )}
                 </div>
                 )}</Field>
       </div>

       

         <div className="flex justify-between gap-10">
             <div className="w-64 ">
                     Projects to be included:
             </div>
             <div className="flex  flex-wrap gap-4">
             {projects.map((val, index:number) => {
                 return (
                 <div key={index} className="w-1/3 border-4 bg-slate-100 border-green-900 rounded-sm flex-grow">
                     <div className='flex items-center py-4 p-2 justify-start gap-8'>
                         
                                 <Field name="selectedProjects"  type="checkbox" value={index.toString()}>{({
                             field, // { name, value, onChange, onBlur }
                             form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                             meta,
                             }) => (
                             <div className='h-full  flex items-center'>
                                 <input
                                 style={{boxShadow: 'none'}}
                                     type="checkbox"
                                     className="h-8 w-8 hover:cursor-pointer border-none focus:shadow-none  focus:ring-transparent ring-transparent ring-offset-0 bg-green-900 text-green-500 focus:ring-0 border-transparent focus:border-transparent focus:border-none "
                                     {...field}/>
                                 </div>
                             )}</Field>
                                     
                                     <div className='text-3xl'>
                                         {val.name}
                                     </div>
                     </div>
                    
                 </div>
                 )
                 
             })}
             </div>
             
         </div>



         <div className='flex justify-between  gap-10'>
             <label htmlFor="instagramUrl" className="w-64 ">Insta url<span className="text-3xl"> (optional):</span></label>
                     <Field name="instagramUrl" type="text" autoComplete="off">{({
                 field, // { name, value, onChange, onBlur }
                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                 meta,
                 }) => (
                 <div className=' w-full flex flex-col'>
                     <input className='bg-clear text-5xl placeholder:5xl border-transparent focus:border-transparent focus:ring-0 rounded-sm pl-6 focus:placeholder:opacity-0 focus:bg-green-900 duration-200 focus:duration-200 outline-none w-full h-24 text-purple-900 focus:text-white placeholder:italic' autoComplete="off" type="text" placeholder="https://instagram.com/xyz" {...field} />
                     <hr className="-mt-2 border-green-900 border-2 "/>
                     
                     {meta.touched && meta.error && (
                     <div className="error  text-red-400 italic ">{ <span className='bg-red-900 pl-2 pr-4 text-2xl'>{meta.error}</span>}</div>
                     )}
                 </div>
                 )}</Field>
       </div>

       <div className='flex justify-between  gap-10'>
             <label htmlFor="twitterUrl" className="w-64 ">Twitter url<span className="text-3xl"> (optional):</span></label>
                     <Field name="twitterUrl" type="text" autoComplete="off">{({
                 field, // { name, value, onChange, onBlur }
                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                 meta,
                 }) => (
                 <div className=' w-full flex flex-col'>
                     <input className='bg-clear text-5xl placeholder:5xl border-transparent focus:border-transparent focus:ring-0 rounded-sm pl-6 focus:placeholder:opacity-0 focus:bg-green-900 duration-200 focus:duration-200 outline-none w-full h-24 text-purple-900 focus:text-white placeholder:italic' autoComplete="off" type="text" placeholder="https://twitter.com/xyz" {...field} />
                     <hr className="-mt-2 border-green-900 border-2 "/>
                     
                     {meta.touched && meta.error && (
                     <div className="error  text-red-400 italic ">{ <span className='bg-red-900 pl-2 pr-4 text-2xl'>{meta.error}</span>}</div>
                     )}
                 </div>
                 )}</Field>
       </div>

         
     
     
             


          

          <div className=' my-10 w-36 text-center self-center '>
          <button type="submit" className="hover:bg-green-400 p-4  rounded-sm py-3 text-3xl hover:scale-110 active:scale-90 duration-200"><span>Submit</span></button>
      
          </div>
       
         </div>
         
         
          </Form>
         } 
         
         
        </Formik>

            </div>

        </div>
        
        </>
        
       
      );

  }
  