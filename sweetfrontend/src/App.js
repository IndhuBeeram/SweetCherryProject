
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

import SiteMap from './components/SiteMap';
import Main from './components/Main';
import PaymentForm from './components/Payment';




function App() {
  return (
    
      <>
      <Header/>
      <ToastContainer/>

      <Routes>
        <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<SignUp/>}/>
      <Route path="/" element={<Main/>}/>
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path='/:category' element={<Home/>}/>
        <Route path='/productDetails/:id' element={<ProductDetails/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path="/edit/:id" element={<ProfileEdit/>}/>
        <Route path='/myaccount' element={<MyAccount/>}/>
        <Route path='/address' element={<Address/>}/>
        <Route path='/address/:addressId' element={<Address/>}/>
        <Route path='/order/:id' element={<PaymentForm/>}/>
        <Route path='/sitemap' element={<SiteMap/>}/>
      
        <Route path='/cart' element={<Cart/>}/>

      </Routes>
      </>
  
  );
}

export default App;
