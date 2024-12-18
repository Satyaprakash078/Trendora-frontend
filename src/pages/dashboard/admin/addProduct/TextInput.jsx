import React from 'react'

const TextInput = ({label,name,value,onChange, type="text" ,placeholder}) => {
  return (
    <div>
        <label htmlFor={name} className='block text-sm font-medium
        text-gray-700'>{label}</label>
        <input type={type} name={name}  placeholder={placeholder} value={value}
        onChange={onChange} className='add-product-InputCSS'/>
    </div>
  )
}

export default TextInput