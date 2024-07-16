import React, { useState } from 'react';
import WebLayout from "../layouts/WebLayout";
import { Link, useLocation } from "react-router-dom";
import ChevronRight from "../components/icons/ChevronRight";
import Plus from "../components/icons/Plus"
import amex from "../assets/img/icons/amex.svg";
import discover from "../assets/img/icons/discover.svg";
import mastercard from "../assets/img/icons/mastercard.svg";
import pdcard from "../assets/img/icons/pdcard.svg";
import visa from "../assets/img/icons/visa.svg";
import Modal from "../components/Modal";
import AddPayment from "../components/parts/AddPayment";
import ShowSuccess from "../components/parts/ShowSuccess";
import useLocalStorage from "../hooks/useLocalStorage";
import Popup from "../components/Popup"
import OrderSummary from '../components/OrderSummary';
import AddBilling from '../components/parts/AddBilling';

// type Cart = {
//   desc: string;
//   discount: number;
//   id: string;
//   photo: string;
//   photos: {
//       url: string
//   }[];
//   price: number;
//   quantity: number;
//   rating: number;
//   title: string;
// }

type Card = {
  cardNumber: string,
  cvv: string,
  expiryDate: string
}

type Billing = {
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: string,
  address?: string,
}

type CardTypeMap = {
  [key: string]: string;
};

export default function Checkout(){
    const initialCards = [
      { cardNumber: "1234 5678 9012 3456", cvv: "123", expiryDate: "12/24" },
      { cardNumber: "9876 5432 1098 7654", cvv: "456", expiryDate: "11/23" },
    ];
    const location = useLocation();
    const { price } = location.state || { price: 0 };
    const { discount } = location.state || { discount: 0 };
    const { coupon } = location.state || { coupon: 0 };
    const { couponMsg } = location.state || { couponMsg: '' };
    const [showPayment, setShowPayment] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showBilling, setShowBilling] = useState(false);
    const [selectedCard, setSelectedCard] = useState<string|null>(null);
    const [billingValidation, setBillingValidation] = useState(false);
    const [cardValidation, setCardValidation] = useState(false);
    const cartItems = useLocalStorage("cartItems", []);
    const couponCode = couponMsg;
    const [message, setMessage] = useState<string|null>(null);

    const [cards, setCards] = useLocalStorage<Card[]>("cards", initialCards);
    const [billing, setBilling] = useLocalStorage<Billing>("billing", {});

    const addCard = (newCard: Card) => {
      setCards([...cards, newCard]);
      showPopup(`Payment card added successfully`);
    };

    const addBilling = (newBilling: Billing) => {
      if(billing){
        setBilling(newBilling);
        showPopup(`Billing address added successfully`);
      }else{
        setBilling(billing);
        showPopup(`Billing address updated successfully`);
      }
    };

    const setOpen = () => {
      setShowPayment(false);
      setShowSuccess(false);
      setShowBilling(false);
    }

    const removeCard = (cardIndex: number) => {
      setCards(cards.filter((_, index) => index !== cardIndex));
      showPopup(`Payment card removed successfully`);
    };

    const showPopup = (message: string) => {
      setMessage(message);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    };

    return (
        <WebLayout cartItems={cartItems.length}>
          <Modal open={showPayment} setOpen={setOpen}>
            <AddPayment addCard={addCard} onClose={() => setShowPayment(false)}></AddPayment>
          </Modal>
          <Modal open={showBilling} setOpen={setOpen}>
            <AddBilling addBilling={addBilling} onClose={() => setShowBilling(false)}></AddBilling>
          </Modal>
          <Modal open={showSuccess} setOpen={setOpen} canClose={false} canBlur={false}>
            <ShowSuccess showSuccess={showSuccess}></ShowSuccess>
          </Modal>
        <div className="max-w-[1200px] mx-auto pt-6 px-4 md:px-6 xl:px-0">
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex flex-col grow w-full md:w-[67%] gap-7">
              <div>
                <div className="flex gap-5 items-center self-start whitespace-nowrap">
                  <Link to="/cart" className="self-stretch my-auto text-3xl font-bold tracking-tighter leading-10 text-pd-mid-gray">Cart</Link>
                  <span className="text-pd-mid-gray"><ChevronRight /></span>
                  <div className="self-stretch pd-h2 tracking-tighter text-pd-black">Checkout</div>
                </div>
                <div className="mt-8 pd-h3 font-semibold leading-8 text-pd-black">Payment Method</div>
              </div>
              <div className={`flex flex-col justify-between py-2 rounded border border-solid max-md:max-w-full ${cardValidation?'border-pd-red':'border-pd-black'}`}>
                {
                  cards.length < 1 ? (
                    <p className="text-pd-red pd-p-18 h-[50px] flex justify-center items-center">You have not added any cards yet</p>
                  ):(
                    cards.map((card, index) => {
                        const cardType: CardTypeMap = {3: amex, 4: visa, 5: mastercard, 6: discover};
                    return (
                      <React.Fragment key={index}>
                        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full p-2 pb-0 md:pb-2">
                          <label htmlFor={'card'+index} className="flex gap-0 md:gap-5 justify-between flex-col md:flex-row">
                            <div className="flex gap-3.5">
                              <div className="flex flex-col justify-center p-0.5">
                                <div className="flex flex-col justify-center items-center">
                                  <input type="radio" name="radio_payment" onChange={(e)=>setSelectedCard(e.target.value)} value={index} id={'card'+index} className="w-6 h-6 accent-pd-blue" />
                                </div>
                              </div>
                              <img loading="lazy" src={Object.hasOwn(cardType, card.cardNumber[0])?cardType[card.cardNumber[0]]:pdcard} className="shrink-0 my-auto w-6 aspect-[1.41]"/>
                              <div className="pd-p font-semibold leading-6 text-pd-black"> •••• {card.cardNumber.replace(/\s/g, "").slice(-4)}</div>
                            </div>
                            <div className="pd-p leading-6 text-gray-400">Expires {card.expiryDate.replace('/', '/20')}</div>
                          </label>
                          <button onClick={() => removeCard(index)} className="text-pd-red pd-p font-semibold with-opacity">Remove</button>
                        </div>
                        {index < cards.length - 1 && <hr className={`shrink-0 my-2 h-0 border-t border-solid max-md:max-w-full ${cardValidation?'border-pd-red':'border-pd-black'}`} />}
                      </React.Fragment>
                    )
                    })
                  )
                }
              </div>
              <hr className="shrink-0 mt-0 md:mt-2 h-0 border-t border-pd-black border-solid max-md:max-w-full" />
              <button className="flex gap-4 justify-center self-start font-semibold leading-6 rounded font-montserrat with-shadow" onClick={()=>setShowPayment(true)}>
                <Plus />
                <span>Add Payment method</span>
              </button>
              <div className="mt-6 pd-h3 font-semibold leading-8 text-pd-black">Shipping Details</div>
              <div className={`min-h-20 gap-8 items-center flex justify-between py-2 rounded border border-solid max-md:max-w-full p-2 ${billingValidation?'border-pd-red':'border-pd-black'}`}>
                  {
                    Object.keys(billing).length > 0?(
                      <div>
                        <p className="pd-p text-pd-black"><span className="font-semibold">{billing.firstName}</span><span className="ms-2 me-2">|</span><span>{billing.address}</span></p>
                        <p className="pd-p text-pd-black"><span>{billing.phone}</span><span className="ms-2 me-2">|</span><span className="font-semibold">{billing.email}</span></p>
                      </div>
                    ):(
                      <p className="!italic text-pd-red pd-p-18">You have not added any billing address yet</p>
                    )
                  }
                <button onClick={() => setShowBilling(true)} className="text-pd-red pd-p font-semibold with-opacity">{Object.keys(billing).length>0?'Update':'Set up'}</button>
              </div>
            </div>    
            <OrderSummary total={price} discount={discount} proceed_loc="success" proceed_msg="Place Your Order and Pay" coupon={coupon} couponMsg={couponCode} showModal={setShowSuccess} selectedCard={selectedCard} billing={billing} setBillingValidation={setBillingValidation} setCardValidation={setCardValidation} showPopup={showPopup}/>
        </div>
        {message && <Popup message={message} duration={5000} onClose={() => setMessage(null)} />}
      </div>
        </WebLayout>
    );
}