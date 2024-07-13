import propTypes from 'prop-types'
import Minus from "./icons/Minus"
import Plus from "./icons/Plus"

export default function CartItem({type, item, changeQuantity, removeItem}){
    return (
        <div className={`flex ${type=='single'?'flex-wrap':'flex-row-at-half-md flex-col sm:flex-row gap-4 md:gap-11 items-center'}`}>
            <div className={`flex flex-col w-full ${type=='single'?'lg:w-[57%]':'with-at-half-md md:w-[150px]'}`}>
                <div className={`flex flex-col w-full ${type=='single'?'max-w-[350px]':'with-at-half-md md:w-[150px]'} justify-center items-center px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm aspect-square mt-10 md:mt-0`}>
                    <img loading="lazy" src={"images/products/n"+item.id+".png"} className="w-full"/>
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
                            <button onClick={() => changeQuantity(item, -1)} disabled={item.quantity === 1}><Minus /></button>
                            <span className="self-start">{item.quantity}</span>
                            <button onClick={() => changeQuantity(item, 1)}><Plus /></button>
                        </div>
                        <div className="my-auto">
                            <button className="text-pd-red pd-p font-semibold" onClick={()=>removeItem(item.id)}>Remove</button>
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