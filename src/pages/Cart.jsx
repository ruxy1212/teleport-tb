import { Link } from "react-router-dom";
import { useState } from "react";
import WebLayout from "../layouts/WebLayout";
import ChevronRight from "../components/icons/ChevronRight";
import Percent from "../components/icons/Percent"
import useLocalStorage from "../hooks/useLocalStorage";
import Popup from "../components/Popup"
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

export default function Cart(){
    const InitialCart = [
       {id:1, img:'Image.png', title:'Iphone 14 Plus', price:225.00, desc:'Latest smartphones with top-tier cameras, fast processors, and sleek designs.', rating:5, feedbacks:'125', discount: 0, quantity: 1},
    ];
    const [message, setMessage] = useState(null);
    const [cartItems, setCartItems] = useLocalStorage("cartItems", InitialCart);

    const changeQuantity = (product, step) => {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.max(1, item.quantity + step) }
            : item
        )
      );
      showPopup(`Cart updated successfully`);
    };
    const removeItem = (productId) => {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
        showPopup(`Item removed from cart`);
    };
    const getTotal = () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const getDiscount = () => 
      cartItems.reduce((totalDiscount, item) => totalDiscount + (item.discount * item.quantity), 0);

    const showPopup = (message) => {
        setMessage(message);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      };
 
    return (
      <WebLayout cartItems={cartItems.length}>
        <div className="max-w-[1200px] mx-auto pt-6 px-4 md:px-6 xl:px-0">
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex flex-col grow w-full md:w-[67%] gap-8">
              <div>
                <div className="flex gap-5 items-center self-start whitespace-nowrap">
                  <Link to="/" className="self-stretch my-auto text-3xl font-bold tracking-tighter leading-10 text-pd-mid-gray">Shopping</Link>
                  <span className="text-pd-mid-gray"><ChevronRight /></span>
                  <div className="self-stretch pd-h2 tracking-tighter text-pd-black">Cart</div>
                </div>
                <div className="self-start mt-2 text-2xl font-extrabold leading-6 text-pd-mid-gray">
                  {cartItems.length} Item{cartItems.length==1?'':'s'}
                </div>
              </div>
              <div className="mt-1">
                <div className={`${cartItems.length>1?'h-[50s0px]':''} overflow-xvy-auto`}>
                  <div className="flex gap-0 md:gap-5 flex-col md:flex-col">
                  {cartItems.length < 1 ? (
                    <p className="text-pd-red pd-p-18 h-[300px] flex justify-center items-center">Your cart is empty</p>
                  ) : (
                    cartItems.length == 1 ? (
                        <CartItem type="single" item={cartItems[0]} changeQuantity={changeQuantity} removeItem={removeItem} />
                    ):(
                      cartItems.map(item => (
                        <CartItem key={item.id} type="multiple" item={item} changeQuantity={changeQuantity} removeItem={removeItem} />
                      ))
                    )
                  )}
                  </div>     
                  <div className="flex gap-3 p-5 mt-6 text-base leading-6 rounded border border-pd-red border-solid bg-pd-red bg-opacity-10 text-pd-black font-montserrat max-md:flex-wrap">
                    <Percent />
                    <span className="inline-block ms-2">10% Instant Discount with Federal Bank Debit Cards on a min spend of $150. TCA</span>
                  </div>
                </div>
              </div>
            </div>    
            <OrderSummary total={getTotal()} discount={getDiscount()} proceed_loc="payment" proceed_msg="Proceed to Checkout" />
        </div>
        {message && <Popup message={message} duration={5000} onClose={() => setMessage(null)} />}
      </div>
     </WebLayout>
      );
}
