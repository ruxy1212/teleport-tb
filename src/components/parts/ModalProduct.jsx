import propTypes from 'prop-types'
// import Cart from './icons/Cart'
import Rating from '../Rating'
import ChevronRight from '../icons/ChevronRight'
import ChevronLeft from '../icons/ChevronLeft'
import { useEffect, useState } from 'react';
import axios from "../../../api/axios"; //"../../../../..//api/axios"
// import ProdFavorite from './icons/ProdFavorite'

export default function ModalProduct({productId}){
    const baseURL = import.meta.env.VITE_TIMBU_PROD_IMG_BASE_URL;
    // const [isError, setError] = useState(false);
    const [item, setItem] = useState({});
    // const [itemExtra, setItemExtra] = useState({});
    useEffect(() => {
		const getProduct = async () => {
			try {
				const apiKey = import.meta.env.VITE_TIMBU_API_KEY;
                const appId = import.meta.env.VITE_TIMBU_APP_ID;
                const orgId = import.meta.env.VITE_TIMBU_ORG_ID;

                // https://api.timbu.cloud/products/productId?organization_id=ebe4a8d53ad94b6a8606e177eb002db0&reverse_sort=false&page=1&Appid=OLM5VW843U1BPTQ&Apikey=6e0f068058524609bafc70e70314253220240712141258895879


				const product = await axios.get(`/products/${productId}?organization_id=${orgId}&Appid=${appId}&Apikey=${apiKey}&currency_code=USD`);
                // const product_info = await axios.get(`/products/extrainfo/${productId}?organization_id=${orgId}&Appid=${appId}&Apikey=${apiKey}`);
                //&& product_info.status === 200
				if (product.status === 200 ) {
                    // console.log(product.data);
                    setItem(sanitizeProduct(product.data));
                    // setItemExtra(sanitizeExtra(product_info.data.items));
					// setError(false);
				}
			}catch(error){
				console.error("Error fetching products:", error);
				// setError(true);
			}
		};
        // const sanitizeProduct = (product) => {
        //     console.log(product);
        //     return {
        //         id: product.id,
        //         title: product.name,
        //         desc: product.description,
        //         photos: product.photos,
        //         price: product.current_price[0]['USD'][0],
        //         discount: product.current_price[0]['USD'][1]??0,
        //         rating: Math.ceil(product.available_quantity/2),
        //         votes: (product.available_quantity*15)+(Math.floor(Math.random()*60)+120),
        //     }
        // }
        getProduct();
	}, [productId]);
    const [cIndex, setCIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const prevClick = () => {
        // setCIndex((prev) =>
        //     prev === 0 ? item.photos.length - 1 : prev - 1
        // );
        setFade(true);
    setTimeout(() => {
      setCIndex((prev) =>
        prev === 0 ? item.photos.length - 1 : prev - 1
      );
      setFade(false);
    }, 500); 
    };
    const nextClick = () => {
        setFade(true);
    setTimeout(() => {
      setCIndex((prevIndex) =>
        prevIndex === item.photos.length - 1 ? 0 : prevIndex + 1
      );
      setFade(false);
    }, 500);
        // setCIndex((prev) =>
        //     prev === item.photos.length - 1 ? 0 : prev + 1
        // );
    };// scale-110

    const sanitizeProduct = (product) => {
        return {
            id: product.id,
            title: product.name,
            desc: product.description,
            photos: product.photos,
            price: product.current_price?.[0]?.USD?.[0] || 0, // Default to 0 if price is missing
            discount: product.current_price?.[0]?.USD?.[1] || 0, // Default to 0 if discount is missing
            rating: Math.ceil(product.available_quantity/2),
            votes: (product.available_quantity*15)+(Math.floor(Math.random()*60)+120),
        };
    };
    // const sanitizeProduct = (product) => {
    //     console.log(product);
    //     return {
    //         id: product.id,
    //         title: product.name,
    //         desc: product.description,
    //         photos: product.photos,
    //         price: product.current_price[0]['USD'][0],
    //         discount: product.current_price[0]['USD'][1]??0,
    //         rating: Math.ceil(product.available_quantity/2),
    //         votes: (product.available_quantity*15)+(Math.floor(Math.random()*60)+120),
    //     }
    // }

    // const sanitizeExtra = (extra) => {
    //     return {};
    // }
    console.log(item.photos);
    
    return (
        <div className="flex flex-col justify-between">
            <div className="flex-col flex">
                <div className="cursor-pointer flex flex-col my-2 md:my-4 w-full rounded-2xl shadow-lg border border-pd-white backdrop-blur-sm">
                    <div className="flex flex-col justify-center mt-2 rounded-lg overflow-hidden relative">
                    <div className="relative w-64 h-64 overflow-hidden">
                        <img
                        src={item.photos&&item.photos.length>0?baseURL+item.photos[cIndex].url:''}
                        alt={'item.photos[cIndex].model_name'}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                            fade ? 'opacity-0' : 'opacity-100'
                        }`}
                        />
                    </div>
                        {/* <div className="absolute inset-0 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${cIndex * 100}%)` }}>
                        {item.photos && item.photos.map((photo, index) => (
                            <img key={index} src={baseURL+photo.url} alt={photo.model_name} className="w-full h-full object-cover" />
                        ))} */}
                            {/* <img loading="lazy" src={"images/products/n"+1+".png"} className="w-full h-full object-cover"/> */}
                        {/* </div> */}
                        <span className="absolute top-1/2 flex justify-between w-full px-4 text-pd-mid-gray">
                            <button onClick={prevClick} className="opacity-50 hover:opacity-100 text-pd-black disabled:opacity-50 with-shadow"><ChevronLeft/></button>
                            <button onClick={nextClick} className="opacity-50 hover:opacity-100 text-pd-black with-shadow"><ChevronRight/></button>
                        </span>
                    </div>
                </div>
                <h3 className="leading-8 pd-h3">{item.title}</h3>
                <p className="my-auto pd-p-18 font-bold leading-[130%]">
                    ${item.discount&&item.discount!=0?item.total-item.discount:item.total} 
                    <span className="ms-4 text-sm font-medium font-montserrat text-pd-red line-through">{item.discount&&item.discount!=0?item.total:''}</span>
                </p>
                <p className="mt-4 leading-6 text-pd-black pd-p">{"product.desc"}</p>
                <div className="flex gap-2.5 self-start pr-5 mt-4">
                    <div className="flex gap-0.5 my-auto">
                        <Rating amount={item.rating}/>
                        {/* "product.rating" */}
                    </div>
                    <div className="leading-7 text-black">
                        (<span className="pd-p">{item.votes}</span>)
                    </div>
                </div>
            </div>
            <div>
                {/* <button className="flex gap-2.5 justify-center px-9 py-4 mt-5 text-base font-medium leading-5 text-black border border-black border-solid rounded-[52px] with-shadow"  onClick={() => addToCart(product)}>
                    <Cart />
                    <p>Add to Cart</p>
                </button>  */}
            </div>
        </div>
    )
}

ModalProduct.propTypes = {
    productId: propTypes.string
}