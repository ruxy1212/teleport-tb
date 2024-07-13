import propTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Trailing from './icons/Trailing';

export default function OrderSummary({total, discount, proceed_loc, proceed_msg, coupon=0, couponMsg="", showModal=null}){
    const validCoupons = {"DISCOUNT10": 10, "SALE20": 20, "PROMO30": 30, "EREGE": 50, "RUXY": 50};
    const [couponCode, setCoupon] = useState(couponMsg);
    const [couponFeedback, setCouponFeedback] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(coupon);
    const navigate = useNavigate();  
    const applyCoupon = () => {
        if (validCoupons[couponCode.toUpperCase()]) {
          setCouponDiscount(validCoupons[couponCode.toUpperCase()]);
          setCouponFeedback("Coupon applied successfully!");
        } else {
          setCouponFeedback("Invalid or expired coupon code.");
          setCouponDiscount(0);
        }
    };

    const proceed = (loc) => {
        if(loc == 'payment')
            navigate("/checkout", { state: { price: total, discount: discount, coupon: couponDiscount, couponMsg: couponCode.toUpperCase()  } });
        else showModal(true);
    };

    return (
        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full self-start sticky top-24">
            <div className="flex flex-col self-stretch p-8 m-auto w-full pd-p font-montserrat leading-6 bg-white rounded-xl border border-black border-solid max-md:px-5 max-md:mt-10">
                <h3 className="pd-h3 font-extrabold leading-8 text-pd-black">Order Summary</h3>
                <div className="flex gap-5 justify-between mt-8 whitespace-nowrap text-pd-black">
                    <p>Price</p>
                    <p>${total}</p>
                </div>
                <div className="flex gap-5 justify-between mt-6 whitespace-nowrap text-pd-black">
                    <p>Discount</p>
                    <p>${discount}</p>
                </div>
                <div className="flex gap-5 justify-between mt-6 whitespace-nowrap">
                    <p className="text-pd-black">Shipping</p>
                    <p className="text-pd-red">Free</p>
                </div>
                <div className="flex gap-5 justify-between mt-6 text-pd-black">
                    <p>Coupon Applied</p>
                    <div className="flex flex-col items-end">
                        <p>${(couponDiscount/100*(total-discount))}</p>
                        {couponDiscount > 0 && <p className="text-xs font-montserrat text-pd-red">-{couponDiscount}%</p>}
                    </div>
                </div>
                <div className="shrink-0 mt-8 h-px bg-pd-mid-gray" />
                <div className="flex gap-5 justify-between mt-8 whitespace-nowrap text-pd-black">
                    <p>TOTAL</p>
                    <p className="font-semibold text-right">${(total-discount)-(couponDiscount/100*(total-discount))}</p>
                </div>
                <div className="flex gap-5 justify-between mt-6 text-pd-black">
                    <p>Estimated Delivery by</p>
                    <p className="font-semibold">25 July, 2024</p>
                </div>
                <div className="relative px-4 py-2 mt-6 text-gray-400 rounded-sm border border-black border-solid">
                    <input type="text" className="w-full pr-8 border-none outline-none" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCoupon(e.target.value)}/>
                    <div className="absolute w-6 top-2 right-2 aspect-square fill-white">
                        <button onClick={applyCoupon}><Trailing /></button>
                    </div>
                </div>
                <p className={`${couponFeedback === "Coupon applied successfully!" ? "text-pd-green" : "text-pd-red"}`}>{couponFeedback}</p>
                <div className="mt-6">
                    <button onClick={()=>proceed(proceed_loc)} className="w-full py-4 px-9 flex items-center justify-center gap-2 bg-pd-red text-pd-white rounded-[3.25rem] font-medium pd-button font-montserrat pd-button">{proceed_msg}</button>
                </div>
            </div>
        </div>
    )
}

OrderSummary.propTypes = {
    total: propTypes.number,
    discount: propTypes.number,
    proceed: propTypes.func,
    proceed_msg: propTypes.string,
    proceed_loc: propTypes.string,
    coupon: propTypes.number,
    couponMsg: propTypes.string,
    showModal: propTypes.func
}