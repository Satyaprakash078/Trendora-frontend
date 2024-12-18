import React from 'react'

const TimelineSteps = ({step,order,isCompleted,isCurrent,isLastStep,icon,description}) => {
    const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColor}` : 'bg-gray-200';
    const iconTextColor = isCompleted || isCurrent ? 'text-white' : `text-${icon.textColor}`;
    const connectorColor = isCompleted ? 'bg-blue-500' : 'bg-gray-200';
    const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
    const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';

    // console.log(icon)
    return (
    <li className='relative mb-6 sm:mb-0 sm:pl-10'>
        <div className='flex items-center'>
            <div className={`z-10 flex items-center justify-center w-7 h-6 ${step?.status === 'completed' ? 'bg-green-600 text-green-200' :
             step?.status === 'pending' ? 'bg-red-600 text-red-200' : step?.status === 'processing' ? 
             'bg-blue-600 text-blue-100': 'bg-indigo-900 text-indigo-100'}
            ${iconTextColor} rounded-full ring-0 ring-white shrink-0`}>
                 <i className={`ri-${icon.iconName} text-xl`}></i>
            </div>
            {! isLastStep && (<div className={`hidden sm:flex w-full h-0.5
                ${connectorColor}`}> </div>)}
        </div>  
        <div className='mt-3 sm:pe-8'>
              <h3 className={`font-medium text-base ${labelTextColor}`}>{step.label}</h3>
              <time className='block mb-2 text-sm font-normal leading-2  text-gray-500'>
                {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Time'}</time>
              <p className={`text-base font-normal ${descriptionTextColor}`}>{description}</p>
        </div>
    </li>
  )
}

export default TimelineSteps