import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productData from "../ProductData/ProductData";
import small1 from "../assets/small1.png";
import small2 from "../assets/small2.png";
import small3 from "../assets/small3.png";
import small4 from "../assets/small4.png";
import small5 from "../assets/small5.png";
import Vector from "../assets/Vector.png";
import Button from "../Components/Button";
import { ArrowDown, ArrowUp, Avatar } from "../assets/image";
import Avatars from "../assets/AvatarImage.png";
import { AppContext } from "../Contexts/AppContent";
import axios from "axios";

export default function SingleProductPage() {
  const { addToCart } = useContext(AppContext); 
  const { productId } = useParams();
  const product = productData.find((p) => p.id === parseInt(productId));
  const [showDescription, setShowDescription] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [ourProductsRandom, setOurProductsRandom] = useState([]);
  const [activeTab, setActiveTab] = useState("shipping");
  const BASE_IMAGE_URL = "https://api.timbu.cloud/images/";
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          '/api/products?organization_id=ca160a0e46ef45629d00af5bd90d171d&reverse_sort=false&Appid=07TLEUQ2D3YFVA5&Apikey=de6901e57cc24c2fbf3d5a91298951ec20240712140603058514'
        );
        if (res.data && res.data.items) {
          const shuffledProducts = shuffleArray(res.data.items);
          setOurProductsRandom(shuffledProducts);
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getAllProductsRandom();
  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const toggleSize = () => {
    setShowSize(!showSize);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleProductClick = (productId) => {
    const shuffledProducts = shuffleArray([...ourProductsRandom]);
    setOurProductsRandom(shuffledProducts);
    navigate(`/products/${productId}`);
  };

  return (
    <div className="p-5 bg-[#f7f7f7] pt-32">
      <div className="max-w- max-w-screen-2xl mx-auto">
        <div className="sm:flex justify-between p-5">
          <div>
            <img src={product.image} alt={product.name} className="m- w-full" />
          </div>
          <div className="flex md:flex-col m-1">
            <img src={small1} alt={product.name} className="w-20 py-1" />
            <img src={small2} alt={product.name} className="w-20 py-1" />
            <img src={small3} alt={product.name} className="w-20 py-1" />
            <img src={small4} alt={product.name} className="w-20 py-1" />
            <img src={small5} alt={product.name} className="w-20 py-1" />
          </div>
          <div className="sm:w-3/6">
            <div className="mb-5">
              <span className="text-[#525151]">Shop/Heritage</span>
              <h1 className="md:text-3xl text-2xl font-light py-1 text-[#111111]">
                {product.name}
              </h1>
              <h2 className="font-bold text-3xl py-2">${product.price}</h2>
              <p className="">{product.description}</p>
              <div className="flex">
                <img src={Vector} className="pr-0.5 py-0.5" />
                <p className="p-">4.5</p>
                <Link>Reviews</Link>
              </div>
            </div>
            <div className="w-full h-0.5 bg-[#d9d9d9] my-3"></div>
            <div>
              <p>Available Color : Black & Brown</p>
              <div className="flex flex-col md:flex-row gap-2 my-3">
                <Button
                  className="p-3 md:w-60 h-10 bg0"
                  text={`Add to Cart  ${product.price}`}
                  onClick={() => addToCart(product)}
                />
                <Button
                  className="p-3 md:w-60 h-10 bg-white text-black border-black border"
                  text={`Buy Now ${product.price}`}
                />
              </div>
              <div>
                <p className="text-center text-[#525151]">
                  Free shipping over $500
                </p>
              </div>
            </div>
            <div className="w-full h-0.5 bg-[#d9d9d9] my-3"></div>
            <div>
              <div className="flex justify-between" onClick={toggleDescription}>
                <p>Description</p>
                {showDescription ? (
                  <ArrowDown width={30} height={30} />
                ) : (
                  <ArrowUp width={30} height={30} />
                )}
              </div>
              {showDescription && (
                <div className="text-[#525151] ">
                <p className="">{product.description}</p>
                  {/* <p className="">Size and Detail</p>
                  <p>Stay Hydrated With Herschel Drinkware</p>
                  <p>Water Bottle Insulated 18oz/530ml $25.00</p> */}
                </div>
              )}
            </div>
            <div className="w-full h-0.5 bg-[#d9d9d9] my-3"></div>
            <div>
              <div className="flex justify-between" onClick={toggleSize}>
                <p>Size & Details </p>
                {showSize ? (
                  <ArrowDown width={30} height={30} />
                ) : (
                  <ArrowUp width={30} height={30} />
                )}
              </div>
              {showSize && (
                <div className="text-[#525151] transition-all duration-500 ease-in">
                  <p className="">Size and Detail</p>
                  <p>Stay Hydrated With Herschel Drinkware</p>
                  <p>Water Bottle Insulated 18oz/530ml $25.00</p>
                </div>
              )}
            </div>
            <div className="w-full h-0.5 bg-[#d9d9d9] my-3"></div>
            <div>
              <div>
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                      onClick={() => handleTabClick("shipping")}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "shipping"
                          ? "border-black"
                          : "border-transparent text-gray-500"
                      }`}
                    >
                      Shipping
                    </button>
                    <button
                      onClick={() => handleTabClick("warranty")}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "warranty"
                          ? "border-black "
                          : "border-transparent text-gray-500"
                      }`}
                    >
                      Warranty
                    </button>
                    <button
                      onClick={() => handleTabClick("returns")}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "returns"
                          ? "border-black"
                          : "border-transparent text-gray-500"
                      }`}
                    >
                      Returns
                    </button>
                  </nav>
                </div>
                <div className="py-5">
                  {activeTab === "warranty" && (
                    <div>
                      <p className="text-[#525151]">
                        Shipment takes between 2-3days of orders
                      </p>
                    </div>
                  )}
                  {activeTab === "shipping" && (
                    <div>
                      <p className="text-[#525151]">
                        Shipment takes between 2-3days of orders
                      </p>
                    </div>
                  )}
                  {activeTab === "returns" && (
                    <div>
                      <p className="text-[#525151]">
                        Shipment takes between 2-3days of orders
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-light">Things you might like</h2>
          <div className="grid md:grid-cols-3 grid-col-1">
            {ourProductsRandom.slice(0, 3).map((product) => (
              <Link to={`/products/${product.unique_id}`}  onClick={() => handleProductClick(product.id) } key={product.unique_id}>
                <div  className="p-5">
                {product.photos &&
                      product.photos[0] &&
                      product.photos[0].url && (
                        <img
                          src={`${BASE_IMAGE_URL}${product.photos[0].url}`}
                          alt={product.name}
                          className="w-full"
                        />
                      )}
                  <p className="text-[#111111] py-2 font-light">
                    {product.name}
                  </p>
                  <div className="flex ">
                    <img src={Vector} className="pr-0.5 py-0.5" />
                    <p className="p-">4.5</p>
                  </div>
                  <h2 className="font-bold">${product.price}</h2>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-end my-6">
            <div>
              <p className="text-center font-light p-1">Showing 9 of 59</p>
              <Link to="/">
                <Button text="Show more" className=" w-60 h-10" />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-normal">Reviews</h2>
          <p className="py-2">Read what people has to say about this product</p>
          <div className="flex sm:flex-row flex-col">
            <div className="py-6 pr-6">
              <div className="flex py-2 ">
                <img src={Vector} className="pr-0.5 py-0.5" />
                <img src={Vector} className="pr-0.5 py-0.5" />
                <img src={Vector} className="pr-0.5 py-0.5" />
                <img src={Vector} className="pr-0.5 py-0.5" />
                <img src={Vector} className="pr-0.5 py-0.5" />
              </div>
              <h2 className="font-bold py-2">Excellent</h2>
              <p className="text-[#525151]">
                I downsized my purse recently and this mini Herschel backpack
                has been a lifesaver! It's the perfect in-between size for me.
                Now I can ditch the bulky bag but still carry all my essentials
                - phone, wallet, keys, and even a good book for the train ride
                home. The magnetic clasp on the front pocket is a game-changer.
              </p>
              <div className="flex py-3">
                <img src={Avatars} alt="" className="py- w-10" />
                <p className="p-2 flex justify-center items-center">
                  James Jackson
                </p>
              </div>
            </div>
            <div className="py-6">
              <div className="flex py-2">
                <img src={Vector} className="pr-0.5 py-0.5" />
                <img src={Vector} className="pr-0.5 py-0.5" />
                <img src={Vector} className="pr-0.5 py-0.5" />
                <img src={Vector} className="pr-0.5 py-0.5" />
                <img src={Vector} className="pr-0.5 py-0.5" />
              </div>
              <h2 className="font-bold py-2">Excellent</h2>
              <p className="text-[#525151]">
                Let's be honest, this mini backpack is adorable! I snagged it
                for weekend adventures and errands, and it's become my new
                go-to. The quality feels amazing - the material is super durable
                and the stitching is top-notch. The comfy, padded straps are a
                huge plus, especially when the farmer's market haul gets a
                little heavy.
              </p>
              <div className="flex py-3">
                <img src={Avatars} alt="" className="py- w-10" />
                <p className="p-2 flex justify-center items-center">
                  James Jackson
                </p>
              </div>
            </div>
          </div>
          <Button text="Drop a review" className="w-60" />
        </div>
      </div>
    </div>
  );
}