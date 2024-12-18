import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TextInput from './TextInput'
import SellectInput from './SellectInput'
import UploadImage from './UploadImage'
import { useAddProductMutation } from '../../../../redux/features/products/productsApi'
 
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

const filters={
    categories:['all','accessories','dress','jewellery','cosmetics'],
    colors:['all','red','green','yellow','blue','gold','white','black'],
    priceRanges:[
        {label: 'Under $50',min:0, max:50},
        {label: 'Under $50-$100',min:50, max:100},
        {label: 'Under $100-$200',min:100,max:200},
        {label: 'Under $200 & Above',min:200,max:Infinity},
    ]
}
const AddProduct = () => {

    const {user} =useSelector((state)=>state.auth); 
    const [product,setProduct]= useState({
        name:'',
        category:'',
        color:'',
        price:'',
        description:'', 
    })
    const [addProduct,{error,isLoading}]= useAddProductMutation()
    const [image,setImage] =useState('');

    const handleChange=(e)=>{
         const {name,value} = e.target;
         setProduct({
            ...product,
            [name]:value
         })
    };
    const navigate= useNavigate();

    const handleSubmit=async (e)=>{
       e.preventDefault();
       if(!product.name || !product.category || !product.color || !product.price || !product.description){
        alert('Please fill all the fields');
        return;
       }

       try {
         const newProduct= await addProduct({...product,image,author:user?._id}).unwrap();
         alert('Product Added Successfully');
          setProduct({name:'',category:'',color:'',price:'',description:''});
          setImage('');
          navigate('/shop');
       } catch (error) {
        console.log("Failed to  submit the product",error)
       }
    }
  return (
    <div className='responsive-container mx-auto mt-8 '>
        <h2 className='tetx-xl font-bold mb-6 '>Add a New Product</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            {/* product name */}
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
                value ={e=>setImage(e.target.value)}
                placeholder="Upload image"
                setImage={setImage}
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

            {/* submit button */}
            <div>
                <button type='submit'  className='add-product-btn'>
                    Add Product
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct