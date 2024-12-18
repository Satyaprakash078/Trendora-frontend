
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'

const navItems =[
    {path:'/dashboard/admin',label: 'Dashboard'},
    {path:'/dashboard/add-new-product',label: 'Add new Product'},
    {path:'/dashboard/manage-products',label: 'Manage Products'},
    {path:'/dashboard/users',label: 'Users'},
    {path:'/dashboard/manage-orders',label: 'Manage Orders'}
]
const AdminDashboard = () => {
    const [logoutUser]= useLogoutUserMutation();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogout=async()=>{
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            alert('logged out successfully')
            navigate('/')
        } catch (error) {
            
        }console.log("Failed to logout",error)
    }
  return (
    <div className='space-y-5 bg-white p-5 md:h-screen flex flex-col
    justify-between'>
        <div>
            <div className='nav__logo'>
                <Link to='/'>Trendora <span>.</span></Link>
                <p className='text-xs italic'>Admin dashboard</p>
            </div>
            <hr className='mt-3 border-4'/>
            <ul className='space-y-4 p-5 border shadow-md'>
                {
                    navItems.map((item, index) => (
                        <li key={index} >
                            <NavLink className={
                            ({isActive})=>isActive ?'text-blue-600 font-bold' :'text-black'} 
                            end
                            to={item.path}>{item.label}</NavLink>
                        </li>
                    ))
                }
            </ul>
            <div className='mb-3'>
             <hr className='mb-5' />
             <button   onClick={handleLogout}
              className='text-white bg-red-500 font-medium px-4 py-1 rounded-sm '>
              Logout

             </button>
        </div>
        </div>
        
        {/* logout */}
        
    </div>
  )
}

export default AdminDashboard