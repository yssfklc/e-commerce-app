import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { isLoggedin } from "../features/sessionSlice";
import { useNavigate } from 'react-router-dom';
import { getUser } from '../requests/requests';

function Orders() {
  const [orders, setOrders]=useState([]);
  const isLogin=useSelector(isLoggedin);
  const navigate = useNavigate();

  
  
  //Get orders
  const getOrders=async()=>{
    try{
      const response = await fetch('/orders');
      if(response.ok){
        const data = await response.json();
        setOrders(data);
        console.log(orders);
      }
    }catch(error){
      console.log(error)
    }
  }
  //format Date
  const formatDate=(item)=>{
      const date = new Date(item.order_date).toDateString();
      return date
    
  }

  useEffect(()=>{
    getUser();
    if(!isLogin){
      return navigate('/login');
    }else{

      getOrders()
    }
  }, [isLogin])
  return (
    <div className='flex flex-col items-center justify-start min-h-screen'>
      <div className='w-3/4'>
        <div className=' border-b-2 mb-5'>  
          <h2 className='text-gray-100 text-4xl font-bold mr-10 mb-3'>My Orders</h2>         
        </div>
        
        <div className=''>
          {orders.map((item)=>{
            return(
              <div className=' '>
                <Link to={`${item.id}`}>
                  <div className='flex justify-center items-center'>
                    <div className='bg-gray-400 flex justify-between items-center mb-2 border-2 w-full border-indigo-500 rounded-lg'>
                      <div className='flex justify-center '>
                        <img src='https://picsum.photos/200' className='rounded-full w-16'/>
                        {/* <h3> {(item.order_date)}</h3> */}
                      </div>
                      <div className=''>
                        <span>{formatDate(item)}</span>
                      </div>
                      <div className=''>
                        <span>Price : <strong>$ {item.total_price}</strong></span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
          )
          })}
        </div>
      </div>
    
    </div>
  )
}

export default Orders