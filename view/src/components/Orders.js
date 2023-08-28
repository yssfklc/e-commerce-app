import React, { useEffect, useState } from 'react'
import './Order.css';
function Orders() {
  const [orders, setOrders]=useState([]);

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
            <div className='order-component '>
              <div className='order-element flex-space-evenly'>
                <div className='order-name flex-center'>
                  <img src='https://picsum.photos/200'/>
                  <h3> My First Order</h3>
                </div>
                <div className='order-date flex-center'>
                  <span>22.09.1998</span>
                </div>
                <div className='order-price flex-center'>
                  <span>Price : <strong>$ 255.43</strong></span>
                </div>
              </div>
            </div>
        </div>
    )
    })}
    
    </>
  )
}

export default Orders