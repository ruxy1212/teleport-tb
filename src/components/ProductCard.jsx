import propTypes from 'prop-types'
import Cart from './icons/Cart'
import Rating from './Rating'
import ProdFavorite from './icons/ProdFavorite'
import { useState } from 'react';
import Modal from './Modal';
import ModalProduct from './parts/ModalProduct';

export default function ProductCard({product, likedProducts, handleLike, addToCart}){
    const baseURL = import.meta.env.VITE_TIMBU_PROD_IMG_BASE_URL;
    const [loaded, setLoaded] = useState(false);
    const [showProduct, setShowProduct] = useState(false);
    const handleImageLoad = () => {
        setLoaded(true);
    };
    return (
        <div className="flex flex-col justify-between">
            <div className="flex-col flex">
                <div onClick={()=>setShowProduct(true)} className="cursor-pointer flex flex-col px-6 py-4 w-full rounded-2xl shadow-lg border border-pd-white backdrop-blur-sm">
                    <div className={`flex flex-col justify-center items-end py-2.5 ${loaded?'block':'hidden'}`}>
                        <button style={{ color: likedProducts.includes(product.id) ? "red" : "black" }} onClick={() => handleLike(product)}><ProdFavorite/></button>
                    </div>
                    <div className={`flex flex-col justify-center px-7 mt-2 ${loaded?'block':'hidden'}`}>
                        <img onLoad={handleImageLoad} src={baseURL+product.photo} className="w-full hover:scale-110 transition-all duration-500 object-cover" />
                    </div>
                    <div className={`h-[150px] animate-pulse bg-pd-gray flex justify-center items-center ${loaded?'hidden':'block'}`}>
                        <svg className="animate-spin w-[30px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </div>
                </div>
                <div className={`flex gap-5 mt-10 text-2xl font-extrabold text-pd-black ${loaded?'':'h-5 bg-pd-gray animate-pulse'}`}>
                    <h3 className={`leading-8 pd-h3 ${loaded?'':'hidden'}`}>{product.title}</h3>
                    <h3 className={`flex-1 my-auto pd-h3 text-right leading-[130%] ${loaded?'':'hidden'}`}>${product.price}</h3>
                </div>
                {loaded && 
                    <p className="mt-6 leading-6 text-pd-black pd-p">{product.desc}</p>
                }
                {loaded && 
                    <div className="flex gap-2.5 self-start pr-5 mt-4">
                        <div className="flex gap-0.5 my-auto">
                            <Rating amount={product.rating}/>
                        </div>
                        {/* <div className="leading-7 text-black">
                            (<span className="pd-p">{product.feedbacks}</span>)
                        </div> */}
                    </div>
                }
            </div>
            <div>
            <button disabled={!loaded} className={`${loaded?'':'bg-pd-gray hover:bg-pd-gray transition-none text-pd-gray active:shadow-none hover:text-pd-gray'} white-to-black-border flex gap-2.5 justify-center px-9 py-4 mt-5 text-base font-medium leading-5 text-black border border-black border-solid rounded-[52px]`} onClick={() => addToCart(product)}>
                    <Cart />
                    <p>Add to Cart</p>
                </button> 
            </div>
            <Modal open={showProduct} setOpen={setShowProduct}>
                <ModalProduct productId={product.id} onClose={() => setShowProduct(false)}></ModalProduct>
            </Modal>
        </div>
    )
}

ProductCard.propTypes = {
    product: propTypes.object,
    likedProducts: propTypes.array,
    handleLike: propTypes.func,
    addToCart: propTypes.func
}