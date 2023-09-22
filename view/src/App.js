
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Order from './pages/Order';
import Products from './pages/Products';
import Product from './pages/Product';
import Basket from './pages/Basket';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Navbar/>}>
      <Route path='register' element={<Register/>} />
      <Route path='login' element={<Login/>} />
      <Route path='home' element={<Home/>} />
      <Route path='/' element={<Home/>} />
      <Route path='products' element={<Products/>} />
      <Route path='products/:productId' element={<Product/>} />
      <Route path='orders' element={<Orders/>} />
      <Route path='orders/:orderId' element={<Order/>} />
      <Route path='basket' element={<Basket/>} />
    </Route>
  ) 
  );

  return (
    
      <RouterProvider router={ router } />
      

  );
}

export default App;
