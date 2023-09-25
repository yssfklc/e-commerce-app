import { login } from '../features/sessionSlice';
import store from '../components/store';


export const getUser=async()=>{
    try{
      const response = await fetch('/home')
      if(response.ok){
        const result = await response.json();
        store.dispatch(login(result.user));
      }
    }catch(error){
      console.log(error);
    }
  };

