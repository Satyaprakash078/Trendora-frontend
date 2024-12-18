import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartModal from '../pages/shop/CartModal'
import avatarImg from '../assets/avatar.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi'
import { logout } from '../redux/features/auth/authSlice'

const Navbar = () => {
  const products=useSelector((state)=>state.cart.products)
  const[iscartOpen,setIscartOpen]=useState(false);

  const handleCartToggle=()=>{
    setIscartOpen(!iscartOpen);
  }

  //show user if logged in
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const {user}=useSelector((state)=>state.auth);

   //dropdown menus
    const [isDropDownOpen,setIsDropDownOpen]=useState(false);

    const handleDropDownToggle=()=>{
      setIsDropDownOpen(!isDropDownOpen);
    }
    //admin dropdown menus
    const adminDropDownMenus=[
      {label:'Dashboard',path:'/dashboard/admin'},
      {label:'Manage Orders',path:'/dashboard/manage-orders'},
      {label:'Manage Products',path:'/dashboard/manage-products'},
      {label:'Add New Product',path:'/dashboard/add-new-product'},
    ]

    //user dropdown menus
    const userDropDownMenus=[
      {label:'Dashboard',path:'/dashboard'},
      {label:'Profile',path:'/dashboard/profile'},
      {label:'orders',path:'/dashboard/orders'},
      {label:'Payments',path:'/dashboard/payments'}
    ]

    const dropDownMenus= user?.role === 'admin' ? [...adminDropDownMenus]:[...userDropDownMenus]

    //handle logout
    const [logoutUser]=useLogoutUserMutation();
    const handleLogout=async ()=>{
       try {
         await logoutUser().unwrap();
         dispatch(logout());
         navigate('/')
       } catch (error) {
        console.log("Failed to log out",error)
       }
    }
  return (
      <header className='fixed-nav-bar w-nav'>
        <nav className='max-w-screen-xl mx-auto px-4 justify-between items-center'>
            <ul className='nav__links'>
                <li className='link'><Link to='/'>Home</Link></li>
                <li className='link'><Link to='/shop'>Shop</Link></li>
                <li className='link'><Link to='/'>Pages</Link></li>
                <li className='link'><Link to='/contact'>Contact</Link></li>
            </ul>
            {/* app Name logo */}
            <div className='nav__logo'>
              <Link to='/'>Trendora</Link>
            </div>
            {/* nav icons */}
            <div className='nav__icons relative'>
              {/* search icon */}
                <span>
                   <Link to='/search'>
                      <i className="ri-search-line"></i>
                   </Link>
                </span>
                {/* cart icon */}
                <span>
                   <button onClick={handleCartToggle} className='hover:text-primary'>
                       <i className="ri-shopping-bag-line"></i>
                      <sup className='text-sm inline-block px-1.5 text-white rounded-full
                      bg-red-800 text-center'>{products.length}</sup>
                   </button>
                </span>
                {/* profile icon */}
                <span>
                  {
                    user && user ? (<>
                     <img onClick={handleDropDownToggle}
                     src={user?.profileImage || avatarImg } alt=""  className='size-6
                     rounded-full cursor-pointer'/>
                     {
                      isDropDownOpen && (
                        <div className='absolute right-0 mt-3  p-1  w-40 bg-white 
                        border border-gray-200 rounded-lg shadow-lg z-50'>
                           <ul className='font-medium space-y-2 p-2'>
                              {dropDownMenus.map((menu,index)=>(
                                <li key={index}>
                                    <Link onClick={()=>setIsDropDownOpen(false)}
                                    className="dropdown-items" to={menu.path}>{menu.label}</Link>
                                </li>
                              ))}
                              <li><Link onClick={handleLogout}
                                 className="dropdown-items">Logout</Link>
                              </li>
                           </ul>
                        </div>
                      )
                     }
                    
                    </>):( <Link to='login'>
                      <i className="ri-user-line"></i>
                    </Link>)
                  }
                  
                </span>
            </div>
        </nav>

        {/* showing the cart portion */}
        { iscartOpen && <CartModal products={products} isOpen={iscartOpen} onClose={handleCartToggle}/>}
      </header>
  )
}

export default Navbar