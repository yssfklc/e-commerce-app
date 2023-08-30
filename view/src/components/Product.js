import React, { useEffect, useState } from 'react';
import './Home.css';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, loadAllProducts } from '../features/addProductSlice';
import { addToBasket } from '../features/addBasketSlice';

function Product() {
//   const [products, setProducts]=useState([]);
  const [filteredproducts, setFilteredproducts]=useState([]);
  const [chart, setChart]=useState([]);
  const [searchquery, setSearchquery]=useState('');
  const dispatch = useDispatch();
  const temporary = useSelector(selectAllProducts);
  const products = [];
  
  // queries start
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
  console.log(products);
  
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
           return (<div className='card' >
               <img src="https://picsum.photos/200"/>
               <div className='flex-space-evenly'>
                <h2>{item.name}</h2>
                <span>${item.price}</span>
               </div>
              <p>{item.description}</p>
              <button type='submit' value={item.id} onClick={(e)=>handleBasket(e)} >Add To Basket</button>
            </div>)
          }):filteredproducts.map((item)=>{
            return (<div className='card' >
                <img src="https://picsum.photos/200"/>
               <h2>{item.name}</h2>
               <p>{item.description}</p>
               <button type='submit' value={chart} onClick={(e)=>handleBasket(e)} >Add To Basket</button>
             </div>)
           })}
          </div>
    </div>
  )
}

export default Product;