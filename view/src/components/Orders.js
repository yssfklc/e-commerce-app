import React, { useEffect, useState } from 'react'
import './Order.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { isLoggedin } from "../features/sessionSlice";
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [orders, setOrders]=useState([]);
  const isLogin=useSelector(isLoggedin);
  const navigate = useNavigate();

  if(!isLogin){
    navigate('/login');
  }
  //Get orders
  const getOrders=async()=>{
    try{
      const response = await fetch('http://localhost:8000/orders');
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
    getOrders()
  }, [])
  return (
    <>
    <div className='order-component flex-center'>  
      <h2>My Orders</h2>
    </div>
    <hr/>
    {orders.map((item)=>{
      return(
        <div className='order-container'>
          <Link to={`${item.id}`}>
            <div className='order-component '>
              <div className='order-element flex-space-evenly'>
                <div className='order-name flex-center'>
                  <img src='https://picsum.photos/200'/>
                  {/* <h3> {(item.order_date)}</h3> */}
                </div>
                <div className='order-date flex-center'>
                  <span>{formatDate(item)}</span>
                </div>
                <div className='order-price flex-center'>
                  <span>Price : <strong>$ {item.total_price}</strong></span>
                </div>
              </div>
            </div>
          </Link>
        </div>
    )
    })}
    
    </>
  )
}

export default Orders