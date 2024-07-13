import { useNavigate } from 'react-router-dom';
import tick from "../../assets/img/icons/tick_red.gif";
import useLocalStorage from '../../hooks/useLocalStorage';

export default function ShowSuccess() {
  const navigate = useNavigate();  
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  const [likedProducts, setLikedProducts] = useLocalStorage('likedProducts', []);
  const finalize = () => {
    const updatedLikedProducts = likedProducts.filter(
      (likedItem) => !cartItems.some((cartItem) => cartItem.id === likedItem)
    );
    setLikedProducts(updatedLikedProducts);
    setCartItems([]);
    navigate('/');
  }

  return (
    <div className="flex flex-col justify-between items-center">
        <img loading="lazy" src={tick} className="mt-6 md:mt-10 w-40 max-w-full aspect-square"/>
        <h3 className="mt-12 md:mt-16 pd-h3 leading-8 text-center text-pd-black">Your Order is confirmed!</h3>
        <p className="pd-p mt-4 text-base leading-6 text-center text-black">We’ll send you a shipping confirmation email as soon as your order
        ships.</p>
        <button onClick={()=>finalize()} className="mt-10 mb-5 py-4 px-10 flex items-center justify-center gap-2 bg-pd-red text-pd-white rounded-[3.25rem] font-medium pd-button font-montserrat with-shadow">Continue Shopping</button>
    </div>
  );
}

