import React, { useEffect, useState } from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { addToBasket } from '../features/addBasketSlice';
import { selectAllProducts, loadAllProducts } from '../features/addProductSlice';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';



function Products() {
//   const [products, setProducts]=useState([]);
  const [filteredproducts, setFilteredproducts]=useState([]);
  const [chart, setChart]=useState([]);
  const [searchquery, setSearchquery]=useState('');
  const dispatch = useDispatch();
  const temporary = useSelector(selectAllProducts);
  const products = [];
  // const isLogin=useSelector(isLoggedin);
  const navigate = useNavigate();

  
  
  // queries start
    console.log('lale');
    temporary.map(item=>{
      let count=0;
      products.map(product=>{
        if(product.id===item.id){
          count++
        }
      })
      if(count===0){
        products.push(item);
      }
    })

  
  const handleSearch=(e)=>{
    e.preventDefault();
    setSearchquery(e.target.value)
    setFilteredproducts(products.filter((item)=>item.name.toLowerCase().includes(searchquery.toLowerCase())));
  }
  
const handleBasket=(e)=>{
    e.preventDefault();
    products.map(item=>{
      if(item.id==e.target.value){
        dispatch(addToBasket(item))
      }});

  }
  
  useEffect( ()=>{
    dispatch(loadAllProducts());
  }, [])
  
  return (
    <div className='my-list-container'>
          <h2>Product List</h2> 
          <form className='search-form' placeholder='Type To Search A Product'>
            <input onChange={e=>handleSearch(e)}/>
          </form>
          <div className='my-list'>
          { searchquery===''? products.map((item)=>{
           return (<div className='card'>
                <Link to={`${item.id}`} className='product-link'>
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
              <button type='submit' value={item.id} onClick={(e)=>handleBasket(e)} className='add-button'>Add To Basket</button>
            </div>)
          }):filteredproducts.map((item)=>{
            return (<div className='card'>
            <Link to={`${item.id}`} className='product-link'>
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
          <button type='submit' value={item.id} onClick={(e)=>handleBasket(e)} className='add-button'>Add To Basket</button>
        </div>)
           })}
          </div>
    </div>
  )
}

export default Products;