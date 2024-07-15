import propTypes from 'prop-types';
import { useEffect, useState } from "react";
import Close from "../assets/img/icons/Close.svg";
import Popup from "./Popup"
import Rating from "./Rating";
import axios from '../../api/axios';
import ChevronLeft from './icons/ChevronLeft';
import ChevronRight from './icons/ChevronRight';
import Cart from './icons/Cart';

type ProductProps = {
    product: {
        id: number,
        title: string,
        price: number,
        discount: number,
        rating: number,
        photos: Array<{id: number, url: string}>,
        description: string
    },
    addToCart: (product: props.product)=>{},
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Product(props: ProductProps){
    const baseURL = import.meta.env.VITE_TIMBU_PROD_IMG_BASE_URL;
    const [isError, setError] = useState(false);
    const [extra, setExtra] = useState({});
    useEffect(() => {
		const getProduct = async () => {
			try {
				const apiKey = import.meta.env.VITE_TIMBU_API_KEY;
                const appId = import.meta.env.VITE_TIMBU_APP_ID;
                const orgId = import.meta.env.VITE_TIMBU_ORG_ID;
				const extraInfo = await axios.get(`/extrainfo/products/${product.id}?organization_id=${orgId}&Appid=${appId}&Apikey=${apiKey}&currency_code=USD`);
				if (extraInfo.status === 200 ) {
                    const result = extraInfo.data.reduce((acc, item) => {
                        acc[item.key] = item.value;
                        return acc;
                    }, {});
                    setExtra(result);
					setError(false);
				}
			}catch(error){
				console.error("Error fetching products:", error);
				setError(true);
			}
		};
        getProduct();

        if (props.open) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = 'auto';
          }
          return () => {
            document.body.style.overflow = 'auto';
          };
	}, [product, props.open]);

    const [message, setMessage] = useState(null);
    const [cIndex, setCIndex] = useState(0);

    const prevClick = () => {
        setCIndex((prev) =>
            prev === 0 ? product.photos.length - 1 : prev - 1
        );
    };

    const nextClick = () => {
        setCIndex((prev) =>
            prev === product.photos.length - 1 ? 0 : prev + 1
        );
    }; 
    return (
        <div className={`${props.open?'flex':'hidden'} fixed top-0 left-0 w-screen h-screen z-[90] bg-pd-black/60 justify-center items-center`}>
            <div className="overflow-y-auto h-screen md:h-auto my-8 md:my-0 shadow-lg border border-black border-solid bg-pd-white rounded-xl">
                <div className="p-4 md:p-6 pt-0 leading-[150%]">
                    <div className="flex justify-end pt-4 md:pt-6 pb-2 bg-pd-white z-20 sticky top-0 w-full">
                        <button onClick={()=>setOpen(false)} className='with-opacity'>
                            <img loading="lazy" src={Close} className="self-end aspect-square"/>
                        </button>
                    </div>
                    <div className="max-w-[1200px] mx-auto pt-4">
                        {isError ? (
                            <div className="w-[500px] max-w-[70%] mx-auto flex flex-col justify-center">
                                <div className="h-10 w-full animate-pulse bg-pd-gray rounded-sm"></div>
                                <div className="text-pd-red p-4 text-center">Error fetching product</div>
                                <div className="h-6 w-full animate-pulse bg-pd-gray rounded-sm"></div>
                            </div>
                            ):(
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5">
                                <div className="flex flex-col gap-4 md:gap-6 col-span-6">
                                    <div className="mt-1">
                                        <div className="flex flex-col w-full max-w-[350px] justify-center items-center p-2 rounded-xl shadow-lg backdrop-blur-sm aspect-square mt-2 md:mt-0 relative">
                                            <img src={product.photos&&product.photos.length>0?baseURL+product.photos[cIndex].url:"images/products/n"+2+".png"} className={`rounded-xl w-full h-full object-cover transition-opacity duration-200`}/>
                                            <span className={`${product.photos.length<2?'hidden':''} absolute top-1/2 flex justify-between w-full px-4 text-pd-mid-gray`}>
                                                <button onClick={prevClick} className="opacity-50 hover:opacity-100 text-pd-black disabled:opacity-50 with-shadow"><ChevronLeft/></button>
                                                <button onClick={nextClick} className="opacity-50 hover:opacity-100 text-pd-black with-shadow"><ChevronRight/></button>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="pl-5">
                                        <div className="flex flex-col">
                                            <div className="flex flex-col text-2xl font-extrabold text-pd-black">
                                                <h3 className="pd-h3 leading-8">
                                                    {product.title??'nil'}
                                                </h3>
                                                <p className="my-auto pd-p-18 font-bold leading-[130%]">
                                                    ${product.discount&&product.discount!=0?product.price-product.discount:product.price} 
                                                    <span className="ms-4 text-sm font-medium font-montserrat text-pd-red line-through">
                                                        {product.discount&&product.discount!=0?'$'+product.price:''}
                                                    </span>
                                                    <span className="ms-4 font-normal text-sm text-pd-mid-gray italic">({extra.quantity_available??0} pcs left)</span>
                                                </p>
                                            </div>
                                            <div className="flex gap-2.5 self-start mt-2">
                                                <div className="flex gap-0.5 my-auto">
                                                    <Rating amount={product.rating??0}/>
                                                </div>
                                                <div className="leading-7 text-black">
                                                    (<span className="pd-p">{extra.feedbacks??'nil'}</span>)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                                <div className="flex flex-col col-span-6">
                                    <div className="flex flex-col self-stretch p-8 m-auto w-full pd-p font-montserrat leading-6 bg-white rounded-xl border border-black border-solid max-md:px-5 max-md:mt-10">
                                        <p className="pd-p-18 font-medium leading-8 text-pd-black">{extra.description}</p>
                                        <div className="flex gap-5 justify-between mt-6 whitespace-nowrap text-pd-black">
                                                <p>Color</p>
                                                <p>{extra.color??'nil'}</p>
                                            </div>
                                        <div className="flex gap-5 justify-between mt-6 whitespace-nowrap text-pd-black">
                                            <p>Capacity</p>
                                            <p>{extra.capacity??'nil'}</p>
                                        </div>
                                        <div className="flex gap-5 justify-between mt-6 text-pd-black">
                                            <p>RAM</p>
                                            <p className="font-semibold">{extra.ram??'nil'}</p>
                                        </div>
                                        <div className="flex gap-5 justify-between mt-6 whitespace-nowrap text-pd-black">
                                            <p>Screen Size</p>
                                            <p>{extra.resolution??0}&quot;</p>
                                        </div>
                                        <div className="flex gap-5 justify-between mt-6 text-pd-black">
                                            <p>Battery</p>
                                            <p className="font-semibold">{extra.battery??'nil'}</p>
                                        </div>
                                        <div className="mt-6">
                                            <button onClick={() => addToCart(product)} className="w-full py-4 px-9 flex items-center justify-center gap-2 bg-pd-red text-pd-white rounded-[3.25rem] font-medium pd-button font-montserrat pd-button red-to-black-border with-shadow"><Cart />Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        )}
                    </div>
                </div>
            </div>
            {message && <Popup message={message} duration={5000} onClose={() => setMessage(null)} />}
        </div>
      );
}
