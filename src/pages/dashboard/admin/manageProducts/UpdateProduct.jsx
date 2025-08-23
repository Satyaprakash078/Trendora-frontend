import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductBySlugQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi';
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import SellectInput from '../addProduct/SellectInput';
import UploadImage from '../addProduct/UploadImage';

const categories =[
    {label:'Select Category',value:''},
    {label:'Accessories',value:'accessories'},
    {label:'Dress',value:'dress'},
    {label:'Jewellery',value:'jewellery'},
    {label:'Cosmetics',value:'cosmetics'},
    {label:'Skin',value:'skin-care'},
]

const colors=[
{label:'Select Color',value:''},
{label:'Red',value:'red'},
{label:'Blue',value:'blue'},
{label:'Green',value:'green'},
{label:'Yellow',value:'yellow'},
{label:'White',value:'purple'},
{label:'Black',value:'black'},
{label:'Gold',value:'gold'},

]

const UpdateProduct = () => {
    const navigate=useNavigate();
    const {slug}= useParams();
    const {user}= useSelector((state)=> state.auth);
    const [newImage,setNewImage]=useState(null);
     const [product,setProduct]= useState({
            name:'',
            category:'',
            color:'',
            price:'',
            description:'', 
            image:''
        })
    const {data:productData,isLoading:prodcutLoading,error}= useGetProductBySlugQuery(slug);
    const {name,category,color,description,price,image:imageUrl}= productData?.product || {}
    const [updateProduct,{isLoading:isUpdating,error:updateError}]= useUpdateProductMutation();
     console.log(updateError)
    useEffect(()=>{
        if(productData){
            setProduct({
                name:name ||'',
                category:category ||'',
                color:color ||'',
                price:price ||'',
                description:description ||'',
                image:imageUrl || ''

            })
        }
    },[productData])

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setProduct({
           ...product,
           [name]:value
        })
   };
   //handle image chnge
   const handleImageChnage=(img)=>{
      setNewImage(img)
   }

   const handleSubmit=async (e)=>{
        e.preventDefault();
        const updatedData= {
            ...product,
            image:newImage ? newImage:product.image,
            author:user?._id
        }
        console.log("Updated Data:", updatedData);

        try {
             await updateProduct({id: productData?.product?._id,...updatedData}).unwrap();
             alert('Product updated successfully!')
             navigate('/dashboard/manage-products')
        } catch (error) {
            console.log("Failed to update the product",error)
        }
   }
      if(prodcutLoading) return <div>Loading...</div>
      if(error) return <div>Error in fetching product</div>
      if(updateError) return <div>Error updating product</div>
    console.log(productData.product)
  return (
    <div className='container mx-auto '>
        <h2 className='text-xl mb-5'>Update Product</h2>
        <form 
        onSubmit={handleSubmit} className='space-y-4'>
              <TextInput
                label="Product Name"
                name="name"
                value ={product.name}
                onChange={handleChange}
                type="text"
                placeholder={product.name}
            />
            {/* product category */}
            <SellectInput
                label="Category"
                name="category"
                value ={product.category}
                onChange={handleChange}
                options={categories}
            />
            {/* product colour */}
            <SellectInput
                label="Color"
                name="color"
                value ={product.color}
                onChange={handleChange}
                options={colors}
            />
            {/* product price */}
             <TextInput
                label="Price"
                name="price"
                value ={product.price}
                onChange={handleChange}
                type="number"
                placeholder='50'
            />
            {/* product image */}
            <UploadImage
                name='name'
                id='image'
                value ={newImage || product.image}
                placeholder="Upload image"
                setImage={handleImageChnage}
            />

            {/* for description */}
            <div>
                <label htmlFor='description' className='block text-sm font-medium
                text-gray-700'>Description</label>
                <textarea name='description' id='description'
                className='add-product-InputCSS'
                value={product.description}
                onChange={handleChange}
                placeholder='write a product description'></textarea>
            </div>

            {/* update button */}
            <div>
                <button type='submit'  className='add-product-btn'>
                 {isUpdating ? 'Updating...':'Update Product'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default UpdateProduct