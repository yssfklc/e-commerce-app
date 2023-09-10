import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../features/addBasketSlice';
import './Product.css';

function Product() {
    const {productId} = useParams();
    const [product, setProduct]= useState([]);
    const dispatch = useDispatch();
    const navigate=useNavigate();
const getProductsById = async(productId)=>{
    try{
        const response = await fetch('http://localhost:8000/productsbyid',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                id: productId
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

const handleBasket=(e)=>{
    e.preventDefault();
    product.map(item=>{
      if(item.id==e.target.value){
        dispatch(addToBasket(item))
      }});

  }

useEffect(()=>{
    getProductsById(productId)
}, [])
  return (
    <div className=''>
      {product.map((item)=>{
        return(
        <div className='flex-center-column product-container'>
            <button className='go-back' onClick={() => navigate(-1)}>
                    Go Back
            </button>
            <div className='flex-left '>
                <div className='product-image'>
                    <img src={item.image}/>
                </div>
                <div className='product-details'>
                    <h2>{item.name}</h2>
                     <Rating name="read-only" value={item.avg_rating} readOnly />
                    <p>{item.long_description}</p>
                    <div className='flex-center'>
                        <div className='price-basket'>
                            <span className='price-1'>${item.price}</span><button value={item.id} className='basket' onClick={(e)=>handleBasket(e)}>SEPETE EKLE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    })}
    </div>
    
  )
}

export default Product