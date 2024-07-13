import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import Page404 from "./pages/Page404"
import ScrollToTop from "./components/ScrollToTop"
import Product from "./pages/Product"

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/events' element={<Page404 />} />
        <Route path='/pricing' element={<Page404 />} />
        <Route path='/company' element={<Page404 />} />
        <Route path='/page404' element={<Page404 />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}
