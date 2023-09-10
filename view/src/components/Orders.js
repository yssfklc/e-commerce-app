import React, { useEffect, useState } from 'react'
import './Order.css';
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
    getUser();
    if(!isLogin){
      return navigate('/login');
    }else{

      getOrders()
    }
  }, [isLogin])
  return (
    <>
    <div className='order-component order-flex-center'>  
      <h2>My Orders</h2>
    </div>
    <hr/>
    {orders.map((item)=>{
      return(
        <div className='order-container'>
          <Link to={`${item.id}`}>
            <div className='order-component '>
              <div className='order-element order-flex-space-evenly'>
                <div className='order-name order-flex-center'>
                  <img src='https://picsum.photos/200'/>
                  {/* <h3> {(item.order_date)}</h3> */}
                </div>
                <div className='order-date order-flex-center'>
                  <span>{formatDate(item)}</span>
                </div>
                <div className='order-price order-flex-center'>
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