"use client"

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import Scrape from '../../scrape';


function FileUploader() {
    const [firstFile, setFirstFile] = useState(null); // State to store the first uploaded file
    
    const onDrop = (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        Scrape()
        setFirstFile(acceptedFiles[0]); // Get the first uploaded file
        //call ting?
        console.log(acceptedFiles[0].type)
        console.log(acceptedFiles[0])
      }
    };
    
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: true, // Allow multiple files to be uploaded
    });
  
    return (
      <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {firstFile && (
          <div>
            <h4>First Uploaded File:</h4>
            <p>File Name: {firstFile.name}</p>
            <p>File Size: {(firstFile.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
      </div>
    );
  }
  
  export default FileUploader;

// export default function uploadResume() {
//     let file = [];

//     const onDrop = useCallback(acceptedFile => {
//         console.log(acceptedFile);
//         file.add(acceptedFile);
//       }, []);
    

//         //on drop => run scraping, redirect to dash
//     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//     return (
//         <div 
//           {...getRootProps()} 
//           style={{
//             border: '2px dashed #007bff',
//             padding: '20px',
//             height: '200px',
//             textAlign: 'center',
//             cursor: 'pointer',
//             borderRadius: '5px',
//             backgroundColor: isDragActive ? '#e8f7ff' : '#f7f9fc'
//           }}
//         >
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <p>Drop the files here...</p>
//           ) : (
//             <p>Please upload your resume here.</p>
//           )}
//         </div>
//     );
// }; 