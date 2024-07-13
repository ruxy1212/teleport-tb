import propTypes from 'prop-types'
import Minus from "./icons/Minus"
import Plus from "./icons/Plus"
import { useState } from 'react';

export default function CartItem({type, item, changeQuantity, removeItem}){
    const baseURL = import.meta.env.VITE_TIMBU_PROD_IMG_BASE_URL;
    const [loaded, setLoaded] = useState(false);
    const handleImageLoad = () => {
        setLoaded(true);
    };
    return (
        <div className={`flex ${type=='single'?'flex-wrap':'flex-row-at-half-md flex-col sm:flex-row gap-4 md:gap-11 items-center'}`}>
            <div className={`flex flex-col w-full ${type=='single'?'lg:w-[57%]':'with-at-half-md md:w-[150px]'}`}>
                <div className={`flex flex-col w-full ${type=='single'?'max-w-[350px]':'with-at-half-md md:w-[150px]'} justify-center items-center px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm aspect-square mt-10 md:mt-0`}>
                    <img onLoad={handleImageLoad} src={baseURL+item.photo} className={`w-full ${loaded?'block':'hidden'}`} />
                </div>
                <div className={`h-[150px] animate-pulse bg-pd-gray flex justify-center items-center ${loaded?'hidden':'block'}`}>
                    <svg className="animate-spin w-[30px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                </div>
            </div>
            <div className={`${type=='single'?'pl-5':'with-at-half-md'} w-full lg:w-[43%]`}>
                <div className="flex flex-col">
                    <div className="flex gap-2.5 mt-0 md:mt-10 text-2xl font-extrabold text-pd-black">
                        <h3 className="leading-8 pd-h3">{item.title}</h3>
                        <h3 className="my-auto pd-h3 text-right leading-[130%]">${item.price}</h3>
                    </div>
                    <div className="flex gap-2 mt-2 whitespace-nowrap pd-p font-semibold">
                        <span className="text-pd-mid-gray">Color</span>
                        <span className="text-pd-black">Silver</span>
                    </div>
                    <div className={`flex gap-8 mt-6 w-full whitespace-nowrap ${type=='single'?'break-at-half-lg':''}`}>
                        <div className="flex gap-10 justify-center items-center px-4 py-3 border border-black border-solid rounded-[52px] text-pd-black">
                            <button className="with-shadow" onClick={() => changeQuantity(item, -1)} disabled={item.quantity === 1}><Minus /></button>
                            <span className="self-start">{item.quantity}</span>
                            <button className="with-shadow" onClick={() => changeQuantity(item, 1)}><Plus /></button>
                        </div>
                        <div className="my-auto">
                            <button className="text-pd-red pd-p font-semibold with-opacity" onClick={()=>removeItem(item.id)}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    type: propTypes.string,
    item: propTypes.object,
    changeQuantity: propTypes.func,
    removeItem: propTypes.func,
}