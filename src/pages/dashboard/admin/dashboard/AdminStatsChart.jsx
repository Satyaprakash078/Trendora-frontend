import React from 'react'
import {Pie,Line} from 'react-chartjs-2'
import 'chart.js/auto'

const AdminStatsChart = ({stats}) => {
    console.log(stats)
    const pieData={
        labels:['Total Orders', 'Total Products','Total Reviews','Total Users'],
        datasets: [
            {
                label: 'Admin Statsss',
                data: [stats?.totalOrders, stats?.totalProducts, stats?.totalReviews, stats?.totalUsers],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4CAF50',
                    '#9966FF'
                ],
                hoverBackgrounfColor:[
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4CAF50',
                    '#9966FF'
                ]
            }
        ]
    }
    const data = new Array(12).fill(0);

    //map correct months
    stats?.formattedMonthlyEarnings.forEach((entry)=>{
        data[entry.month-1] = entry.earnings;
    })

    const lineData= {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','July','Aug','Sept',
            'Oct','Nov','Dec'
        ],
        datasets: [
            {
                label: 'Monthly Earnings',
                data: data,
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                tension: 0.1
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false
    }
  return (
    <div className='mt-11 space-y-11'>
         <h2 className='text-xl font-semibold mb-4'>Admin Stats Overview</h2>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* pie chart */}
            <div className='max-h-96 md:h-80 w-full'>
                <Pie data= {pieData} options={options}/>
            </div>
            {/* line chart */}
            <div className='max-h-96 md:h-80 w-full'>
                <Line data= {lineData} options={options}/>
            </div>
         </div>
    </div>
  )
}

export default AdminStatsChart