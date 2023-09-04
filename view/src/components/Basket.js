import React, { useEffect, useState } from 'react';
import './Home.css';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {selectAllBasket, removeFromBasket, selectBasketPrice} from '../features/addBasketSlice';
import { useNavigate } from 'react-router-dom';



function Basket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basket = useSelector(selectAllBasket);
  const totalPrice=useSelector(selectBasketPrice);
  const date = new Date().toDateString()
  console.log(date);

  const removeElement=((e)=>{
    e.preventDefault();
    basket.map((item)=>{
      if(item.id==e.target.value){
        dispatch(removeFromBasket(item))
      }});
  })
  const createOrder =((e)=>{
    e.preventDefault();
    const product_id = (basket.map(item=>item.id));
    const order_obj={
      user_id:1,
      product_id:product_id,
      date:date,
      price:totalPrice
    }
    const createOrder=async(order_obj)=>{
      try{
        const response = await fetch('http://localhost:8000/orders',{
          method:'POST',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(order_obj),
        });
        if(response.ok){
          const data=await response.json();
          navigate('/orders');
        }
      }catch(err){
        console.log(err)
      }
    }
    createOrder(order_obj);
  })
  
  
 
  
  
  useEffect( ()=>{
    
    
  }, [])
  
  return (
    <div className='my-list-container'>
          <h2>Basket List</h2> 
          
          <div className='my-list'>
          { basket.map((item)=>{
           return (<div className='card' >
               <img src="https://picsum.photos/200"/>
               <div className='flex-space-evenly'>
                <h2>{item.name}</h2>
                <span>${item.price}</span>
               </div>
              <p>{item.description}</p>
              <button type='submit' value={item.id} onClick={(e)=>removeElement(e)} >Remove From Basket</button>
            </div>)
          })}
          </div>
          <button type='submit' className='btn-1' onClick={(e)=>createOrder(e)} >Create Order</button>
          <span>Total price : {totalPrice}</span>
    </div>
  )
}

export default Basket;