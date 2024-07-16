import { useState, useEffect } from "react"
import WebLayout from "../layouts/WebLayout"
import hero from "../assets/img/hero.png"
import abs_image from "../assets/img/abs_image.png"
import hero_small from "../assets/img/hero_small.png"
import computer from "../assets/img/icons/computer.svg"
import accessory from "../assets/img/icons/accessory.svg"
import appliance from "../assets/img/icons/appliance.svg"
import camera from "../assets/img/icons/camera.svg"
import gaming from "../assets/img/icons/gaming.svg"
import mobile from "../assets/img/icons/mobile.svg"
import tv from "../assets/img/icons/tv.svg"
import useLocalStorage from "../hooks/useLocalStorage";
import Popup from "../components/Popup"
import Category from "../components/Category"
import ProductCard from "../components/ProductCard"
import FlashProduct from "../components/FlashProduct"
import axios from "../../api/axios"
import ChevronLeft from "../components/icons/ChevronLeft"
import ChevronRight from "../components/icons/ChevronRight"
import AnimLoader from "../components/AnimLoader"

type ProductProps = {
    id: string;
    title: string;
    desc: string;
    photo: string;
    photos: {url: string}[];
    price: number;
    discount: number;
    rating: number;
  };
  
  type RawProduct = {
    name: string;
    description: string;
    unique_id: string;
    url_slug: string;
    is_available: boolean;
    is_service: boolean;
    previous_url_slugs: string | null;
    unavailable: boolean;
    unavailable_start: string | null;
    unavailable_end: string | null;
    id: string;
    parent_product_id: string | null;
    parent: string | null;
    organization_id: string;
    product_image: { url: string }[];
    categories: { name: string; id: string }[];
    date_created: string;
    last_updated: string;
    user_id: string;
    photos: { url: string }[];
    current_price: { USD: [number | null, number | null] }[];
    is_deleted: boolean;
    available_quantity: number;
    selling_price: number | null;
    discounted_price: number | null;
    buying_price: number | null;
    extra_infos: string | null;
  };

  type CartItem = ProductProps & { quantity: number };

export default function Home() {
    const [mainProducts, setMainProducts] = useState<RawProduct[]>([]);
    const [flashProducts, setFlashProducts] = useState<RawProduct[]>([]);
    const [isError, setError] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [message, setMessage] = useState<string | null>(null);
    const [likedProducts, setLikedProducts] = useLocalStorage<string[]>("likedProducts", []);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cartItems", []);

    useEffect(() => {
		const getProducts = async () => {
			try {
				const apiKey = import.meta.env.VITE_TIMBU_API_KEY;
                const appId = import.meta.env.VITE_TIMBU_APP_ID;
                const orgId = import.meta.env.VITE_TIMBU_ORG_ID;
                const flashId = import.meta.env.VITE_TIMBU_FLASH_ID;
                const mainId = import.meta.env.VITE_TIMBU_MAIN_ID;
				const main_products = await axios.get(`/products?organization_id=${orgId}&Appid=${appId}&Apikey=${apiKey}&reverse_sort=false&&category_id=${mainId}&size=12&page=${currentPage}`);
                const flash_products = await axios.get(`/products?organization_id=${orgId}&Appid=${appId}&Apikey=${apiKey}&reverse_sort=false&&category_id=${flashId}&size=12&page=1`);
				if (main_products.status === 200 && flash_products.status === 200) {
                    setTotalPages(Math.ceil(main_products.data.total/main_products.data.size));
                    setMainProducts(main_products.data.items);
                    setFlashProducts(flash_products.data.items);
					setError(false);
				}
			}catch(error){
				console.error("Error fetching products:", error);
				setError(true);
			}
		};
        getProducts();
	}, [currentPage]);

    const prevPage = () => {
        if (currentPage > 1) { 
          setCurrentPage(currentPage - 1);
        }
      };
    
      const nextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };

    const p_categories: [string, string][] = [
        [computer, "Computer & Laptop"],
        [mobile, "Mobile & Phone"],
        [camera, "Camera"],
        [tv, "TV & Smart Box"],
        [appliance, "Home Appliance"],
        [accessory, "Accessories"],
        [gaming, "Others"]
    ];

    const handleLike = (product: ProductProps) => {
        setLikedProducts((prev: string[]) => {
        if (prev.includes(product.id)) {
            showPopup(`Removed from wishlist`);
            return prev.filter((id) => id !== product.id);
        } else {
            showPopup(`Added to wishlist`);
            return [...prev, product.id];
        }
        });
    };

    const addToCart = (product: ProductProps) => {
        setCartItems((prev: CartItem[]) => {
        const existingItem = prev.find((item) => item.id === product.id);
        if (existingItem) {
            showPopup(`Item is already in cart`);
            return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            showPopup(`Item added to cart`);
            return [...prev, { ...product, quantity: 1 }];
        }
        });
    };

    const sanitizeProduct = (apiProduct: RawProduct): ProductProps => {
        return {
            id: apiProduct.id, 
            title: apiProduct.name,
            desc: apiProduct.description,
            // photo: apiProduct?.photos?.[0]?.url??'',
            // photos: apiProduct.photos,
            photo: apiProduct.photos.length > 0 ? apiProduct.photos[0].url : '',
            photos: apiProduct.photos,
            price: apiProduct.current_price[0].USD[0] || 0,
            discount: apiProduct.current_price[0].USD[1] || 0,
            // price: apiProduct.current_price[0]['USD'][0],
            // discount: apiProduct.current_price[0]['USD'][1]??0,
            rating: apiProduct.available_quantity,
            //feedbacks,,more images
        }
    }

    const showPopup = (message:string) => {
        setMessage(message);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      };

    return(
        <WebLayout cartItems={cartItems.length}>
            <section className="bg-pd-gray">
                <div className="max-w-[1200px] pt-4 mx-auto px-4 md:px-6 xl:px-0 flex justify-center gap-16 self-stretch">
                    <div className="flex gap-16 justify-end md:gap-5 max-md:flex-col">
                        <div className="flex flex-col w-[48%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col self-stretch pt-4 my-auto max-md:mt-10 max-md:max-w-full">
                                <h1 className="pd-h1 mr-6 tracking-tighter leading-[80px] text-pd-black max-md:mr-2.5 max-md:max-w-full max-md:leading-[55px]">
                                    <span className="relative z-10">Grab </span><span className="relative top-[-.96px] inline-block rounded-3xl px-8 bg-pd-red text-pd-white -ms-5 sm:-ms-7 me-1 hero-badge-text" style={{transform: 'rotate(-2deg)'}}>50%</span> <br/>Off Smartphone Collection</h1>
                                <p className="pd-p-18 mt-4 md:mt-6 text-lg leading-7 text-pd-black w-72">Shop the latest models from top brands at unbeatable prices.{" "}</p>
                                <div className="mt-6 md:mt-8 max-md:max-w-full">
                                    <div className="flex gap-5 items-center">
                                        <div className="flex flex-col w-[23%] max-md:ml-0 max-md:w-auto">
                                            <img loading="lazy" src={hero_small} className="shrink-0 w-28 max-w-full aspect-square max-md:mt-7"/>
                                        </div>
                                        <h3 className="text-pd-black font-prompt pd-h3 font-semibold">iPhone 14 Edition</h3>
                                        <div className="flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full hidden md:flex">
                                            <div className="self-stretch my-auto text-3xl font-semibold leading-10  max-md:mt-10"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex flex-col ml-5 w-[34%] max-md:ml-0 max-md:w-full pb-10">
                            <div className="">
                                <img loading="lazy" src={abs_image} className="z-10 absolute bottom-16 right-4 md:-left-20 lg:-left-28 shrink-0 w-[189px]"/>
                            </div>
                            <img loading="lazy" src={hero} className="grow w-full max-w-[350px] mx-auto md:mx-0"/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-28 lg:mt-36">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6 xl:px-0">
                    <div>
                        <h1 className="text-pd-black pd-h1 text-left md:text-center">What <span className="text-pd-red">we</span> provide?</h1>
                    </div>
                    <div className="flex justify-between items-center mt-12 leading-6 text-center text-pd-black flex-wrap">
                        {
                            p_categories.map(category => (
                                <Category key={category[1]} elem={category} />
                            ))
                        }
                    </div>
                </div>
            </section>
            <main className="mb-24">
                <section className="mt-28 lg:mt-36">
                    <div className="flex justify-center items-center self-stretch max-w-[1200px] mx-auto px-4 md:px-6 xl:px-0 mb-10">
                        <div className="flex gap-5 justify-between w-full">
                            <div>
                                <h2 className="pd-h2 text-pd-black">New <span className="text-pd-red">arrival</span> for you</h2>
                            </div>
                            <div className="flex gap-5 justify-between my-auto">
                                <button disabled={currentPage==1} className={`bg-pd-gray with-shadow rounded-sm p-1 ${currentPage==1?'text-pd-mid-gray':'hover:bg-pd-red/15'}`} onClick={prevPage}><ChevronLeft /></button>
                                <button disabled={currentPage==totalPages} className={`bg-pd-gray rounded-sm with-shadow p-1 ${currentPage==totalPages?'text-pd-mid-gray':'hover:bg-pd-red/15'}`} onClick={nextPage}><ChevronRight /></button>
                            </div>
                        </div>
                    </div> 
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6 xl:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {
                        mainProducts && mainProducts.length>0 ? 
                            (mainProducts.map(product => 
                                <ProductCard key={product.id} product={sanitizeProduct(product)} likedProducts={likedProducts} handleLike={handleLike} addToCart={addToCart} />
                            )):(isError? (
                                <div className="text-center sm:col-span-2 md:col-span-12 flex justify-center text-pd-red">No data available. Check your network connection</div>
                            ):(
                                <div className="flex justify-center col-span-12">
                                    <AnimLoader></AnimLoader>
                                </div>
                            ))
                        }
                        
                    </div>
                </section>
                <section className="mt-28 lg:mt-36">
                    <div className="flex justify-center items-center self-stretch max-w-[1200px] mx-auto px-4 md:px-6 xl:px-0 mb-10">
                        <div className="flex gap-5 justify-start w-full">
                            <div>
                                <h2 className="pd-h2 text-pd-black">Flash sale for <span className="text-pd-red">best</span> sellers</h2>
                            </div>
                        </div>
                    </div> 
                    <div className="max-w-[1200px] mx-auto px-4 md:px-6 xl:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {flashProducts && flashProducts.length>0 ?
                            (flashProducts.map(product => (
                                <FlashProduct key={product.id} product={sanitizeProduct(product)} addToCart={addToCart} />
                            ))):(isError? (
                                <div className="text-center sm:col-span-2 md:col-span-12 flex justify-center text-pd-red">No data available. Check your network connection</div>
                            ):(
                                <div className="flex justify-center col-span-12">
                                    <AnimLoader></AnimLoader>
                                </div>
                            ))
                        }
                    </div>
                </section>
            </main>
            {message && <Popup message={message} duration={5000} onClose={() => setMessage(null)} />}
        </WebLayout>
    )
}