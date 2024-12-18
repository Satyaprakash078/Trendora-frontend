import React from 'react'

const SellectInput = ({ label, name, value, onChange, options }) => {
    return (
        <div>
            <label htmlFor={name} className='block text-sm font-medium
        text-gray-700'>{label}</label>
            <select name={name} id={name}
                value={value}
                onChange={onChange}
                className='add-product-InputCSS'>
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default SellectInput