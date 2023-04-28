"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { SetStateAction, createContext, useRef, useState } from 'react';
import { DownloadOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Space, } from 'antd';
import axios from "axios"
import pica from 'pica';
import Compressor from 'compressorjs';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [image, setImage] = useState(null);
  const [fileData, setFileData] = useState<string | ArrayBuffer | null>(null)
  const [fileName, setFileName] = useState("")
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = useRef<any>(null);

  function handleClick() {
    hiddenFileInput!.current!.click()
  }

  function handleFileUpload(event: any) {
    const MAX_SIZE = 5 * 1024 * 1024;
    const file = event.target.files[0];
    if (file.size > MAX_SIZE) {
      alert("File size exceeds 5 megabytes")
    return;
  }

  const extension = file.name.split(".")[1];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];

  if (imageExtensions.includes(extension.toLowerCase())) {
    new Compressor(file, {
      quality: 0.1,
      maxHeight: 400,
      maxWidth: 400,
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.  
        const reader = new FileReader();
    reader.readAsDataURL(compressedResult);
    reader.onloadend = () => {
        setImage(reader.result as SetStateAction<null>);
      setFileData(reader.result)
      setFileName(file.name);
      console.log(reader.result)
  }      
      },
    });
  } else {
    alert("File is not a image")
  }
   
}

async function handleFileOptimization() {
  try {
    const extension = fileName.split(".")[1];
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
    if (imageExtensions.includes(extension.toLowerCase())) {
      setLoading(true);
      const response = await axios.post('https://image-optimization-api.vercel.app/optimize', { image: fileData })
    .then((image) => {
      console.log('Optimized image:', image.data);
      setImage(image.data)
      setLoading(false);
    //alert(image.data);
    }).catch((err) => {
      alert("There was an error, please try again.")
      setLoading(false);
    });
    } else {
      alert("File is not a image")
    }
    
  } catch (error) {
    alert(error);
  }
}


  return (
    <main className='box-border w-screen h-screen p-0 bg-gray-950'>
      <h1 className='p-2 text-4xl font-bold text-center text-blue-700'>Image Optimizer</h1>
      <Button onClick={() => handleClick()} className='flex items-center justify-center m-auto mt-4 mb-4 bg-blue-500' type="primary" icon={<DownloadOutlined />} size={'large'}>
            Upload Image
          </Button>
          <h2 className='text-base font-bold text-center text-white'>{fileName}</h2>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileUpload}
        className='hidden'
      />
    <div className='flex justify-center'>
      <div className='flex justify-center items-center w-[30%] min-w-[250px] max-w-[400px] h-[350px] bg-slate-200 rounded-3xl flex-col'>
      {
        loading ? 
        <div className="custom-loader"></div>
        :
        image != null ?
        <>
        {image && <img className='w-[70%] h-[70%] object-contain rounded-3xl m-2' src={image} alt="Selected file" />}
      <div>
      <button onClick={() => handleFileOptimization()} className='px-4 py-2 mr-2 text-white transition duration-75 ease-in bg-blue-500 rounded cursor-pointer hover:shadow-xl'>
        Optimize
      </button>
      <button onClick={() => {
        setImage(null)
        setFileData(null)
        setFileName("")
      }} className='px-4 py-2 text-white transition duration-75 ease-in bg-red-500 rounded cursor-pointer hover:shadow-xl'>
        Delete
      </button>
      </div>
      </>
      : 
      <>
      <div className='flex justify-center items-center w-[100%] h-[100%] flex-col'>
        <InboxOutlined className='text-blue-500 text-7xl' />
        <h2 >Choose a image file to optimize</h2>
      </div>
      </>
      }
    </div>
    </div>
    </main>
  )
}

