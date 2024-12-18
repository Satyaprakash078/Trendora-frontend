import React, { useState } from 'react'
import axios from 'axios'
import { getBaseURL } from '../../../../utils/baseUrl';

const UploadImage = ({name,setImage}) => {
    const [loading,setLoading] =useState(false);
    const [url,setUrl] = useState('');
  
    //reqst to upload a file
    const uploadSingleImg=(base64)=>{
        setLoading(true);
        axios.post(`${getBaseURL()}/uploadImage`,{image:base64})
        .then((response)=>{
            const imageUrl = response.data;
            setUrl(imageUrl);
            alert("Image uploaded successfully!")
            setImage(imageUrl)
        })
        .then(()=>setLoading(false))
        .catch((error)=>{"Error in uploading image",error})
        setLoading(false)
    }

    const uploadImage=async (e)=>{
        const files= e.target.files;

        if(files.length ===1){
            const base64= await convertBase64(files[0]);
            uploadSingleImg(base64);
            return;
        }
        const base64s = [];
        for (let i = 0; i < files.length; i++) {
            const base = await convertBase64(files[i]);
            base64s.push(base);
        }
    }

    //base64 functionlity
    const convertBase64=(file)=>{
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
  return (
    <div>
        <label htmlFor={name}>Upload Image</label>
        <input type="file" name={name}
        onChange={uploadImage}
        className='add-product-InputCSS' />
        {
            loading && (
                <div className='mt-2 text-sm text-blue-600'>
                    Product uploading...
                </div>
            )
        }
        {
            url && (
                <div className='mt-2 text-sm text-green-500'>
                    <p>Image uploaded successfully!</p>
                    <img src={url} alt="uploaded-image" />
                </div>
            )
        }
    </div>
  )
}

export default UploadImage