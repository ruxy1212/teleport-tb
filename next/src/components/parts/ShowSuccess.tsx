import { useNavigate } from 'react-router-dom';
import tick from "../../assets/img/icons/tick_red.gif";
import useLocalStorage from '../../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import AnimLoader from '../AnimLoader';

type ShowSuccessProps = {
    showSuccess: boolean
}

type CartItem = {
  id: string;
  title: string;
  desc: string;
  photo: string;
  photos: {url: string}[];
  price: number;
  discount: number;
  rating: number;
  quantity: number;
};

export default function ShowSuccess(props: ShowSuccessProps){
  const {showSuccess} = props;
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useLocalStorage<string[]>("likedProducts", []);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cartItems", []);
  const finalize = () => {
    const updatedLikedProducts = likedProducts.filter(
      (likedItem) => !cartItems.some((cartItem) => cartItem.id === likedItem)
    );
    setLikedProducts(updatedLikedProducts);
    setCartItems([]);
    navigate('/');
  }

  const [stage, setStage] = useState(0);
  const [completed, setCompleted] = useState(false);

  const stages = [
    'Connecting to gateway...',
    'Processing payment...',
    'Authorizing issuer...',
    'Finalizing order...',
  ];

  useEffect(() => {
    if(showSuccess){
      if (stage < stages.length - 1) {
        const timer = setTimeout(() => {
          setStage(stage + 1);
        }, Math.random() * (3000 - 2000) + 2000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCompleted(true);
        }, 2000); 
        return () => clearTimeout(timer);
      }
    }
  }, [stage, stages.length, showSuccess]);

  return (
    <div className="flex flex-col justify-between items-center">
        {completed && showSuccess?(
          <img loading="lazy" src={tick} className="mt-6 md:mt-10 w-40 max-w-full aspect-square"/>
        ):(
          <div className="flex items-center justify-center mt-6 md:mt-10 h-40 w-40">
            <AnimLoader></AnimLoader>
          </div>
        )}
        <h3 className="mt-12 md:mt-16 pd-h3 leading-8 text-center text-pd-black">{completed && showSuccess?'Your Order is confirmed!':'Please Hang On!'}</h3>
        <p className="pd-p mt-4 text-base leading-6 text-center text-black">{completed && showSuccess?'We’ll send you a shipping confirmation email as soon as your order ships.':stages[stage]}</p>
        <button disabled={!(completed && showSuccess)} onClick={()=>finalize()} className={`mt-10 mb-5 py-4 px-10 flex items-center justify-center gap-2 rounded-[3.25rem] font-medium pd-button font-montserrat  ${completed?' bg-pd-red with-shadow text-pd-white':'bg-pd-black/50 text-pd-white/50'}`}>Continue Shopping</button>
    </div>
  );
}