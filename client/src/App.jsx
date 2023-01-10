import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import {BrowserRouter as Router , Routes , Route , Navigate} from "react-router-dom"
const App = () => {
  return (
  <Router>
    <Routes>
      <Route path="/productlist"  element= {<ProductList/> }/>
      <Route path="/login"  element= {<Login/> }/>
      <Route path="/cart" element = 
      {!(localStorage.getItem("token")) ? <Navigate to="/login" /> : <Cart />}/>
      <Route path="/register"  element= {<Register/> }/>
      <Route path="/product/:id"  element= {<Product/> }/>
      <Route path="/checkout"  element= {<Checkout/> }/>
      <Route path="/"  element= {<Home/> }/>
    </Routes>
  </Router>
  )
};

export default App;