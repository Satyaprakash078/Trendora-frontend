import React, { useEffect, useState } from 'react'
import { getBaseURL } from '../utils/baseUrl';
import { data } from 'react-router-dom';
import TimelineSteps from './TimelineSteps';

export const PaymentSuccess = () => {
    const [order,setOrder] = useState(null);
    
    useEffect(()=>{
        const query= new URLSearchParams(window.location.search);
        const sessionId= query.get('session_id');
        if(sessionId){
            fetch(`${getBaseURL()}/api/orders/confirm-payment`,{
                method: "POST",
                headers:{
                    "Content-Type": 'application/json'
                },
                body:JSON.stringify({session_id: sessionId})
            })
            .then((res)=>res.json())
            .then((data)=>{console.log("Fetched order data:", data.order); 
                setOrder(data.order)})
            .catch((err)=>console.log("Error confirming payment",err))
        }
   },[])
     
   if(!order) {return <div>Loading...</div>}
    
   const isCompleted =(status)=>{
     const statuses= ['pending','processing','shipped','completed'];
     const result = statuses.indexOf(status) < statuses.indexOf(order.status);
    console.log(`Is Completed for ${status}:`, result);
    return result;
   }
   const isCurrent = (status)=> order.status === status;

   const steps =[
    {
        status: 'pending',
        label: 'Pending',
        description: 'Your order has been created and is awaiting processing.',
        icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
      },
      {
        status: 'processing',
        label: 'Processing',
        description: 'Your order is currently being processed.',
        icon: { iconName: 'loader-line', bgColor: 'yellow-800', textColor: 'yellow-800' },
      },
      {
        status: 'shipped',
        label: 'Shipped',
        description: 'Your order has been shipped.',
        icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-800' },
      },
      {
        status: 'completed',
        label: 'Completed',
        description: 'Your order has been successfully completed.',
        icon: { iconName: 'check-line', bgColor: 'green-600', textColor: 'green-900' },
      },
   ];


  return (
     <section className='section__container rounded p-6'>
        <h2 className='text-xl font-medium mb-4'>Payment {order?.status}</h2>
        <p className='mb-4'>Order Id: {order?.OrderId}</p>
        <p className='mb-8'>Status : {order?.status}</p>

        <ol className='sm:flex items-center relative'>
            {
                steps.map((step,index)=>(
                    <TimelineSteps
                    key={index}
                    step={step}
                    order={order}
                    isCompleted={isCompleted(step.status)}
                    isCurrent={isCurrent(step.status)}
                    isLastStep= {index=== steps.length-1}
                    icon={step.icon}
                    description={step.description}      
                    />
                ))
            }
        </ol>
     </section>
  )
}
