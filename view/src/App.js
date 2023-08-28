import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Orders from './components/Orders';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Navbar/>}>
      <Route path='register' element={<Register/>} />
      <Route path='login' element={<Login/>} />
      <Route path='home' element={<Home/>} />
      <Route path='orders' element={<Orders/>} />
    </Route>
  ) 
  );

  return (
    
      <RouterProvider router={ router } />
      

  );
}

export default App;
