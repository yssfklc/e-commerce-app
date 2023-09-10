import React, { useEffect, useState } from 'react';
import './Home.css';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {selectAllBasket, removeFromBasket, selectBasketPrice, removeAllFromBasket} from '../features/addBasketSlice';
import { isLoggedin, selectCurrentUser} from '../features/sessionSlice';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import {Link} from 'react-router-dom';


function Basket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basket = useSelector(selectAllBasket);
  const totalPrice=useSelector(selectBasketPrice);
  const currentUserId=useSelector(selectCurrentUser);
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
      user_id:currentUserId.payload,
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
          dispatch(removeAllFromBasket());
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
           return (
            <div className='card'>
            <Link to={`../products/${item.id}`} className='product-link'>
            <div >
              <img src={item.image} />
              <div className='flex-space-evenly'>
                <div className='item-head'>
                  <h2>{item.name} <span>{item.description}</span></h2>
                  
                </div>
                  <span className='rating-span'>
                  <Rating name="read-only" value={item.avg_rating} readOnly className='rating'/>{item.num_voters}
                  </span>
                  <span className='price'>${item.price}</span>
              </div>
            </div>
              </Link>
          <button type='submit' value={item.id} onClick={(e)=>removeElement(e)} className='add-button'>Remove From Basket</button>
        </div>)
          })}
          </div>
          <button type='submit' className='btn-1' onClick={(e)=>createOrder(e)} >Create Order</button>
          <span>Total price : {totalPrice}</span>
    </div>
  )
}

export default Basket;