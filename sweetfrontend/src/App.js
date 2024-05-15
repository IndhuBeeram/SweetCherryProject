
import './App.css';
import Header from './components/Header';
import {Routes,Route,useNavigate} from "react-router-dom";
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import ProductDetails from './components/ProductDetails';
import SignUp from './components/SignUp';
import Wishlist from './components/Wishlist';
import MyAccount from './components/MyAccount';
import ProfileEdit from './components/Edit';
import Cart from './components/Cart';
import Address from './components/Address';
import Order from './components/Order';
import SiteMap from './components/SiteMap';




function App() {
  return (
    
      <>
      <Header/>
      <ToastContainer/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/productDetails/:id' element={<ProductDetails/>}/>
        <Route path='/:category' element={<Home/>}/>
        <Route path='/login' element={<SignUp/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path="/edit/:id" element={<ProfileEdit/>}/>
        <Route path='/myaccount' element={<MyAccount/>}/>
        <Route path='/address' element={<Address/>}/>
        <Route path='/address/:addressId' element={<Address/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/sitemap' element={<SiteMap/>}/>
     
        <Route path='/cart' element={<Cart/>}/>

      </Routes>
      </>
  
  );
}

export default App;
