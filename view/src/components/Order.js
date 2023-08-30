import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

export default function Order() {
const {orderId} = useParams();
const [product, setProduct]= useState([]);

const getOrdersById = async(orderId)=>{
    try{
        const response = await fetch('http://localhost:8000/ordersbyid',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                id: orderId
            })
        }
        )
        if(response.ok){
            const data = await response.json();
            setProduct(data);
            console.log(data);
        }
    }catch(error){
        console.log(error);
    }
}

useEffect(()=>{
    getOrdersById(orderId)
}, [])
  return (
    <div>
        <div className='my-list-container'>
          <h2>Order Details</h2>      
          <div className='my-list'>
          { product.map((item)=>{
           return (<div className='card' >
               <img src="https://picsum.photos/200"/>
               <div className='flex-space-evenly'>
                <h2>{item.name}</h2>
                <span>${item.price}</span>
               </div>
              <p>{item.description}</p>
            </div>)
          })}
          </div>
        </div>
    </div>
  )
}
