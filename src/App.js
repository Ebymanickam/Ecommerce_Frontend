
import './App.css';
import Header from './components/header';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ProductDetails from './pages/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';

function App() {

  const [cartItems, setItems] = useState([]);

  return (
    <div className="App">
        <Router>   {/*its linking to other components without trigerring*/}
            <div>
              <ToastContainer theme='dark' position='top-center' />
            <Header cartItems={cartItems} />
                <Routes>
                      <Route path="/" element={ <Home/>}/>
                       <Route path="/search" element={ <Home/>}/>
                       <Route path="/product/:id"  element={ <ProductDetails cartItems={cartItems}  setCartItems={setCartItems}  />}/>
                       <Route path="/cart"  element={ <Cart cartItems={cartItems}  setCartItems={setCartItems} />}/>
                </Routes>
            </div>     
        </Router>
      <Footer/>
    </div>
  );
}

export default App;
